<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-public/login.php
 ** 
 ** Description: Logs in a user
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
$username = strtolower($_POST['username']); // usernames are lower case
$password = $_POST['password'];

// attempt to log the user in
try {
    $user = User::login($username,$password);
    
    // notify the client that the login was successful.
    $data = array("success"=>true);
} catch (UserLoginException $e) {
    // couldn't log in - return the error message
    $error = true;
    $error_message=$e->getMessage();
}
?>