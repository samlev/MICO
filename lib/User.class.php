<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/User.class.php
 ** 
 ** Description: Defines the user class and exceptions
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
        // Include the language file
        global $LANG;
        
        $user = null;
        
        // Check that the session ID is actually plausibly valid
        if (preg_match('/^[0-9a-f]{32}$/',$session)) {
            $query = "SELECT s.`user_id`, s.`last_action`, u.`role`
                      FROM `".DB_PREFIX."sessions` s
                      INNER JOIN `".DB_PREFIX."users` u ON s.`user_id` = u.`id`
                      WHERE `key` = '$session'"; // #NB: no need sanitise this, because we already check that it's sanitary.
            
            $res = run_query($query);
            
            // check if we found a session
            if ($row = mysql_fetch_assoc($res)) {
                // now check to see if it has expired or not
                if (strtotime($row['last_action'].' +'.Settings::get('SESSION_LENGTH')) >= time()) {
                    // check that the user isn't disabled
                    if ($row['role'] != 'disabled') {
                        $time = date('Y-m-d H:i:s');
                        
                        // update the session
                        run_query("UPDATE `".DB_PREFIX."sessions` SET `last_action`='".mysql_real_escape_string($time)."' WHERE `key` = '$session'");
                        
                        // and build the object
                        $user = new User();
                        $user->set_id($row['user_id']);
                        $user->set_session($session);
                        $user->load();
                        
                        // refresh the cookie
                        setcookie('session',$session,strtotime($time.' +'.Settings::get('SESSION_LENGTH')));
                    } else {
                        // clear the session
                        run_query("DELETE FROM `".DB_PREFIX."sessions` WHERE `key` = '$session'");
                        // clean up
                        run_query("OPTIMIZE TABLE `".DB_PREFIX."sessions`");
                        
                        throw new UserSessionExpiredException($LANG->get_string("User/bySession/UserDisabled"));
                    }
                } else {
                    // clear the session
                    run_query("DELETE FROM `".DB_PREFIX."sessions` WHERE `key` = '$session'");
                    // clean up
                    run_query("OPTIMIZE TABLE `".DB_PREFIX."sessions`");
                    
                    throw new UserSessionExpiredException($LANG->get_string("User/bySession/SessionExpired"));
                }
            } else {
                throw new UserSessionInvalidException($LANG->get_string("User/bySession/SessionIdNotFound"));
            }
        } else {
            throw new UserSessionInvalidException($LANG->get_string("User/bySession/SessionIdInvalid"));
        }
        
        // return the user object
        return $user;
    }
    
    /** Builds the user object off a userid
     * @param int $userid The user ID
     * @return User A User object
     */
    static function by_id($userid) {
        // Include the language file
        global $LANG;
        
        $user = null;
        
        // clean up the userid
        $u = intval($userid);
        
        // Select the user by the ID
        $query = "SELECT `id`
                  FROM `".DB_PREFIX."users`
                  WHERE `id` = $u";
        
        $res = run_query($query);
        
        // check if we found a user
        if ($row = mysql_fetch_assoc($res)) {
            // and build the object
            $user = new User();
            $user->set_id($row['id']);
            $user->load();
        } else {
            throw new UserNotFoundException($LANG->get_string("User/byId/UserNotFoundException"));
        }
        
        // return the user object
        return $user;
    }
    
    /** Builds the user object off a username
     * @param string $username The user ID
     * @return User A User object
     */
    static function by_username($username) {
        // Include the language file
        global $LANG;
        
        $user = null;
        
        // Get the user by the username
        $query = "SELECT `id`
                  FROM `".DB_PREFIX."users`
                  WHERE `username` = '".mysql_real_escape_string($username)."'";
        
        $res = run_query($query);
        
        // check if we found a user
        if ($row = mysql_fetch_assoc($res)) {
            // and build the object
            $user = new User();
            $user->set_id($row['id']);
            $user->load();
        } else {
            throw new UserNotFoundException($LANG->get_string("User/byUsername/UserNotFoundException"));
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
        // Include the language file
        global $LANG;
        
        $user = null;
        
        // we hash-reverse-hash the password using two algorithms to make rainbow-tables pretty pointless
        $p = md5(strrev(sha1($password)));
        
        // Check for a user matching the username and password (not disabled)
        $query = "SELECT `id`
                  FROM `".DB_PREFIX."users`
                  WHERE `username` = '".mysql_real_escape_string($username)."'
                  AND `password` = '$p'
                  AND `role`!='disabled'";
        
        $res = run_query($query);
        
        // check if we found a user
        if ($row = mysql_fetch_assoc($res)) {
            // make sure we use the 'php' time, as the mysql time may be different
            $time = date('Y-m-d H:i:s');
            
            // Add the session, replacing any existing sessions
            $session = md5('user'.$row['id'].'at'.time());
            run_query("INSERT INTO `".DB_PREFIX."sessions` (`key`,`user_id`,`active_from`,`last_action`)
                       VALUES('$session',".intval($row['id']).",'".mysql_real_escape_string($time)."','".mysql_real_escape_string($time)."')");
            
            // and build the object
            $user = new User();
            $user->set_id($row['id']);
            $user->set_session($session);
            $user->load();
            
            // set the cookie
            setcookie('session',$session,strtotime($time.' +'.Settings::get('SESSION_LENGTH')));
        } else {
            throw new UserLoginException($LANG->get_string("User/login/UserLoginException"));
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
    function get_var_default($var,$default) {
        return (isset($this->vars[$var])?$this->vars[$var]:$default);
    }
    function get_vars() {
        return $this->vars;
    }
    function is_dirty() {
        return $this->dirty;
    }
    
    // mutators
    function set_id($id) {
        $this->id = intval($id);
    }
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
     * @param string $password1 The new password
     * @param string $password2 The new password confirmation
     */
    function change_password($oldpass, $password1, $password2) {
        // Include the language file
        global $LANG;
        
        // ensure that the password isn't blank
        if ($password1 != '') {
            // ensure that both passwords are the same
            if ($password1 == $password2) {
                // prepare the user id
                $u = intval($this->id);
                
                // prepare the passwords (old and new)
                $o = md5(strrev(sha1($oldpass)));
                $n = md5(strrev(sha1($password1)));
                
                // now commit the change
                $query = "UPDATE `".DB_PREFIX."users`
                          SET `password` = '$n'
                          WHERE `id`=$u
                          AND `password` = '$o'";
                run_query($query);
                
                // check that something was updated
                if (mysql_affected_rows() == 0) {
                    throw new UserPasswordChangeVerificationException($LANG->get_string("User/changePassword/OldPassword"));
                }
            } else {
                throw new UserPasswordConfirmationException($LANG->get_string("User/changePassword/PasswordConfirmation"));
            }
        } else {
            throw new UserPasswordValidationException($LANG->get_string("User/changePassword/PasswordBlank"));
        }
    }
    
    /** Allows the user to set a password with the 'PasswordReset' tool
     * @param string $confirmation_key The password reset request confirmation
     * @param string $password1 The new password
     * @param string $password2 The new password confirmation
     */
    function set_password($confirmation_key, $password1, $password2) {
        // Include the language file
        global $LANG;
        
        // ensure that the password isn't blank
        if ($password1 != '') {
            // ensure that both passwords are the same
            if ($password1 == $password2) {
                // confirm that the request is valid
                if (PasswordReset::confirm($this->id, $confirmation_key)) {
                    // prepare the user id
                    $u = intval($this->id);
                    
                    // prepare the password
                    $p = md5(strrev(sha1($password1)));
                    
                    // now commit the change
                    $query = "UPDATE `".DB_PREFIX."users`
                              SET `password` = '$p'
                              WHERE `id`=$u";
                    run_query($query);
                    
                    // and clear the request
                    PasswordReset::clear_request($confirmation_key);
                } else {
                    throw new UserPasswordChangeVerificationException($LANG->get_string("User/setPassword/RequestExpired"));
                }
            } else {
                throw new UserPasswordConfirmationException($LANG->get_string("User/setPassword/PasswordConfirmation"));
            }
        } else {
            throw new UserPasswordValidationException($LANG->get_string("User/setPassword/PasswordBlank"));
        }
    }
    
    // other stuff
    /** Loads all values into the object from the database */
    function load() {
        // Include the language file
        global $LANG;
        
        // clean the user id
        $u = intval($this->id);
        
        // Get the user information
        $query = "SELECT u.`username`, u.`role`, u.`variables`
                  FROM `".DB_PREFIX."users` u
                  LEFT JOIN `".DB_PREFIX."sessions` s ON s.`user_id` = u.`id`
                  WHERE `id`=$u";
        $res = run_query($query);
        
        // now set the values
        if ($row = mysql_fetch_assoc($res)) {
            // fill out the object information
            $this->username = $row['username'];
            $this->role = $row['role'];
            $this->vars = unserialize($row['variables']);
            
            // and mark the object as clean
            $this->dirty = false;
        } else {
            throw new UserNotFoundException($LANG->get_string("User/load/UserNotFoundException"));
        }
    }
    
    /** Adds a notification, and sets the 'last update' variable for the user
     * @param int $call_id The ID of the call to notify the user about
     * @param string $type The type of notification ('assigned' or 'update')
     * @param int $comment_id The id of the comment associated with the update (if one exists)
     */
    function add_notification($call_id,$type,$comment_id=null) {
        // check if the user wants to recieve notifications
        if ($this->get_var_default('sendnotifications',false)) {
            // build the call
            $call = Call::by_id($call_id);
            
            // check if the user wants to be notified for calls of this priority
            if ($this->get_var($call->get_priority().'notifytime') != 'never') {
                // check it the user wants notifications for call updates of this type
                if ($this->get_var($call->get_priority().'notifyreason') == 'updated' || $type == 'assigned') {
                    // add the notification
                    $date = '';
                    switch ($this->get_var($call->get_priority().'notifytime')) {
                        case 'immediate':
                            // set an impossibly early date so that the notification is sent on the next run
                            $date = '1970-01-01 00:00:00';
                            break;
                        case '30mins':
                            // find the next 30 minutes
                            if (intval(date('i')) < 30) {
                                $date = date('Y-m-d H:i:00', strtotime('+'.(30-intval(date('i'))).' minutes'));
                            } else {
                                $date = date('Y-m-d H:i:00', strtotime('+'.(60-intval(date('i'))).' minutes'));
                            }
                            break;
                        case '60mins':
                            // find the next 60 minutes
                            $date = date('Y-m-d H:i:00', strtotime('+'.(60-intval(date('i'))).' minutes'));
                            break;
                    }
                    
                    // insert into the database
                    $query = "INSERT INTO `".DB_PREFIX."user_notifications`
                              (`user_id`,`call_id`,`type`,`notify_after`,`comment_id`)
                              VALUES (".intval($this->id).",".intval($call_id).",
                                      '".mysql_real_escape_string($type)."',
                                      '".mysql_real_escape_string($date)."',
                                      ".($comment_id===null?'NULL':intval($comment_id)).")";
                    run_query($query);
                }
            }
        }
        
        // set the 'last update' variable - not meaningful just unique
        $this->set_var('lastupdate',md5(time().$call_id.($comment_id==null?'added':$comment_id)));
        $this->commit();
    }
    
    /** Commits all changes to the object (essentially saves to the database) */
    function commit() {
        // Include the language file
        global $LANG;
        
        $u = intval($this->id);
        
        // update the database
        $query = "UPDATE `".DB_PREFIX."users`
                  SET `role` = '".mysql_real_escape_string($this->role)."',
                      `variables` = '".mysql_real_escape_string(serialize($this->vars))."'
                  WHERE `id`=$u";
        
        run_query($query);
        
        if (mysql_affected_rows() && $this->dirty) {
            // mark as clean (we're in sync with the database now)
            $this->dirty = false;
        } else if ($this->dirty) {
            // if this object was 'dirty' but we didn't affect any rows, then the user must not have existed.
            throw new UserNotFoundException($LANG->get_string("User/commit/UserNotFoundException"));
        }
    }
    
    /** Logs out the active user */
    function logout() {
        // clear the session
        run_query("DELETE FROM `".DB_PREFIX."sessions` WHERE `key` = '".$this->session."'");
        // clean up
        run_query("OPTIMIZE TABLE `".DB_PREFIX."sessions`");
        // clear the cookie
        setcookie('session','',time()-3600);
    }
    
    /** Checks for any sessions owned by this user that have been active within the last 5 minutes
     * @return bool Whether the user is active or idle
     */
    function is_idle() {
        $idle = true;
        
        // get 5 minutes ago
        $time = date('Y-m-d H:i:s',strtotime('-5 minutes'));
        
        // check if the user has a session that has been active within the last 5 minutes
        $query = "SELECT `key`
                  FROM `".DB_PREFIX."sessions`
                  WHERE `user_id`=".intval($this->id)."
                  AND `last_action` > '$time'
                  LIMIT 1";
        $res = run_query($query);
        
        // if we have any rows, then we're not idle
        if (mysql_num_rows($res)) {
            $idle = false;
        }
        return $idle;
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
class UserPasswordChangeVerificationException extends UserPasswordException {}
?>