<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: inc/application_js.php
 ** 
 ** Description: Spits out the required javascript for the user. If the system
 **              is in 'debug mode', then it includes the files individually.
 **              If not, then it will minify each file and embed the content
 **              directly into the page.
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

// public only need the 'login' page
$public = array('Sphodro.Application.js','Sphodro.Footer.js','Sphodro.Login.js');
// standard scipts for users
$authed = array('Sphodro.Application.js','Sphodro.Footer.js','Sphodro.SystemMenu.js',
                'Sphodro.Calls.js','Sphodro.Calls.AddCall.js','Sphodro.Calls.ViewCalls.js',
                'Sphodro.Utils.js','Sphodro.Utils.CommonStores.js','Sphodro.User.js',
                'Sphodro.User.Preferences.js','Sphodro.User.Status.js',
                'Sphodro.Calls.SearchBar.js');
// standard scipts for managers
$manager = array('Sphodro.Application.js','Sphodro.Footer.js','Sphodro.SystemMenu.js',
                 'Sphodro.Calls.js','Sphodro.Calls.AddCall.js','Sphodro.Calls.ViewCalls.js',
                 'Sphodro.Utils.js','manager/Sphodro.Utils.CommonStores.js','Sphodro.User.js',
                 'Sphodro.User.Preferences.js','Sphodro.User.Status.js',
                 'Sphodro.Calls.SearchBar.js','manager/Sphodro.ManageUsers.js');
// administrators get more
$admin = array('Sphodro.Application.js','Sphodro.Footer.js','Sphodro.SystemMenu.js',
               'Sphodro.Calls.js','Sphodro.Calls.AddCall.js','Sphodro.Calls.ViewCalls.js',
               'Sphodro.Utils.js','admin/Sphodro.Utils.CommonStores.js','Sphodro.User.js',
               'admin/Sphodro.SystemSettings.js','Sphodro.User.Preferences.js',
               'Sphodro.User.Status.js','Sphodro.Calls.SearchBar.js','manager/Sphodro.ManageUsers.js');
// and an odd case for password reset
$passreset = array('Sphodro.Application.js','Sphodro.Footer.js','Sphodro.PasswordSet.js','Sphodro.Utils.js');


// decide on what javascript files to use
$js_array = $public;

if ($loggedin) {
    if ($user->get_role()=='admin') {
        $js_array = $admin;
    } else if ($user->get_role()=='manager') {
        $js_array = $manager;
    } else {
        $js_array = $authed;
    }
}

// and check if we're on the 'password_reset' page
if (defined('PASSWORD_RESET')) {
    $js_array = $passreset;
}

// add the simple cron (if required)
if (Settings::get_default('simplecron',false)) {
    $js_array[] = 'Sphodro.SimpleCron.js';
}

// and now output
if (Settings::get('DEBUG_MODE')) {
    // output a link to each javascript file
    foreach ($js_array as $js) {
        echo '<script type="text/javascript" src="'.WEB_ROOT.'/js/'.$js.'"></script>'."\n";
    }
} else {
    // pull in the JS min library
    require_once(FS_ROOT.'/lib/jsmin-1-1-1.php');
    
    // output everything as one (minified) lump of code
    echo '<script type="text/javascript" defer="defer">';
    // pull in each javascript file, minify it, and dump it out
    foreach ($js_array as $js) {
        ob_start();
        @readfile(FS_ROOT.'/js/'.$js);
        $js_raw = ob_get_clean();
        echo trim(JSMin::minify($js_raw));
    }
    echo '</script>';
}
?>