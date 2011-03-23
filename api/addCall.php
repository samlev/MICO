<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/addCall.php
 ** 
 ** Description: Adds a call to the database
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

// get the important variables
$u = intval($user->get_id());
$caller = trim(html_scrub($_POST['caller'])); // clear any/all HTML from the caller name
$company = trim(html_scrub($_POST['company'])); // clear any/all HTML from the company name
// clean up the users array
$users = array_map('intval',unserialize(trim($_POST['users'])));
// ensure that any HTML in the message is safe for viewing (the message may
// include legitimate things which would get taken out by the html scrub.)
$message = trim(htmlspecialchars($_POST['message']));
// get the contact details, making sure to clean up any special HTML characters
$contacts = array_map('htmlspecialchars',unserialize(trim($_POST['contacts'])));
// ensure we have a valid 'priority' value
$priority = (in_array(trim($_POST['priority']),array('critical','urgent','moderate','minor','negligible')) // check if the priority is in the list of acceptable priorities
             ?trim($_POST['priority'])  // if so, use it
             :'moderate');              // if not, default to 'moderate'
$action = trim(html_scrub($_POST['action'])); // clear any/all HTML from the action

// check the passed variables
if (is_array($users) && count($users) == 0) {
    // make use of the 'error' system - no users passed
    $error = true;
    $error_message = $LANG->get_string('addCall/NoRecipient');
} else if ($caller == '' && $company == '' && $message == '' && (!is_array($contacts) || count($contacts) == 0)) {
    // we have no call information
    $error = true;
    $error_message = $LANG->get_string('addCall/NoCallInfo');
} else {
    $date = date('Y-m-d H:i:s');
    
    // we have all the information we need - add the call
    $query = "INSERT INTO `".DB_PREFIX."calls`
                (`user_id`,`date`,`caller_name`,`caller_soundex`,`caller_metaphone`,
                 `company_name`,`company_soundex`,`company_metaphone`,`message`,
                 `contact`,`priority`,`status`,`action`)
              VALUES (
                $u,         -- user adding call
                '$date',    -- php date for when the call is added
                '".mysql_real_escape_string($caller)."', -- caller name
                '".mysql_real_escape_string(strlen($caller)?soundex($caller):'')."', -- caller name soundex
                '".mysql_real_escape_string(strlen($caller)?metaphone($caller):'')."', -- caller name metaphone
                '".mysql_real_escape_string($company)."', -- company name
                '".mysql_real_escape_string(strlen($company)?soundex($company):'')."', -- company name soundex
                '".mysql_real_escape_string(strlen($company)?metaphone($company):'')."', -- company name metaphone
                '".mysql_real_escape_string($message)."', -- message
                '".mysql_real_escape_string(serialize($contacts))."', -- contacts
                '".mysql_real_escape_string($priority)."', -- priority
                'new', -- status
                '".mysql_real_escape_string($action)."' -- action
              )";
    
    $res = run_query($query);
    
    // we successfully entered the call. Now tie it to users
    if ($c_id = mysql_insert_id()) {
        $c_id = intval($c_id);
        // make a list of all valid user links
        $user_links = array();
        $user_objects = array();
        foreach ($users as $u_id) {
            //clean up the user id (this has been done earlier, but better to be safe than sorry)
            $u_id = intval($u_id);
            
            // don't double-add
            if (!array_key_exists($u_id,$user_objects)) {
                try {
                    $u = User::by_id($u_id);
                    
                    $user_objects[$u_id] = $u;
                    
                    // add to the 'user links' array
                    $user_links[] = "($u_id,$c_id)";
                } catch (UserException $e) { /* Silently discard */ }
            }
        }
        
        // check if we're linking to any valid users
        if (count($user_links)) {
            // add the links
            $query = "INSERT INTO `".DB_PREFIX."user_calls`
                        (`user_id`,`call_id`)
                      VALUES ".implode(',',$user_links);
            run_query($query);
            
            // and notify the users
            foreach ($user_objects as $u) {
                $u->add_notification($c_id,'assigned',null);
            }
            
            // and that's it!
            $data = array("success"=>true);
        } else {
            $error = true;
            $error_message = $LANG->get_string('addCall/RecipientError');
        }
    } else {
        $error = true;
        $error_message = $LANG->get_string('addCall/FieldError');
    }
}

?>
