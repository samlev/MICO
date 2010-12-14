<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: upgrade/api/upgrade.php
 ** 
 ** Description: Performs all DB upgrades
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

@include_once('../../inc/config.php');

include_once(FS_ROOT.'/inc/connect.php');

// This is a list of versions in order
$versions = array('0.11.1b',
                  '0.12.1b',
                  '0.12.2b');

// get the old and new versions
$old = Settings::get_default('MICO_VERSION','unknown');
$new = MICO_VERSION;

$verfound = false;

// perform the upgrades
foreach ($versions as $v) {
    // Perform only upgrades between the 'old' version, and the 'new' version
    if ($verfound || $v == $new) {
        // include the upgrade file
        @include_once(FS_ROOT.'/upgrade/versions/'.$v.'.php');
        
        // we've hit the new version, stop processing (although it should be the last item)
        if ($v == $new) {
            break;
        }
    } else {
        // ignore previous upgrades
        if ($v == $old) {
            $verfound = true;
        }
    }
}

// return the response
header("Content-Type: text/javascript");
?>
{success:'true',info:'MICO successfully upgraded'}