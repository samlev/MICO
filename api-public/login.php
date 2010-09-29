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
    
    // build the return data
    $data = array("success"=>true,
                  "userid"=>$user->get_id(),
                  "session"=>$user->get_session(),
                  "role"=>$user->get_role(),
                  "vars"=>$user->get_vars());
} catch (UserLoginException $e) {
    // couldn't log in - return the error message
    $data = array("success"=>false,
                  "info"=>$e->getMessage());
}
?>