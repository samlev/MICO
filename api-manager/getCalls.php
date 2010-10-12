<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-manager/getCalls.php
 ** 
 ** Description: Overrides the default 'get calls' method to allow extra filter
 **              options
 *******************************************************************************
 ******************************************************************************/

// get the user id
$u = intval($user->get_id());

// get ordering/filtering options
$closed = (isset($_POST['closed'])?boolval($_POST['closed'],true):false);
$filter = (isset($_POST['filter'])?$_POST['filter']:'assigned');
$order  = (isset($_POST['order'])?$_POST['order']:'recent');

// get the list of calls
$query = "SELECT c.`id`
          FROM `".DB_PREFIX."calls` c ";

// now filter
switch ($filter) {
    case 'all':
        $query .= "WHERE 1 ";
        break;
    case 'opened':
        $query .= "WHERE c.`user_id` = $u ";
        break;
    case 'assigned':
    default:
        $query .= "INNER JOIN `".DB_PREFIX."user_calls` uc ON uc.`call_id` = c.`id`
                   WHERE uc.`user_id` = $u ";
        break;
}

// filter out closed calls
if (!$closed) {
    $query .= "AND c.`status` = 'new' ";
}

// and order
switch ($order) {
    case 'recent':
        // order by date, newest first
        $query .= "ORDER BY c.`date` DESC ";
        break;
    case 'urgent':
    default:
        // order by priority (it's an enum, so it orders by the enum index),
        // then date, oldest first. Older calls should have higer priority than
        // newer calls
        $query .= "ORDER BY c.`priority` ASC, c.`date` ASC ";
        break;
}

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
