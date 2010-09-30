<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/PasswordReset.class.php
 ** 
 ** Description: Defines a number of functions and exceptions for the password
 **              reset functionality
 *******************************************************************************
 ******************************************************************************/

class PasswordReset {
    /** Makes a password reset request
     * @param string $username The user to make the request for
     */
    static function get_request($username) {
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
                $email = $user->get('email');
                
                // add into the database
                $query = "INSERT INTO `".DB_PREFIX."password_reset_requests`
                                 (`key`,`user_id`,`email_address`,`expiry`)
                          VALUES ('".mysql_real_escape_string($request)."',
                                  ".intval($user->get_id()).",
                                  '".mysql_real_escape_string($email)."',
                                  '".date('Y-m-d H:i:s', $expiry_time)."')";
                run_query($query);
                
                // now finally, email the user - a simple text email
                $body = "Dear ".$user->get('name').",\r\n\r\n";
                $body .= "This email has been sent to you as part of the 'forgotten password'\r\n";
                $body .= "process for Mantis CRM.\r\n\r\n";
                $body .= "To change your password, visit the following link:\r\n";
                $body .= APP_ROOT."/set_password?k=$request\r\n\r\n";
                $body .= "This link will expire in approximately 24 hours, at ".date('h:i A',$expiry_time)."\r\n";
                $body .= "on ".date('jS M, Y',$expiry_time).", server time*.\r\n\r\n";
                $body .= "If you did not request this change of password, or have remembered\r\n";
                $body .= "your password, please delete this message\r\n\r\n";
                $body .= "Do not reply to this email.\r\n\r\n";
                $body .= "----------------------------------------------------------------------\r\n\r\n";
                $body .= "* Please note: The server time may vary from your local time.";
                
                // set the 'from' address
                $header = "From: ".Settings::get('mail_from');
                
                // and send the email
                if (!mail($email,"Mantis CRM Password Reset Request",$body,$header)) {
                    // there was an error sending the email. Clear the reset request
                    PasswordReset::clear_request($request);
                    
                    // and throw an exception
                    throw new PasswordResetMailErrorException("Mail could not be sent. Please contact an administrator.");
                }
            } else {
                throw new PasswordResetUserDisabledException("User is not active");
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
        try {
            // get the user
            $user = User::by_username($username);
            
            // check if the user is enabled
            if ($user->get_role() != 'disabled') {
                // get a random key and expiry time - The user has 72 hours to 'confirm'
                $request = random_string(rand(7,15),2);
                $expiry_time = strtotime('+72 hours');
                $email = $user->get('email');
                
                // add into the database
                $query = "INSERT INTO `".DB_PREFIX."password_reset_requests`
                                 (`key`,`user_id`,`email_address`,`expiry`)
                          VALUES ('".mysql_real_escape_string($request)."',
                                  ".intval($user->get_id()).",
                                  '".mysql_real_escape_string($email)."',
                                  '".date('Y-m-d H:i:s', $expiry_time)."')";
                run_query($query);
                
                // now finally, email the user - a simple text email
                $body = "Dear ".$user->get('name').",\r\n\r\n";
                $body .= "This email has been sent to you as part of the user registration\r\n";
                $body .= "process for Mantis CRM.\r\n\r\n";
                $body .= "To set your password for the first time, visit the following link:\r\n";
                $body .= APP_ROOT."/set_password?k=$request\r\n\r\n";
                $body .= "Your username for Mantis CRM is: $username\r\n\r\n";
                $body .= "This link will expire in approximately 72 hours, at ".date('h:i A',$expiry_time)."\r\n";
                $body .= "on ".date('jS M, Y',$expiry_time).", server time*.\r\n\r\n";
                $body .= "If the link expires before you can use it, you can also set your\r\n";
                $body .= "password with the 'forgotten password' link at\r\n";
                $body .= APP_ROOT."\r\n\r\n";
                $body .= "Do not reply to this email.\r\n\r\n";
                $body .= "----------------------------------------------------------------------\r\n\r\n";
                $body .= "* Please note: The server time may vary from your local time.";
                
                // set the 'from' address
                $header = "From: ".Settings::get('mail_from');
                
                // and send the email
                if (!mail($email,"Mantis CRM Registration",$body,$header)) {
                    // there was an error sending the email. Clear the reset request
                    PasswordReset::clear_request($request);
                    
                    // and throw an exception
                    throw new PasswordResetMailErrorException("Mail could not be sent. Please contact an administrator.");
                }
            } else {
                throw new PasswordResetUserDisabledException("User is not active");
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
            if ($row['expiry'] >= time()) {
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