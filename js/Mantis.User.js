/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.User.js
 ** 
 ** Description: Defines a simple user object
 *******************************************************************************
 ******************************************************************************/
Mantis.User = function () {
    var user_id;
    var session;
    var role;
    var vars;
    var vars_orig;
    var dirty;
    
    return {
        /** Initialise the user object */
        init: function (user_id, session, role, vars) {
            this.user_id = parseInt(user_id);
            this.session = session;
            this.role = role;
            this.vars = vars;
            this.vars_orig = vars;
            this.dirty = false;
        },
        /** Get the session (required to authenticate all API calls)
         * @returns {string} The session key
         */
        getSession: function () {
            return this.session;
        },
        /** Sets a variable (if it exists)
         * @param key {string} The variable key
         */
        getVar: function (key) {
            return this.vars[key];
        },
        /** Sets a variable
         * @param key {string} The variable key
         * @param val {mixed} The variable value
         */
        setVar: function (key, val) {
            this.vars[key] = val;
            this.dirty = true;
        },
        /** Commits all variable changes to the database */
        commit: function () {
            // only bother if the data is dirty
            if (this.dirty) {
                var conn = new Ext.data.Connection();
                
                // send the 'save' request to the server
                conn.request({
                    url:APP_ROOT+'/api.php?f=saveUserVars',
                    params: {
                        session: Mantis.User.getSession(),
                        vars: Mantis.Utils.serialiseArray(this.vars)
                    },
                    success: function (res, opt) {
                        this.orig_vars = this.vars;
                        this.dirty = false;
                    },
                    failure: function (res, opt) {
                        var msg = "Unknown system error";
                        if (res.result !== undefined) {
                            msg = res.result.info;
                        }
                        Ext.Msg.alert("Error", msg);
                    },
                    scope: this
                })
            }
        },
        /** Reverts all un-commited changes */
        revert: function () {
            this.vars = this.orig_vars;
            this.dirty = false;
        }
    };
} ();