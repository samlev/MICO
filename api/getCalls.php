<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/getCalls.php
 ** 
 ** Description: Gets a list of calls by the current user
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

// get the user id
$u = intval($user->get_id());

// get ordering/filtering options
$closed = (isset($_POST['closed'])?boolval($_POST['closed'],true):false);
$filter = (isset($_POST['filter'])?$_POST['filter']:'assigned');
$order  = (isset($_POST['order'])?$_POST['order']:'recent');

// and the limits
$start = (isset($_POST['start'])?intval($_POST['start']):0);
$limit = (isset($_POST['limit'])?intval($_POST['limit']):30);

// get the list of calls
$query = "SELECT c.`id`
          FROM `".DB_PREFIX."calls` c ";
$filter_query = "";
$order_query = "";
$limit_query = "LIMIT $start, $limit ";

// now filter
switch ($filter) {
    case 'opened':
        $filter_query .= "WHERE c.`user_id` = $u ";
        break;
    case 'assigned':
    default:
        $filter_query .= "INNER JOIN `".DB_PREFIX."user_calls` uc ON uc.`call_id` = c.`id`
                   WHERE uc.`user_id` = $u ";
        break;
}

// filter out closed calls
if (!$closed) {
    $filter_query .= "AND c.`status` = 'new' ";
}

// and order
switch ($order) {
    case 'recent':
        // order by date, newest first
        $order_query .= "ORDER BY c.`date` DESC ";
        break;
    case 'urgent':
    default:
        // order by priority (it's an enum, so it orders by the enum index),
        // then date, oldest first. Older calls should have higer priority than
        // newer calls
        $order_query .= "ORDER BY c.`priority` ASC, c.`date` ASC ";
        break;
}

// query for the calls
$res = run_query($query.$filter_query.$order_query.$limit_query);
$calls = array();

// check each call
while ($row = mysql_fetch_assoc($res)) {
    $c = Call::by_id($row['id']);
    
    // and add it to the list of calls
    $calls[] = $c->to_array();
}

// Build the total query
$query = "SELECT COUNT(c.`id`) as total
          FROM `".DB_PREFIX."calls` c ";
$res = run_query($query.$filter_query);

// get the total
$total = 0;
if ($row = mysql_fetch_assoc($res)) {
    $total = intval($row['total']);
}

$data = array("success"=>true,
              "calls"=>$calls,
              "total"=>$total);
?>
