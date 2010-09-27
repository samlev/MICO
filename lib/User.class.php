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
    protected $id;
    protected $session;
    protected $username;
    protected $role;
    protected $vars = array();
    protected $dirty = false;
    
    // Constructors
    /** Builds the user object off a session ID
     * @param string $session The session ID
     * @return User A User object
     */
    static function by_session($session) {
        $user = null;
        
        // Check that the session ID is actually plausibly valid
        if (preg_match('/^[0-9a-f]{32}$/i',$session)) {
            $query = "SELECT s.`user_id`, s.`last_action`, u.`role`
                      FROM `".DB_PREFIX."session` s
                      INNER JOIN `".DB_PREFIX."users` u ON s.`user_id` = u.`id`
                      WHERE LOWER(`key`) LIKE LOWER('$session')"; // #NB: no need sanitise this, because we already check that it's sanitary. Like a wipe or something.
            
            $res = run_query($query);
            
            // check if we found a session
            if ($row = mysql_fetch_assoc($res)) {
                // now check to see if it has expired or not
                if (strtotime($row['last_action'].' +'.Settings::get('SESSION_LENGTH')) >= time()) {
                    // check that the user isn't disabled
                    if ($row['role'] != 'disabled') {
                        // update the session
                        run_query("UPDATE `".DB_PREFIX."session` SET `last_action`=NOW() WHERE LOWER(`key`) LIKE LOWER('$session')");
                        
                        // and build the object
                        $user = new User();
                        $user->set_id($row['user_id']);
                        $user->load();
                        
                        // refresh the cookie
                        setcookie('session',$session,strtotime('+'.Settings::get('SESSION_LENGTH')));
                    } else {
                        // clear the session
                        run_query("DELETE FROM `".DB_PREFIX."session` WHERE LOWER(`key`) LIKE LOWER('$session')");
                        // clean up
                        run_query("OPTIMIZE TABLE `".DB_PREFIX."session`");
                        
                        new UserSessionExpiredException("User disabled");
                    }
                } else {
                    // clear the session
                    run_query("DELETE FROM `".DB_PREFIX."session` WHERE LOWER(`key`) LIKE LOWER('$session')");
                    // clean up
                    run_query("OPTIMIZE TABLE `".DB_PREFIX."session`");
                    
                    new UserSessionExpiredException("Session expired");
                }
            } else {
                new UserSessionInvalidException("Session ID not found");
            }
        } else {
            new UserSessionInvalidException("Session ID is invalid");
        }
        
        // return the user object
        return $user;
    }
    
    /** Builds the user object off a userid
     * @param string $userid The user ID
     * @return User A User object
     */
    static function by_id($userid) {
        $user = null;
        
        // clean up the userid
        $u = intval($userid);
        
        // Check that the session ID is actually plausibly valid
        $query = "SELECT `user_id`
                  FROM `".DB_PREFIX."users`
                  WHERE `user_id` = $u
                  AND `role`!='disabled'";
        
        $res = run_query($query);
        
        // check if we found a user
        if ($row = mysql_fetch_assoc($res)) {
            // and build the object
            $user = new User();
            $user->set_id($row['id']);
            $user->load();
        } else {
            new UserNotFoundException("Cannot find user");
        }
        
        // return the user object
        return $user;
    }
    
    /** Builds the user object off a username and password
     * @param string $username The username
     * @param string $password The password
     * @return User A User object
     */
    static function login($username, $password) {
        $user = null;
        
        // we hash-reverse-hash the password using two algorithms to make rainbow-tables pretty pointless
        $p = md5(strrev(sha1($password)));
        
        // Check for a user matching the username and password (not disabled)
        $query = "SELECT `user_id`
                  FROM `".DB_PREFIX."users`
                  WHERE LOWER(`username`) = LOWER('".mysql_real_escape_string($session)."')
                  AND LOWER(`password`) = LOWER('$p')
                  WHERE `role`!='disabled'";
        
        $res = run_query($query);
        
        // check if we found a user
        if ($row = mysql_fetch_assoc($res)) {
            // Add the session, replacing any existing sessions
            $session = md5('user'.$row['id'].'at'.time());
            run_query("REPLACE INTO `".DB_PREFIX."sessions` (`key`,`user_id`,`active_from`,`last_action`)
                       VALUES('$session',".intval($row['id']).",NOW(),NOW())");
            
            // and build the object
            $user = new User();
            $user->set_id($row['id']);
            $user->load();
            
            // set the cookie
            setcookie('session',$session,strtotime('+'.Settings::get('SESSION_LENGTH')));
        } else {
            new UserLoginException("Login error");
        }
        
        // return the user object
        return $user;
    }
    
    // accessors
    function get_id() {
        return $this->id;
    }
    function get_session() {
        return $this->session;
    }
    function get_username() {
        return $this->username;
    }
    function get_role() {
        return $this->role;
    }
    function get_var($var) {
        return $this->vars[$var];
    }
    function get_vars() {
        return $this->vars;
    }
    function is_dirty() {
        return $this->dirty;
    }
    
    // mutators
    function set_session($session) {
        $this->session = $session;
    }
    function set_role($role) {
        $this->role = $role;
        $this->dirty = true;
    }
    function set_var($var, $val) {
        $this->vars[$var] = $val;
        $this->dirty = true;
    }
    function unset_var($var) {
        unset($this->vars[$var]);
        $this->dirty = true;
    }
    
    /** Changes a user's password
     * @param string $oldpass The old password
     * @param string $password The new password
     * @param string $confirm The new password confirmation
     */
    function change_password($oldpass, $password, $confirm) {
        // ensure that the password isn't blank
        if ($password != '') {
            // ensure that both passwords are the same
            if ($password == $confirm) {
                // prepare the user id
                $u = intval($this->id);
                
                // prepare the passwords (old and new)
                $o = md5(strrev(sha1($oldpass)));
                $n = md5(strrev(sha1($password)));
                
                // now commit the change
                $query = "UPDATE `".DB_PREFIX."users`
                          SET `password` = '$n'
                          WHERE `id`=$u
                          AND `password` = '$o'";
                run_query($query);
                
                // check that something was updated
                if (mysql_affected_rows() == 0) {
                    new UserPasswordVerificationException("Old password cannot be verified");
                }
            } else {
                new UserPasswordConfirmationException("Passwords do not match");
            }
        } else {
            new UserPasswordValidationException("Password cannot be blank");
        }
    }
    
    // other stuff
    /** Loads all values into the object from the database */
    function load() {
        // clean the user id
        $u = intval($this->id);
        
        // Get the user information
        $query = "SELECT u.`username`, u.`role`, u.`variables`, s.`key` AS session
                  FROM `".DB_PREFIX."users` u
                  LEFT JOIN `".DB_PREFIX."sessions` s ON s.`user_id` = u.`id`
                  WHERE `id`=$u";
        $res = run_query($query);
        
        // now set the values
        if ($row = mysql_fetch_assoc($res)) {
            // fill out the object information
            $this->username = $row['username'];
            $this->session = $row['session'];
            $this->role = $row['role'];
            $this->vars = unserialize($row['variables']);
            
            // and mark the object as clean
            $this->dirty = false;
        } else {
            new UserNotFoundException("Cannot find user information");
        }
    }
    
    /** Commits all changes to the object (essentially saves to the database) */
    function commit() {
        $u = intval($this->id);
        
        // update the database
        $query = "UPDATE `".DB_PREFIX."users`
                  SET `role` = '".mysql_real_escape_string($this->role)."',
                      `variables` = '".mysql_real_escape_string(serialize($this->vars))."'
                  WHERE `id`=$u";
        
        run_query($query);
        
        if (mysql_affected_rows()) {
            // mark as clean (we're in sync with the database now)
            $this->dirty = false;
        } else {
            new UserNotFoundException("Cannot save user information");
        }
    }
    
    function logout() {
        // clear the session
        run_query("DELETE FROM `".DB_PREFIX."sessions` WHERE LOWER(`key`) LIKE LOWER('".$this->session."')");
        // clean up
        run_query("OPTIMIZE TABLE `".DB_PREFIX."sessions`");
        // clear the cookie
        setcookie('session','',time()-3600);
    }
}

// exceptions
class UserException extends Exception {}

// Session exceptions
class UserSessionException extends UserException {}
class UserSessionInvalidException extends UserSessionException {}
class UserSessionExpiredException extends UserSessionException {}

// login/creation exceptions
class UserLoginException extends UserException {}
class UserNotFoundException extends UserException {}

// data exceptions
class UserDataException extends UserException {}
class UserPasswordException extends UserDataException {}
class UserPasswordValidationException extends UserPasswordException {}
class UserPasswordConfirmationException extends UserPasswordException {}
class UserPasswordVerificationException extends UserPasswordException {}
?>