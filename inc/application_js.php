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
$authed = array('Mantis.Application.js');
// administrators get more
$admin = array('Mantis.Application.js');
// and an odd case for password reset
$passreset = array('Mantis.Application.js','Mantis.PasswordReset.js');


// decide on what javascript files to use
$js_array = $public;

if ($loggedin) {
    if ($user->get_role()=='admin') {
        $js_array = $admin;
    } else {
        $js_array = $authed;
    }
}

// and check if we're on the 'password_reset' page
if (defined('PASSWORD_RESET')) {
    $js_array = $passreset;
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