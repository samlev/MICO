<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/Notifier.class.php
 ** 
 ** Description: Defines a simple class to encapsulate the Notification
 **              functionality
 *******************************************************************************
 ******************************************************************************/

class Notifier {
    /** Builds and sends all notification emails */
    static function run() {
        $tries = 0;
        
        // only try to get the lock 5 times before giving up
        while ($tries < 5) {
            // get the notifier lock
            if (Notifier::get_lock()) {
                $date = date('Y-m-d H:i:s');
                
                // get calls for the notifier
                $query = "SELECT un.`id`, un.`user_id`,un.`call_id`,c.`priority`,
                                 c.`caller_name`,c.`company_name`, c.`message`,
                                 c.`date` AS `call_date`, c.`action` AS `call_action`,
                                 un.`type`,un.`notify_after`,un.`comment_id`,
                                 cc.`user_id` AS `comment_user`,cc.`date` AS `comment_date`,
                                 cc.`action` AS `comment_action`,cc.`comment`,
                                 COALESCE(cc.`date`,c.`date`) AS `action_date`
                          FROM `".DB_PREFIX."user_notifications` un
                          INNER JOIN `".DB_PREFIX."calls` c ON c.`id` = un.`call_id`
                          LEFT JOIN `".DB_PREFIX."call_comments` cc ON cc.`id` = un.`comment_id`
                          WHERE un.`notify_after` <= '".mysql_real_escape_string($date)."'
                          AND un.`notification_sent` IS NULL
                          ORDER BY un.`user_id` ASC, c.`priority` ASC, `action_date` ASC";
                $res = run_query($query);
                
                // set up some variables
                $users = array();
                
                // now pull out the notifications
                while ($row = mysql_fetch_assoc($res)) {
                    // set up the in the array (if it doesn't exist yet)
                    if (!isset($users[$row['userid']])) {
                        $users[$row['user_id']] = array('user'=>User::by_id($row['user_id']),
                                                       'notifications'=>array(),
                                                       'newcalls'=>false,
                                                       'updatedcalls'=>false);
                    }
                    
                    // add to the user's notifications array
                    $users[$row['user_id']]['notifications'][] = $row;
                    
                    // and a little helper for the email text
                    if ($row['type']=='assigned') {
                        $users[$row['user_id']]['newcalls'] = true;
                    } else {
                        $users[$row['user_id']]['updatedcalls'] = true;
                    }
                }
                
                // now build and send the actual emails
                foreach ($users as $u) {
                    // track the IDs that have been notified
                    $notifyids = array();
                    
                    // get the email address and name
                    $to = $u['user']->get_var('email');
                    
                    // this is simeple helper text for the email body and the subject
                    $up_text = ($u['newcalls']?'new'.($u['updatedcalls']?' and updated':''):'updated').' call'.(count($u['notifications'])==1?'':'s');
                    
                    // start the body text off
                    $body = $u['user']->get_var('name').','."\r\n";
                    $body .= 'You have '.count($u['notifications'])." $up_text.\r\n";
                    
                    $curr_priority = '';
                    foreach ($u['notifications'] as $n) {
                        // get the notify id
                        $notifyids[] = $n['id'];
                        
                        // check for a change in 'priority', and add the priority header
                        if ($n['priority'] != $curr_priority) {
                            // add a break
                            $body .= "\r\n";
                            // add header
                            $body .= $n['priority']."\r\n";
                            $body .= str_repeat('-',70)."\r\n";
                            // mark the current priority
                            $curr_priority = $n['priority'];
                        }
                        
                        // format the date for the notification
                        $d = date($u['user']->get_var_default('timeformat','g:ia'),strtotime($n['action_date']));
                        
                        // build the call information
                        $body .= $d.' - Call '.($n['type']=='assigned'?'assigned to you.':'updated.')."\r\n";
                        $body .= str_repeat(' ',5); // indent
                        $body .= (strlen($n['caller_name'])?$n['caller_name']:'Someone'); // caller name (or someone)
                        $body .= (strlen($n['caller_company'])?' from '.$n['caller_name']:''); // caller company
                        
                        // show the caller message if the call has been assigned
                        if ($n['type']=='assigned') {
                            $body .= ' called, and left ';
                            if (strlen($n['message'])) {
                                $body .= 'this message:'."\r\n";
                                
                                // as we're sending a plain-text email, decode the entities
                                $message = html_entity_decode($n['message']);
                                // word-wrap the message
                                $message = wordwrap($message, 60,"\n",true);
                                // break it into an array
                                $m_array = explode("\n",$message);
                                // and add it to the body
                                foreach ($m_array as $m) {
                                    // indent each line
                                    $body .= str_repeat(' ',10).$m."\r\n";
                                }
                            } else { // simple no message
                                $body .= 'no message.'."\r\n";
                            }
                        } else { // this is a call update - don't show the message, just the date/time
                            $body .= ' called on '.date($u['user']->get_var_default('dateformat','jS M, Y'),strtotime($n['call_date']));
                            $body .= ' at '.date($u['user']->get_var_default('timeformat','g:ia'),strtotime($n['call_date']));
                            $body .= "\r\n";
                        }
                        
                        // add the comment
                        if ($n['comment_id']!==null) {
                            // get the comment user
                            $c_user = User::by_id($n['comment_user']);
                            $body .= str_repeat(' ',5); // indent
                            // comment action and user
                            $body .= $n['comment_action'].' by '.$c_user->get_var('name')."\r\n";
                            
                            // add the comment text (if it exists)
                            if (strlen($n['comment'])) {
                                // as we're sending a plain-text email, decode the entities
                                $comment = html_entity_decode($n['comment']);
                                // word-wrap the message
                                $comment = wordwrap($comment, 60,"\n",true);
                                // break it into an array
                                $c_array = explode("\n",$comment);
                                // and add it to the body
                                foreach ($c_array as $c) {
                                    // indent each line
                                    $body .= str_repeat(' ',10).$c."\r\n";
                                }
                            }
                        }
                    }
                    
                    // add the final section to the email
                    $body .= "\r\n";
                    $body .= wordwrap("Please go to ".APP_ROOT." to respond to these calls.",70,"\r\n",false);
                    $body .= "\r\n";
                    $body .= "You can change your notification settings in the 'Preferences' area.";
                    
                    // some other meta fields
                    $subject = 'Mantis notification - '.$up_text;
                    
                    // and headers
                    $header = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/plain; charset=UTF-8' . "\r\n";
                    $header .= "From: ".Settings::get('mail_from')."\r\n";
                    
                    // if we send the mail successfully, mark the calls as notified
                    if (mail($to,$subject,$body,$header)) {
                        // mark the notifications as sent
                        $query = "UPDATE `".DB_PREFIX."user_notifications`
                                  SET `notification_sent`='".mysql_real_escape_string(date('Y-m-d H:i:s'))."'
                                  WHERE `id` IN (".implode(',',$notifyids).")";
                        run_query($query);
                    }
                }
                
                // done, so release the lock and get out of the loop
                Notifier::release_lock();
                break;
            } else {
                // wait for a second before trying again
                sleep(1);
                // increase the number of tries
                $tries ++;
            }
        }
    }
    
    /** Gets the notification lock
     * @return bool If we aquired the notificatoin lock
     */
    static function get_lock() {
        $lock = false;
        
        // check if the lock is set
        if (Settings::get_default('notifylock',false)==false) {
            // set the lock
            Settings::override('notifylock',true);
            $lock = true;
        }
        
        return $lock;
    }
    
    /** Releases the notification lock */
    static function release_lock() {
        Settings::override('notifylock',false);
    }
}
?>