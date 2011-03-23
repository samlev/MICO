/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/admin/Mico.SystemSettings.js
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

Mico.SystemSettings = function () {
    // menu id
    var menuId;
    
    // edit fields
    var debugModeField;
    var debugModeFieldset;
    var mailFromField;
    var mailFromFieldset;
    var sessionLengthField;
    var sessionLengthFieldset;
    var simpleCronField;
    var simpleCronFieldset;
    
    // buttons
    var saveSettingsButton;
    var resetSettingsButton;
    
    // main panel
    var panel;
    
    return {
        /** Adds the link to the menu */
        init: function () {
            if (this.menuId == undefined) {
                this.menuId = Mico.SystemMenu.addItem(Mico.Lang.SystemSettings.menu_text, 'Mico.SystemSettings.show()','user');
            }
        },
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // ensure that the menu item is initialised
                if (this.menuId == undefined) {
                    this.init();
                }
                // debug mode
                this.debugModeField = new Ext.form.Checkbox({
                    checked: false,
                    disabled: true,
                    hideLabel: true,
                    boxLabel: Mico.Lang.SystemSettings.debugModeField_boxLabel
                });
                
                // debug mode fieldset
                this.debugModeFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSettings.debugModeFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSettings.debugModeFieldset_description,
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
                    value: '',
                    disabled: true,
                    hideLabel: true
                });
                
                // mail from fieldset
                this.mailFromFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSettings.mailFromFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSettings.mailFromFieldset_description,
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
                        fields:['data','display'],
                        data: [
                            ['30 minutes',Mico.Lang.SystemSettings.sessionLengthField_data.halfhour],
                            ['1 hour',Mico.Lang.SystemSettings.sessionLengthField_data.onehour],
                            ['2 hours',Mico.Lang.SystemSettings.sessionLengthField_data.twohours],
                            ['1 day',Mico.Lang.SystemSettings.sessionLengthField_data.oneday],
                            ['3 days',Mico.Lang.SystemSettings.sessionLengthField_data.threedays],
                            ['1 week',Mico.Lang.SystemSettings.sessionLengthField_data.oneweek],
                            ['2 weeks',Mico.Lang.SystemSettings.sessionLengthField_data.twoweeks],
                            ['1 month',Mico.Lang.SystemSettings.sessionLengthField_data.onemonth],
                            ['1 year',Mico.Lang.SystemSettings.sessionLengthField_data.oneyear]
                        ]
                    }),
                    displayField:'display',
                    valueField:'data',
                    mode:'local',
                    value: "30 minutes",
                    triggerAction:'all',
                    disabled: true,
                    hideLabel: true
                });
                
                // session length field set
                this.sessionLengthFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSettings.sessionLengthFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSettings.sessionLengthFieldset_description,
                            bodyStyle:'padding-bottom:3px;'
                        },
                        this.sessionLengthField
                    ]
                });
                
                // debug mode
                this.simpleCronField = new Ext.form.Checkbox({
                    checked: false,
                    disabled: true,
                    hideLabel: true,
                    boxLabel: Mico.Lang.SystemSettings.simpleCronField_boxLabel
                });
                
                // debug mode fieldset
                this.simpleCronFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSettings.simpleCronFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSettings.simpleCronFieldset_description,
                            bodyStyle:'padding-bottom:5px;'
                        },
                        // a simple field to give the 'cron' command
                        new Ext.form.TextField({
                            value:'*/5 * * * *  /usr/bin/wget -q '+APP_ROOT+'/notify.php > /dev/null',
                            width: 400,
                            hideLabel: true,
                            selectOnFocus:true,
                            listeners: {
                                scope:this,
                                "change": function (field, newVal, oldVal) {
                                    // reject any changes
                                    field.setValue(oldVal);
                                }
                            }
                        }),
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
                    valueField:'data',
                    mode:'local',
                    value: "EN",
                    triggerAction:'all',
                    disabled: true,
                    hideLabel: true
                });
                
                // L10n - language fieldset
                this.languageFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.SystemSettings.languageFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.SystemSettings.languageFieldset_description,
                            bodyStyle:'padding-bottom:3px;'
                        },
                        this.systemLanguageField
                    ]
                });
                
                // The button for saving the user's settings
                this.saveSettingsButton = new Ext.Button({
                    text: Mico.Lang.SystemSettings.saveSettingsButton_text, 
                    handler: function () {
                        this.saveSettings();
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.resetSettingsButton = new Ext.Button({
                    text: Mico.Lang.SystemSettings.resetSettingsButton_text, 
                    handler: function () {
                        this.loadSettings();
                    }, 
                    scope: this
                });
                
                // perferences form
                this.panel = new Ext.form.FormPanel({
                    id: "Mico.SystemSettings.panel",
                    items: [
                        this.debugModeFieldset,
                        this.mailFromFieldset,
                        this.sessionLengthFieldset,
                        this.simpleCronFieldset,
                        this.languageFieldset,
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
            
            Mico.Application.showPanel('Mico.SystemSettings.panel');
            this.loadSettings();
        },
        /** Loads the settings from the database **/
        loadSettings: function() {
            // disable the fields until we have loaded the values
            this.debugModeField.disable();
            this.mailFromField.disable();
            this.sessionLengthField.disable();
            this.simpleCronField.disable();
            this.systemLanguageField.disable();
            
            Ext.Msg.wait(Mico.Lang.SystemSettings.loadSettingsWait_title, Mico.Lang.SystemSettings.loadSettingsWait_text,{
                closable:false,
                modal:true
            });
            
            // now load the values
            var conn = new Ext.data.Connection();
            
            // send the logout request
            conn.request({
                url:APP_ROOT+'/api.php?f=getSystemSettings',
                params: {
                    session: Mico.User.getSession()
                },
                callback: function (options, success, response) {
                    var res = Ext.decode(response.responseText);
                    if (success && res.success) {
                        // enable the settings fields
                        this.debugModeField.enable();
                        this.mailFromField.enable();
                        this.sessionLengthField.enable();
                        this.simpleCronField.enable();
                        this.systemLanguageField.enable();
                        
                        // set the values
                        this.debugModeField.setValue(res.DEBUG_MODE);
                        this.mailFromField.setValue(res.MAIL_FROM);
                        this.sessionLengthField.setValue(res.SESSION_LENGTH);
                        this.simpleCronField.setValue(res.SIMPLE_CRON);
                        this.systemLanguageField.setValue(res.LANGUAGE);
                        
                        Ext.Msg.hide();
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
        },
        /** Saves the settings to the database */
        saveSettings: function() {
            // check if the form is valid
            if (this.panel.getForm().isValid()) {
                // show that something is happening
                Ext.Msg.wait(Mico.Lang.SystemSettings.saveSettingsWait_title, Mico.Lang.SystemSettings.saveSettingsWait_text,{
                    closable:false,
                    modal:true
                });
                
                // save the values
                var conn = new Ext.data.Connection();
                
                // send the logout request
                conn.request({
                    url:APP_ROOT+'/api.php?f=setSystemSettings',
                    params: {
                        session: Mico.User.getSession(),
                        DEBUG_MODE: this.debugModeField.getValue(),
                        MAIL_FROM: this.mailFromField.getValue(),
                        SESSION_LENGTH: this.sessionLengthField.getValue(),
                        SIMPLE_CRON: this.simpleCronField.getValue(),
                        LANGUAGE: this.systemLanguageField.getValue()
                    },
                    callback: function (options, success, response) {
                        var res = Ext.decode(response.responseText);
                        if (success && res.success) {
                            // hide the 'wait' box
                            Ext.Msg.hide();
                            // notify the user that the setting shave been updated
                            Ext.Msg.alert(Mico.Lang.SystemSettings.saveSettingsConfirmation_title, Mico.Lang.SystemSettings.saveSettingsConfirmation_text);
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