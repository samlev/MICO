<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/addCall.php
 ** 
 ** Description: Adds a call to the database
 *******************************************************************************
 ******************************************************************************/

// get the important variables
$u = intval($user->get_id());
$caller = trim(html_scrub($_POST['caller'])); // clear any/all HTML from the caller name
$company = trim(html_scrub($_POST['company'])); // clear any/all HTML from the company name
$users = unserialize(trim($_POST['users']));
$message = trim($_POST['message']);
$contacts = unserialize(trim($_POST['contacts']));
$priority = trim($_POST['priority']);
$action = trim(html_scrub($_POST['action'])); // clear any/all HTML from the action

// check the passed variables
if (is_array($users) && count($users) == 0) {
    // make use of the 'error' system - no users passed
    $error = true;
    $error_message = "Please select a recipient for the call";
} else if ($caller == '' && $company == '' && $message == '' && (!is_array($contacts) || count($contacts) == 0)) {
    // we have no call information
    $error = true;
    $error_message = "Please enter either a caller name, company name, message, or contact details";
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
        foreach ($users as $u_id) {
            //clean up the user if
            $u_id = intval($u_id);
            
            // check if the user is a valid, active user
            $query = "SELECT * FROM `".DB_PREFIX."users` WHERE `id`=$u_id AND `role`!='disabled'";
            $res = run_query($query);
            
            if (mysql_num_rows($res)) {
                $user_links[] = "($u_id,$c_id)";
            }
        }
        
        // check if we're linking to any valid users
        if (count($user_links)) {
            // add the links
            $query = "INSERT INTO `".DB_PREFIX."user_calls`
                        (`user_id`,`call_id`)
                      VALUES ".implode(',',$user_links);
            run_query($query);
            
            // and that's it!
            $data = array("success"=>true);
        } else {
            $error = true;
            $error_message = "There was a problem adding your call. Please check your recipients and try again";
        }
    } else {
        $error = true;
        $error_message = "There was a problem adding your call. Please check your fields and try again";
    }
}

?>
