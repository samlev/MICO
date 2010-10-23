<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/getLastUpdate.php
 ** 
 ** Description: Gets the last update for a user
 *******************************************************************************
 ******************************************************************************/

// get the last update and return it
$data = array("success"=>true,'lastupdate'=>$user->get_var('lastupdate'));
?>