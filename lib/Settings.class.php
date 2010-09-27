<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/Settings.class.php
 ** 
 ** Description: Defines the settings class and exceptions
 *******************************************************************************
 ******************************************************************************/

class Settings {
    /** Gets a system setting
     * @param string $key The setting name to get
     * @return mixed The value
     */
    static function get($key) {
        $query = "SELECT `value`
                  FROM `".DB_PREFIX."settings`
                  WHERE `key`='".mysql_real_escape_string($key)."'
                  ORDER BY `set` DESC
                  LIMIT 1";
    }
}
?>