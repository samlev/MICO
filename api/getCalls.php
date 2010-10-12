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
$query = "SELECT c.`id`
          FROM `".DB_PREFIX."calls` c
          INNER JOIN `".DB_PREFIX."user_calls` uc ON uc.`call_id` = c.`id`
          WHERE uc.`user_id` = $u";
$res = run_query($query);

$calls = array();

// check each call
while ($row = mysql_fetch_assoc($res)) {
    $c = Call::by_id($row['id']);
    
    // and add it to the list of calls
    $calls[] = $c->to_array();
}

$data = array("success"=>true,
              "calls"=>$calls);
?>
