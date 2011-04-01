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

// include the configuration file
@include_once ('../inc/config.php');

$config_written = false;
// if 'FS_ROOT' is defined, then the config file has been written
if (defined('FS_ROOT')) {
    // Connects to the database, and brings in the standard library
    include_once(FS_ROOT.'/inc/connect.php');
    $config_written = true;
}

// Check if a language has been chosen
if (isset($_COOKIE['LANGUAGE'])) {
    define('LANGUAGE',$_COOKIE['LANGUAGE']);
}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Mico</title>
    <link rel="SHORTCUT ICON" href="favicon.ico" />
    <!-- Link to the CSS files -->
    <link type="text/css" rel="stylesheet" href="../js/ext/resources/css/ext-all.css" />
    <link type="text/css" rel="stylesheet" href="../js/ext/resources/css/xtheme-gray.css" />
    <link type="text/css" rel="stylesheet" href="../skin/static/main.css" />
    <link type="text/css" rel="stylesheet" href="../skin/custom/skin.css" />
    
    <!-- Set up some basic variables -->
    <script type="text/javascript">
    <!--
    var FS_ROOT = '<?php echo (defined('FS_ROOT')?addslashes(FS_ROOT):'') ?>';
    var WEB_DOMAIN = '<?php echo (defined('WEB_DOMAIN')?addslashes(WEB_DOMAIN):'') ?>';
    var WEB_ROOT = '<?php echo (defined('WEB_ROOT')?addslashes(WEB_ROOT):'') ?>';
    var APP_ROOT = '<?php echo (defined('APP_ROOT')?addslashes(APP_ROOT):'') ?>';
    var LANGUAGE = '<?php echo (defined('LANGUAGE')?addslashes(LANGUAGE):'') ?>';
    -->
    </script>
    
    <!-- Link to the Javascript library files -->
    <script type="text/javascript" src="../js/ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../js/ext/ext-all.js"></script>
    
    <script type="text/javascript" src="../js/ext/src/locale/ext-lang-<?php echo strtolower(defined('LANGUAGE')?LANGUAGE:'EN'); ?>.js"></script>
    <script type="text/javascript" src="../js/Mico.Application.js"></script>
    <script type="text/javascript" src="../js/lang/Mico.Lang.<?php echo (defined('LANGUAGE')?LANGUAGE:'EN') ?>.js"></script>
    <script type="text/javascript" src="../js/Mico.Utils.js"></script>
    <script type="text/javascript" src="../js/admin/Mico.Utils.CommonStores.js"></script>
    <!-- pull in the appropriate installer files -->
    <script type="text/javascript" src="js/Mico.ConfigSetup.js"></script>
    <script type="text/javascript" src="js/Mico.SystemSetup.js"></script>
    <script type="text/javascript" src="js/Mico.Installed.js"></script>
    <script type="text/javascript" src="js/Mico.LanguageSelect.js"></script>
    <script type="text/javascript" defer="defer">
    <!--
    <?php
    if (defined('CONFIGURED')) {
        // the system is configured and installed. Show the 'installed' page
        ?>
        setTimeout("Mico.Installed.show()",200);
        <?php
    } else if (!defined('LANGUAGE')) {
        // The user hasn't selected a language yet. Show them the 'language select' page
        ?>
        setTimeout("Mico.LanguageSelect.show()",200);
        <?php
    } else if ($config_written) {
        // display the 'system setup' page - pass through required variables
        ?>
        setTimeout("Mico.SystemSetup.show()",200);
        <?php
    } else {
        // get the default values
        $FS_ROOT = realpath('..'); // the fielsystem root
        $WEB_DOMAIN = $_SERVER['HTTP_HOST']; // the web domain
        $WEB_ROOT = ($_SERVER['SERVER_PORT']==443?'https://':'http://').$WEB_DOMAIN; // the
        $APP_ROOT = $WEB_ROOT.substr($_SERVER['REQUEST_URI'],0,strrpos($_SERVER['REQUEST_URI'],'/install'));
        
        // add them into the javascript
        ?>
        FS_ROOT = '<?php echo addslashes($FS_ROOT)?>';
        WEB_DOMAIN = '<?php echo addslashes($WEB_DOMAIN)?>';
        WEB_ROOT = '<?php echo addslashes($WEB_ROOT)?>';
        APP_ROOT = '<?php echo addslashes($APP_ROOT)?>';
        
        setTimeout("Mico.ConfigSetup.show();",200);
        <?php
    }?>
    -->
    </script>
  </head>
  <body>
    <div id="pageHeader">
      <img src="../skin/static/mico.png" alt="Mico" id="micoLogo" />
    </div>
  </body>
</html>
