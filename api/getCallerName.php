<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/getCallerName.php
 ** 
 ** Description: Searches for a caller name
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mico is free software: you can redistribute it and/or
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

// get the values
$search = trim($_POST['query']);
$filter = trim($_POST['filter']);

$filter_search = (strlen($filter)?" AND `company_name` LIKE '".mysql_real_escape_string($filter)."'":'');

$callers = array();
$c_filter = array("''");

// first search for direct matches
$query = "SELECT `caller_name`, count(`id`) AS `frequency` 
          FROM `".DB_PREFIX."calls`
          WHERE `caller_name` LIKE '".mysql_real_escape_string($search)."%'
          $filter_search
          GROUP BY `caller_name`
          ORDER BY `frequency` DESC, `caller_name` ASC";
$res = run_query($query);

// add any results to the callers array
while ($row = mysql_fetch_assoc($res)) {
    $callers[] = array("name"=>$row['caller_name'],"match"=>1);
    $c_filter[] = "'".mysql_real_escape_string($row['caller_name'])."'";
}

// now partial matches or basic soundex/metaphone matches
$query = "SELECT `caller_name`, count(`id`) AS `frequency` 
          FROM `".DB_PREFIX."calls`
          WHERE (`caller_name` LIKE '%".mysql_real_escape_string($search)."%'
            OR
          `caller_soundex` = '".soundex($search)."'
            OR
          `caller_metaphone` LIKE '".metaphone($search)."%')
          AND `caller_name` NOT IN (".implode(",",$c_filter).")
          $filter_search
          GROUP BY `caller_name`
          ORDER BY `frequency` DESC, `caller_name` ASC";
$res = run_query($query);

// add any results to the callers array
while ($row = mysql_fetch_assoc($res)) {
    $callers[] = array("name"=>$row['caller_name'],"match"=>2);
    $c_filter[] = "'".mysql_real_escape_string($row['caller_name'])."'";
}

// now partial metaphone matches
$query = "SELECT `caller_name`, count(`id`) AS `frequency` 
          FROM `".DB_PREFIX."calls`
          WHERE (`caller_metaphone` LIKE '%".metaphone($search)."%')
          AND `caller_name` NOT IN (".implode(",",$c_filter).")
          $filter_search
          GROUP BY `caller_name`
          ORDER BY `frequency` DESC, `caller_name` ASC";
$res = run_query($query);

// add any results to the callers array
while ($row = mysql_fetch_assoc($res)) {
    $callers[] = array("name"=>$row['caller_name'],"match"=>3);
}

// notify the client that the update was successful.
$data = array("success"=>true,"caller"=>$callers);
?>