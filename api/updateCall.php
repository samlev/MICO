<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/updateCall.php
 ** 
 ** Description: Updates a call
 *******************************************************************************
 ******************************************************************************/

// get the call object
$call = Call::by_id($_POST['id']);

// inform it who's updating
$call->set_updater($user->get_id());

// update the call status
if (isset($_POST['status'])) {
    $call->set_status($_POST['status']);
}
// update the call priority
if (isset($_POST['priority'])) {
    $call->set_priority($_POST['priority']);
}
// update the call users
if (isset($_POST['users'])) {
    if (is_numeric($_POST['users'])) {
        // just a single user
        $call->add_user(intval($_POST['users']));
    } else {
        // an array of users
        $users = unserialize($_POST['users']);
        
        // check that we got an array
        if (is_array($users)) {
            // add them all to the call
            foreach ($users as $u) {
                $call->add_user($u);
            }
        }
    }
}
// set the comment for this update
if (isset($_POST['comment'])) {
    $call->add_comment($_POST['comment']);
}

// now perform the update
try {
    // commit the updates
    $call->commit();
    // return the success
    $data = array("success"=>true);
} catch (CallUpdateException $e) {
    // couldn't commit the update - return the error message
    $data = array("success"=>false,
                  "info"=>$e->getMessage());
}

?>
