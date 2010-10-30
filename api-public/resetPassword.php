<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-public/resetPassword.php
 ** 
 ** Description: Sends a user a 'reset password' link
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mantis Simple Call Centre is free software: you can redistribute it and/or
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
$username = strtolower($_POST['username']); // usernames are lowercase

// attempt to log the user in
try {
    // create and send the password request
    PasswordReset::get_request($username);
    
    // grab the user
    $user = User::by_username($username);
    $email = $user->get_var('email');
    
    // build the return data
    $data = array("success"=>true,
                  "info"=>"An email was sent to $email with further isntructions.");
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