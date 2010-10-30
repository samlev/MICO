/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/js/Mantis.ConfigSetup.js
 ** 
 ** Description: The configuration settings section of the system
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

Mantis.ConfigSetup = function () {
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
                    boxLabel: 'Use automatic path settings (Recommended)',
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
                    fieldLabel: 'File System Root Directory',
                    disabled:true
                });
                // WEB_DOMAIN field
                this.WEB_DOMAIN_Field = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: FS_ROOT,
                    fieldLabel: 'Web Domain',
                    disabled:true
                });
                // WEB_ROOT field
                this.WEB_ROOT_Field = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: FS_ROOT,
                    fieldLabel: 'Web Root',
                    disabled:true
                });
                // APP_ROOT field
                this.APP_ROOT_Field = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: FS_ROOT,
                    fieldLabel: 'Application Root',
                    disabled:true
                });
                
                // path settings fieldset
                this.pathSettingsFieldset = new Ext.form.FieldSet({
                    title:'Filesystem and path settings',
                    items: [
                        {
                            html: 'The following settings define where Mantis is on your server, '+
                                  'and how you access it over the internet. The advanced settings '+
                                  'are only advisable if you know exactly what you are doing.',
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
                    fieldLabel: 'Host name'
                });
                // username field
                this.userField = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: '',
                    fieldLabel: 'User name'
                });
                // password field
                this.passField = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: '',
                    fieldLabel: 'Password'
                });
                // database name field
                this.nameField = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: false,
                    required: true,
                    value: '',
                    fieldLabel: 'Database'
                });
                // table prefix field field
                this.prefField = new Ext.form.TextField ({
                    width: 200, 
                    allowBlank: true,
                    required: false,
                    value: 'mantis_',
                    fieldLabel: 'Table prefix'
                });
                
                // path settings fieldset
                this.databaseSettingsFieldset = new Ext.form.FieldSet({
                    title:'Database settings',
                    items: [
                        {
                            html: 'The following settings are for your MySQL database. '+
                                  'The table prefix will keep Mantis data separate from '+
                                  'other tables if Mantis is sharing a database with '+
                                  'other applications.',
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
                        this.prefField.setValue('mantis_');
                    }, 
                    scope: this
                });
                
                // perferences form
                this.panel = new Ext.form.FormPanel({
                    id: "Mantis.ConfigSetup.panel",
                    items: [
                        {
                            html:'<h1>Step 1: set up the database</h1>'
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
                Mantis.Application.addPanel(this.panel);
            }
            
            Mantis.Application.showPanel('Mantis.ConfigSetup.panel');
        },
        saveSettings: function() {
            // check if the form is valid
            if (this.panel.getForm().isValid()) {
                // show that something is happening
                Ext.Msg.wait('Checking Settings','Checking database settings',{
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
                            Ext.Msg.wait('Installing','Installing Mantis',{
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
                                        Ext.Msg.alert('Installing','Step 1 complete. Next step is to set up system configuration.', function () { Mantis.SystemSetup.show() });
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