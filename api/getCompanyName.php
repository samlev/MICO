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
$search = $_POST['search'];
$filter = $_POST['filter'];

$filter_search = (strlen(trim($filter))?" AND `caller_name` LIKE '".$filter."'":'');

$companies = array();

// first search for direct matches
$query = "SELECT `company_name`, count(`id`) AS `frequency` 
          FROM `".DB_PREFIX."calls`
          WHERE `company_name` LIKE '".mysql_real_escape_string($search)."%'
          $filter_search
          GROUP BY `company_name`
          ORDER BY `frequency` DESC, `company_name` ASC";
$res = run_query($query);

// add any results to the callers array
while ($row = mysql_fetch_assoc($res)) {
    $companies[] = array("name"=>$row['name'],"match"=>1);
}

// now partial matches or basic soundex/metaphone matches
$query = "SELECT `company_name`, count(`id`) AS `frequency` 
          FROM `".DB_PREFIX."calls`
          WHERE (`company_name` LIKE '%".mysql_real_escape_string($search)."%'
            OR
          `company_soundex` = '".soundex($search)."'
            OR
          `company_metaphone` LIKE '".metaphone($search)."%')
          $filter_search
          GROUP BY `company_name`
          ORDER BY `frequency` DESC, `caller_name` ASC";
$res = run_query($query);

// add any results to the callers array
while ($row = mysql_fetch_assoc($res)) {
    $companies[] = array("name"=>$row['name'],"match"=>2);
}

// now partial metaphone matches
$query = "SELECT `company_name`, count(`id`) AS `frequency` 
          FROM `".DB_PREFIX."calls`
          WHERE (`company_metaphone` LIKE '%".metaphone($search)."%')
          $filter_search
          GROUP BY `company_name`
          ORDER BY `frequency` DESC, `caller_name` ASC";
$res = run_query($query);

// add any results to the callers array
while ($row = mysql_fetch_assoc($res)) {
    $companies[] = array("name"=>$row['name'],"match"=>3);
}

// notify the client that the update was successful.
$data = array("success"=>true,"company"=>$companies);
?>