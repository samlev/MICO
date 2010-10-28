<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-public/resetPassword.php
 ** 
 ** Description: Sends a user a 'reset password' link
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