<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: upgrade/versions/0.12.1b.php
 ** 
 ** Description: DB upgrader for version 0.12.1b
 **
 ** Copyright (c) 2010 Samuel Levy
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

/*******************************************************************************
 *******************************************************************************
 ** CHANGELOG
 **
 ** - Added 'upgrader' logic and files
 ** - Changed order of options when updating a call - 'close' is now last, no
 **     longer default
 ** - Reduced size of 'about' dialog
 ** - When a call is updated or assigned to you and you are viewing a call, the
 **     call list now reloads, but keeps any data you are entering
 ** - 'Set status' dialog no longer returns you to 'view calls' when closed
 ** - Multiple minor visual updates to better fit with the 'gray' theme
 ** - Minor changes to user preferences - date/time preferences no longer based
 **     on the actual time
 ** - Notifications now show the actor's name
 *******************************************************************************
 ******************************************************************************/

// If we're not accessed in the correct way, die
if (defined('CONFIGURED')) {
    // Set the version number
    $VERSION = '0.12.1b';
    
    // Do not change this line - it's what tells the system that the upgrade is complete
    Settings::set('MICO_VERSION',$VERSION);
} else {
    die ("No direct access allowed");
}