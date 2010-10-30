<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/getUsers.php
 ** 
 ** Description: Gets a simple list of all users
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mantis Simple Call Centre is free software: you can redistribute it and/or
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

$u = intval($user->get_id());

$query = "SELECT `id` FROM `".DB_PREFIX."users`
          WHERE `role` != 'disabled'
          AND `id` != $u";

$res = run_query($query);

$users = array();
$u_sort = array();

while ($row = mysql_fetch_assoc($res)) {
    try {
        // get the user
        $temp_user = User::by_id($row['id']);
        
        if ($temp_user->is_idle()) {
            $status = "offline";
            $statustext = "Offline";
        } else {
            $status = $temp_user->get_var_default('status','available');
            $statustext = $temp_user->get_var_default('statustext','Available');
        }
        
        // pull out the info we need
        $u_data = array('id'=>$row['id'], // user id
                        'name'=>$temp_user->get_var('name'), // user's name
                        'status'=>$status, // user's status (available, away, busy, offline)
                        'statustext'=>$statustext); // status text ('In a meeting','out to lunch', etc.)
        
        // and add it to the array
        $users[$row['id']] = $u_data;
        $u_sort[$row['id']] = $temp_user->get_var('name');
    } catch (UserNotFoundException $e) { /* Don't worry if we can't get user details */ }
}

// sort the names
asort($u_sort);
// rebuild the array in a sorted manner
$users_sorted = array();
foreach ($u_sort as $k=>$dummy) {
    $users_sorted[] = $users[$k];
}


$data = array("success"=>true,
              "users"=>$users_sorted);
?>
