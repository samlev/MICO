<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/updateCall.php
 ** 
 ** Description: Updates a call
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Sphodro is free software: you can redistribute it and/or
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
    $error = true;
    $error_message=$e->getMessage();
}

?>
