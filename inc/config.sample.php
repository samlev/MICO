<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: inc/config.sample.php
 ** 
 ** Description: Sample configuration file. Update the values as described and
 **              save as 'inc/config.php', relative to the root directory of the
 **              application.
 *******************************************************************************
 ******************************************************************************/

// Directory paths
// NB: The software assumes that these paths do not contain a trailing slash
define ("FS_ROOT", "/absolute/path/to/application/root"); // Filesystem root
// Web paths
define ("WEB_DOMAIN", "www.example.com"); // Base domain - best option is to use $_SERVER['SERVER_NAME'] which will avoid javascript cross-domain issues
define ("WEB_ROOT", "http://".WEB_DOMAIN); // Base URL
define ("APP_ROOT", WEB_ROOT."/mantis"); // Web path to application root

// database connection variables
$DB_HOST = "localhost";     // MySQL hostname
$DB_USER = "username";      // MySQL username
$DB_PASS = "password";      // MySQL password
$DB_NAME = "database_name"; // Database name

// database assistance variables
define ("DB_PREFIX", "mantis_"); // (optional) prefix for tables - use this if you are using the database for other uses

// This is required to inform the system that it is properly configured
define ("CONFIGURED", true);
?>