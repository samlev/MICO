<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/getCompanyName.php
 ** 
 ** Description: Searches for a company name
 *******************************************************************************
 ******************************************************************************/

// get the values
$search = trim($_POST['query']);
$filter = trim($_POST['filter']);

$filter_search = (strlen($filter)&&strlen($search)==0?" AND `caller_name` LIKE '".mysql_real_escape_string($filter)."'":'');
$filter_order = (strlen($filter)?" (`caller_name` LIKE '".mysql_real_escape_string($filter)."') DESC, ":'');

$companies = array();
$c_filter = array("''");

// first search for direct matches
$query = "SELECT `company_name`, count(`id`) AS `frequency`, (`caller_name` LIKE '".mysql_real_escape_string($filter)."') as `caller_from_company`
          FROM `".DB_PREFIX."calls`
          WHERE `company_name` LIKE '".mysql_real_escape_string($search)."%'
          $filter_search
          GROUP BY `company_name`
          ORDER BY $filter_order `frequency` DESC, `company_name` ASC";
$res = run_query($query);

// add any results to the callers array
while ($row = mysql_fetch_assoc($res)) {
    $companies[] = array("name"=>$row['company_name'],"match"=>($row['caller_from_company']?1:2));
    $c_filter[] = "'".mysql_real_escape_string($row['company_name'])."'";
}

// now partial matches or basic soundex/metaphone matches
$query = "SELECT `company_name`, count(`id`) AS `frequency` 
          FROM `".DB_PREFIX."calls`
          WHERE (`company_name` LIKE '%".mysql_real_escape_string($search)."%'
            OR
          `company_soundex` = '".soundex($search)."'
            OR
          `company_metaphone` LIKE '".metaphone($search)."%')
          AND `company_name` NOT IN (".implode(",",$c_filter).")
          $filter_search
          GROUP BY `company_name`
          ORDER BY $filter_order `frequency` DESC, `caller_name` ASC";
$res = run_query($query);

// add any results to the callers array
while ($row = mysql_fetch_assoc($res)) {
    $companies[] = array("name"=>$row['company_name'],"match"=>2);
    $c_filter[] = "'".mysql_real_escape_string($row['company_name'])."'";
}

// now partial metaphone matches
$query = "SELECT `company_name`, count(`id`) AS `frequency` 
          FROM `".DB_PREFIX."calls`
          WHERE (`company_metaphone` LIKE '%".metaphone($search)."%')
          AND `company_name` NOT IN (".implode(",",$c_filter).")
          $filter_search
          GROUP BY `company_name`
          ORDER BY $filter_order `frequency` DESC, `caller_name` ASC";
$res = run_query($query);

// add any results to the callers array
while ($row = mysql_fetch_assoc($res)) {
    $companies[] = array("name"=>$row['company_name'],"match"=>3);
}

// notify the client that the update was successful.
$data = array("success"=>true,"company"=>$companies);
?>