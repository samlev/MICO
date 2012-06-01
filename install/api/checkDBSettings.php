<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/api/checkDBSettings.php
 ** 
 ** Description: Attempts to connect to the database
 **
 ** Copyright (c) 2012 Samuel Levy
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
$host = trim($_POST['host']);
$user = trim($_POST['user']);
$pass = trim($_POST['pass']);
$name = trim($_POST['name']);

$success = true;

// connect to the database
if (mysql_connect($host,$user,$pass)) {
    // attempt to select the database
    if (!mysql_select_db($name)) {
        $success = false;
        $message = 'Could not connect to database: ' . mysql_error();
    }
} else {
    $success = false;
    $message = 'Could not connect to server: ' . mysql_error();
}

// return the response
header("Content-Type: text/javascript");
?>
{success:<?php echo ($success?'true':'false')?>,info:<?php echo ($success?"'Settings correct'":"'".addslashes($message)."'")?>}