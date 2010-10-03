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
$vars = unserialise($_POST['vars']);

// attempt to log the user in
try {
    // go through and set the required variables to update
    foreach ($vars as $k=>$v) {
        // assume we have a 'user' object here
        if ($user->get_var($k) != $v) {
            $user->set_var($k,$v);
        }
    }
    
    // if anything was changed, commit it
    if ($user->is_dirty()) {
        $user->commit();
    }
    
    // notify the client that the update was successful.
    $data = array("success"=>true);
} catch (UserLoginException $e) {
    // couldn't log in - return the error message
    $data = array("success"=>false,
                  "info"=>$e->getMessage());
}
?>