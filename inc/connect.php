<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: inc/connect.php
 ** 
 ** Description: Connects to the database and pulls in the library of functions
 **              and classes required for the system
 *******************************************************************************
 ******************************************************************************/

// require a configuration file
require_once('config.php');

// connect to the database
mysql_connect($DB_HOST,$DB_USER,$DB_PASS);
mysql_select_db($DB_NAME);

// include the library of functions and classes
include_once(FS_ROOT.'/lib/func_std.php');
include_once(FS_ROOT.'/lib/Settings.class.php');
include_once(FS_ROOT.'/lib/User.class.php');
include_once(FS_ROOT.'/lib/func_std.php');
?>