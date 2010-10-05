<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/getCallerName.php
 ** 
 ** Description: Searches for a caller name
 *******************************************************************************
 ******************************************************************************/

// get the values
$search = $_POST['search'];
$filter = $_POST['filter'];

$filter_search = (strlen(trim($filter))?" AND `company_name` LIKE '".$filter."'":'');

$callers = array();
$c_filter = array();

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