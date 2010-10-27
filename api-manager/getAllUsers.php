<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-manager/getAllUsers.php
 ** 
 ** Description: Gets a list of all users for the 'Manage users' section
 *******************************************************************************
 ******************************************************************************/

// never return the active user (easiest way to stop them from changing their own role)
$u = intval($user->get_id());

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
    case 'inactive':
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
          AND `id` != $u
          LIMIT $start,$limit";

$res = run_query($query);

$users = array();

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
        $users[] = $u_data;
    } catch (UserNotFoundException $e) { /* Don't worry if we can't get user details */ }
}

$data = array("success"=>true,
              "users"=>$users);
?>
