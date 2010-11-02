<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/index.php
 ** 
 ** Description: Installation page
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

// include the configuration file
@include_once ('../inc/config.php');

// If the system isn't configured, show the 'install' page
if (defined('CONFIGURED')) {
    ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Sphodro</title>
    <link rel="SHORTCUT ICON" href="favicon.ico" />
    <!-- Link to the CSS files -->
    <link type="text/css" rel="stylesheet" href="../js/ext/resources/css/ext-all.css" />
    <link type="text/css" rel="stylesheet" href="../skin/static/main.css" />
    <link type="text/css" rel="stylesheet" href="../skin/custom/skin.css" />
    <style>
        html {
            height:100%;
        }
        body {
            background-color: #f0fff0;
        }
    </style>
  </head>
  <body>
    <div id="pageHeader">
      <img src="../skin/static/sphodro.png" alt="Sphodro" id="sphodroLogo" />
    </div>
    <div style="padding:8px;">
      <h2 style="font-size:16pt;margin-bottom:8px;">Installation</h2>
      <p style="margin-bottom:8px;">
        Sphodro is installed. Please delete the 'install' directory and all of
        its contents.
      </p>
      <p style="margin-bottom:8px;">
        <a href="<?=APP_ROOT?>">Click here</a> to go to the login page.
      </p>
    </div>
  </body>
</html>
    <?php
    exit();
}

$config_written = false;
// if 'FS_ROOT' is defined, then the config file has been written
if (defined('FS_ROOT')) {
    // Connects to the database, and brings in the standard library
    include_once(FS_ROOT.'/inc/connect.php');
    $config_written = true;
}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Sphodro</title>
    <link rel="SHORTCUT ICON" href="favicon.ico" />
    <!-- Link to the CSS files -->
    <link type="text/css" rel="stylesheet" href="../js/ext/resources/css/ext-all.css" />
    <link type="text/css" rel="stylesheet" href="../skin/static/main.css" />
    <link type="text/css" rel="stylesheet" href="../skin/custom/skin.css" />
   
    <!-- Link to the Javascript library files -->
    <script type="text/javascript" src="../js/ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../js/ext/ext-all.js"></script>
        
    <script type="text/javascript" src="../js/Sphodro.Application.js"></script>
    <script type="text/javascript" src="../js/Sphodro.Utils.js"></script>
    <!-- pull in the appropriate installer files -->
    <script type="text/javascript" src="js/Sphodro.ConfigSetup.js"></script>
    <script type="text/javascript" src="js/Sphodro.SystemSetup.js"></script>
    <script type="text/javascript" defer="defer">
    <!--
    <?php
    if ($config_written) {
        // display the 'system setup' page
        ?>
        setTimeout("Sphodro.SystemSetup.show()",200);
        <?php
    } else {
        // get the default values
        $FS_ROOT = realpath('..'); // the fielsystem root
        $WEB_DOMAIN = $_SERVER['HTTP_HOST']; // the web domain
        $WEB_ROOT = ($_SERVER['SERVER_PORT']==443?'https://':'http://').$WEB_DOMAIN; // the
        $APP_ROOT = $WEB_ROOT.substr($_SERVER['REQUEST_URI'],0,strrpos($_SERVER['REQUEST_URI'],'/install'));
        
        // add them into the javascript
        ?>
        var FS_ROOT = '<?=addslashes($FS_ROOT)?>';
        var WEB_DOMAIN = '<?=addslashes($WEB_DOMAIN)?>';
        var WEB_ROOT = '<?=addslashes($WEB_ROOT)?>';
        var APP_ROOT = '<?=addslashes($APP_ROOT)?>';
        
        setTimeout("Sphodro.ConfigSetup.show();",200);
        <?php
    }?>
    -->
    </script>
  </head>
  <body>
    <div id="pageHeader">
      <img src="../skin/static/sphodro.png" alt="Sphodro" id="sphodroLogo" />
    </div>
  </body>
</html>
