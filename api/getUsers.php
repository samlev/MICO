<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/getUsers.php
 ** 
 ** Description: Gets a simple list of all users
 *******************************************************************************
 ******************************************************************************/

$u = intval($user->get_id());

$query = "SELECT `id` FROM `".DB_PREFIX."users`
          WHERE `role` != 'disabled'
          AND `id` != $u";

$res = run_query($query);

$users = array(array('id'=>'1','name'=>'Sam Levy','status'=>'busy','statustext'=>'In a meeting'));

while ($row = mysql_fetch_assoc($res)) {
    try {
        // get the user
        $temp_user = User::by_id($row['id']);
        
        // pull out the info we need
        $u_data = array('id'=>$row['id'], // user id
                        'name'=>$temp_user->get_var('name'), // user's name
                        'status'=>$temp_user->get_var('status'), // user's status (available, away, busy, offline)
                        'statustext'=>$temp_user->get_var('statustext')); // status text ('In a meeting','out to lunch', etc.)
        
        // and add it to the array
        $users[] = $u_data;
    } catch (UserNotFoundException $e) { /* Don't worry if we can't get user details */ }
}

$data = array("success"=>true,
              "users"=>$users);
?>