<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/saveUserVars.php
 ** 
 ** Description: Saves a user's variables
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mico is free software: you can redistribute it and/or
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

// get the values
$vars = unserialize($_POST['vars']);

// variables not to overwrite (typically not user controllable config items)
$nowrite = array('lastupdate');

// go through and set the required variables to update
foreach ($vars as $k=>$v) {
    // check that the variable isn't in the 'nowrite' list
    if (!in_array($k,$nowrite)) {
        // check for a strict boolean true or false
        if (boolval($v,true)!== null) {
            $v = boolval($v,true);
        } else {
            // remove linebreaks, html, etc.
            $v = trim(remove_linebreaks(html_scrub($v)));
        }
        // Check if the update is a change
        if ($user->get_var($k) !== $v) {
            $user->set_var($k,$v);
        }
    }
}

// if anything was changed, commit it
if ($user->is_dirty()) {
    $user->commit();
}

// notify the client that the update was successful.
$data = array("success"=>true);
?>