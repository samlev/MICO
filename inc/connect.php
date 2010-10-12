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
include_once(FS_ROOT.'/inc/magic_quotes_gpc_off.php'); // undo any 'magic quotes' damage
include_once(FS_ROOT.'/lib/htmlpurifier/HTMLPurifier.standalone.php'); // HTML purifier
include_once(FS_ROOT.'/lib/func_std.php'); // pull in the standard library of functions
include_once(FS_ROOT.'/lib/Settings.class.php'); // system settings class
include_once(FS_ROOT.'/lib/User.class.php'); // User class
include_once(FS_ROOT.'/lib/Call.class.php'); // Call class
include_once(FS_ROOT.'/lib/PasswordReset.class.php'); // password reset class
?>