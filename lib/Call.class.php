<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/Call.class.php
 ** 
 ** Description: Defines the call class and exceptions
 *******************************************************************************
 ******************************************************************************/

class Call {
    protected $id;
    protected $user_id;
    protected $date;
    protected $caller_name;
    protected $company_name;
    protected $message;
    protected $users;
    protected $contact;
    protected $priority;
    protected $status;
    protected $action;
    protected $comments;
    
    // some save-data variables
    protected $dirty;
    protected $changes;
    protected $can_update;
    
    // Constructors
    /** Builds the call object off an ID
     * @param int $id The call ID
     * @return Call A call object
     */
    static function by_id($id) {
        $call = new Call();
        $call->set_id($id);
        $call->load();
        return $call;
    }
    
    // accessors
    function get_id() {
        return $this->id;
    }
    /** Gets user that took the call
     * @return User The user that took the call
     */
    function get_taker() {
        return User::by_id($this->user_id);
    }
    function get_date() {
        return $this->date;
    }
    function get_caller() {
        return $this->caller_name;
    }
    function get_company() {
        return $this->caller_company;
    }
    function get_message() {
        return $this->message;
    }
    /** Gets all users that this call is assigned to
     * @return array An array of user objects
     */
    function get_users() {
        $users = array();
        
        // build user objects for each user id
        foreach ($this->users as $u_id) {
            $users[] = User::by_id($u_id);
        }
        
        return $users;
    }
    function get_contacts() {
        return $this->contacts;
    }
    function get_priority() {
        return $this->priority;
    }
    function get_status() {
        return $this->status;
    }
    function get_action() {
        return $this->action;
    }
    
    // builds an array for returning call info through an API
    function to_array() {
        // Get taker information
        $taker = $this->get_taker();
        $users = $this->get_users();
        
        // build the array
        $arr = array("id"       =>$this->id,
                     "taker"    =>array("id"    =>$taker->get_id(),
                                        "name"  =>$taker->get_var('name')),
                     "date"     =>$this->date,
                     "caller"   =>$this->caller_name,
                     "company"  =>$this->company_name,
                     "message"  =>$this->message,
                     "users"    =>array(),  // a blank array for users - we'll fill this shortly
                     "contact"  =>$this->contact,
                     "priority" =>$this->priority,
                     "status"   =>$this->status,
                     "action"   =>$this->action,
                     "comments" =>$this->comments);
        
        // get the users
        foreach ($users as $u) {
            $arr['users'][] = array("id"    =>$u->get_id(),
                                    "name"  =>$u->get_var('name'));
        }
        
        return $arr;
    }
    
    function is_dirty() {
        return $this->dirty;
    }
    
    // mutators
    function set_id($id) {
        $this->id = intval($id);
    }
    
    /** Add a user to the call
     * @param int $id The user id
     */
    function add_user($id) {
        $id = intval($id);
        
        // add the user (if we don't have it already)
        if ($id > 0 && !in_array($id,$this->users)) {
            if (!isset($this->changes["user"])) { $this->changes["user"] = array(); }
            // add the change
            if (!in_array($id,$this->changes["user"])) {
                $this->dirty = true;
                $this->changes["user"][] = $id;
            }
        }
    }
    
    /** Add a comment to the call
     * @param string $comment The comment
     */
    function add_comment($comment) {
        // clean the comment
        $comment = trim(htmlspecialchars($comment));
        // check if it has any text
        if (strlen($comment)) {
            $this->dirty = true;
            $this->changes["comment"] = $comment;
        }
    }
    
    /** Sets the priority
     * @param string $priority The call priority
     */
    function set_priority($priority) {
        if (in_array($priority, array('critical','urgent','moderate','minor','negligible')) && $priority != $this->priority) {
            $this->dirty = true;
            $this->changes['priority'] = $priority;
        }
    }
    
    /** Sets the status
     * @param string $status The call status
     */
    function set_status($status) {
        if (in_array($status, array('new','closed')) && $status != $this->status) {
            $this->dirty = true;
            $this->changes['status'] = $status;
        }
    }
    
    /** Sets the user id of the updater
     * @param int $id The user ID
     */
    function set_updater($id) {
        $id = intval($id);
        
        try {
            $user = User::by_id($id);
            
            // check that the updater either opened the call, was assigned the call, or is a manager
            if ($id == $this->user_id || in_array($id,$this->users) || in_array($user->get_role(),array('manager','admin'))) {
                $this->changes['updater'] = $user;
                $this->can_update = true;
            }
        } catch (UserNotFoundException $e) { /* Can't find the updating user - no need to fail, though */ }
    }
    
    /** Notifies the object that the update is being performed by the system, not a user */
    function system_updater() {
        $this->changes['updater'] = null;
        $this->can_update = true;
    }
    
