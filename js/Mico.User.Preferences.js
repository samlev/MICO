/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mico.User.Preferences.js
 ** 
 ** Description: The main 'user preferences' section of the system
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

Mico.User.Preferences = function () {
    // menu id
    var menuId;
    
    // My settings panel (name, email address)
    var nameField;
    var emailField;
    var settingsFieldset;
    // View preferences
    var timeFormatField;
    var dateFormatField;
    var callsPerPageField;
    var showCallsField;
    var orderCallsField;
    var showClosedField;
    var commentOrderField;
    var preferencesFieldset;
    // buttons and panel
    var saveSettingsButton;
    var clearSettingsButton;
    var settingsPanel;
    
    // Change password panel
    var oldPasswordField;
    var passwordField;
    var passwordStrengthIndicator;
    var passwordConfirmField;
    var changePasswordForm;
    var passwordChangeButton;
    var clearPasswordFormButton;
    
    
    // main panel
    var panel;
    
    return {
        /** Adds the link to the menu */
        init: function () {
            if (this.menuId == undefined) {
                this.menuId = Mico.SystemMenu.addItem(Mico.Lang.User.Preferences.menu_text, 'Mico.User.Preferences.show()','user');
            }
        },
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // ensure that the menu item is initialised
                if (this.menuId == undefined) {
                    this.init();
                }
                
                // User's name
                this.nameField = new Ext.form.TextField ({
                    fieldLabel: Mico.Lang.User.Preferences.nameField_fieldLabel, 
                    width: 135, 
                    allowBlank: false,
                    required: true,
                    value: Mico.User.getVar('name'),
                    blankText: Mico.Lang.User.Preferences.nameField_blankText
                });
                
                // User's email
                this.emailField = new Ext.form.TextField ({
                    fieldLabel: Mico.Lang.User.Preferences.emailField_fieldLabel, 
                    width: 135, 
                    allowBlank: false,
                    required: true,
                    value: Mico.User.getVar('email'),
                    blankText: Mico.Lang.User.Preferences.emailField_blankText
                });
                
                // settings fieldset
                this.settingsFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.User.Preferences.settingsFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.User.Preferences.settingsFieldset_description,
                            bodyStyle:'padding-bottom:8px;'
                        },
                        this.nameField,
                        this.emailField
                    ]
                });
                
                // the time format field
                this.timeFormatField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    required:true,
                    fieldLabel:Mico.Lang.User.Preferences.timeFormatField_fieldLabel,
                    store: new Ext.data.ArrayStore ({
                        fields:['format','display','example'],
                        data: [
                            ['g:ia',Mico.Lang.User.Preferences.timeFormatField_display.gia,'9:30am/9:30pm'],
                            ['H:i',Mico.Lang.User.Preferences.timeFormatField_display.Hi,'09:30/21:30'],
                            ['G:i',Mico.Lang.User.Preferences.timeFormatField_display.Gi,'9:30/21:30']
                        ]
                    }),
                    displayField:'display',
                    valueField:'format',
                    mode:'local',
                    value: Mico.User.getVarDefault('timeformat','g:ia'),
                    tpl:Mico.Utils.timedateTemplate(),
                    triggerAction:'all',
                    listWidth:250
                });
                
                // the date format field
                this.dateFormatField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    required:true,
                    fieldLabel:Mico.Lang.User.Preferences.dateFormatField_fieldLabel,
                    store: new Ext.data.ArrayStore ({
                        fields:['format','display','example'],
                        data: [
                            ['jS M, Y',Mico.Lang.User.Preferences.dateFormatField_display.jSMY,'21st Feb, 2010'],
                            ['d-m-Y',Mico.Lang.User.Preferences.dateFormatField_display.dmY,'21/02/2010'],
                            ['m-d-Y',Mico.Lang.User.Preferences.dateFormatField_display.mdY,'02/21/2010'],
                            ['Y-m-d',Mico.Lang.User.Preferences.dateFormatField_display.Ymd,'2010-02-21']
                        ]
                    }),
                    displayField:'display',
                    valueField:'format',
                    mode:'local',
                    value: Mico.User.getVarDefault('dateformat','jS M, Y'),
                    tpl:Mico.Utils.timedateTemplate(),
                    triggerAction:'all',
                    listWidth:250
                });
                
                // the calls per page field
                this.callsPerPageField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    required:true,
                    fieldLabel:Mico.Lang.User.Preferences.callsPerPageField_fieldLabel,
                    store: new Ext.data.ArrayStore ({
                        fields:['calls'],
                        data: [
                            ['10'],
                            ['15'],
                            ['30'],
                            ['50']
                        ]
                    }),
                    displayField:'calls',
                    valueField:'calls',
                    mode:'local',
                    value: Mico.User.getVarDefault('callsperpage','30'),
                    triggerAction:'all'
                });
                
                // show calls field
                this.showCallsField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    fieldLabel:Mico.Lang.User.Preferences.showCallsField_fieldLabel,
                    store: new Ext.data.ArrayStore ({
                        fields:['type','filter'],
                        data: Mico.Utils.CommonStores.callsSearchFilter
                    }),
                    displayField:'type',
                    valueField:'filter',
                    mode:'local',
                    value: Mico.User.getVarDefault('showcalls','assigned'),
                    triggerAction:'all'
                });
                
                // order calls field (cheat a bit with the store)
                this.orderCallsField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    fieldLabel:Mico.Lang.User.Preferences.orderCallsField_fieldLabel,
                    store:  new Ext.data.ArrayStore ({
                        fields:['type','filter'],
                        data: Mico.Utils.CommonStores.callsOrderFilter
                    }),
                    displayField:'type',
                    valueField:'filter',
                    mode:'local',
                    value: Mico.User.getVarDefault('ordercalls','recent'),
                    triggerAction:'all'
                });
                
                // show closed field
                this.showClosedField = new Ext.form.Checkbox({
                    fieldLabel: Mico.Lang.User.Preferences.showClosedField_fieldLabel,
                    checked: Mico.User.getVar('showclosed')
                });
                
                // comment order field
                this.commentOrderField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    fieldLabel:Mico.Lang.User.Preferences.commentOrderField_fieldLabel,
                    store: new Ext.data.ArrayStore ({
                        fields:['type','filter'],
                        data: Mico.Utils.CommonStores.commentOrder
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:Mico.User.getVarDefault('commentorder','newest'),
                    mode:'local',
                    triggerAction:'all'
                });
                
                // Language field
                this.languageField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    fieldLabel:Mico.Lang.User.Preferences.languageField_fieldLabel,
                    store: new Ext.data.ArrayStore ({
                        fields:['lang','display'],
                        data: Mico.Utils.CommonStores.languageOptions
                    }),
                    displayField:'display',
                    valueField:'lang',
                    value:Mico.User.getVarDefault('lang',DEFAULT_LANGUAGE),
                    mode:'local',
                    triggerAction:'all'
                });
                
                // preferences fieldset
                this.preferencesFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.User.Preferences.preferencesFieldset_title,
                    items: [
                        {
                            html: Mico.Lang.User.Preferences.preferencesFieldset_description,
                            bodyStyle:'padding-bottom:8px;'
                        },
                        this.timeFormatField,
                        this.dateFormatField,
                        this.callsPerPageField,
                        this.showCallsField,
                        this.orderCallsField,
                        this.showClosedField,
                        this.commentOrderField,
                        this.languageField
                    ]
                });
                
                // The button for saving the user's settings
                this.saveSettingsButton = new Ext.Button({
                    text: Mico.Lang.User.Preferences.saveSettingsButton_text, 
                    handler: function () {
                        if (this.settingsPanel.getForm().isValid()) {
                            // notify the user that we're saving their settings
                            Ext.Msg.wait(Mico.Lang.User.Preferences.saveSettingsButtonWait_title,Mico.Lang.User.Preferences.saveSettingsButtonWait_text,{
                                closable:false,
                                modal:true
                            });
                            
                            // get the settings
                            var name = String(this.nameField.getValue()).trim();
                            var email = String(this.emailField.getValue()).trim();
                            var timeformat = String(this.timeFormatField.getValue()).trim();
                            var dateformat = String(this.dateFormatField.getValue()).trim();
                            var callsperpage = String(this.callsPerPageField.getValue()).trim();
                            var showcalls = String(this.showCallsField.getValue()).trim();
                            var ordercalls = String(this.orderCallsField.getValue()).trim();
                            var showclosed = this.showClosedField.getValue();
                            var commentorder = String(this.commentOrderField.getValue()).trim();
                            var lang = String(this.languageField.getValue()).trim();
                            
                            // set the values that we can
                            if (name.length) { Mico.User.setVar('name',name); }
                            if (email.length) { Mico.User.setVar('email',email); }
                            Mico.User.setVar('timeformat',timeformat);
                            Mico.User.setVar('dateformat',dateformat);
                            Mico.User.setVar('callsperpage',callsperpage);
                            Mico.User.setVar('showcalls',showcalls);
                            Mico.User.setVar('ordercalls',ordercalls);
                            Mico.User.setVar('showclosed',showclosed);
                            Mico.User.setVar('commentorder',commentorder);
                            Mico.User.setVar('lang',lang);
                            
                            // and commit the changes
                            Mico.User.commit();
                        }
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.resetSettingsButton = new Ext.Button({
                    text: Mico.Lang.User.Preferences.resetSettingsButton_text, 
                    handler: function () {
                        // reset all the variables from the user object
                        this.nameField.setValue(Mico.User.getVar('name'));
                        this.emailField.setValue(Mico.User.getVar('email'));
                        this.timeFormatField.setValue(Mico.User.getVarDefault('timeformat','g:ia'));
                        this.dateFormatField.setValue(Mico.User.getVarDefault('dateformat','jS M, Y'));
                        this.callsPerPageField.setValue(Mico.User.getVarDefault('callsperpage','30'));
                        this.showCallsField.setValue(Mico.User.getVarDefault('showcalls','assigned'));
                        this.orderCallsField.setValue(Mico.User.getVarDefault('ordercalls','recent'));
                        this.showClosedField.setValue(Mico.User.getVarDefault('showclosed',false));
                        this.commentOrderField.setValue(Mico.User.getVarDefault('commentorder','newest'));
                        this.languageField.setValue(Mico.User.getVarDefault('lang',DEFAULT_LANGUAGE));
                    }, 
                    scope: this
                });
                
                // perferences form
                this.settingsPanel = new Ext.form.FormPanel({
                    id: "Mico.User.Preferences.settingsPanel",
                    title:Mico.Lang.User.Preferences.settingsPanel_title,
                    labelWidth:140,
                    layout:'form',
                    items: [
                        this.settingsFieldset,
                        this.preferencesFieldset,
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
                    bodyStyle: "padding:5px;",
                    autoScroll:true
                });
                
                // The old password
                this.oldPasswordField = new Ext.form.TextField ({
                    fieldLabel: Mico.Lang.User.Preferences.oldPasswordField_fieldLabel, 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: Mico.Lang.User.Preferences.oldPasswordField_blankText
                });
                
                // set password form 'password' field
                this.passwordField = new Ext.form.TextField ({
                    fieldLabel: Mico.Lang.User.Preferences.passwordField_fieldLabel, 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: Mico.Lang.User.Preferences.passwordField_blankText,
                    enableKeyEvents: true
                });
                
                // check the strength of the password
                this.passwordField.on('keyup', function() {
                    var pass = this.passwordField.getValue();
                    var points = Mico.Utils.passwordStrength(pass);
                    
                    // password strength
                    var text = Mico.Lang.User.Preferences.passwordStrength_weak;
                    
                    // test the strength
                    if (points == 0) {
                        text = Mico.Lang.User.Preferences.passwordStrength_blank;
                    } else if (points > 35) {
                        text = Mico.Lang.User.Preferences.passwordStrength_verystrong;
                    } else if (points > 25) {
                        text = Mico.Lang.User.Preferences.passwordStrength_strong;
                    } else if (points > 10) {
                        text = Mico.Lang.User.Preferences.passwordStrength_medium;
                    }
                    
                    // update the inidcator
                    this.passwordStrengthIndicator.updateProgress((points/50),text,true);
                }, this);
                
                // Simple password strength indicator
                this.passwordStrengthIndicator = new Ext.ProgressBar({
                    fieldLabel: Mico.Lang.User.Preferences.passwordStrengthIndicator_fieldLabel,
                    text: Mico.Lang.User.Preferences.passwordStrength_blank,
                    value: 0,
                    width:135
                })
                
                // reset password form 'password confirmation' field
                this.passwordConfirmField = new Ext.form.TextField ({
                    fieldLabel: Mico.Lang.User.Preferences.passwordConfirmField_fieldLabel, 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: Mico.Lang.User.Preferences.passwordConfirmField_blankText
                });
                
                // passowrd fieldset
                this.passwordFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.User.Preferences.passwordFieldset_title,
                    items: [
                        this.oldPasswordField,
                        this.passwordField,
                        this.passwordStrengthIndicator,
                        this.passwordConfirmField
                    ]
                });
                
                // The button for changing the user's password
                this.passwordChangeButton = new Ext.Button({
                    text: Mico.Lang.User.Preferences.passwordChangeButton_text, 
                    handler: function () {
                        Ext.Msg.wait(Mico.Lang.User.Preferences.passwordChangeButtonWait_title,Mico.Lang.User.Preferences.passwordChangeButtonWait_text,{
                            closable:false,
                            modal:true
                        });
                        
                        var conn = new Ext.data.Connection();
                        
                        // send the logout request
                        conn.request({
                            url:APP_ROOT+'/api.php?f=changePassword',
                            params: {
                                session: Mico.User.getSession(),
                                oldpass: this.oldPasswordField.getValue(),
                                password1: this.passwordField.getValue(),
                                password2: this.passwordConfirmField.getValue()
                            },
                            callback: function (options, success, response) {
                                var res = Ext.decode(response.responseText);
                                if (success && res.success) {
                                    // hide the wait message
                                    Ext.Msg.hide();
                                    // notify the user that it was successful
                                    Ext.Msg.alert(Mico.Lang.User.Preferences.passwordChangeButtonConfirmation_title, Mico.Lang.User.Preferences.passwordChangeButtonConfirmation_text);
                                    // clear the form
                                    this.changePasswordForm.getForm().reset();
                                    this.passwordStrengthIndicator.updateProgress(0,Mico.Lang.User.Preferences.passwordStrength_blank,false);
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
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.clearPasswordFormButton = new Ext.Button({
                    text: Mico.Lang.User.Preferences.clearPasswordFormButton_text, 
                    handler: function () {
                        // clear the form
                        this.changePasswordForm.getForm().reset();
                        this.passwordStrengthIndicator.updateProgress(0,Mico.Lang.User.Preferences.passwordStrength_blank,false);
                    }, 
                    scope: this
                });
                
                // set up form
                this.changePasswordForm = new Ext.form.FormPanel({
                    id: "Mico.User.Preferences.changePasswordForm",
                    title:Mico.Lang.User.Preferences.changePasswordForm_title,
                    labelWidth:140,
                    layout:'form',
                    items: [
                        {
                            html: Mico.Lang.User.Preferences.changePasswordForm_description,
                            bodyStyle:'padding-bottom:8px;'
                        },
                        this.passwordFieldset,
                        {
                            layout:'hbox',
                            items: [
                                this.passwordChangeButton,
                                { html: '&nbsp;' },
                                this.clearPasswordFormButton
                            ]
                        }
                    ], 
                    cls: 'main-form-panel',
                    bodyStyle: "padding:5px;",
                    autoScroll:true
                });
                
                // Send notifications field
                this.sendNotificationsField = new Ext.form.Checkbox({
                    fieldLabel:Mico.Lang.User.Preferences.sendNotificationsField_fieldLabel,
                    checked: Mico.User.getVar('sendnotifications')
                });
                
                // critical calls
                this.criticalNotifyTime = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 150,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyTime
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('criticalnotifytime','immediate'),
                    mode:'local',
                    triggerAction:'all'
                });
                this.criticalNotifyReason = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 120,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyReason
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('criticalnotifyreason','updated'),
                    mode:'local',
                    triggerAction:'all'
                });
                var criticalForm = {
                    layout:'hbox',
                    items:[
                        {html:Mico.Lang.User.Preferences.criticalNotifyTime_label,bodyStyle:'padding-top:5px;', width:190},
                        this.criticalNotifyTime,
                        {html:'&nbsp;'+Mico.Lang.User.Preferences.criticalNotifyReason_label+'&nbsp;',bodyStyle:'padding-top:5px;'},
                        this.criticalNotifyReason
                    ],
                    bodyStyle:'padding-top:2px;'
                };
                
                // urgent calls
                this.urgentNotifyTime = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 150,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyTime
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('urgentnotifytime','30mins'),
                    mode:'local',
                    triggerAction:'all'
                });
                this.urgentNotifyReason = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 120,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyReason
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('urgentnotifyreason','updated'),
                    mode:'local',
                    triggerAction:'all'
                });
                var urgentForm = {
                    layout:'hbox',
                    items:[
                        {html:Mico.Lang.User.Preferences.urgentNotifyTime_label,bodyStyle:'padding-top:5px;', width:190},
                        this.urgentNotifyTime,
                        {html:'&nbsp;'+Mico.Lang.User.Preferences.urgentNotifyReason_label+'&nbsp;',bodyStyle:'padding-top:5px;'},
                        this.urgentNotifyReason
                    ],
                    bodyStyle:'padding-top:2px;'
                };
                
                // moderate calls
                this.moderateNotifyTime = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 150,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyTime
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('moderatenotifytime','60mins'),
                    mode:'local',
                    triggerAction:'all'
                });
                this.moderateNotifyReason = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 120,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyReason
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('moderatenotifyreason','updated'),
                    mode:'local',
                    triggerAction:'all'
                });
                var moderateForm = {
                    layout:'hbox',
                    items:[
                        {html:Mico.Lang.User.Preferences.moderateNotifyTime_label,bodyStyle:'padding-top:5px;', width:190},
                        this.moderateNotifyTime,
                        {html:'&nbsp;'+Mico.Lang.User.Preferences.moderateNotifyReason_label+'&nbsp;',bodyStyle:'padding-top:5px;'},
                        this.moderateNotifyReason
                    ],
                    bodyStyle:'padding-top:2px;'
                };
                
                // minor calls
                this.minorNotifyTime = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 150,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyTime
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('minornotifytime','60mins'),
                    mode:'local',
                    triggerAction:'all'
                });
                this.minorNotifyReason = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 120,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyReason
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('minornotifyreason','assigned'),
                    mode:'local',
                    triggerAction:'all'
                });
                var minorForm = {
                    layout:'hbox',
                    items:[
                        {html:Mico.Lang.User.Preferences.minorNotifyTime_label,bodyStyle:'padding-top:5px;', width:190},
                        this.minorNotifyTime,
                        {html:'&nbsp;'+Mico.Lang.User.Preferences.minorNotifyReason_label+'&nbsp;',bodyStyle:'padding-top:5px;'},
                        this.minorNotifyReason
                    ],
                    bodyStyle:'padding-top:2px;'
                };
                
                // negligible calls
                this.negligibleNotifyTime = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 150,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyTime
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('negligiblenotifytime','never'),
                    mode:'local',
                    triggerAction:'all'
                });
                this.negligibleNotifyReason = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 120,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: Mico.Utils.CommonStores.notifyReason
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mico.User.getVarDefault('negligiblenotifyreason','assigned'),
                    mode:'local',
                    triggerAction:'all'
                });
                var negligibleForm = {
                    layout:'hbox',
                    items:[
                        {html:Mico.Lang.User.Preferences.negligibleNotifyTime_label,bodyStyle:'padding-top:5px;', width:190},
                        this.negligibleNotifyTime,
                        {html:'&nbsp;'+Mico.Lang.User.Preferences.negligibleNotifyReason_label+'&nbsp;',bodyStyle:'padding-top:5px;'},
                        this.negligibleNotifyReason
                    ],
                    bodyStyle:'padding-top:2px;'
                };
                
                // notification settings fieldset
                this.notificationFieldset = new Ext.form.FieldSet({
                    title: Mico.Lang.User.Preferences.notificationFieldset_title,
                    items: [
                        this.sendNotificationsField,
                        criticalForm,
                        urgentForm,
                        moderateForm,
                        minorForm,
                        negligibleForm
                    ]
                });
                
                // The button for saving notification settings
                this.saveNotificationsButton = new Ext.Button({
                    text: Mico.Lang.User.Preferences.saveNotificationsButton_text, 
                    handler: function () {
                        if (this.notificationsForm.getForm().isValid()) {
                            // notify the user that we're saving their settings
                            Ext.Msg.wait(Mico.Lang.User.Preferences.saveNotificationsButtonWait_title,Mico.Lang.User.Preferences.saveNotificationsButtonWait_text,{
                                closable:false,
                                modal:true
                            });
                            
                            // get the settings
                            var sendnotifications = this.sendNotificationsField.getValue();
                            var criticalnotifytime = String(this.criticalNotifyTime.getValue()).trim();
                            var criticalnotifyreason = String(this.criticalNotifyReason.getValue()).trim();
                            var urgentnotifytime = String(this.urgentNotifyTime.getValue()).trim();
                            var urgentnotifyreason = String(this.urgentNotifyReason.getValue()).trim();
                            var moderatenotifytime = String(this.moderateNotifyTime.getValue()).trim();
                            var moderatenotifyreason = String(this.moderateNotifyReason.getValue()).trim();
                            var minornotifytime = String(this.minorNotifyTime.getValue()).trim();
                            var minornotifyreason = String(this.minorNotifyReason.getValue()).trim();
                            var negligiblenotifytime = String(this.negligibleNotifyTime.getValue()).trim();
                            var negligiblenotifyreason = String(this.negligibleNotifyReason.getValue()).trim();
                            
                            // set the values that we can
                            Mico.User.setVar('sendnotifications',sendnotifications);
                            Mico.User.setVar('criticalnotifytime',criticalnotifytime);
                            Mico.User.setVar('criticalnotifyreason',criticalnotifyreason);
                            Mico.User.setVar('urgentnotifytime',urgentnotifytime);
                            Mico.User.setVar('urgentnotifyreason',urgentnotifyreason);
                            Mico.User.setVar('moderatenotifytime',moderatenotifytime);
                            Mico.User.setVar('moderatenotifyreason',moderatenotifyreason);
                            Mico.User.setVar('minornotifytime',minornotifytime);
                            Mico.User.setVar('minornotifyreason',minornotifyreason);
                            Mico.User.setVar('negligiblenotifytime',negligiblenotifytime);
                            Mico.User.setVar('negligiblenotifyreason',negligiblenotifyreason);
                            
                            // and commit the changes
                            Mico.User.commit();
                        }
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.resetNotificationsButton = new Ext.Button({
                    text: Mico.Lang.User.Preferences.resetNotificationsButton_text, 
                    handler: function () {
                        // reset all the variables from the user object
                        this.sendNotificationsField.setValue(Mico.User.getVar('sendnotifications'));
                        this.criticalNotifyTime.setValue(Mico.User.getVarDefault('criticalnotifytime','immediate'));
                        this.criticalNotifyReason.setValue(Mico.User.getVarDefault('criticalnotifyreason','updated'));
                        this.urgentNotifyTime.setValue(Mico.User.getVarDefault('urgentnotifytime','30mins'));
                        this.urgentNotifyReason.setValue(Mico.User.getVarDefault('urgentnotifyreason','updated'));
                        this.moderateNotifyTime.setValue(Mico.User.getVarDefault('moderatenotifytime','60mins'));
                        this.moderateNotifyReason.setValue(Mico.User.getVarDefault('moderatenotifyreason','updated'));
                        this.minorNotifyTime.setValue(Mico.User.getVarDefault('minornotifytime','60mins'));
                        this.minorNotifyReason.setValue(Mico.User.getVarDefault('minornotifyreason','assigned'));
                        this.negligibleNotifyTime.setValue(Mico.User.getVarDefault('negligiblenotifytime','never'));
                        this.negligibleNotifyReason.setValue(Mico.User.getVarDefault('negligiblenotifyreason','assigned'));
                    }, 
                    scope: this
                });
                
                // notifications panel
                this.notificationsForm = new Ext.form.FormPanel({
                    id: "Mico.User.Preferences.notificationsForm",
                    title: Mico.Lang.User.Preferences.notificationsForm_title,
                    labelWidth:160,
                    layout:'form',
                    items: [
                        {
                            html: Mico.Lang.User.Preferences.notificationsForm_description,
                            bodyStyle:'padding-bottom:8px;'
                        },
                        this.notificationFieldset,
                        {
                            layout:'hbox',
                            items: [
                                this.saveNotificationsButton,
                                { html: '&nbsp;' },
                                this.resetNotificationsButton
                            ]
                        }
                    ], 
                    cls: 'main-form-panel',
                    bodyStyle: "padding:5px;",
                    autoScroll:true
                });
                
                // set up the main panel
                this.panel = new Ext.TabPanel({
                    id:'Mico.User.Preferences.panel',
                    items: [
                        this.settingsPanel,
                        this.changePasswordForm,
                        this.notificationsForm
                    ],
                    activeItem:0
                });
                
                // Add to the main panel
                Mico.Application.addPanel(this.panel);
            }
            
            // show the preferences panel
            Mico.Application.showPanel('Mico.User.Preferences.panel');
        }
    };
} ();