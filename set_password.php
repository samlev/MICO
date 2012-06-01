<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: set_password.php
 ** 
 ** Description: Landing page for resetting your password
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
include_once ('inc/config.php');

// Connects to the database, and brings in the standard library
include_once(FS_ROOT.'/inc/connect.php');

define ('PASSWORD_RESET',true);

?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="pragma" content="no-cache" />
    <title>Mico</title>
    <link rel="SHORTCUT ICON" href="favicon.ico" />
    <!-- Link to the CSS files -->
    <link type="text/css" rel="stylesheet" href="<?php echo APP_ROOT?>/js/ext/resources/css/ext-all.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo APP_ROOT?>/js/ext/resources/css/xtheme-gray.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo APP_ROOT?>/skin/static/main.css" />
    
    <!-- set some system variables for the javascript to use -->
    <?php include_once(FS_ROOT.'/inc/system_vars.php'); ?>
    
    <!-- define the confirmation key in a javascript usable manner -->
    <script type="text/javascript">var CONFIRMATION_KEY = '<?php echo $_GET['k']?>';</script>
    
    <!-- Link to the Javascript library files -->
    <script type="text/javascript" src="<?php echo APP_ROOT?>/js/ext/adapter/ext/<?php echo (Settings::get('DEBUG_MODE')?'ext-base-debug-w-comments.js':'ext-base.js')?>"></script>
    <script type="text/javascript" src="<?php echo APP_ROOT?>/js/ext/<?php echo (Settings::get('DEBUG_MODE')?'ext-all-debug-w-comments.js':'ext-all.js')?>"></script>
    <?php
    // pull in the required javascript
    include_once(FS_ROOT.'/inc/application_js.php');
    ?>
  </head>
  <body>
    <div id="pageHeader">
      <img src="<?php echo APP_ROOT?>/skin/static/mico.png" alt="Mico" style="margin:0px; float:right;" />
    </div>
  </body>
</html>
