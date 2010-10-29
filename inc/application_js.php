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
 *******************************************************************************
 ******************************************************************************/

// public only need the 'login' page
$public = array('Mantis.Application.js','Mantis.Login.js');
// standard scipts for users
$authed = array('Mantis.Application.js','Mantis.SystemMenu.js','Mantis.Calls.js',
                'Mantis.Calls.AddCall.js','Mantis.Calls.ViewCalls.js',
                'Mantis.Utils.js','Mantis.Utils.CommonStores.js','Mantis.User.js',
                'Mantis.User.Preferences.js','Mantis.User.Status.js',
                'Mantis.Calls.SearchBar.js');
// standard scipts for managers
$manager = array('Mantis.Application.js','Mantis.SystemMenu.js','Mantis.Calls.js',
                 'Mantis.Calls.AddCall.js','Mantis.Calls.ViewCalls.js',
                 'Mantis.Utils.js','manager/Mantis.Utils.CommonStores.js','Mantis.User.js',
                 'Mantis.User.Preferences.js','Mantis.User.Status.js',
                 'Mantis.Calls.SearchBar.js','manager/Mantis.ManageUsers.js');
// administrators get more
$admin = array('Mantis.Application.js','Mantis.SystemMenu.js','Mantis.Calls.js',
               'Mantis.Calls.AddCall.js','Mantis.Calls.ViewCalls.js',
               'Mantis.Utils.js','admin/Mantis.Utils.CommonStores.js','Mantis.User.js',
               'admin/Mantis.SystemSettings.js','Mantis.User.Preferences.js',
               'Mantis.User.Status.js','Mantis.Calls.SearchBar.js','manager/Mantis.ManageUsers.js');
// and an odd case for password reset
$passreset = array('Mantis.Application.js','Mantis.PasswordSet.js','Mantis.Utils.js');


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
    $js_array[] = 'Mantis.SimpleCron.js';
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