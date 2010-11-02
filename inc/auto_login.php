<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: inc/auto_login.php
 ** 
 ** Description: Builds the user object and automaticaly tells the javascript to
 **              log in.
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

if (defined('USER_ID') && defined('SESSION')) {
    $user = User::by_id(USER_ID);
?>
<script type="text/javascript" defer="defer">
<!--
    var userid = <?=USER_ID?>;
    var session = '<?=SESSION?>';
    var name = '<?=$user->get_var('name')?>';
    var role = '<?=$user->get_role()?>';
    var vars = <?=json_encode($user->get_vars())?>;
    
    // Keep the user informed (also block their actions)
    Ext.Msg.wait('You are being logged into the system. Please wait.','Logging in',{
        buttons:false, 
        closable:false
    });
    
    setup_user();
    
    /** Sets up the user then shows the main panel */
    function setup_user() {
        // Check if the user object has been defined yet
        if (Sphodro.User !== undefined) {
            // Set up the user object
            Sphodro.User.init (userid, session, role, vars);
            // Show the main area
            page_show();
        } else {
            // try again in 20 milliseconds
            setTimeout('setup_user()', 20);
        }
    }
    
    /** Show the main panel */
    function page_show() {
        // Check if the application panel has been defined yet
        if (Sphodro.Application.panel !== undefined) {
            // show the main panel
            Sphodro.Calls.show ();
            // hide the 'you are being logged in' message
            Ext.Msg.hide();
        } else {
            // try again in 20 milliseconds
            setTimeout('page_show()', 20);
        }
    }
-->
</script>
<? } ?>