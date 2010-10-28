<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-manager/resetPassword.php
 ** 
 ** Description: Sends a user a 'reset password' link
 *******************************************************************************
 ******************************************************************************/

// get the values
$id = $_POST['id'];

// attempt to log the user in
try {
    $u = User::by_id($id);
    // create and send the password request
    PasswordReset::get_request($user->get_username());
    
    // grab the user
    $email = $u->get_var('email');
    
    // build the return data
    $data = array("success"=>true);
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