<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: index.php
 ** 
 ** Description: Main landing page for the application
 *******************************************************************************
 ******************************************************************************/

// include the configuration file
include_once ('inc/config.php');

// If the system isn't configured, show the 'install' page
if (!defined('CONFIGURED')) {
    ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
   <title>Mantis - Simple Call Centre</title>
   <link rel="SHORTCUT ICON" href="favicon.ico" />
   <!-- Link to the CSS files -->
   <link type="text/css" rel="stylesheet" href="js/ext/resources/css/ext-all.css" />
   <link type="text/css" rel="stylesheet" href="skin/static/main.css" />
  </head>
  <body>
    <div id="pageHeader">
      <img src="skin/static/mantis.png" alt="Mantis" id="mantisLogo" />
    </div>
    <div>
      <h2>Installation Instructions</h2>
      <p>
        You need to <a href="#">install</a>.
      </p>
    </div>
  </body>
</html>
    <?php
    exit();
}

// Connects to the database, and brings in the standard library
include_once(FS_ROOT.'/inc/connect.php');

// check if we are logged in already
$loggedin = false;
// check for the cookie
if (isset($_COOKIE['session'])) {
    // get the session id from the cookie
    $session = $_COOKIE['session'];
    
    // check if the session is valid and not expired
    try {
        $user = User::by_session($session);
        $loggedin = true;
        define('USER_ID', $user->get_id());
        define('SESSION', $user->get_session());
    } catch (UserSessionException $e) {
        // get rid of the cookie
        setcookie('session','',time()-3600);
    }
}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Mantis - Simple Call Centre</title>
    <link rel="SHORTCUT ICON" href="favicon.ico" />
    <!-- Link to the CSS files -->
    <link type="text/css" rel="stylesheet" href="<?=WEB_ROOT?>/js/ext/resources/css/ext-all.css" />
    <link type="text/css" rel="stylesheet" href="<?=WEB_ROOT?>/skin/static/main.css" />
    
    <!-- set some system variables for the javascript to use -->
    <?php include_once(FS_ROOT.'/inc/system_vars.php'); ?>
   
    <!-- Link to the Javascript library files -->
    <script type="text/javascript" src="<?=WEB_ROOT?>/js/ext/adapter/ext/<?=(Settings::get('DEBUG_MODE')?'ext-base-debug-w-comments.js':'ext-base.js')?>"></script>
    <script type="text/javascript" src="<?=WEB_ROOT?>/js/ext/<?=(Settings::get('DEBUG_MODE')?'ext-all-debug-w-comments.js':'ext-all.js')?>"></script>
    <?php
    // pull in the required javascript
    include_once(FS_ROOT.'/inc/application_js.php');
    ?>
  </head>
  <body>
    <div id="pageHeader">
      <img src="<?=WEB_ROOT?>/skin/static/mantis.png" alt="Mantis Simple CRM" id="mantisLogo" />
      <div class="visual-clear"></div>
      <div id="userMenu"></div>
      <div id="systemMenu"></div>
    </div>
    <?php if ($loggedin) { include_once(FS_ROOT.'/inc/auto_login.php'); } ?>
  </body>
</html>
