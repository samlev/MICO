<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: inc/system_vars.php
 ** 
 ** Description: Simple file for passing system variables through to the
 **              javascript layer
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
?>
<script type="text/javascript">
var WEB_DOMAIN='<?php echo WEB_DOMAIN?>';
var WEB_ROOT='<?php echo WEB_ROOT?>';
var APP_ROOT='<?php echo APP_ROOT?>';
var MICO_VERSION='<?php echo Settings::get_default('MICO_VERSION','unknown')?>';
</script>