/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.PasswordSet.js
 ** 
 ** Description: The 'password set' form for the application
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
Mantis.PasswordSet = function () {
    var usernameField;
    var passwordField;
    var passwordStrengthIndicator;
    var passwordConfirmField;
    var confirmationKeyField;
    var setPasswordForm;
    
    return {
        show: function () {
            if (this.loginForm === undefined) {
                // set password form 'username' field
                this.usernameField = new Ext.form.TextField ({
                    name: "username", 
                    fieldLabel: "Username", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your username"
                });
                
                // set password form 'password' field
                this.passwordField = new Ext.form.TextField ({
                    name: "password1", 
                    fieldLabel: "Password", 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your password",
                    enableKeyEvents: true
                });
                
                // check the strength of the password
                this.passwordField.on('keyup', function() {
                    var pass = this.passwordField.getValue();
                    var points = Mantis.Utils.passwordStrength(pass);
                    
                    // password strength
                    var text = 'Weak';
                    
                    // test the strength
                    if (points == 0) {
                        text = 'Enter password';
                    } else if (points > 35) {
                        text = 'Very Strong';
                    } else if (points > 25) {
                        text = 'Strong';
                    } else if (points > 10) {
                        text = 'Medium';
                    }
                    
                    // update the inidcator
                    this.passwordStrengthIndicator.updateProgress((points/50),text,true);
                }, this);
                
                // Simple password strength indicator
                this.passwordStrengthIndicator = new Ext.ProgressBar({
                    fieldLabel: 'Strength',
                    text: 'Enter password',
                    value: 0,
                    width:135
                })
                
                // reset password form 'password confirmation' field
                this.passwordConfirmField = new Ext.form.TextField ({
                    name: "password2", 
                    fieldLabel: "Confirm Password", 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your password"
                });
                
                // confirmation key (populated off the ?k= sent to set_password.php)
                this.requestConfirmationKeyField = new Ext.form.Hidden ({
                    name: "confirmation_key",
                    value: CONFIRMATION_KEY
                });
                
                // set up form
                this.setPasswordForm = new Ext.form.FormPanel({
                    id: "Mantis.PasswordSet.setPasswordForm", 
                    url: APP_ROOT+"/api.php?f=setPassword", 
                    method: "POST",
                    region:"center",
                    standardSubmit: false,
                    labelWidth:110,
                    items: [
                        this.usernameField,
                        this.passwordField,
                        this.passwordStrengthIndicator,
                        this.passwordConfirmField,
                        this.requestConfirmationKeyField
                    ], 
                    keys: [
                        {
                            key: [10, 13], 
                            fn: function () {
                                // catch 'enter' and 'return' keypresses
                                //     and submit the form
                                this.doSetPassword ();
                            }, 
                            scope: this
                        }
                    ], 
                    buttons: [
                        {
                            text: "Set Password", 
                            handler: function () {
                                this.doSetPassword();
                            }, 
                            scope: this,
                            width:135
                        }
                    ], 
                    bodyStyle: "padding:5px;background-color:#dfe8f6;",
                    buttonAlign:'center'
                });
                
                
                // the actual window
                this.dlgSetPassword = new Ext.Window({
                    modal:false, 
                    height:160,
                    width:275,
                    layout: "fit", 
                    items: [
                        this.setPasswordForm
                    ], 
                    collapsed: false, 
                    collapsible: false, 
                    minimizable: false,
                    resizable: false, 
                    autoScroll: false, 
                    closable: false,
                    draggable: false
                });
            }
            // show the login dialog
            this.dlgSetPassword.show();
        },
        // checks and submits the 'set password' form
        doSetPassword: function() {
            // don't even try to submit the form if it's not valid.
            if (this.setPasswordForm.getForm().isValid()) {
                // check that the passwords match
                if (this.passwordField.getValue() == this.passwordConfirmField.getValue()) {
                    this.setPasswordForm.getForm().submit({
                        success: function (form, action) {
                            // hide the 'set password' dialog
                            this.dlgSetPassword.hide();
                            // Notify the user, and send them to the login page
                            Ext.Msg.alert('Password set','Your password has been set.<br /><br />You will now be redirected to the login page.',function () {window.location=APP_ROOT;}, this);
                        },
                        failure: function (form, action) {
                            var msg = "Unknown system error";
                            if (action.result !== undefined) {
                                msg = action.result.info;
                            }
                            Ext.Msg.alert("Error", msg);
                        },
                        scope:this
                    });
                } else {
                    this.passwordConfirmField.markInvalid('Passwords must match');
                }
            } else {
                Ext.Msg.alert("Error", "Please check the marked fields");
            }
        }
    };
} ();