<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/api/saveSettingsAndUser.php
 ** 
 ** Description: Adds the first user, and sets some basic settings
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mantis Simple Call Centre is free software: you can redistribute it and/or
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

include_once('../../inc/config.php');

// check that the system isn't arelady configured
if (!defined('CONFIGURED')) {
    if (defined('FS_ROOT')) {
        // at last, some civilization
        include_once(FS_ROOT.'/connect.php');
        
        // get the values
        $DEBUG_MODE = boolval($_POST['DEBUG_MODE'],true);
        $MAIL_FROM = trim(html_scrub($_POST['MAIL_FROM']));
        $SESSION_LENGTH = trim(html_scrub($_POST['SESSION_LENGTH']));
        $SIMPLE_CRON = boolval($_POST['SIMPLE_CRON'],true);
        
        include_once('version.php');
        
        $success = true;
        
        // set what we can
        if ($DEBUG_MODE !== null) {
            // if the setting is different, save it
            if (Settings::get_default('DEBUG_MODE',null)!=$DEBUG_MODE) {
                Settings::set('DEBUG_MODE',$DEBUG_MODE);
            }
        } else {
            // if we have an error already, make multiple lines
            if ($success) {
                $message = "";
            } else {
                $message .= "<br />";
            }
            // mark the error
            $success = false;
            $message .= "Debug mode must be either true or false.";
        }
        
        if (strlen($MAIL_FROM)) {
            // if the setting is different, save it
            if (Settings::get_default('MAIL_FROM',null)!=$MAIL_FROM) {
                Settings::set('MAIL_FROM',$MAIL_FROM);
            }
        } else {
            // if we have an error already, make multiple lines
            if ($success) {
                $message = "";
            } else {
                $message .= "<br />";
            }
            // mark the error
            $success = false;
            $message .= "From email cannot be blank.";
        }
        
        // check that 'session length' is a valid time period
        if (preg_match('/^[1-9][0-9]{0,2} (minute|hour|day|week|month|year)s?$/i',$SESSION_LENGTH)) {
            // if the setting is different, save it
            if (Settings::get_default('SESSION_LENGTH',null)!=$SESSION_LENGTH) {
                Settings::set('SESSION_LENGTH',$SESSION_LENGTH);
            }
        } else {
            // if we have an error already, make multiple lines
            if ($success) {
                $message = "";
            } else {
                $message .= "<br />";
            }
            // mark the error
            $success = false;
            $message .= "Session length must be a valid period of time.";
        }
        
        // simple cron
        if ($SIMPLE_CRON !== null) {
            // if the setting is different, save it
            if (Settings::get_default('SIMPLE_CRON',null)!=$SIMPLE_CRON) {
                Settings::set('SIMPLE_CRON',$SIMPLE_CRON);
            }
        } else {
            // if we have an error already, make multiple lines
            if ($success) {
                $message = "";
            } else {
                $message .= "<br />";
            }
            // mark the error
            $success = false;
            $message .= "Simple cron must be either true or false.";
        }
        
        // mantis version
        if (defined('MANTIS_VERSION')) {
            // if the setting is different, save it
            if (Settings::get_default('MANTIS_VERSION',null)!=MANTIS_VERSION) {
                Settings::set('MANTIS_VERSION',MANTIS_VERSION);
            }
        } else {
            if (Settings::get_default('MANTIS_VERSION',null)!="unknown") {
                Settings::set('MANTIS_VERSION',"unknown");
            }
        }
        
        // was that successful? if so, add the user.
        if ($success) {
            // get the values
            $username = strtolower(trim($_POST['username'])); // usernames are lower-case to lower user-input confusion
            $name = trim(html_scrub($_POST['name']));
            $email = trim(html_scrub($_POST['email']));
            $password1 = $_POST['password1'];
            $password2 = $_POST['password2'];
            
            $user_id = 0;
            
            // first check that the username is valid - we're more strict with this because it can't be changed
            if (preg_match('/^([a-z0-9]+[\.\-_]?[a-z0-9]*)+$/',$username)) {
                // now check that it's not taken
                $query = "SELECT `id` FROM `".DB_PREFIX."users`
                          WHERE `username`='".mysql_real_escape_string($username)."'";
                $res = run_query($query);
                
                if (mysql_num_rows($res) == 0) {
                    // check quickly that the name and email aren't blank
                    if (strlen($name) && strlen($email)) {
                        if (strlen($password1)) {
                            if ($password1 == $password2) {
                                // hash the password
                                $pass = md5(strrev(sha1($password1)));
                                
                                // Got all of that? Add the user!
                                $query = "INSERT INTO `".DB_PREFIX."users` (`username`,`password`,`role`)
                                          VALUES ('".mysql_real_escape_string($username)."','$pass','admin')";
                                run_query($query);
                                
                                if ($id = mysql_insert_id()) {
                                    // build the user object
                                    $u = User::by_id($id);
                                    
                                    // add the name and email fields
                                    $u->set_var('name',$name);
                                    $u->set_var('email',$email);
                                    $u->commit();
                                    
                                    // And build the response
                                    $data = array("success"=>true);
                                } else {
                                    $success = false;
                                    $message = "Error adding user";
                                }
                            } else {
                                $success = false;
                                $message = "Passwords do not match";
                            }
                        } else {
                            $success = false;
                            $message = "Password cannot be blank";
                        }
                    } else {
                        $success = false;
                        $message = "User's name and email cannot be blank";
                    }
                } else {
                    $success = false;
                    $message = "Username already in use";
                }
            } else {
                $success = false;
                $message = "Username may contain only letters and numbers, optionally separated by a period (.), dash (-), or underscore (_)";
            }
        }
        
        // was THAT successful? if so, update the config file.
        if ($success) {
            // mark the system as fully configured
            $f = fopen(FS_ROOT.'/inc/config.php','a');
            fputs($f,"// This is required to inform the system that it is properly configured\n");
            fputs($f,'define ("CONFIGURED", true);');
            fclose($f);
        }
    }
} else {
    $success = false;
    $message .= "Mantis has already been installed.";
}

// return the response
header("Content-Type: text/javascript");
?>
{success:<?=($success?'true':'false')?>,info:<?=($success?"'Configuration file created, and database installed.'":"'".addslashes($message)."'")?>}