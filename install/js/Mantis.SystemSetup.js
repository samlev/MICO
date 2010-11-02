/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/js/Mantis.SystemSetup.js
 ** 
 ** Description: The system settings section of the system
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Sphodro is free software: you can redistribute it and/or
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

Mantis.SystemSetup = function () {
    // edit fields
    var debugModeField;
    var debugModeFieldset;
    var mailFromField;
    var mailFromFieldset;
    var sessionLengthField;
    var sessionLengthFieldset;
    var simpleCronField;
    var simpleCronFieldset;
    
    // user fields
    var usernameField;
    var emailField;
    var nameField;
    var passwordField;
    var passwordStrengthIndicator;
    var passwordConfirmField;
    
    // buttons
    var saveSettingsButton;
    var resetSettingsButton;
    
    // main panel
    var panel;
    
    return {
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // debug mode
                this.debugModeField = new Ext.form.Checkbox({
                    checked: false,
                    value: false,
                    hideLabel: true,
                    boxLabel: 'Use debug mode'
                });
                
                // debug mode fieldset
                this.debugModeFieldset = new Ext.form.FieldSet({
                    title: 'Debug Mode',
                    items: [
                        {
                            html: 'Debug mode is useful for when you are working on the Mantis codebase, or '+
                                  'if you are experiencing errors. For best performance, it is advised to leave '+
                                  'this option off.',
                            bodyStyle:'padding-bottom:3px;'
                        },
                        this.debugModeField
                    ]
                });
                
                // from Email
                this.mailFromField = new Ext.form.TextField ({
                    width: 135, 
                    allowBlank: false,
                    required: true,
                    emptyText: 'mantis@example.com',
                    hideLabel: true
                });
                
                // mail from fieldset
                this.mailFromFieldset = new Ext.form.FieldSet({
                    title: 'From email',
                    items: [
                        {
                            html: 'The from email is used to send password set and reset emails, as well as '+
                                  'notification emails.',
                            bodyStyle:'padding-bottom:3px;'
                        },
                        this.mailFromField
                    ]
                });
                
                // session length field
                this.sessionLengthField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    required:true,
                    store: new Ext.data.ArrayStore ({
                        fields:['data'],
                        data: [
                            ['30 minutes'],
                            ['1 hour'],
                            ['2 hours'],
                            ['1 day'],
                            ['3 days'],
                            ['1 week'],
                            ['2 weeks'],
                            ['1 month'],
                            ['1 year']
                        ]
                    }),
                    displayField:'data',
                    valueField:'data',
                    mode:'local',
                    value: "30 minutes",
                    triggerAction:'all',
                    hideLabel: true
                });
                
                // session length field set
                this.sessionLengthFieldset = new Ext.form.FieldSet({
                    title: 'Session length',
                    items: [
                        {
                            html: 'The session length is how long a session persists for while a user '+
                                  'does not have Mantis open. Short sessions are more secure, but long '+
                                  'sessions mean that a user will not have to log in every time they '+
                                  'open the application.',
                            bodyStyle:'padding-bottom:3px;'
                        },
                        this.sessionLengthField
                    ]
                });
                
                // simple cron mode
                this.simpleCronField = new Ext.form.Checkbox({
                    checked: false,
                    value: false,
                    hideLabel: true,
                    boxLabel: 'Use simple cron'
                });
                
                // debug mode fieldset
                this.simpleCronFieldset = new Ext.form.FieldSet({
                    title: 'Simple cron',
                    items: [
                        {
                            html: 'The cron is a recurring task which sends out notification emails.<br /><br />'+
                                  'The simple cron should only be used if you do not have access to '+
                                  'a proper cron system. It will only run when a user has Mantis open.<br /><br />'+
                                  'Once the system is installed, the "System Settings" tab will have '+
                                  'further instructions on how to set up the cron task.',
                            bodyStyle:'padding-bottom:5px;'
                        },
                        this.simpleCronField
                    ]
                });
                
                // now the user settings
                // the username field
                this.usernameField = new Ext.form.TextField ({
                    fieldLabel: "Username", 
                    width: 200, 
                    allowBlank: false,
                    required:true,
                    blankText: "You must enter your username"
                });
                // the user's name field
                this.nameField = new Ext.form.TextField ({
                    fieldLabel: "Name", 
                    width: 200, 
                    allowBlank: false, 
                    required:true,
                    blankText: "You must enter your name"
                });
                // the user's email field
                this.emailField = new Ext.form.TextField ({
                    fieldLabel: "Email Address", 
                    width: 200, 
                    allowBlank: false, 
                    required:true,
                    blankText: "You must enter your email"
                });
                
                // password field
                this.passwordField = new Ext.form.TextField ({
                    name: "password1", 
                    fieldLabel: "Password", 
                    inputType: "password", 
                    width: 200, 
                    allowBlank: false, 
                    required:true,
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
                    width:200
                })
                
                // reset password form 'password confirmation' field
                this.passwordConfirmField = new Ext.form.TextField ({
                    name: "password2", 
                    fieldLabel: "Confirm Password", 
                    inputType: "password", 
                    width: 200, 
                    allowBlank: false, 
                    required:true,
                    blankText: "You must enter your password"
                });
                
                this.passwordFieldset = new Ext.form.FieldSet({
                    title: 'First User',
                    items: [
                        {
                            html:'Your first user will be an administrator, and can add other '+
                                 'users to the system.',
                            bodyStyle:'padding-bottom:5px;'
                        },
                        this.usernameField,
                        this.nameField,
                        this.emailField,
                        this.passwordField,
                        this.passwordStrengthIndicator,
                        this.passwordConfirmField
                    ]
                });
                
                // The button for saving the user's settings
                this.saveSettingsButton = new Ext.Button({
                    text: "Save Settings", 
                    handler: function () {
                        this.saveSettings();
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.resetSettingsButton = new Ext.Button({
                    text: "Reset", 
                    handler: function () {
                        // the system settings field
                        this.debugModeField.reset();
                        this.mailFromField.reset();
                        this.sessionLengthField.reset();
                        this.simpleCronField.reset();
                        this.usernameField.getValue();
                        this.nameField.getValue();
                        this.emailField.getValue();
                        this.passwordField.getValue();
                        this.passwordConfirmField.getValue();

                    }, 
                    scope: this
                });
                
                // perferences form
                this.panel = new Ext.form.FormPanel({
                    id: "Mantis.SystemSetup.panel",
                    autoScroll:true,
                    items: [
                        this.debugModeFieldset,
                        this.mailFromFieldset,
                        this.sessionLengthFieldset,
                        this.simpleCronFieldset,
                        this.passwordFieldset,
                        {
                            layout:'hbox',
                            items: [
                                this.saveSettingsButton,
                                { html: '&nbsp;' },
                                this.resetSettingsButton
                            ]
                        }
                    ],
                    cls: 'main-form-panel',
                    bodyStyle: "padding:5px;"
                });
                
                // Add to the main panel
                Mantis.Application.addPanel(this.panel);
            }
            
            Mantis.Application.showPanel('Mantis.SystemSetup.panel');
        },
        /** Saves the settings */
        saveSettings: function() {
            // check if the form is valid
            if (this.panel.getForm().isValid()) {
                // show that something is happening
                Ext.Msg.wait('Save Settings','Saving system settings',{
                    closable:false,
                    modal:true
                });
                
                // save the values
                var conn = new Ext.data.Connection();
                
                // send the logout request
                conn.request({
                    url:'api/saveSettingsAndUser.php',
                    params: {
                        DEBUG_MODE: this.debugModeField.getValue(),
                        MAIL_FROM: this.mailFromField.getValue(),
                        SESSION_LENGTH: this.sessionLengthField.getValue(),
                        SIMPLE_CRON: this.simpleCronField.getValue(),
                        username: this.usernameField.getValue(),
                        name: this.nameField.getValue(),
                        email: this.emailField.getValue(),
                        password1: this.passwordField.getValue(),
                        password2: this.passwordConfirmField.getValue()
                    },
                    callback: function (options, success, response) {
                        var res = Ext.decode(response.responseText);
                        if (success && res.success) {
                            // hide the 'wait' box
                            Ext.Msg.hide();
                            // notify the user that the setting shave been updated
                            Ext.Msg.alert("Installed", "Mantis has now been successfully installed.<br /><br />"+
                                                       "Please delete the 'install' folder for security.<br /><br />"+
                                                       "You will now be redirected to the login page.", function () { window.location = '../' });
                        } else {
                            Ext.Msg.hide();
                            var msg = "Unknown system error";
                            if (res.info !== undefined) {
                                msg = res.info;
                            }
                            Ext.Msg.alert("Error", msg);
                        }
                    },
                    scope: this
                });
            }
        }
    };
} ();