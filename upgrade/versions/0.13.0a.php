<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: upgrade/versions/0.13.0a.php
 ** 
 ** Description: DB upgrader for version 0.13.0a
 **
 ** Copyright (c) 2011 Samuel Levy
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
 ** - Added basic localisation functionality
 ** - Added English and Spanish language files
 *******************************************************************************
 ******************************************************************************/

// If we're not accessed in the correct way, die
if (defined('CONFIGURED')) {
    // Set the default language as english
    Settings::set('LANGUAGE','EN');
    
    // Set the version number
    $VERSION = '0.13.0a';
    
    // Do not change this line - it's what tells the system that the upgrade is complete
    Settings::set('MICO_VERSION',$VERSION);
} else {
    die ("No direct access allowed");
}
?>