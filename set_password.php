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

// Connects to the database, and brings in the standard library
include_once(FS_ROOT.'/inc/connect.php');

define ('PASSWORD_RESET',true);

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Mantis - Simple CRM</title>
    <link rel="SHORTCUT ICON" href="favicon.ico" />
    <!-- Link to the CSS files -->
    <link type="text/css" rel="stylesheet" href="<?=WEB_ROOT?>/js/ext/resources/css/ext-all.css" />
    <link type="text/css" rel="stylesheet" href="<?=WEB_ROOT?>/skin/static/main.css" />
    
    <!-- define the confirmation key in a javascript usable manner -->
    <script type="text/javascript">var CONFIRMATION_KEY = '<?=$_GET['k']?>';</script>
    
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
      <img src="<?=WEB_ROOT?>/skin/static/mantis.png" alt="Mantis Simple CRM" style="margin:0px; float:right;" />
    </div>
  </body>
</html>
