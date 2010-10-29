<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: inc/system_vars.php
 ** 
 ** Description: Simple file for passing system variables through to the
 **              javascript layer
 *******************************************************************************
 ******************************************************************************/
?>
<script type="text/javascript">
var WEB_DOMAIN='<?=WEB_DOMAIN?>';
var WEB_ROOT='<?=WEB_ROOT?>';
var APP_ROOT='<?=APP_ROOT?>';
var MANTIS_VERSION='<?=Settings::get_default('MANTIS_VERSION','unknown')?>';
</script>