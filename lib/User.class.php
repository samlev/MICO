<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/User.class.php
 ** 
 ** Description: Defines the user class and exceptions
 *******************************************************************************
 ******************************************************************************/

class User {
    public $id;
    public $session;
    public $username;
    public $role;
    public $vars;
    
    // Constructors
    /** Builds the user object off a session ID
     * @param string $session The session ID
     * @return User A User object
     */
    static function by_session($session) {
        
    }
    
    /** Builds the user object off a username
     * @param string $username The username
     * @return User A User object
     */
    static function by_username($username) {
        
    }
    
    /** Builds the user object off a username and password
     * @param string $username The username
     * @param string $password The password
     * @return User A User object
     */
    static function by_login($username, $password) {
        
    }
    
    /** Builds the user object off a userid
     * @param string $userid The user ID
     * @return User A User object
     */
    static function by_id($userid) {
        
    }
    
    // accessors
    
    // mutators
    
    // the beef
    /** Reverts all changes to the object (essentially reloads everything from the database) */
    function revert() {
        
    }
    
    /** Commits all changes to the object (essentially saves to the database) */
    function commit() {
        
    }
    
    /** Changes a user's password
     * @param string $oldpass The old password
     * @param string $password The new password
     * @param string $confirm The password confirmation
     */
    function set_password($oldpass, $password, $confirm) {
        
    }
    
    /** Resets a user's password */
    function reset_password() {
        
    }
    
    function logout() {
        
    }
}

// exceptions
class UserException extends Exception {}

// Session exceptions
class UserSessionException extends UserException {}
class UserSessionExpiredException extends UserSessionException {}

// login/creation exceptions
class UserLoginException extends UserException {}
class UserNotFoundException extends UserException {}

// data exceptions
class UserDataException extends UserException {}
class UserPasswordException extends UserDataException {}
?>