<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: inc/magic_quotes_gpc_off.php
 ** 
 ** Description: This file removes the damage done by magic_quotes_gpc. It is
 **              done manually because it cannot be certain that the installer
 **              will have access to the server config. Turning it off in the
 **              server will still be faster, and won't cause errors here. 
 *******************************************************************************
 ******************************************************************************/

// future compatiability - PHP 6 removed magic_quotes, and as such doesn't
//     have the following function
if(!function_exists('get_magic_quotes_gpc')) {
    function get_magic_quotes_gpc() {
        return 0;
    }
}

// check the setting, and strip out quotes if they're in place.
// shamelessly taken from http://usphp.com/manual/en/security.magicquotes.disabling.php#71817
if (get_magic_quotes_gpc()) {
    function undoMagicQuotes($array, $topLevel=true) {
        $newArray = array();
        foreach($array as $key => $value) {
            if (!$topLevel) {
                $key = stripslashes($key);
            }
            if (is_array($value)) {
                $newArray[$key] = undoMagicQuotes($value, false);
            }
            else {
                $newArray[$key] = stripslashes($value);
            }
        }
        return $newArray;
    }
    $_GET = undoMagicQuotes($_GET);
    $_POST = undoMagicQuotes($_POST);
    $_COOKIE = undoMagicQuotes($_COOKIE);
    $_REQUEST = undoMagicQuotes($_REQUEST);
}
?>