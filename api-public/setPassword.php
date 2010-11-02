<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-public/setPassword.php
 ** 
 ** Description: Sets a user's password, either from the initial password link,
 **              or from the 'forgotten password' process
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Sphodro is free software: you can redistribute it and/or
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
$username = strtolower($_POST['username']); // usernames are lower case
$password1 = $_POST['password1'];
$password2 = $_POST['password2'];
$confirmation_key = $_POST['confirmation_key'];

try {
    // grab the user
    $user = User::by_username($username);
    
    // attempt to set the password
    $user->set_password($confirmation_key,$password1,$password2);
    
    // build the return data
    $data = array("success"=>true,
                  "info"=>"Password has successfully been set");
} catch (UserNotFoundException $e) {
    // couldn't log in - return the error message
    $error = true;
    $error_message=$e->getMessage();
} catch (UserPasswordException $e) {
    // problem with the password
    $error = true;
    $error_message=$e->getMessage();
}
?>