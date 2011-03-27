<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/Settings.class.php
 ** 
 ** Description: Defines the settings class and exceptions
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

class Settings {
    /** Gets a system setting
     * @param string $key The setting name to get
     * @return mixed The value
     */
    static function get($key) {
        // Include the language file
        global $LANG;
        
        $val = null;
        
        // pull the latest entry from the database
        $query = "SELECT `value`
                  FROM `".DB_PREFIX."settings`
                  WHERE `key`='".mysql_real_escape_string($key)."'
                  ORDER BY `set` DESC
                  LIMIT 1";
        $res = run_query($query);
        
        // check that we got something
        if ($row = mysql_fetch_assoc($res)) {
            $val = unserialize($row['value']);
        } else {
            throw new SettingsNotFoundException($LANG->get_string("Settings/get/SettingsNotFoundException"));
        }
        
        return $val;
    }
    /** Gets a system setting or a default if it doesn't exist
     * @param string $key The setting name to get
     * @param mixed $default The default to use if the setting doesn't exist
     * @return mixed The value
     */
    static function get_default($key,$default) {
        $val = $default;
        
        // pull the latest entry from the database
        $query = "SELECT `value`
                  FROM `".DB_PREFIX."settings`
                  WHERE `key`='".mysql_real_escape_string($key)."'
                  ORDER BY `set` DESC
                  LIMIT 1";
        $res = run_query($query);
        
        // check that we got something
        if ($row = mysql_fetch_assoc($res)) {
            $val = unserialize($row['value']);
        }
        
        return $val;
    }
    
    /** Sets a system setting
     * @param string $key The setting name to set
     * @param mixed $val The setting value
     */
    static function set($key, $val) {
        $date = date('Y-m-d H:i:s');
        
        // Save to the database
        $query = "INSERT INTO `".DB_PREFIX."settings`
                         (`key`,`value`,`set`)
                  VALUES ('".mysql_real_escape_string($key)."',
                          '".mysql_real_escape_string(serialize($val))."',
                          '".mysql_real_escape_string($date)."')";
        run_query($query);
    }
    
    /** Overrides a system setting (no history)
     * @param string $key The setting name to set
     * @param mixed $val The setting value
     */
    static function override($key, $val) {
        $date = date('Y-m-d H:i:s');
        
        // check to see if the setting exists
        $query = "SELECT `id`
                  FROM `".DB_PREFIX."settings`
                  WHERE `key`='".mysql_real_escape_string($key)."'
                  ORDER BY `set` DESC
                  LIMIT 1";
        $res = run_query($query);
        
        // if the setting exists, update it
        if ($row = mysql_fetch_assoc($res)) {
            // Save to the database, overriding the last value
            $query = "UPDATE `".DB_PREFIX."settings`
                      SET `value` = '".mysql_real_escape_string(serialize($val))."',
                           `set` = '".mysql_real_escape_string($date)."'
                      WHERE `key`='".mysql_real_escape_string($key)."'
                      ORDER BY `set` DESC
                      LIMIT 1";
        } else {
            // insert it
            Settings::set($key,$val);
        }
        run_query($query);
    }
    
    /** Gets the history of a system setting
     * @param string $key The setting name to get
     * @param int $limit The number of history entries to get
     * @return array The history
     */
    static function history($key,$limit=null) {
        // Include the language file
        global $LANG;
        
        $history = array();
        $l = abs(intval($limit));
        
        // pull the latest entry from the database
        $query = "SELECT `value`, `set`
                  FROM `".DB_PREFIX."settings`
                  WHERE `key`='".mysql_real_escape_string($key)."'
                  ORDER BY `set` DESC".($l?" LIMIT 1":'');
        $res = run_query($query);
        
        // check that we got something
        if (mysql_num_rows($res)){
            // get all the values
            while ($row = mysql_fetch_assoc($res)) {
                $history[] = array('value'=>unserialize($row['value']),
                                   'date'=>$row['set']);
            }
        } else {
            throw new SettingsNotFoundException($LANG->get_string("Settings/history/SettingsNotFoundException"));
        }
        
        return $history;
    }
}

// settings exceptions
class SettingsException extends Exception {}
class SettingsNotFoundException extends SettingsException {}
?>