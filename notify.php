<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: notify.php
 ** 
 ** Description: Simple cron file to send out notifications
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