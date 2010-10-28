<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-manager/addUser.php
 ** 
 ** Description: Adds a user
 *******************************************************************************
 ******************************************************************************/

// get the values
$username = strtolower(trim($_POST['username'])); // usernames are lower-case to lower user-input confusion
$name = trim(html_scrub($_POST['name']));
$email = trim(html_scrub($_POST['email']));
$role = $_POST['role'];

$user_id = 0;

// first check that the username is valid - we're more strict with this because it can't be changed
if (preg_match('/^([a-z0-9]+[\.\-_]?[a-z0-9]*)+$/',$username)) {
    // now check that it's not taken
    $query = "SELECT `id` FROM `".DB_PREFIX."users`
              WHERE `username`='".mysql_real_escape_string($username)."'";
    $res = run_query($query);
    
    if (mysql_num_rows($res) == 0) {
        // check quickly that the name and email aren't blank
        if (strlen($name) && strlen($email)) {
            // and that the role selected is valid
            if (in_array($role, array('admin','manager','user'))) {
                if ($user->get_role() == 'admin' || $role != 'admin'){
                    // Got all of that? Add the user!
                    $query = "INSERT INTO `".DB_PREFIX."users` (`username`,`role`)
                              VALUES ('".mysql_real_escape_string($username)."','$role')";
                    run_query($query);
                    
                    if ($id = mysql_insert_id()) {
                        // build the user object
                        $u = User::by_id($id);
                        
                        // add the name and email fields
                        $u->set_var('name',$name);
                        $u->set_var('email',$email);
                        $u->commit();
                        
                        // now send a password reset request
                        PasswordReset::new_user_request($u->get_username());
                        
                        // And build the response
                        $data = array("success"=>true);
                    } else {
                        $error = true;
                        $error_message = "Error adding user";
                    }
                } else {
                    $error = true;
                    $error_message = "You do not have permission to add an administrative user";
                }
            } else {
                $error = true;
                $error_message = "User's role is not valid";
            }
        } else {
            $error = true;
            $error_message = "User's name and email cannot be blank";
        }
    } else {
        $error = true;
        $error_message = "Username already in use";
    }
} else {
    $error = true;
    $error_message = "Username may contain only letters and numbers, optionally separated by a period (.), dash (-), or underscore (_)";
}
?>