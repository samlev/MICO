<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: upgrade/index.php
 ** 
 ** Description: Simple landing page for running upgrades
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

// include the configuration file
@include_once ('../inc/config.php');

// Connects to the database, and brings in the standard library
include_once(FS_ROOT.'/inc/connect.php');

?> 
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
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
    var LANGUAGE = '<?php echo Settings::get_default('LANGUAGE','EN') ?>';
    -->
    </script>
   
    <!-- Link to the Javascript library files -->
    <script type="text/javascript" src="../js/ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../js/ext/ext-all.js"></script>
    
    <script type="text/javascript" src="../js/ext/src/locale/ext-lang-<?php echo strtolower(Settings::get_default('LANGUAGE','EN')); ?>.js"></script>
    <script type="text/javascript" src="../js/Mico.Application.js"></script>
    <script type="text/javascript" src="../js/lang/Mico.Lang.<?php echo Settings::get_default('LANGUAGE','EN'); ?>.js"></script>
    <script type="text/javascript" src="../js/Mico.Utils.js"></script>
    
    <script type="text/javascript" src="js/Mico.Upgrader.js"></script>
    <script type="text/javascript" defer="defer">
    <!--
    var OLD_VERSION = '<?php echo addslashes(Settings::get_default('MICO_VERSION','unknown'))?>';
    var NEW_VERSION = '<?php echo addslashes(MICO_VERSION)?>';
    
    setTimeout("Mico.Upgrader.show();",200);
    -->
    </script>
  </head>
  <body>
    <div id="pageHeader">
      <img src="../skin/static/mico.png" alt="Mico" id="micoLogo" />
    </div>
  </body>
</html>
