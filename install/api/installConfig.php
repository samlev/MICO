<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/api/installConfig.php
 ** 
 ** Description: Writes the configureation file, and builds the database
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mantis Simple Call Centre is free software: you can redistribute it and/or
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
if (intval($_POST['autopath'])) {
    $autopath = true;
    $FS_ROOT = realpath('../..');
    $WEB_DOMAIN = '$_SERVER["HTTP_HOST"]';
    $WEB_ROOT = '($_SERVER["SERVER_PORT"]==443?"https://":"http://").WEB_DOMAIN';
    $APP_ROOT = 'WEB_ROOT."'.substr($_SERVER["REQUEST_URI"],0,strrpos($_SERVER['REQUEST_URI'],'/install/api')).'"';
} else {
    $autopath = false;
    $FS_ROOT = trim($_POST['FS_ROOT']);
    $WEB_DOMAIN = '"'.trim($_POST['WEB_DOMAIN']).'"';
    $WEB_ROOT = '"'.trim($_POST['WEB_ROOT']).'"';
    $APP_ROOT = '"'.trim($_POST['APP_ROOT']).'"';
}

// get the database fields
$host = trim($_POST['host']);
$user = trim($_POST['user']);
$pass = trim($_POST['pass']);
$name = trim($_POST['name']);
$prefix = trim($_POST['prefix']);

$success = true;

// Attempt to write the config file
$conf_data = <<<EOF
<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: inc/config.php
 ** 
 ** Description: Configuration file generated by the install process
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mantis Simple Call Centre is free software: you can redistribute it and/or
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
define ("FS_ROOT", "$FS_ROOT"); // Filesystem root
// Web paths
define ("WEB_DOMAIN", $WEB_DOMAIN); // Base domain - best option is to use \$_SERVER['SERVER_NAME'] which will avoid javascript cross-domain issues
define ("WEB_ROOT", $WEB_ROOT); // Base URL
define ("APP_ROOT", $APP_ROOT); // Web path to application root

// database connection variables
\$DB_HOST = "$host";     // MySQL hostname
\$DB_USER = "$user";      // MySQL username
\$DB_PASS = "$pass";      // MySQL password
\$DB_NAME = "$name"; // Database name

// database assistance variables
define ("DB_PREFIX", "$prefix"); // (optional) prefix for tables - use this if you are using the database for other uses

EOF;

// if the config file does not exist, write it
if (!file_exists($FS_ROOT.'/inc/config.php')) {
    // if we can't write the config file, throw an error
    if (!file_put_contents($FS_ROOT.'/inc/config.php',$conf_data)) {
        $success = false;
        $message = "Could not write 'inc/config.php'. Please check that the server has write permissions for this folder.";
    }
}

// connect to the database
if (mysql_connect($host,$user,$pass)) {
    // attempt to select the database
    if (mysql_select_db($name)) {
        // now build the tables
        $tables = array();
        
        // calls table
        $tables[] = <<<EOQ
CREATE TABLE IF NOT EXISTS `{$prefix}calls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `caller_name` varchar(255) NOT NULL,
  `caller_soundex` char(4) NOT NULL,
  `caller_metaphone` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_soundex` char(4) NOT NULL,
  `company_metaphone` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `contact` text NOT NULL,
  `priority` enum('critical','urgent','moderate','minor','negligible') NOT NULL,
  `status` enum('new','closed') NOT NULL,
  `action` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `caller_search_optimizer` (`id`,`caller_name`,`caller_soundex`,`caller_metaphone`,`company_name`),
  KEY `company_search_optimizer` (`id`,`company_name`,`company_soundex`,`company_metaphone`,`caller_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;
EOQ;
        
        // call_comments table
        $tables[] = <<<EOQ
CREATE TABLE IF NOT EXISTS `{$prefix}call_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `call_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  `action` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;
EOQ;
        
        // password_reset_requests table
        $tables[] = <<<EOQ
CREATE TABLE IF NOT EXISTS `{$prefix}password_reset_requests` (
  `key` varchar(15) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email_address` varchar(1052) NOT NULL,
  `expiry` datetime NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
EOQ;
        
        // sessions table
        $tables[] = <<<EOQ
CREATE TABLE IF NOT EXISTS `{$prefix}sessions` (
  `key` char(32) NOT NULL,
  `user_id` int(11) NOT NULL,
  `active_from` datetime NOT NULL,
  `last_action` datetime NOT NULL,
  PRIMARY KEY (`key`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
EOQ;
        
        // settings table
        $tables[] = <<<EOQ
CREATE TABLE IF NOT EXISTS `{$prefix}settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(32) NOT NULL,
  `value` text NOT NULL,
  `set` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `key` (`key`,`set`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;
EOQ;
        
        // users table
        $tables[] = <<<EOQ
CREATE TABLE IF NOT EXISTS `{$prefix}users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` char(32) NOT NULL,
  `role` enum('admin','manager','user','disabled') NOT NULL DEFAULT 'user',
  `variables` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;
EOQ;
        
        // user_calls table
        $tables[] = <<<EOQ
CREATE TABLE IF NOT EXISTS `{$prefix}user_calls` (
  `user_id` int(11) NOT NULL,
  `call_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`call_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
EOQ;
        
        // user_notifications table
        $tables[] = <<<EOQ
CREATE TABLE IF NOT EXISTS `{$prefix}user_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `call_id` int(11) NOT NULL,
  `type` enum('assigned','updated') NOT NULL,
  `notify_after` datetime NOT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `notification_sent` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`type`,`notify_after`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1;
EOQ;
        
        // run the queries
        foreach ($tables as $t) {
            if (!mysql_query($t)) {
                $success = false;
                $message = 'Error creating tables: ' . mysql_error();
            }
        }
    } else {
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
{success:<?=($success?'true':'false')?>,info:<?=($success?"'Configuration file created, and database installed.'":"'".addslashes($message)."'")?>}