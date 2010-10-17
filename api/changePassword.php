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
    $data = array("success"=>false,
                  "info"=>$e->getMessage());
}
?>