    // other stuff
    /** Loads all values into the object from the database */
    function load() {
        // clean the user id
        $id = intval($this->id);
        
        // Get the user information
        $query = "SELECT `id`, `user_id`, `date`, `caller_name`, `company_name`,
                         `message`,`contact`,`priority`,`status`,`action`
                  FROM `".DB_PREFIX."calls`
                  WHERE `id`=$id";
        $res = run_query($query);
        
        // now set the values
        if ($row = mysql_fetch_assoc($res)) {
            // set the call information
            $this->user_id = $row['user_id'];
            $this->date = $row['date'];
            $this->caller_name = $row['caller_name'];
            $this->company_name = $row['company_name'];
            $this->message = $row['message'];
            $this->contact = unserialize($row['contact']);
            $this->priority = $row['priority'];
            $this->status = $row['status'];
            $this->action = $row['action'];
            
            // now get all the users attached
            $query = "SELECT `user_id`
                      FROM `".DB_PREFIX."user_calls`
                      WHERE `call_id`=$id";
            $res = run_query($query);
            
            // get the users
            $this->users = array();
            while($row = mysql_fetch_assoc($res)) {
                $this->users[] = intval($row['user_id']);
            }
            
            // and the comments (if there are any)
            $query = "SELECT `id`,`user_id`,`date`,`action`,`comment`
                      FROM `".DB_PREFIX."call_comments`
                      WHERE `call_id`=$id";
            $res = run_query($query);
            $this->comments = array();
            while($row = mysql_fetch_assoc($res)) {
                // get the commenter's name
                if ($row['user_id'] !== null) {
                    $commenter = User::by_id($row['user_id']);
                    $row['commenter'] = $commenter->get_var('name');
                } else {
                    $row['commenter'] = 'system';
                }
                
                // add the comment to the array
                $this->comments[] = $row;
            }
            
            // and mark the object as clean
            $this->dirty = false;
            $this->changes = array();
            $this->can_update = false;
        } else {
            throw new CallNotFoundException("Cannot find call information");
        }
    }
    
    /** Commits all changes to the object (essentially saves to the database) */
    function commit() {
        // check that we either have a user or the system updating
        if ($this->can_update) {
            // check that there is SOMETHING to update
            if ($this->dirty) {
                // only save the changes if the call isn't closed (and we're not re-opening it)
                if ($this->status == "new" || isset($this->changes['status'])) {
                    // check for updates to status or priority
                    if (isset($this->changes['status']) || $this->changes['prioity']) {
                        // simple way of collating the changes
                        $call_changes = array();
                        // No need to be too defensive here. The only way to set these
                        // 'changes' is through functions that validate
                        if (isset($this->changes['status'])) {
                            $call_changes[] = "`status`='".$this->changes['status']."'";
                        }
                        if (isset($this->changes['priority'])) {
                            $call_changes[] = "`priority`='".$this->changes['prioity']."'";
                        }
                        
                        // and make the updates
                        $query = "UPDATE `".DB_PREFIX."calls`
                                  SET ".implode(',',$call_changes)."
                                  WHERE `id`=".intval($this->id);
                        run_query($query);
                    }
                    
                    // check for adding/escalating to a user
                    if (isset($this->changes['user'])) {
                        // simple way of sorting out the user queries
                        $user_queries = array();
                        foreach ($this->changes['user'] as $u_id) {
                            $user_queries[] = "(".intval($u_id).",".intval($this->id).")";
                        }
                        
                        // and update
                        $query = "INSERT INTO `".DB_PREFIX."user_calls` (`user_id`,`call_id`)
                                  VALUES ".implode(",",$user_queries);
                        run_query($query);
                    }
                    
                    // get the comment 'action' for context
                    $comment_text = "";
                    if (isset($this->changes['status']) && $this->changes['status'] == "closed") {
                        $comment_text = "Call closed";
                    } else if (isset($this->changes['status']) && isset($this->changes['priority']) && isset($this->changes['user'])) {
                        $comment_text = "Call reopened and escalated to ".count($this->changes['user']).(count($this->changes['user'])==1?' person':' people');
                    } else if (isset($this->changes['status']) && isset($this->changes['priority'])) {
                        $comment_text = "Call reopened and escalated";
                    } else if (isset($this->changes['status'])) {
                        $comment_text = "Call reopened";
                    } else if (isset($this->changes['priority']) && isset($this->changes['user'])) {
                        $comment_text = "Call escalated to ".count($this->changes['user']).(count($this->changes['user'])==1?' person':' people');
                    } else if (isset($this->changes['priority'])) {
                        $comment_text = "Call escalated";
                    } else if (isset($this->changes['comment'])) {
                        $comment_text = "Comment";
                    } else {
                        // set a blank comment for the query
                        $this->changes['comment'] = '';
                    }
                    
                    // now add the comment
                    $query = "INSERT INTO `".DB_PREFIX."call_comments` (`call_id`,`user_id`,`date`,`action`,`comment`)
                              VALUES (".intval($this->id).", -- call ID
                                      ".($this->changes['updater']===null?'NULL':$this->changes['updater']->get_id()).", -- User id or null for system update
                                      '".date('Y-m-d H:i:s')."', -- date of the change
                                      '".mysql_real_escape_string($comment_text)."', -- the comment action text
                                      '".mysql_real_escape_string($this->changes['comment'])."')";
                    run_query($query);
                    
                    // and now that we're done, re-sync with the database
                    $this->load();
                } else {
                    throw new CallClosedException('Cannot update call - it has been closed');
                }
            } else {
                throw new CallUpdateException('Nothing to update');
            }
        } else {
            throw new CallPermissionException('User is not authorized to update call');
        }
    }
}

// exceptions
class CallException extends Exception {}
class CallNotFoundException extends CallException {}

// update exceptions
class CallUpdateException extends CallException {}
class CallUpdatePermissionException extends CallUpdateException {}
class CallClosedException extends CallUpdateException {}
?>