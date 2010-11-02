<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-admin/getSystemSettings.php
 ** 
 ** Description: Gets the system settings that can be changed by an admin user
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

// get the settings
$data = array("success"=>true,
              "DEBUG_MODE"=>Settings::get('DEBUG_MODE'),
              "MAIL_FROM"=>Settings::get('MAIL_FROM'),
              "SESSION_LENGTH"=>Settings::get('SESSION_LENGTH'),
              "SIMPLE_CRON"=>Settings::get('SIMPLE_CRON'));
?>