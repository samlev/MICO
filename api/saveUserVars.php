<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/saveUserVars.php
 ** 
 ** Description: Saves a user's variables
 *******************************************************************************
 ******************************************************************************/

// get the values
$vars = unserialise($_POST['vars']);

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
?>