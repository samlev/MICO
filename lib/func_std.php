<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/func_std.php
 ** 
 ** Description: Defines some basic standard functions
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

/** Runs a MySQL query
 * @param $query The query to run
 * @param $report_errors Allow error reporting
 * @param $die_on_error Stop script if an error occurs
 * @returns MySQL result set
 */
function run_query($query, $report_errors=true, $die_on_error=true) {
    $result = mysql_query($query);
    
    if(!$result) {
        $err_str = "\n<br />MySQL Error:<br />\n";
        $err_str .= mysql_error();
        $err_str .= "\n<br />---<br/>\n";
        $err_str .= "Original Query:<br />\n<pre>\n";
        $err_str .= $query;
        $err_str .= "\n</pre>\n";
        
        // log the error
        error_log($err_str);
        
        // report errors?
        if ($report_errors) {
            // cease operation too?
            if ($die_on_error) {
                // die reporting the error
                die($err_str);
            } else {
                // just report the error
                echo($err_str);
            }
        } else if ($die_on_error) {
            // Just cease operation. This is kinda nasty, but I suppose SOMEONE might want it
            die();
        }
    }
    
    return $result;
}

/** Creates a string of random characters at a given length, useful for password generation, etc.
 * @param int $len The length of the string to produce
 * @param mixed $charset Either the number of a pre-defined character 
 *                 set, or a string containing the preferred 
 *                 character set
 *
 *                 Predefined charactersets are as follows:
 *                 0: a-zA-Z0-9~!@#$%^&*_-+=;\/?><,.
 *                 1: a-zA-Z0-9
 *                 2: a-zA-Z
 *                 3: a-z
 *                 4: A-Z
 *                 5: 0-9
 *                 6: ~!@#$%^&*_-+=;\/?><,.
 */
function random_string($len, $charset=1) {
    $ch = array();
    // if passed a string more than one character long, use it as the charset. Otherwise use a predefined charset
    if (is_string($charset) && strlen($charset) > 1) {
        $ch = str_split($charset);
    } else {
        if (intval($charset) < 0 || intval($charset) > 6) {
            $charset = 1;
        }
        // define the charsets
        $charsets = array(
            str_split('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*_-+=;\/?><,.'),
            str_split('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
            str_split('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            str_split('abcdefghijklmnopqrstuvwxyz'),
            str_split('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            str_split('0123456789'),
            str_split('~!@#$%^&*_-+=;\/?><,.')
        );
        // now pick the charset
        $ch = $charsets[$charset];
    }
    
    $chlen = count($ch);
    
    $str = "";
    for ($i = 0; $i < $len; $i ++) {
        $str .= $ch[rand(0, $chlen-1)];
    }
    
    return $str;
}

/** Checks a variable to see if it should be considered a boolean true or false.
 *     Also takes into account some text-based representations of true of false,
 *     such as 'false','N','yes','on','off', etc. This is especially useful for
 *     AJAX style applications where javascript doesn't always pass a correctly
 *     typed value
 * @param mixed $in The variable to check
 * @param bool $strict If set to false, consider everything that is not false to
 *                     be true.
 * @return bool The boolean equivalent or null (if strict, and no exact equivalent)
 */
function boolval($in, $strict=false) {
    $out = null;
    $in = (is_string($in)?strtolower($in):$in);
    // if not strict, we only have to check if something is false
    if (in_array($in,array('false','no', 'n','0','off',false,0), true) || !$in) {
        $out = false;
    } else if ($strict) {
        // if strict, check the equivalent true values
        if (in_array($in,array('true','yes','y','1','on',true,1), true)) {
            $out = true;
        }
    } else {
        // not strict? let the regular php bool check figure it out (will
        //     largely default to true)
        $out = ($in?true:false);
    }
    return $out;
}

/** Cleans any HTML and potential XSS out of a string
 * @param string $in The string to scrub
 * @return string The cleaned string
 */
function html_scrub($in) {
    // quick HTML removal
    $out = strip_tags($in);
    // more indepth XSS removal
    $purifier = new HTMLPurifier();
    $out = $purifier->purify( $out );
    return $out;
}

/** Checks to see if the requested API function is an actual API function so as
 * to protect against remote file inclusion
 * @see http://en.wikipedia.org/wiki/Remote_File_Inclusion
 * @param string $section The API section to search
 * @param string $name The API function to check for
 * @return bool True if it exists, and is valid, false if not.
 */
function api_exists($section,$name) {
    $exists = false;
    
    // check that the API requested contains only valid alpha-numeric characters
    if (preg_match('/^[a-zA-Z0-9]+$/',$name)) {
        if (file_exists($section.'/'.$name.'.php')) {
            $exists = true;
        }
    }
    
    return $exists;
}

// JSON helper functions (pre php 5.2 compatibility)
if (!function_exists('json_encode')) {
    // pull in the json library
    require_once(FS_ROOT.'/inc/JSON.php');
    
    function json_encode($data) {
        $JSON = new Services_JSON();
        return $JSON->encode($data);
    }
    
    if (!function_exists('json_decode')) {
        function json_decode($data) {
            $JSON = new Services_JSON();
            return $JSON->decode($data);
        }
    }
}
?>