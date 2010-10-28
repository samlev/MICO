<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-public/login.php
 ** 
 ** Description: Logs in a user
 *******************************************************************************
 ******************************************************************************/

// get the values
$username = $_POST['username'];
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