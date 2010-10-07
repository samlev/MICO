<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api/getCallerContacts.php
 ** 
 ** Description: Searches for a caller contacts
 *******************************************************************************
 ******************************************************************************/

// get the values
$caller = trim($_POST['caller']);
$company = trim($_POST['company']);

$contacts_raw = array();
$contacts = array();

// first search for direct matches
$query = "SELECT `contact`, count(`id`) AS `frequency`
          FROM `".DB_PREFIX."calls`
          WHERE `caller_name` LIKE '".mysql_real_escape_string($caller)."'
          AND `company_name` LIKE '".mysql_real_escape_string($company)."'
          GROUP BY `contact`
          ORDER BY `frequency` DESC";
$res = run_query($query);

// add any results to the contacts array
while ($row = mysql_fetch_assoc($res)) {
    // clean up the contact detaisl
    $c = unserialize($row['contact']);
    // check that we have some contact details
    if (is_array($c) && count ($c)) {
        foreach ($c as $temp) {
            // clean it up
            $temp = trim($temp);
            // if we haven't recorded it already, do it again
            if (!in_array($temp, $contacts_raw)) {
                $contacts[] = array('contact'=>$temp,'match'=>1);
                $contacts_raw[] = $temp;
            }
        }
    }
}

// now search for caller only matches
$query = "SELECT `contact`, count(`id`) AS `frequency`
          FROM `".DB_PREFIX."calls`
          WHERE `caller_name` LIKE '".mysql_real_escape_string($caller)."'
          GROUP BY `contact`
          ORDER BY `frequency` DESC";
$res = run_query($query);

// add any results to the contacts array
while ($row = mysql_fetch_assoc($res)) {
    // clean up the contact detaisl
    $c = unserialize($row['contact']);
    // check that we have some contact details
    if (is_array($c) && count ($c)) {
        foreach ($c as $temp) {
            // clean it up
            $temp = trim($temp);
            // if we haven't recorded it already, do it again
            if (!in_array($temp, $contacts_raw)) {
                $contacts[] = array('contact'=>$temp,'match'=>2);
                $contacts_raw[] = $temp;
            }
        }
    }
}

// now search for company only matches
$query = "SELECT `contact`, count(`id`) AS `frequency`
          FROM `".DB_PREFIX."calls`
          WHERE `company_name` LIKE '".mysql_real_escape_string($company)."'
          GROUP BY `contact`
          ORDER BY `frequency` DESC";
$res = run_query($query);

// add any results to the contacts array
while ($row = mysql_fetch_assoc($res)) {
    // clean up the contact detaisl
    $c = unserialize($row['contact']);
    // check that we have some contact details
    if (is_array($c) && count ($c)) {
        foreach ($c as $temp) {
            // clean it up
            $temp = trim($temp);
            // if we haven't recorded it already, do it again
            if (!in_array($temp, $contacts_raw)) {
                $contacts[] = array('contact'=>$temp,'match'=>3);
                $contacts_raw[] = $temp;
            }
        }
    }
}

// notify the client that the update was successful.
$data = array("success"=>true,"contacts"=>$contacts);
?>