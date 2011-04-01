/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/js/Mico.SystemSetup.js
 ** 
 ** Description: The system settings section of the system
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

Mico.SystemSetup = function () {
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
                    boxLabel: Mico.Lang.SystemSetup.debugModeField_boxLabel
                });
                
                // debug mode fieldset
                this.debugModeFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSetup.debugModeFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSetup.debugModeFieldset_description,
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
                    emptyText: 'mico@example.com',
                    hideLabel: true
                });
                
                // mail from fieldset
                this.mailFromFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSetup.mailFromFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSetup.mailFromFieldset_description,
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
                            ['30 minutes',Mico.Lang.SystemSetup.sessionLengthField_data.halfhour],
                            ['1 hour',Mico.Lang.SystemSetup.sessionLengthField_data.onehour],
                            ['2 hours',Mico.Lang.SystemSetup.sessionLengthField_data.twohours],
                            ['1 day',Mico.Lang.SystemSetup.sessionLengthField_data.oneday],
                            ['3 days',Mico.Lang.SystemSetup.sessionLengthField_data.threedays],
                            ['1 week',Mico.Lang.SystemSetup.sessionLengthField_data.oneweek],
                            ['2 weeks',Mico.Lang.SystemSetup.sessionLengthField_data.twoweeks],
                            ['1 month',Mico.Lang.SystemSetup.sessionLengthField_data.onemonth],
                            ['1 year',Mico.Lang.SystemSetup.sessionLengthField_data.oneyear]
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
                    title: Mico.Lang.SystemSetup.sessionLengthFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSetup.sessionLengthFieldset_description,
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
                    boxLabel: Mico.Lang.SystemSetup.simpleCronField_boxLabel
                });
                
                // simple cron fieldset
                this.simpleCronFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSetup.simpleCronFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSetup.simpleCronFieldset_description,
                            bodyStyle:'padding-bottom:5px;'
                        },
                        this.simpleCronField
                    ]
                });
                
                // L10n - language
                this.systemLanguageField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    required:true,
                    store: new Ext.data.ArrayStore ({
                        fields:['lang','display'],
                        data: Mico.Utils.CommonStores.languageOptions
                    }),
                    displayField:'display',
                    valueField:'lang',
                    mode:'local',
                    value: LANGUAGE,
                    triggerAction:'all',
                    hideLabel: true
                });
                
                // L10n - language fieldset
                this.languageFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSetup.languageFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSetup.languageFieldset_description,
                            bodyStyle:'padding-bottom:3px;'
                        },
                        this.systemLanguageField
                    ]
                });
                
                // now the user settings
                // the username field
                this.usernameField = new Ext.form.TextField ({
                    fieldLabel: Mico.Lang.SystemSetup.usernameField_fieldLabel, 
                    width: 200, 
                    allowBlank: false,
                    required:true,
                    blankText: Mico.Lang.SystemSetup.usernameField_blankText
                });
                // the user's name field
                this.nameField = new Ext.form.TextField ({
                    fieldLabel: Mico.Lang.SystemSetup.nameField_fieldLabel, 
                    width: 200, 
                    allowBlank: false, 
                    required:true,
                    blankText: Mico.Lang.SystemSetup.nameField_blankText
                });
                // the user's email field
                this.emailField = new Ext.form.TextField ({
                    fieldLabel: Mico.Lang.SystemSetup.emailField_fieldLabel, 
                    width: 200, 
                    allowBlank: false, 
                    required:true,
                    blankText: Mico.Lang.SystemSetup.emailField_blankText
                });
                
                // password field
                this.passwordField = new Ext.form.TextField ({
                    name: "password1", 
                    fieldLabel: Mico.Lang.SystemSetup.passwordField_fieldLabel, 
                    inputType: "password", 
                    width: 200, 
                    allowBlank: false, 
                    required:true,
                    blankText: Mico.Lang.SystemSetup.passwordField_blankText,
                    enableKeyEvents: true
                });
                
                // check the strength of the password
                this.passwordField.on('keyup', function() {
                    var pass = this.passwordField.getValue();
                    var points = Mico.Utils.passwordStrength(pass);
                    
                    // password strength
                    var text = Mico.Lang.SystemSetup.passwordStrength_weak;
                    
                    // test the strength
                    if (points == 0) {
                        text = Mico.Lang.SystemSetup.passwordStrength_blank;
                    } else if (points > 35) {
                        text = Mico.Lang.SystemSetup.passwordStrength_verystrong;
                    } else if (points > 25) {
                        text = Mico.Lang.SystemSetup.passwordStrength_strong;
                    } else if (points > 10) {
                        text = Mico.Lang.SystemSetup.passwordStrength_medium;
                    }
                    
                    // update the inidcator
                    this.passwordStrengthIndicator.updateProgress((points/50),text,true);
                }, this);
                
                // Simple password strength indicator
                this.passwordStrengthIndicator = new Ext.ProgressBar({
                    fieldLabel: Mico.Lang.SystemSetup.passwordStrengthIndicator_fieldLabel,
                    text: Mico.Lang.SystemSetup.passwordStrength_blank,
                    value: 0,
                    width:200
                })
                
                // reset password form 'password confirmation' field
                this.passwordConfirmField = new Ext.form.TextField ({
                    name: "password2", 
                    fieldLabel: Mico.Lang.SystemSetup.passwordConfirmField_fieldLabel, 
                    inputType: "password", 
                    width: 200, 
                    allowBlank: false, 
                    required:true,
                    blankText: Mico.Lang.SystemSetup.passwordConfirmField_blankText
                });
                
                this.passwordFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSetup.passwordFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSetup.passwordFieldset_description,
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
                    text: Mico.Lang.SystemSetup.saveSettingsButton_text, 
                    handler: function () {
                        this.saveSettings();
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.resetSettingsButton = new Ext.Button({
                    text: Mico.Lang.SystemSetup.resetSettingsButton_text, 
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
                        // update the inidcator
                        this.passwordStrengthIndicator.updateProgress(0,Mico.Lang.SystemSetup.passwordStrength_blank,false);
                    }, 
                    scope: this
                });
                
                // perferences form
                this.panel = new Ext.form.FormPanel({
                    id: "Mico.SystemSetup.panel",
                    autoScroll:true,
                    items: [
                        this.debugModeFieldset,
                        this.mailFromFieldset,
                        this.sessionLengthFieldset,
                        this.simpleCronFieldset,
                        this.languageFieldset,
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
                Mico.Application.addPanel(this.panel);
            }
            
            Mico.Application.showPanel('Mico.SystemSetup.panel');
        },
        /** Saves the settings */
        saveSettings: function() {
            // check if the form is valid
            if (this.panel.getForm().isValid()) {
                // show that something is happening
                Ext.Msg.wait(Mico.Lang.SystemSetup.saveSettingsWait_title, Mico.Lang.SystemSetup.saveSettingsWait_text,{
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
                        LANGUAGE: this.systemLanguageField.getValue(),
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
                            Ext.Msg.alert(Mico.Lang.SystemSetup.saveSettingsConfirmation_title, Mico.Lang.SystemSetup.saveSettingsConfirmation_text, function () { window.location = '../' });
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
    };
} ();