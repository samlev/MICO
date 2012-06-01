<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: upgrade/versions/0.12.2b.php
 ** 
 ** Description: DB upgrader for version 0.12.2b
 **
 ** Copyright (c) 2012 Samuel Levy
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
 ** - Fixed bug with user preferences for filter fields
 *******************************************************************************
 ******************************************************************************/

// If we're not accessed in the correct way, die
if (defined('CONFIGURED')) {
    // Set the version number
    $VERSION = '0.12.2b';
    
    // fix old view preferences
    // first get all the users
    $query = "SELECT `id` FROM `".DB_PREFIX."users` WHERE 1";
    $res = run_query($query);
    
    while ($row = mysql_fetch_assoc($res)) {
        $u = User::by_id($row['id']);
        
        // first get the 'show calls' value
        $showcalls = $u->get_var_default('showcalls','');
        switch ($showcalls) {
            case 'Calls assigned to me':
                $u->set_var('showcalls','assigned');
                break;
            case 'Calls opened by me':
                $u->set_var('showcalls','opened');
                break;
            case 'All calls':
                $u->set_var('showcalls','all');
                break;
        }
        
        // second get the 'order calls' value
        $ordercalls = $u->get_var_default('ordercalls','');
        switch ($ordercalls) {
            case 'Most recent':
                $u->set_var('ordercalls','recent');
                break;
            case 'Most urgent':
                $u->set_var('ordercalls','urgent');
                break;
        }
        
        // save the user
        $u->commit();
    }
    
    // Do not change this line - it's what tells the system that the upgrade is complete
    Settings::set('MICO_VERSION',$VERSION);
} else {
    die ("No direct access allowed");
}