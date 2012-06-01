<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/api/saveLanguage.php
 ** 
 ** Description: Saves the user's language for the installer
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

$success = false;
$message = "Invalid language selection";

if (preg_match('/^[A-Z]{2}$/',$_POST['LANGUAGE'])) {
    // set the cookie to expire in an hour
    setcookie('LANGUAGE', $_POST['LANGUAGE'], time()+3600, "/");
    $success = true;
}

// return the response
header("Content-Type: text/javascript");
?>
{success:<?php echo($success?'true':'false')?>,info:<?php echo($success?"'Language selected.'":"'".addslashes($message)."'")?>}