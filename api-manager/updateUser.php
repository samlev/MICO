<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-manager/updateUser.php
 ** 
 ** Description: Updates a user's name, email address, or role
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

// get the values
$id = $_POST['id'];
$field = $_POST['field'];
// there is no need for there to be linebreaks in user vars
$value = trim(remove_linebreaks(html_scrub($_POST['value'])));

// attempt to log the user in
try {
    // get the user
    $u = User::by_id($id);
    
    if ($user->get_role() == "admin" || $u->get_role() != "admin") {
        if (in_array($field,array('name','email','role'))) {
            // check and update the field
            switch ($field) {
                case 'name':
                case 'email':
                    // make sure the value isn't empty
                    if (strlen($value)) {
                        $u->set_var($field,$value);
                    } else {
                        $error = true;
                        $error_message = "User's $field cannot be blank";
                    }
                    break;
                case 'role':
                    // make sure the value isn't empty
                    if (in_array($value,array('admin','manager','user','disabled'))) {
                        // check that the user isn't changing thier own role
                        if ($u->get_id() != $user->get_id()) {
                            // ensure that managers can't escalate (or de-escalate) beyond their level
                            if ($user->get_role() == "admin" || ($u->get_role() != "admin" && $value != "admin")) {
                                $u->set_role($value);
                            } else {
                                $error = true;
                                $error_message = "You do not have permission to set that role";
                            }
                        } else {
                            $error = true;
                            $error_message = "You may not change your own role";
                        }
                    } else {
                        $error = true;
                        $error_message = "Not a valid role";
                    }
                    break;
            }
            
            // No error? commit the change and set the response
            if ($error == false) {
                $u->commit();
                $data = array("success"=>true);
            }
        } else {
            $error = true;
            $error_message = "Unknown field";
        }
    } else {
        $error = true;
        $error_message = "You do not have permission to update that user";
    }
} catch (UserNotFoundException $e) {
    // couldn't log in - return the error message
    $error = true;
    $error_message=$e->getMessage();
} catch (PasswordResetException $e) {
    // There was a problem generating the request - return the error message
    $error = true;
    $error_message=$e->getMessage();
}
?>