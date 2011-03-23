<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/Lang.class.php
 ** 
 ** Description: Defines the basic language class
 **
 ** Copyright (c) 2011 Samuel Levy
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

class Lang {
    protected $strings;
    protected $langs;
    protected $current_lang;
    
    // Constructors
    function __construct($lang='EN') {
        $this->langs = array();
        $this->set_language($lang);
    }
    
    // accessors
    function get_language() {
        return $this->current_lang;
    }
    
    /** Gets a string from the current language
     * @param string $id The string key
     * @param array $replace An array of strings to replace in the string
     * @return string The languageified string
     */
    function get_string($id, $replace=array()) {
        $string = "";
        
        // Check if the key exists in the 'strings' array
        if (isset($this->strings[$id])) {
            $string = $this->strings[$id];
            
            // check if there are any replacements to be made
            if (is_array($replace)) {
                // Make each replacement
                foreach ($replace as $k=>$v) {
                    $string = str_replace($k, $v, $string);
                }
            }
        }
        
        // Return the final product
        return $string;
    }
    
    // mutators
    /** Sets the current language, if available
     * @param string $lang The language to use
     * @return bool Whether the language selection was successful or not
     */
    function set_language($lang) {
        $language_set = false;
        
        // Check if it is a valid language
        if (preg_match('/^[A-Z]{2}$/', $lang)) {
            // check that we don't already have the language
            if (!isset($this->langs[$lang])) {
                // check that a language file exists
                if (file_exists(FS_ROOT.'/lib/lang/'.$lang.'.php')) {
                    // include the language file
                    include_once (FS_ROOT.'/lib/lang/'.$lang.'.php');
                    // save the strings array
                    $this->langs[$lang] = $language_strings;
                }
            }
            
            // Now set the internal language for this class
            if (isset($this->langs[$lang])) {
                // Set the correct strings
                $this->strings = $this->langs[$lang];
                // record which language we are using
                $this->current_lang = $lang;
                // and flag the language as set
                $language_set = true;
            }
        }
        
        return $language_set;
    }
}
?>