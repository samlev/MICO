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
        $user = false;
        
        // get the user
        try {
            $user = User::by_username($username);
        } catch (UserNotFoundException $e) {
            throw new PasswordResetUserNotFoundException("Cannot find user");
        }
        
        // check if the user is enabled
        if ($user->get_role() != 'disabled') {
            // clear any existing password reset requests (only one active at a time)
            run_query("DELETE FROM `".DB_PREFIX."password_reset_requests` WHERE `user_id`=".intval($user->get_id()));
            // and clean up
            run_query("OPTIMIZE TABLE `".DB_PREFIX."password_reset_requests`");
            
            // get a random key and expiry time
            $request = random_string(rand(7,15),2);
            $expiry_time = strtotime('+24 hours');
            
            // add into the database
            $query = "INSERT INTO `".DB_PREFIX."password_reset_requests`
                             (`key`,`user_id`,`email_address`,`expiry`)
                      VALUES ('".mysql_real_escape_string($request)."',
                              ".intval($user->get_id()).",
                              '".mysql_real_escape_string($user->get('email'))."',
                              '".date('Y-m-d H:i:s', $expiry_time)."')";
            run_query($query);
            
            // now finally, email the user - a simple text email
            $body = "Dear ".$user->get('name').",\r\n\r\n";
            $body .= "This email has been sent to you as part of the 'forgotten password'\r\n";
            $body .= "process for Mantis CRM.\r\n\r\n";
            $body .= "To change your password, visit the following link:\r\n";
            $body .= APP_ROOT."/reset_password?k=$request\r\n\r\n";
            $body .= "This link will expire in approximately 24 hours, at ".date('h:i A',$expiry_time)."\r\n";
            $body .= " on ".date('jS M, Y',$expiry_time).", server time*.\r\n\r\n";
            $body .= "If you did not request this change of password, or have remembered\r\n";
            $body .= "your password, please delete this message\r\n\r\n";
            $body .= "Do not reply to this email.\r\n\r\n";
            $body .= "----------------------------------------------------------------------\r\n\r\n";
            $body .= "* Please note: The server time may vary from your local time.";
            
            // set the 'from' address
            $header = "From: ".Settings::get('mail_from');
            
            // and send the email
            if (!mail($user->get('email'),"Mantis CRM Password Reset Request",$body,$header)) {
                // there was an error sending the email. Clear the reset request
                run_query("DELETE FROM `".DB_PREFIX."password_reset_requests` WHERE `key`='".mysql_real_escape_string($request)."'");
                // and clean up
                run_query("OPTIMIZE TABLE `".DB_PREFIX."password_reset_requests`");
                
                // and throw an exception
                throw new PasswordResetMailErrorException("Mail could not be sent. Please contact an administrator.");
            }
        } else {
            throw new PasswordResetUserDisabledException("User is not active");
        }
    }
}

// settings exceptions
class PasswordResetException extends Exception {}
class PasswordResetUserNotFoundException extends PasswordResetException {}
class PasswordResetMailErrorException extends PasswordResetException {}
class PasswordResetUserDisabledException extends PasswordResetException {}
?>