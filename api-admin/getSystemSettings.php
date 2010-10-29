<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-admin/getSystemSettings.php
 ** 
 ** Description: Gets the system settings that can be changed by an admin user
 *******************************************************************************
 ******************************************************************************/

// get the settings
$data = array("success"=>true,
              "DEBUG_MODE"=>Settings::get('DEBUG_MODE'),
              "MAIL_FROM"=>Settings::get('MAIL_FROM'),
              "SESSION_LENGTH"=>Settings::get('SESSION_LENGTH'),
              "SIMPLE_CRON"=>Settings::get('SIMPLE_CRON'));
?>