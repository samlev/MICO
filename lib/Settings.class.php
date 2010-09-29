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
            throw new SettingsNotFoundException("Cannot find setting");
        }
        
        return $val;
    }
    
    /** Sets a system setting
     * @param string $key The setting name to get
     * @param mixed $val The setting value
     */
    static function set($key, $val) {
        // Save to the database
        $query = "INSERT INTO `".DB_PREFIX."settings`
                         (`key`,`value`,`set`)
                  VALUES ('".mysql_real_escape_string($key)."',
                          '".mysql_real_escape_string(serialize($val))."',
                          NOW())";
        run_query($query);
    }
    
    /** Gets the history of a system setting
     * @param string $key The setting name to get
     * @param int $limit The number of history entries to get
     * @return array The history
     */
    static function history($key,$limit=null) {
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
            throw new SettingsNotFoundException("Cannot find setting");
        }
        
        return $history;
    }
}

// settings exceptions
class SettingsException extends Exception {}
class SettingsNotFoundException extends SettingsException {}
?>