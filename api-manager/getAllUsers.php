<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-manager/getAllUsers.php
 ** 
 ** Description: Gets a list of all users for the 'Manage users' section
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

// get the filter and limit vars
$f = $_POST['filter'];
$start = (isset($_POST['start'])?intval($_POST['start']):0);
$limit = (isset($_POST['limit'])?intval($_POST['limit']):30);

// default to 'active'
$filter = "`role` != 'disabled'";

// check for other filters
switch ($f) {
    case 'all':
        // return everything
        $filter = '1';
        break;
    case 'disabled':
    case 'user':
    case 'manager':
    case 'admin':
        // return a specific role
        $filter = "`role` = '$f'";
        break;
}

// build the query
$query = "SELECT `id` FROM `".DB_PREFIX."users`
          WHERE $filter
          LIMIT $start,$limit";
$res = run_query($query);

$users = array();
$u_sort = array();

while ($row = mysql_fetch_assoc($res)) {
    try {
        // get the user
        $temp_user = User::by_id($row['id']);
        
        // pull out the info we need
        $u_data = array('id'=>$row['id'], // user id
                        'username'=>$temp_user->get_username(), // user's username
                        'name'=>$temp_user->get_var('name'), // user's name
                        'email'=>$temp_user->get_var('email'), // user's email
                        'role'=>$temp_user->get_role()); // user's role
        
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

// and get the total (for the pager)
$query = "SELECT count(`id`) as `total` FROM `".DB_PREFIX."users`
          WHERE $filter";
$res = run_query($query);

$total = count($users);
if ($row = mysql_fetch_assoc($res)) {
    $total = intval($row['total']);
}

$data = array("success"=>true,
              "users"=>$users_sorted,
              "total"=>$total);
?>
