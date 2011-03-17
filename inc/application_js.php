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

// If the user is logged in, use their language settings, if not, just use the system's settings.
if ($loggedin) {
    // Get the user's language preference, or the system's language preference, or default to English
    $lang = "lang/Mico.Lang.".($user->get_var_default('lang',Settings::get_default('LANGUAGE','EN'))).".js";
} else {
    // Get the system's language preference, or default to English
    $lang = "lang/Mico.Lang.".Settings::get_default('LANGUAGE','EN').".js";
}

// public only need the 'login' page
$public = array('Mico.Application.js',$lang,'Mico.Footer.js','Mico.Login.js');
// standard scipts for users
$authed = array('Mico.Application.js',$lang,'Mico.Footer.js','Mico.SystemMenu.js',
                'Mico.Calls.js','Mico.Calls.AddCall.js','Mico.Calls.ViewCalls.js',
                'Mico.Utils.js','Mico.Utils.CommonStores.js','Mico.User.js',
                'Mico.User.Preferences.js','Mico.User.Status.js',
                'Mico.Calls.SearchBar.js');
// standard scipts for managers
$manager = array('Mico.Application.js',$lang,'Mico.Footer.js','Mico.SystemMenu.js',
                 'Mico.Calls.js','Mico.Calls.AddCall.js','Mico.Calls.ViewCalls.js',
                 'Mico.Utils.js','manager/Mico.Utils.CommonStores.js','Mico.User.js',
                 'Mico.User.Preferences.js','Mico.User.Status.js',
                 'Mico.Calls.SearchBar.js','manager/Mico.ManageUsers.js');
// administrators get more
$admin = array('Mico.Application.js',$lang,'Mico.Footer.js','Mico.SystemMenu.js',
               'Mico.Calls.js','Mico.Calls.AddCall.js','Mico.Calls.ViewCalls.js',
               'Mico.Utils.js','admin/Mico.Utils.CommonStores.js','Mico.User.js',
               'admin/Mico.SystemSettings.js','Mico.User.Preferences.js',
               'Mico.User.Status.js','Mico.Calls.SearchBar.js','manager/Mico.ManageUsers.js');
// and an odd case for password reset
$passreset = array('Mico.Application.js',$lang,'Mico.Footer.js','Mico.PasswordSet.js','Mico.Utils.js');


// decide which set of javascript files to use
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
    $js_array[] = 'Mico.SimpleCron.js';
}

// and now output
if (Settings::get('DEBUG_MODE')) {
    // output a link to each javascript file
    foreach ($js_array as $js) {
        echo '<script type="text/javascript" src="'.APP_ROOT.'/js/'.$js.'"></script>'."\n";
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