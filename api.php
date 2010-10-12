<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api.php
 ** 
 ** Description: Calls API functions
 *******************************************************************************
 ******************************************************************************/
// include the configuration file
include_once ('inc/config.php');
// Connect to the database, and brings in the standard library
include_once(FS_ROOT.'/inc/connect.php');

$data = false;

// Set the starting values
$error = false;
$error_message = '';

$user = false;

// check if the user is logged in or not
if (isset($_POST['session'])) {
    try {
        $user = User::by_session($_POST['session']);
    } catch (UserSessionException $e) {
        // error while authenticating off the session
        $error = true;
        $error_message = $e->getMessage();
        $user = false;
    }
}

// If there's no errors, get the right file
if (!$error) {
    // check if we have a logged in user
    if ($user) {
        
        // Check that the requested file exists
        if ($user->get_role()=='admin' && file_exists ("api-admin/".$_GET ["f"].".php")) {
            // admin apis can override normal and manager apis, but only users with admin access can hit them
            require_once ("api-admin/".$_GET ["f"].".php");
        } else if (($user->get_role()!='admin' || $user->get_role()!='manager') && file_exists ("api-manager/".$_GET ["f"].".php")) {
            // manager apis can override normal apis, but only users with admin or manager access can hit them
            require_once ("api-manager/".$_GET ["f"].".php");
        } else if (file_exists ("api/".$_GET ["f"].".php")) {
            // regular API
            require_once ("api/".$_GET ["f"].".php");
        } else {
            $error = true;
            $error_message = "Unknown function requested";
        }
    } else {
        // we can only check the public API
        if (file_exists ("api-public/".$_GET ["f"].".php")) {
            // Include the remote API file for processing
            require_once ("api-public/".$_GET ["f"].".php");
        } else {
            $error = true;
            $error_message = "Unknown function requested";
        }
    }
}

// check if the API returned a '$data' object
if (!$error && $data === false) {
    $error = true;
    $error_message = "API Error";
}

// Were there any errors?
if ($error) {
    $data = array ("success" => false, "info" => $error_message);
} // if ()

// Return the data value
header ("Content-Type: text/javascript");
echo json_encode ($data);