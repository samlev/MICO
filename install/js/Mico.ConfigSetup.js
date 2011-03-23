/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/js/Mico.ConfigSetup.js
 ** 
 ** Description: The configuration settings section of the system
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

Mico.ConfigSetup = function () {
    // Path settings fields
    var automaticPathField;
    var FS_ROOT_Field;
    var WEB_DOMAIN_Field;
    var WEB_ROOT_Field;
    var APP_ROOT_Field;
    var pathSettingsFieldset;
    
    // database settings
    var hostField;
    var userField;
    var passField;
    var nameField;
    var prefField;
    var databaseSettingsFieldset;
    
    // buttons
    var saveSettingsButton;
    var resetSettingsButton;
    
    // main panel
    var panel;
    
    return {
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // automatic path field
                this.automaticPathField = new Ext.form.Checkbox({
                    checked: true,
                    hideLabel: true,
                    boxLabel: Mico.Lang.ConfigSetup.automaticPathField_boxLabel,
                    listeners: {
                        scope: this,
                        "check": function () {
                            // if using the automatic path settings, disable the path setting fields
                            if (this.automaticPathField.getValue()) {
                                this.FS_ROOT_Field.disable();
                                this.WEB_DOMAIN_Field.disable();
                                this.WEB_ROOT_Field.disable();
                                this.APP_ROOT_Field.disable();
                            } else {
                                this.FS_ROOT_Field.enable();
                                this.WEB_DOMAIN_Field.enable();
                                this.WEB_ROOT_Field.enable();
                                this.APP_ROOT_Field.enable();
                            }
                        }
                    }
                });
                
                // FS_ROOT field
                this.FS_ROOT_Field = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: FS_ROOT,
                    fieldLabel: Mico.Lang.ConfigSetup.FS_ROOT_Field_fieldLabel,
                    disabled:true
                });
                // WEB_DOMAIN field
                this.WEB_DOMAIN_Field = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: WEB_DOMAIN,
                    fieldLabel: Mico.Lang.ConfigSetup.WEB_DOMAIN_Field_fieldLabel,
                    disabled:true
                });
                // WEB_ROOT field
                this.WEB_ROOT_Field = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: WEB_ROOT,
                    fieldLabel: Mico.Lang.ConfigSetup.WEB_ROOT_Field_fieldLabel,
                    disabled:true
                });
                // APP_ROOT field
                this.APP_ROOT_Field = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: APP_ROOT,
                    fieldLabel: Mico.Lang.ConfigSetup.APP_ROOT_Field_fieldLabel,
                    disabled:true
                });
                
                // path settings fieldset
                this.pathSettingsFieldset = new Ext.form.FieldSet({
                    title:Mico.Lang.ConfigSetup.pathSettingsFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.ConfigSetup.pathSettingsFieldset_description,
                            bodyStyle:'padding-bottom:3px;'
                        },
                        this.automaticPathField,
                        this.FS_ROOT_Field,
                        this.WEB_DOMAIN_Field,
                        this.WEB_ROOT_Field,
                        this.APP_ROOT_Field
                    ]
                });
                
                // database host field
                this.hostField = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: 'localhost',
                    fieldLabel: Mico.Lang.ConfigSetup.hostField_fieldLabel
                });
                // username field
                this.userField = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    fieldLabel: Mico.Lang.ConfigSetup.userField_fieldLabel
                });
                // password field
                this.passField = new Ext.form.TextField ({
                    width: 200, 
                    fieldLabel: Mico.Lang.ConfigSetup.passField_fieldLabel
                });
                // database name field
                this.nameField = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    fieldLabel: Mico.Lang.ConfigSetup.nameField_fieldLabel
                });
                // table prefix field field
                this.prefField = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: true,
                    required: false,
                    value: 'mico_',
                    fieldLabel: Mico.Lang.ConfigSetup.prefField_fieldLabel
                });
                
                // path settings fieldset
                this.databaseSettingsFieldset = new Ext.form.FieldSet({
                    title:Mico.Lang.ConfigSetup.databaseSettingsFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.ConfigSetup.databaseSettingsFieldset_description,
                            bodyStyle:'padding-bottom:3px;'
                        },
                        this.hostField,
                        this.userField,
                        this.passField,
                        this.nameField,
                        this.prefField
                    ]
                });
                
                
                // The button for saving the user's settings
                this.saveSettingsButton = new Ext.Button({
                    text: Mico.Lang.ConfigSetup.saveSettingsButton_text, 
                    handler: function () {
                        this.saveSettings();
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.resetSettingsButton = new Ext.Button({
                    text: Mico.Lang.ConfigSetup.resetSettingsButton_text, 
                    handler: function () {
                        // set the path fields
                        this.automaticPathField.setValue(true);
                        this.FS_ROOT_Field.setValue(FS_ROOT);
                        this.WEB_DOMAIN_Field.setValue(WEB_DOMAIN);
                        this.WEB_ROOT_Field.setValue(WEB_ROOT);
                        this.APP_ROOT_Field.setValue(APP_ROOT);
                        // disable the path fields
                        this.FS_ROOT_Field.disable();
                        this.WEB_DOMAIN_Field.disable();
                        this.WEB_ROOT_Field.disable();
                        this.APP_ROOT_Field.disable();
                        // set the database fields
                        this.hostField.setValue('localhost');
                        this.userField.setValue('');
                        this.passField.setValue('');
                        this.nameField.setValue('');
                        this.prefField.setValue('mico_');
                    }, 
                    scope: this
                });
                
                // perferences form
                this.panel = new Ext.form.FormPanel({
                    id: "Mico.ConfigSetup.panel",
                    items: [
                        {
                            html:'<h1>'+Mico.Lang.ConfigSetup.instructions+'</h1>'
                        },
                        this.pathSettingsFieldset,
                        this.databaseSettingsFieldset,
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
            
            Mico.Application.showPanel('Mico.ConfigSetup.panel');
        },
        /** Saves the settings */
        saveSettings: function() {
            // check if the form is valid
            if (this.panel.getForm().isValid()) {
                // show that something is happening
                Ext.Msg.wait(Mico.Lang.ConfigSetup.checkSettingsWait_title,Mico.Lang.ConfigSetup.checkSettingsWait_text,{
                    closable:false,
                    modal:true
                });
                
                var conn = new Ext.data.Connection();
                
                // Check that we can connect to the database
                conn.request({
                    url:'api/checkDBSettings.php',
                    params: {
                        host: this.hostField.getValue(),
                        user: this.userField.getValue(),
                        pass: this.passField.getValue(),
                        name: this.nameField.getValue()
                    },
                    callback: function (options, success, response) {
                        var res = Ext.decode(response.responseText);
                        if (success && res.success) {
                            // hide the 'wait' box
                            Ext.Msg.hide();
                            // open another wait box
                            Ext.Msg.wait(Mico.Lang.ConfigSetup.saveSettingsWait_title,Mico.Lang.ConfigSetup.saveSettingsWait_text,{
                                closable:false,
                                modal:true
                            });
                            
                            // now send the 'save' call
                            var conn2 = new Ext.data.Connection();
                            
                            // Check that we can connect to the database
                            conn2.request({
                                url:'api/installConfig.php',
                                params: {
                                    autopath: (this.automaticPathField.getValue()?1:0),
                                    FS_ROOT: this.FS_ROOT_Field.getValue(),
                                    WEB_DOMAIN: this.WEB_DOMAIN_Field.getValue(),
                                    WEB_ROOT: this.WEB_ROOT_Field.getValue(),
                                    APP_ROOT: this.APP_ROOT_Field.getValue(),
                                    host: this.hostField.getValue(),
                                    user: this.userField.getValue(),
                                    pass: this.passField.getValue(),
                                    name: this.nameField.getValue(),
                                    prefix: this.prefField.getValue()
                                },
                                callback: function (options, success, response) {
                                    var res = Ext.decode(response.responseText);
                                    if (success && res.success) {
                                        // hide the 'wait' box
                                        Ext.Msg.hide();
                                        
                                        // next step - configuring the first user
                                        Ext.Msg.alert(Mico.Lang.ConfigSetup.saveSettingsConfirmation_title, Mico.Lang.ConfigSetup.saveSettingsConfirmation_text, function () { Mico.SystemSetup.show() });
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