<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/Notifier.class.php
 ** 
 ** Description: Defines a simple class to encapsulate the Notification
 **              functionality
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mico is free software: you can redistribute it and/or
 ** modify it under the terms of the GNU Lesser General Public License as
 ** published by the Free Software Foundation, either version 3 of the License,
 ** or (at your option) any later version.
 **
 ** This program is distributed in the hope that it will be useful, but WITHOUT
 ** ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 ** FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License
 ** for more details.
 **
 ** You should have received a copy of the GNU Lesser General Public License
 *******************************************************************************
 ******************************************************************************/

class Notifier {
    /** Builds and sends all notification emails */
    static function run() {
        // Pull in the language class
        global $LANG;
        
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
                                 COALESCE(cc.`date`,c.`date`) AS `action_date`,
                                 COALESCE(cc.`user_id`,c.`user_id`) AS `actor_id`
                          FROM `".DB_PREFIX."user_notifications` un
                          INNER JOIN `".DB_PREFIX."calls` c ON c.`id` = un.`call_id`
                          LEFT JOIN `".DB_PREFIX."call_comments` cc ON cc.`id` = un.`comment_id`
                          WHERE un.`notify_after` <= '".mysql_real_escape_string($date)."'
                          AND un.`notification_sent` IS NULL
                          ORDER BY un.`user_id` ASC, c.`priority` ASC, `action_date` ASC";
                $res = run_query($query);
                
                // set up some variables
                $users = array();
                $actors = array();
                
                // now pull out the notifications
                while ($row = mysql_fetch_assoc($res)) {
                    // set up the in the array (if it doesn't exist yet)
                    if (!isset($users[$row['user_id']])) {
                        $users[$row['user_id']] = array('user'=>User::by_id($row['user_id']),
                                                        'notifications'=>array(),
                                                        'newcalls'=>false,
                                                        'updatedcalls'=>false);
                    }
                    
                    if (!isset($actors[$row['actor_id']])) {
                        $actors[$row['actor_id']] = User::by_id($row['actor_id']);
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
                
                
                $default_lang = $LANG->get_language();
                
                // now build and send the actual emails
                foreach ($users as $u) {
                    // Select the language for the user
                    $LANG->set_language($u['user']->get_var_default('lang',''));
                    
                    // track the IDs that have been notified
                    $notifyids = array();
                    
                    // get the email address and name
                    $to = $u['user']->get_var('email');
                    
                    // Update text
                    if ($u['newcalls'] && $u['updatedcalls']) {
                        $up_text = $LANG->get_string('Notifier/run/NewAndUpdatedCalls',array("%%NUM_CALLS%%"=>count($u['notifications'])));
                    } else if ($u['newcalls'] && count($u['notifications'])==1) {
                        $up_text = $LANG->get_string('Notifier/run/NewCall');
                    } else if ($u['updatedcalls'] && count($u['notifications'])==1) {
                        $up_text = $LANG->get_string('Notifier/run/UpdatedCall');
                    } else if ($u['newcalls']) {
                        $up_text = $LANG->get_string('Notifier/run/NewCalls',array("%%NUM_CALLS%%"=>count($u['notifications'])));
                    } else if ($u['updatedcalls']) {
                        $up_text = $LANG->get_string('Notifier/run/UpdatedCalls',array("%%NUM_CALLS%%"=>count($u['notifications'])));
                    }
                    
                    // start the body text off
                    $body = $u['user']->get_var('name').','."\r\n";
                    $body .= "$up_text.\r\n";
                    
                    $curr_priority = '';
                    foreach ($u['notifications'] as $n) {
                        // get the notify id
                        $notifyids[] = $n['id'];
                        
                        // check for a change in 'priority', and add the priority header
                        if ($n['priority'] != $curr_priority) {
                            // add a break
                            $body .= "\r\n";
                            // add header
                            $body .= $LANG->get_string($n['priority'])."\r\n";
                            $body .= str_repeat('-',70)."\r\n";
                            // mark the current priority
                            $curr_priority = $n['priority'];
                        }
                        
                        // format the date for the notification
                        $d = date($u['user']->get_var_default('timeformat','g:ia'),strtotime($n['action_date']));
                        
                        // build the call information
                        if ($n['type']=='assigned') {
                            $body .= $d.' - '.$LANG->get_string('Notifier/run/CallAssigned',array("%%ACTOR_NAME%%"=>$actors[$n['actor_id']]->get_var('name')))."\r\n";
                        } else {
                            $body .= $d.' - '.$LANG->get_string('Notifier/run/CallUpdated',array("%%ACTOR_NAME%%"=>$actors[$n['actor_id']]->get_var('name')))."\r\n";
                        }
                        
                        // indent
                        $body .= str_repeat(' ',5);
                        
                        // Caller name
                        $caller = (strlen($n['caller_name'])?$n['caller_name']:$LANG->get_string('Notifier/run/CallerNoName'));
                        
                        // Caller company
                        $company = (strlen($n['caller_company'])?$n['caller_name']:false);
                        
                        // show the caller message if the call has been assigned
                        if ($n['type']=='assigned') {
                            if (strlen($n['message'])) {
                                // Add the message
                                if ($company) {
                                    $body .= $LANG->get_string('Notifier/run/CallAssignedWithCompWithMess',array("%%NAME%%"=>$caller,
                                                                                                                 "%%COMPANY%%"=>$company))."\r\n";
                                } else {
                                    $body .= $LANG->get_string('Notifier/run/CallAssignedNoCompWithMess',array("%%NAME%%"=>$caller))."\r\n";
                                }
                                
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
                                if ($company) {
                                    $body .= $LANG->get_string('Notifier/run/CallAssignedWithCompNoMess',array("%%NAME%%"=>$caller,
                                                                                                               "%%COMPANY%%"=>$company))."\r\n";
                                } else {
                                    $body .= $LANG->get_string('Notifier/run/CallAssignedNoCompNoMess',array("%%NAME%%"=>$caller))."\r\n";
                                }
                            }
                        } else { // this is a call update - don't show the message, just the date/time
                            if ($company) {
                                $body .= $LANG->get_string('Notifier/run/CallUpdatedWithComp',array("%%NAME%%"=>$caller,
                                                                                                    "%%COMPANY%%"=>$company,
                                                                                                    "%%DATE%%"=>date($u['user']->get_var_default('dateformat','jS M, Y'),strtotime($n['call_date'])),
                                                                                                    "%%TIME%%"=>date($u['user']->get_var_default('timeformat','g:ia'),strtotime($n['call_date']))))."\r\n";
                            } else {
                                $body .= $LANG->get_string('Notifier/run/CallUpdatedNoComp',array("%%NAME%%"=>$caller,
                                                                                                  "%%DATE%%"=>date($u['user']->get_var_default('dateformat','jS M, Y'),strtotime($n['call_date'])),
                                                                                                  "%%TIME%%"=>date($u['user']->get_var_default('timeformat','g:ia'),strtotime($n['call_date']))))."\r\n";
                            }
                        }
                        
                        // add the comment
                        if ($n['comment_id']!==null) {
                            // get the comment user
                            $c_user = User::by_id($n['comment_user']);
                            $body .= str_repeat(' ',5); // indent
                            // comment action and user
                            $body .= $LANG->get_string('Notifier/run/CallComment',array("%%ACTION%%"=>$n['comment_action'],
                                                                                        "%%NAME%%"=>$c_user->get_var('name')))."\r\n";
                            
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
                    $body .= wordwrap($LANG->get_string('Notifier/run/LoginLink',array("%%APP_ROOT%%"=>APP_ROOT)),70,"\r\n",false);
                    $body .= "\r\n";
                    $body .= $LANG->get_string('Notifier/run/NotificationMessage');
                    
                    // some other meta fields
                    if ($u['newcalls'] && $u['updatedcalls']) {
                        $subject = $LANG->get_string('Notifier/run/SubjectNewAndUpdatedCalls',array("%%NUM_CALLS%%"=>count($u['notifications'])));
                    } else if ($u['newcalls'] && count($u['notifications'])==1) {
                        $subject = $LANG->get_string('Notifier/run/SubjectNewCall');
                    } else if ($u['updatedcalls'] && count($u['notifications'])==1) {
                        $subject = $LANG->get_string('Notifier/run/SubjectUpdatedCall');
                    } else if ($u['newcalls']) {
                        $subject = $LANG->get_string('Notifier/run/SubjectNewCalls',array("%%NUM_CALLS%%"=>count($u['notifications'])));
                    } else if ($u['updatedcalls']) {
                        $subject = $LANG->get_string('Notifier/run/SubjectUpdatedCalls',array("%%NUM_CALLS%%"=>count($u['notifications'])));
                    }
                    
                    // and headers
                    $header = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/plain; charset=UTF-8' . "\r\n";
                    $header .= "From: ".Settings::get('MAIL_FROM')."\r\n";
                    
                    // if we send the mail successfully, mark the calls as notified
                    if (mail($to,$subject,$body,$header)) {
                        // mark the notifications as sent
                        $query = "UPDATE `".DB_PREFIX."user_notifications`
                                  SET `notification_sent`='".mysql_real_escape_string(date('Y-m-d H:i:s'))."'
                                  WHERE `id` IN (".implode(',',$notifyids).")";
                        run_query($query);
                    }
                }
                
                // reset language
                $LANG->set_language($default_lang);
                
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
        if (Settings::get_default('NOTIFY_LOCK',false)==false) {
            // set the lock
            Settings::override('NOTIFY_LOCK',true);
            $lock = true;
        }
        
        return $lock;
    }
    
    /** Releases the notification lock */
    static function release_lock() {
        Settings::override('NOTIFY_LOCK',false);
    }
}
?>
