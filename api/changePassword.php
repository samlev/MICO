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
$oldpass = $_POST['oldpass'];
$password1 = $_POST['password1'];
$password2 = $_POST['password2'];

// attempt to log the user in
try {
    $user->change_password($oldpass,$password1,$password2);
    
    // build the return data
    $data = array("success"=>true,
                  "info"=>"Password has successfully been changed");
} catch (UserPasswordException $e) {
    // problem with the password
    $error = true;
    $error_message = $e->getMessage();
}
?>