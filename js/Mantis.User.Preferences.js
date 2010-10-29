/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.User.Preferences.js
 ** 
 ** Description: The main 'user preferences' section of the system
 *******************************************************************************
 ******************************************************************************/

Mantis.User.Preferences = function () {
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
                this.menuId = Mantis.SystemMenu.addItem('My Preferences', 'Mantis.User.Preferences.show()','user');
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
                    fieldLabel: "Your name", 
                    width: 135, 
                    allowBlank: false,
                    required: true,
                    value: Mantis.User.getVar('name'),
                    blankText: "You must enter your name"
                });
                
                // User's email
                this.emailField = new Ext.form.TextField ({
                    fieldLabel: "Your email address", 
                    width: 135, 
                    allowBlank: false,
                    required: true,
                    value: Mantis.User.getVar('email'),
                    blankText: "You must enter your email address"
                });
                
                // settings fieldset
                this.settingsFieldset = new Ext.form.FieldSet({
                    title: 'Your settings',
                    items: [
                        {
                            html: 'Your name and email address are used to notify you of calls assigned to you, '+
                                  'and for resetting your passowrd. Please ensure that they are correct.',
                            bodyStyle:'padding-bottom:8px;'
                        },
                        this.nameField,
                        this.emailField
                    ]
                });
                
                // get the current date/time
                var now = new Date();
                
                // the time format field
                this.timeFormatField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    required:true,
                    fieldLabel:'Time format',
                    store: new Ext.data.ArrayStore ({
                        fields:['format','dispaly'],
                        data: [
                            ['g:ia','12 hour with am/pm ('+now.format('g:ia')+')'],
                            ['H:i','24 hour with leading zeros ('+now.format('H:i')+')'],
                            ['G:i','24 hour without leading zeros ('+now.format('G:i')+')']
                        ]
                    }),
                    displayField:'dispaly',
                    valueField:'format',
                    mode:'local',
                    value: Mantis.User.getVarDefault('timeformat','g:ia'),
                    triggerAction:'all',
                    listWidth:250
                });
                
                // the date format field
                this.dateFormatField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    required:true,
                    fieldLabel:'Date format',
                    store: new Ext.data.ArrayStore ({
                        fields:['format','dispaly'],
                        data: [
                            ['jS M, Y','Textual ('+now.format('jS M, Y')+')'],
                            ['d-m-Y','UK ('+now.format('d/m/Y')+')'],
                            ['m-d-Y','US ('+now.format('m/d/Y')+')'],
                            ['Y-m-d','Year-Month-Day ('+now.format('Y-m-d')+')']
                        ]
                    }),
                    displayField:'dispaly',
                    valueField:'format',
                    mode:'local',
                    value: Mantis.User.getVarDefault('dateformat','jS M, Y'),
                    triggerAction:'all',
                    listWidth:250
                });
                
                // the calls per page field
                this.callsPerPageField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    required:true,
                    fieldLabel:'Calls per page',
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
                    value: Mantis.User.getVarDefault('callsperpage','30'),
                    triggerAction:'all'
                });
                
                // show calls field
                this.showCallsField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    fieldLabel:'Show',
                    store: Mantis.Utils.CommonStores.callsSearchFilter,
                    displayField:'type',
                    valueField:'filter',
                    mode:'local',
                    value: Mantis.User.getVarDefault('showcalls','assigned'),
                    triggerAction:'all'
                });
                
                // order calls field (cheat a bit with the store)
                this.orderCallsField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    fieldLabel:'Order',
                    store: Mantis.Utils.CommonStores.callsOrderFilter,
                    displayField:'type',
                    valueField:'filter',
                    mode:'local',
                    value: Mantis.User.getVarDefault('ordercalls','recent'),
                    triggerAction:'all'
                });
                
                // show closed field
                this.showClosedField = new Ext.form.Checkbox({
                    fieldLabel:'Show closed calls',
                    checked: Mantis.User.getVar('showclosed')
                });
                
                // comment order field
                this.commentOrderField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    fieldLabel:'Call Comment Order',
                    store: new Ext.data.ArrayStore ({
                        fields:['type','filter'],
                        data: [
                            ['Oldest First','oldest'],
                            ['Newest First','newest']
                        ]
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:Mantis.User.getVarDefault('commentorder','newest'),
                    mode:'local',
                    triggerAction:'all'
                });
                
                // preferences fieldset
                this.preferencesFieldset = new Ext.form.FieldSet({
                    title: 'Display preferences',
                    items: [
                        {
                            html: 'The date and time format settings will take affect immediately, but the other '+
                                  'settings may not take affect until the next time you log in.',
                            bodyStyle:'padding-bottom:8px;'
                        },
                        this.timeFormatField,
                        this.dateFormatField,
                        this.callsPerPageField,
                        this.showCallsField,
                        this.orderCallsField,
                        this.showClosedField,
                        this.commentOrderField
                    ]
                });
                
                // The button for saving the user's settings
                this.saveSettingsButton = new Ext.Button({
                    text: "Save Settings", 
                    handler: function () {
                        if (this.settingsPanel.getForm().isValid()) {
                            // notify the user that we're saving their settings
                            Ext.Msg.wait('Save Settings','Saving your settings',{
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
                            
                            // set the values that we can
                            if (name.length) { Mantis.User.setVar('name',name); }
                            if (email.length) { Mantis.User.setVar('email',email); }
                            Mantis.User.setVar('timeformat',timeformat);
                            Mantis.User.setVar('dateformat',dateformat);
                            Mantis.User.setVar('callsperpage',callsperpage);
                            Mantis.User.setVar('showcalls',showcalls);
                            Mantis.User.setVar('ordercalls',ordercalls);
                            Mantis.User.setVar('showclosed',showclosed);
                            Mantis.User.setVar('commentorder',commentorder);
                            
                            // and commit the changes
                            Mantis.User.commit();
                        }
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.resetSettingsButton = new Ext.Button({
                    text: "Reset", 
                    handler: function () {
                        // reset all the variables from the user object
                        this.nameField.setValue(Mantis.User.getVar('name'));
                        this.emailField.setValue(Mantis.User.getVar('email'));
                        this.timeFormatField.setValue(Mantis.User.getVarDefault('timeformat','g:ia'));
                        this.dateFormatField.setValue(Mantis.User.getVarDefault('dateformat','jS M, Y'));
                        this.callsPerPageField.setValue(Mantis.User.getVarDefault('callsperpage','30'));
                        this.showCallsField.setValue(Mantis.User.getVarDefault('showcalls','assigned'));
                        this.orderCallsField.setValue(Mantis.User.getVarDefault('ordercalls','recent'));
                        this.showClosedField.setValue(Mantis.User.getVarDefault('showclosed',false));
                        this.commentOrderField.setValue(Mantis.User.getVarDefault('commentorder','newest'));
                    }, 
                    scope: this
                });
                
                // perferences form
                this.settingsPanel = new Ext.form.FormPanel({
                    id: "Mantis.User.Preferences.settingsPanel",
                    title:'Settings and Preferences',
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
                    bodyStyle: "padding:5px;"
                });
                
                // The old password
                this.oldPasswordField = new Ext.form.TextField ({
                    fieldLabel: "Current Password", 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your current password"
                });
                
                // set password form 'password' field
                this.passwordField = new Ext.form.TextField ({
                    fieldLabel: "New Password", 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter a new password",
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
                    fieldLabel: "Confirm New Password", 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your password"
                });
                
                this.passwordFieldset = new Ext.form.FieldSet({
                    title: 'Change your password',
                    items: [
                        this.oldPasswordField,
                        this.passwordField,
                        this.passwordStrengthIndicator,
                        this.passwordConfirmField
                    ]
                });
                
                // The button for changing the user's password
                this.passwordChangeButton = new Ext.Button({
                    text: "Change Password", 
                    handler: function () {
                        Ext.Msg.wait('Change Password','Changing your password',{
                            closable:false,
                            modal:true
                        });
                        
                        var conn = new Ext.data.Connection();
                        
                        // send the logout request
                        conn.request({
                            url:APP_ROOT+'/api.php?f=changePassword',
                            params: {
                                session: Mantis.User.getSession(),
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
                                    Ext.Msg.alert("Password Changed", "Your password has successfully been changed");
                                    // clear the form
                                    this.changePasswordForm.getForm().reset();
                                    this.passwordStrengthIndicator.updateProgress(0,'Enter password',false);
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
                    scope: this
                });
                
                // the button for clearing the password change form
                this.clearPasswordFormButton = new Ext.Button({
                    text: "Clear", 
                    handler: function () {
                        // clear the form
                        this.changePasswordForm.getForm().reset();
                        this.passwordStrengthIndicator.updateProgress(0,'Enter password',false);
                    }, 
                    scope: this
                });
                
                // set up form
                this.changePasswordForm = new Ext.form.FormPanel({
                    id: "Mantis.User.Preferences.changePasswordForm",
                    title:'Change Password',
                    labelWidth:140,
                    layout:'form',
                    items: [
                        {
                            html: 'There are no restrictions on your password, but a medium-strong password is advised',
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
                    bodyStyle: "padding:5px;"
                });
                
                // Send notifications field
                this.sendNotificationsField = new Ext.form.Checkbox({
                    fieldLabel:'Send me email notifications',
                    checked: Mantis.User.getVar('sendnotifications')
                });
                
                // critical calls
                this.criticalNotifyTime = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    width: 150,
                    store: new Ext.data.ArrayStore ({
                        fields:['notify','view'],
                        data: [
                            ['immediate','immediately'],
                            ['30mins','once every half hour'],
                            ['60mins','once every hour'],
                            ['never','never']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('criticalnotifytime','immediate'),
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
                        data: [
                            ['assigned','assigned to me'],
                            ['updated','updated']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('criticalnotifyreason','updated'),
                    mode:'local',
                    triggerAction:'all'
                });
                var criticalForm = {
                    layout:'hbox',
                    items:[
                        {html:'For <b>CRITICAL</B> calls, notify me',bodyStyle:'padding-top:5px;', width:190},
                        this.criticalNotifyTime,
                        {html:'&nbsp;when they are&nbsp;',bodyStyle:'padding-top:5px;'},
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
                        data: [
                            ['immediate','immediately'],
                            ['30mins','once every half hour'],
                            ['60mins','once every hour'],
                            ['never','never']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('urgentnotifytime','30mins'),
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
                        data: [
                            ['assigned','assigned to me'],
                            ['updated','updated']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('urgentnotifyreason','updated'),
                    mode:'local',
                    triggerAction:'all'
                });
                var urgentForm = {
                    layout:'hbox',
                    items:[
                        {html:'For <b>URGENT</B> calls, notify me',bodyStyle:'padding-top:5px;', width:190},
                        this.urgentNotifyTime,
                        {html:'&nbsp;when they are&nbsp;',bodyStyle:'padding-top:5px;'},
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
                        data: [
                            ['immediate','immediately'],
                            ['30mins','once every half hour'],
                            ['60mins','once every hour'],
                            ['never','never']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('moderatenotifytime','60mins'),
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
                        data: [
                            ['assigned','assigned to me'],
                            ['updated','updated']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('moderatenotifyreason','updated'),
                    mode:'local',
                    triggerAction:'all'
                });
                var moderateForm = {
                    layout:'hbox',
                    items:[
                        {html:'For <b>MODERATE</B> calls, notify me',bodyStyle:'padding-top:5px;', width:190},
                        this.moderateNotifyTime,
                        {html:'&nbsp;when they are&nbsp;',bodyStyle:'padding-top:5px;'},
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
                        data: [
                            ['immediate','immediately'],
                            ['30mins','once every half hour'],
                            ['60mins','once every hour'],
                            ['never','never']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('minornotifytime','60mins'),
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
                        data: [
                            ['assigned','assigned to me'],
                            ['updated','updated']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('minornotifyreason','assigned'),
                    mode:'local',
                    triggerAction:'all'
                });
                var minorForm = {
                    layout:'hbox',
                    items:[
                        {html:'For <b>MINOR</B> calls, notify me',bodyStyle:'padding-top:5px;', width:190},
                        this.minorNotifyTime,
                        {html:'&nbsp;when they are&nbsp;',bodyStyle:'padding-top:5px;'},
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
                        data: [
                            ['immediate','immediately'],
                            ['30mins','once every half hour'],
                            ['60mins','once every hour'],
                            ['never','never']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('negligiblenotifytime','never'),
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
                        data: [
                            ['assigned','assigned to me'],
                            ['updated','updated']
                        ]
                    }),
                    displayField:'view',
                    valueField:'notify',
                    value:Mantis.User.getVarDefault('negligiblenotifyreason','assigned'),
                    mode:'local',
                    triggerAction:'all'
                });
                var negligibleForm = {
                    layout:'hbox',
                    items:[
                        {html:'For <b>NEGLIGIBLE</B> calls, notify me',bodyStyle:'padding-top:5px;', width:190},
                        this.negligibleNotifyTime,
                        {html:'&nbsp;when they are&nbsp;',bodyStyle:'padding-top:5px;'},
                        this.negligibleNotifyReason
                    ],
                    bodyStyle:'padding-top:2px;'
                };
                
                // notification settings fieldset
                this.notificationFieldset = new Ext.form.FieldSet({
                    title: 'Email notification options',
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
                    text: "Save Settings", 
                    handler: function () {
                        if (this.notificationsForm.getForm().isValid()) {
                            // notify the user that we're saving their settings
                            Ext.Msg.wait('Save Settings','Saving your notification settings',{
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
                            Mantis.User.setVar('sendnotifications',sendnotifications);
                            Mantis.User.setVar('criticalnotifytime',criticalnotifytime);
                            Mantis.User.setVar('criticalnotifyreason',criticalnotifyreason);
                            Mantis.User.setVar('urgentnotifytime',urgentnotifytime);
                            Mantis.User.setVar('urgentnotifyreason',urgentnotifyreason);
                            Mantis.User.setVar('moderatenotifytime',moderatenotifytime);
                            Mantis.User.setVar('moderatenotifyreason',moderatenotifyreason);
                            Mantis.User.setVar('minornotifytime',minornotifytime);
                            Mantis.User.setVar('minornotifyreason',minornotifyreason);
                            Mantis.User.setVar('negligiblenotifytime',negligiblenotifytime);
                            Mantis.User.setVar('negligiblenotifyreason',negligiblenotifyreason);
                            
                            // and commit the changes
                            Mantis.User.commit();
                        }
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.resetNotificationsButton = new Ext.Button({
                    text: "Reset", 
                    handler: function () {
                        // reset all the variables from the user object
                        this.sendNotificationsField.setValue(Mantis.User.getVar('sendnotifications'));
                        this.criticalNotifyTime.setValue(Mantis.User.getVarDefault('criticalnotifytime','immediate'));
                        this.criticalNotifyReason.setValue(Mantis.User.getVarDefault('criticalnotifyreason','updated'));
                        this.urgentNotifyTime.setValue(Mantis.User.getVarDefault('urgentnotifytime','30mins'));
                        this.urgentNotifyReason.setValue(Mantis.User.getVarDefault('urgentnotifyreason','updated'));
                        this.moderateNotifyTime.setValue(Mantis.User.getVarDefault('moderatenotifytime','60mins'));
                        this.moderateNotifyReason.setValue(Mantis.User.getVarDefault('moderatenotifyreason','updated'));
                        this.minorNotifyTime.setValue(Mantis.User.getVarDefault('minornotifytime','60mins'));
                        this.minorNotifyReason.setValue(Mantis.User.getVarDefault('minornotifyreason','assigned'));
                        this.negligibleNotifyTime.setValue(Mantis.User.getVarDefault('negligiblenotifytime','never'));
                        this.negligibleNotifyReason.setValue(Mantis.User.getVarDefault('negligiblenotifyreason','assigned'));
                    }, 
                    scope: this
                });
                
                // notifications panel
                this.notificationsForm = new Ext.form.FormPanel({
                    id: "Mantis.User.Preferences.notificationsForm",
                    title:'Notification Settings',
                    labelWidth:160,
                    layout:'form',
                    items: [
                        {
                            html: 'This section allows you to manage your email notification settings. '+
                                  'Notifications are only sent to you about calls that are assigned to you.',
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
                    bodyStyle: "padding:5px;"
                });
                
                // set up the main panel
                this.panel = new Ext.TabPanel({
                    id:'Mantis.User.Preferences.panel',
                    items: [
                        this.settingsPanel,
                        this.changePasswordForm,
                        this.notificationsForm
                    ],
                    activeItem:0
                });
                
                // Add to the main panel
                Mantis.Application.addPanel(this.panel);
            }
            
            Mantis.Application.showPanel('Mantis.User.Preferences.panel');
        }
    };
} ();