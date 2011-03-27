<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/PasswordReset.class.php
 ** 
 ** Description: Defines a number of functions and exceptions for the password
 **              reset functionality
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

class PasswordReset {
    /** Makes a password reset request
     * @param string $username The user to make the request for
     */
    static function get_request($username) {
        // Include the language file
        global $LANG;
        
        try {
            // get the user
            $user = User::by_username($username);
            
            // check if the user is enabled
            if ($user->get_role() != 'disabled') {
                // clear any existing password reset requests for this use (only one active per user at a time)
                run_query("DELETE FROM `".DB_PREFIX."password_reset_requests` WHERE `user_id`=".intval($user->get_id()));
                // and clean up
                run_query("OPTIMIZE TABLE `".DB_PREFIX."password_reset_requests`");
                
                // get a random key and expiry time
                $request = random_string(rand(7,15),2);
                $expiry_time = strtotime('+24 hours');
                $email = $user->get_var('email');
                
                // add into the database
                $query = "INSERT INTO `".DB_PREFIX."password_reset_requests`
                                 (`key`,`user_id`,`email_address`,`expiry`)
                          VALUES ('".mysql_real_escape_string($request)."',
                                  ".intval($user->get_id()).",
                                  '".mysql_real_escape_string($email)."',
                                  '".date('Y-m-d H:i:s', $expiry_time)."')";
                run_query($query);
                
                // Set the language for the user recieving the email
                $l = $LANG->get_language();
                $LANG->set_language($user->get_var_default('lang',''));
                
                // now finally, email the user - a simple text email
                $body = $LANG->get_string("PasswordReset/getRequest/Email",array("%%NAME%%"=>$user->get_var('name'),
                                                                                 "%%APP_ROOT%%"=>APP_ROOT,
                                                                                 "%%KEY%%"=>$request,
                                                                                 "%%EXPIRE_TIME%%"=>date($user->get_var_default('timeformat','h:i A'),$expiry_time),
                                                                                 "%%EXPIRE_DATE%%"=>date($user->get_var_default('dateformat','jS M, Y'),$expiry_time)));
                
                // set the 'from' address
                $header = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/plain; charset=UTF-8' . "\r\n";
                $header .= "From: ".Settings::get('MAIL_FROM') . "\r\n";
                
                // Subject
                $subject = $LANG->get_string("PasswordReset/getRequest/Subject");
                
                // Reset the language
                $LANG->set_language($l);
                
                // and send the email
                if (!mail($email,$subject,$body,$header)) {
                    // there was an error sending the email. Clear the reset request
                    PasswordReset::clear_request($request);
                    
                    // and throw an exception
                    throw new PasswordResetMailErrorException($LANG->get_string("PasswordReset/getRequest/PasswordResetMailErrorException"));
                }
            } else {
                throw new PasswordResetUserDisabledException($LANG->get_string("PasswordReset/getRequest/PasswordResetUserDisabledException"));
            }
        } catch (UserNotFoundException $e) {
            throw $e; // catch and re-throw any 'user not found' exceptions
        } catch (PasswordResetException $e) {
            throw $e; // catch and re-throw and password reset exceptions
        }
    }
    
    /** Makes a password set request
     * @param string $username The user to make the request for
     */
    static function new_user_request($username) {
        // Include the language file
        global $LANG;
        
        try {
            // get the user
            $user = User::by_username($username);
            
            // check if the user is enabled
            if ($user->get_role() != 'disabled') {
                // get a random key and expiry time - The user has 72 hours to 'confirm'
                $request = random_string(rand(7,15),2);
                $expiry_time = strtotime('+72 hours');
                $email = $user->get_var('email');
                
                // add into the database
                $query = "INSERT INTO `".DB_PREFIX."password_reset_requests`
                                 (`key`,`user_id`,`email_address`,`expiry`)
                          VALUES ('".mysql_real_escape_string($request)."',
                                  ".intval($user->get_id()).",
                                  '".mysql_real_escape_string($email)."',
                                  '".date('Y-m-d H:i:s', $expiry_time)."')";
                run_query($query);
                
                // Mail body
                $body = $LANG->get_string("PasswordReset/newUser/Email",array("%%NAME%%"=>$user->get_var('name'),
                                                                              "%%APP_ROOT%%"=>APP_ROOT,
                                                                              "%%KEY%%"=>$request,
                                                                              "%%USERNAME%%"=>$username,
                                                                              "%%EXPIRE_TIME%%"=>date('h:i A',$expiry_time),
                                                                              "%%EXPIRE_DATE%%"=>date('jS M, Y',$expiry_time)));
                
                // set the 'from' address
                $header = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/plain; charset=UTF-8' . "\r\n";
                $header .= "From: ".Settings::get('MAIL_FROM') . "\r\n";
                
                // Subject
                $subject = $LANG->get_string("PasswordReset/newUser/Subject");
                
                // and send the email
                if (!mail($email,$subject,$body,$header)) {
                    // there was an error sending the email. Clear the reset request
                    PasswordReset::clear_request($request);
                    
                    // and throw an exception
                    throw new PasswordResetMailErrorException($LANG->get_string("PasswordReset/newUser/PasswordResetMailErrorException"));
                }
            } else {
                throw new PasswordResetUserDisabledException($LANG->get_string("PasswordReset/newUser/PasswordResetUserDisabledException"));
            }
        } catch (UserNotFoundException $e) {
            throw $e; // catch and re-throw any 'user not found' exceptions
        } catch (PasswordResetException $e) {
            throw $e; // catch and re-throw and password reset exceptions
        }
    }
    
    /** Checks to see if the username and confirmation (reset request key) match
     * @param int $user_id The username for the password reset
     * @param string $confirmation_key The 'password reset' confirmation key
     */
    static function confirm($user_id, $confirmation_key) {
        // initialise
        $match = false;
        
        // clean up the user id
        $u = intval($user_id);
        
        // search for the request
        $query = "SELECT * FROM `".DB_PREFIX."password_reset_requests`
                  WHERE `key` = '".mysql_real_escape_string($confirmation_key)."'
                  AND `user_id` = $u";
        $res = run_query($query);
        
        // check if we have a matching request
        if ($row = mysql_fetch_assoc($res)) {
            // check if the request has expired
            if (strtotime($row['expiry']) >= time()) {
                // we have a match, and it hasn't expired
                $match = true;
            } else {
                // The request has expired. Clear it from the database
                PasswordReset::clear_request($confirmation_key);
            }
        }
        
        return $match;
    }
    
    /** Clears a request once used
     * @param mixed $confirmation_key The 'password reset' confirmation key
     */
    static function clear_request($confirmation_key) {
        // there was an error sending the email. Clear the reset request
        run_query("DELETE FROM `".DB_PREFIX."password_reset_requests` WHERE `key`='".mysql_real_escape_string($confirmation_key)."'");
        // and clean up
        run_query("OPTIMIZE TABLE `".DB_PREFIX."password_reset_requests`");
    }
}

// settings exceptions
class PasswordResetException extends Exception {}
class PasswordResetUserNotFoundException extends PasswordResetException {}
class PasswordResetMailErrorException extends PasswordResetException {}
class PasswordResetUserDisabledException extends PasswordResetException {}
?>