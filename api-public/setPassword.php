<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-public/setPassword.php
 ** 
 ** Description: Sets a user's password, either from the initial password link,
 **              or from the 'forgotten password' process
 *******************************************************************************
 ******************************************************************************/

// get the values
$username = strtolower($_POST['username']); // usernames are lower case
$password1 = $_POST['password1'];
$password2 = $_POST['password2'];
$confirmation_key = $_POST['confirmation_key'];

// attempt to log the user in
try {
    // grab the user
    $user = User::by_username($username);
    
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