<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: notify.php
 ** 
 ** Description: Simple cron file to send out notifications
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
// include the configuration file
include_once ('inc/config.php');
// Connect to the database, and brings in the standard library
include_once(FS_ROOT.'/inc/connect.php');

// include the notifier class
include_once(FS_ROOT.'/lib/Notifier.class.php');

// if 'simplecron' is set, only run every 5 minutes
$runcron = (Settings::get_default('SIMPLE_CRON',false)&&(Settings::get_default('LAST_CRON',0) > strtotime('-5 minutes'))?false:true);

if ($runcron) {
    // run the notifier
    Notifier::run();
    // mark the last time
    Settings::override('LAST_CRON',time());
}
?>