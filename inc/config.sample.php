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
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Sphodro is free software: you can redistribute it and/or
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

// Directory paths
// NB: The software assumes that these paths do not contain a trailing slash
define ("FS_ROOT", "/absolute/path/to/application/root"); // Filesystem root
// Web paths
define ("WEB_DOMAIN", "www.example.com"); // Base domain - best option is to use $_SERVER['HTTP_HOST'] which will avoid javascript cross-domain issues
define ("WEB_ROOT", "http://".WEB_DOMAIN); // Base URL
define ("APP_ROOT", WEB_ROOT."/sphodro"); // Web path to application root

// database connection variables
$DB_HOST = "localhost";     // MySQL hostname
$DB_USER = "username";      // MySQL username
$DB_PASS = "password";      // MySQL password
$DB_NAME = "database_name"; // Database name

// database assistance variables
define ("DB_PREFIX", "sphodro_"); // (optional) prefix for tables - use this if you are using the database for other uses