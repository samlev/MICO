<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/getCalls.php
 ** 
 ** Description: Gets a list of calls by the current user
 *******************************************************************************
 ******************************************************************************/

$u = intval($user->get_id());

// get the list of calls
$query = "SELECT c.`id`, c.`user_id`, c.`date`, c.`caller_name` as `caller`,
                 c.`company_name` as `company`, c.`message`, c.`contact`,
                 c.`priority`, c.`status`, c.`action`
          FROM `".DB_PREFIX."calls` c
          INNER JOIN `".DB_PREFIX."user_calls` uc ON uc.`call_id` = c.`id`
          WHERE uc.`user_id` = $u";
$res = run_query($query);

$calls = array();

// check each call
while ($row = mysql_fetch_assoc($res)) {
    // get the data
    $c_data = $row;
    
    try {
        // get user information
        $temp_user = User::by_id($c_data['user_id']);
        $c_data['taker'] = $temp_user->get_var('name');
        
        // clean up the contact data
        $c_data['contact'] = unserialize($c_data['contact']);
        
        // now get the recipients of this call
        $c = intval($c_data['id']);
        
        // pull out the recipient info
        $query = "SELECT `user_id`
                  FROM `".DB_PREFIX."user_calls`
                  WHERE `call_id` = $c";
        $rec_res = run_query($query);
        
        $c_data['recipient'] = array();
        // check each recipient
        while ($rec_row = mysql_fetch_assoc($rec_res)) {
            // get the user information
            $temp_user = User::by_id($rec_row['user_id']);
            $c_data['recipient'][] = array('id'=>$temp_user->get_id(),'name'=>$temp_user->get_var('name'));
        }
        
        // and add it to the list of calls
        $calls[] = $c_data;
    } catch (UserNotFoundException $e) { /* Don't worry if we can't get user details */ }
}

$data = array("success"=>true,
              "calls"=>$calls);
?>
