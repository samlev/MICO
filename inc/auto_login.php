<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: inc/auto_login.php
 ** 
 ** Description: Builds the user object and automaticaly tells the javascript to
 **              log in.
 *******************************************************************************
 ******************************************************************************/

if (defined('USER_ID') && defined('SESSION')) {
    $user = User::by_id(USER_ID);
?>
<script type="text/javascript" defer="defer">
<!--
    var userid = <?=USER_ID?>;
    var session = '<?=SESSION?>';
    var name = '<?=$user->get('name')?>';
    var role = '<?=$user->get_role()?>';
    var vars = <?=json_encode($user->get_vars())?>;
    
    // Keep the user informed (also block their actions)
    Ext.Msg.wait('You are being logged into the system. Please wait.','Logging in',{
        buttons:false, 
        closable:false
    });
    // Set up the user object
    Mantis.User.init (userid, session, role, vars);
    
    // Show the main area
    page_show();
    
    // This function will wait until the 'application' is ready, then log the user in
    function page_show() {
        if (isset(Mantis.Application.panel)) {
            Mantis.Main.show ();
            Ext.Msg.hide();
        } else {
            setTimeout('page_show()', 20);
        }
    }
-->
</script>
<? } ?>