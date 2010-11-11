<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: upgrade/index.php
 ** 
 ** Description: Simple landing page for running upgrades
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

// Connects to the database, and brings in the standard library
include_once(FS_ROOT.'/inc/connect.php');

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
   
    <!-- Link to the Javascript library files -->
    <script type="text/javascript" src="../js/ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../js/ext/ext-all.js"></script>
        
    <script type="text/javascript" src="../js/Mico.Application.js"></script>
    <script type="text/javascript" src="../js/Mico.Utils.js"></script>
    
    <script type="text/javascript" src="js/Mico.Upgrader.js"></script>
    <script type="text/javascript" defer="defer">
    <!--
    var OLD_VERSION = '<?=addslashes(Settings::get_default('MICO_VERSION','unknown'))?>';
    var NEW_VERSION = '<?=addslashes(MICO_VERSION)?>';
    
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
