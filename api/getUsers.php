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

$users = array();

while ($row = mysql_fetch_assoc($res)) {
    try {
        // get the user
        $temp_user = User::by_id($row['id']);
        
        // pull out the info we need
        $u_data = array('id'=>$row['id'],
                        'name'=>$temp_user->get_var('name'),
                        'status'=>$temp_user->get_var('status'),
                        'statustext'=>$temp_user->get_var('statustext'));
        
        // and add it to the array
        $users[] = $u_data;
    } catch (UserNotFoundException $e) { /* Don't worry if we can't get user details */ }
}

$data = array("success"=>true,
              "users"=>$users);
?>