/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mico.User.js
 ** 
 ** Description: Defines a simple user object
 **
 ** Copyright (c) 2012 Samuel Levy
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
Ext.namespace('Mico.User');

Mico.User = function () {
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
        /** Gets a variable (if it exists)
         * @param key {string} The variable key
         */
        getVar: function (key) {
            return this.vars[key];
        },
        /** Gets a variable (if it exists), or returns the passed default
         * @param key {string} The variable key
         * @param def {mixed} The default to use of the key doesn't exist
         */
        getVarDefault: function (key, def) {
            return (this.vars[key]===undefined?def:this.vars[key]);
        },
        /** Sets a variable
         * @param key {string} The variable key
         * @param val {mixed} The variable value
         */
        setVar: function (key, val) {
            this.vars[key] = val;
            this.dirty = true;
        },
        /** Commits all variable changes to the database
         * @param localonly {bool} If true, only commit the changes locally
         **/
        commit: function (localonly) {
            // only bother if the data is dirty
            if (this.dirty) {
                if (localonly) {
                    this.orig_vars = this.vars;
                    this.dirty = false;
                } else {
                    var conn = new Ext.data.Connection();
                    
                    // send the 'save' request to the server
                    conn.request({
                        url:APP_ROOT+'/api.php?f=saveUserVars',
                        params: {
                            session: Mico.User.getSession(),
                            vars: Mico.Utils.serialiseArray(this.vars)
                        },
                        callback: function (options, success, response) {
                            var res = Ext.decode(response.responseText);
                            // check if the call was successful
                            if (success && res.success) {
                                // hide any message box
                                Ext.Msg.hide();
                                // set the variables
                                this.orig_vars = this.vars;
                                this.dirty = false;
                                // notify the user that this has been completed
                            } else {
                                Ext.Msg.hide();
                                var msg = Mico.Lang.Common.unknownError_text;
                                if (res.info !== undefined) {
                                    msg = res.info;
                                }
                                Ext.Msg.alert(Mico.Lang.Common.unknownError_title, msg);
                            }
                        },
                        scope: this
                    });
                }
            }
        },
        /** Reverts all un-commited changes */
        revert: function () {
            this.vars = this.orig_vars;
            this.dirty = false;
        },
        /** Logs out the active user */
        logout: function () {
            Ext.Msg.wait(Mico.Lang.User.logoutWait_title,Mico.Lang.User.logoutWait_text,{
                closable:false,
                modal:true
            });
            
            var conn = new Ext.data.Connection();
            
            // send the logout request
            conn.request({
                url:APP_ROOT+'/api.php?f=logout',
                params: {
                    session: Mico.User.getSession()
                },
                callback: function (options, success, response) {
                    var res = Ext.decode(response.responseText);
                    if (success && res.success) {
                        // notify the user that the action was successful
                        Ext.Msg.updateProgress(1,Mico.Lang.User.logoutConfirmation_title,Mico.Lang.User.logoutConfirmation_text);
                        
                        // reload the interface
                        window.location.reload(true);
                    } else {
                        Ext.Msg.hide();
                        var msg = Mico.Lang.Common.unknownError_text;
                        if (res.info !== undefined) {
                            msg = res.info;
                        }
                        Ext.Msg.alert(Mico.Lang.Common.unknownError_title, msg);
                    }
                },
                scope: this
            });
        }
    };
} ();