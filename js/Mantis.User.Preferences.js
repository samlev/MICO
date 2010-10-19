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
                this.menuId = Mantis.SystemMenu.addItem('Preferences', 'Mantis.User.Preferences.show()','user');
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
                    store: new Ext.data.SimpleStore ({
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
                    store: new Ext.data.SimpleStore ({
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
                    store: new Ext.data.SimpleStore ({
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
                
                // show calls field (cheat a bit with the store)
                this.showCallsField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    fieldLabel:'Show',
                    store: Mantis.Calls.SearchBar.filterField.getStore(),
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
                    store: Mantis.Calls.SearchBar.orderField.getStore(),
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
                    store: new Ext.data.SimpleStore ({
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
                        this.timeFormatField,
                        this.dateFormatField,
                        this.callsPerPageField,
                        this.showCallsField,
                        this.orderCallsField,
                        this.showClosedField,
                        this.commentOrderField
                    ]
                });
                
                // The button for changing the user's password
                this.saveSettingsButton = new Ext.Button({
                    text: "Save Settings", 
                    handler: function () {
                        if (this.settingsPanel.getForm().isValid()) {
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
                            if (timeformat.length) { Mantis.User.setVar('timeformat',timeformat); }
                            if (dateformat.length) { Mantis.User.setVar('dateformat',dateformat); }
                            if (callsperpage.length) { Mantis.User.setVar('callsperpage',callsperpage); }
                            if (showcalls.length) { Mantis.User.setVar('showcalls',showcalls); }
                            if (ordercalls.length) { Mantis.User.setVar('ordercalls',ordercalls); }
                            Mantis.User.setVar('showclosed',showclosed);
                            if (commentorder.length) { Mantis.User.setVar('commentorder',commentorder); }
                            
                            // and commit the changes
                            Mantis.User.commit();
                        }
                    }, 
                    scope: this
                });
                
                // the button for clearing the password change form
                this.clearSettingsButton = new Ext.Button({
                    text: "Clear", 
                    handler: function () {
                        // reset all the variables from the user object
                        this.nameField.setValue(Mantis.User.getVar('name'));
                        this.emailField.setValue(Mantis.User.getVar('email'));
                        this.timeFormatField.setValue(Mantis.User.getVar('timeformat'));
                        this.dateFormatField.setValue(Mantis.User.getVar('dateformat'));
                        this.callsPerPageField.setValue(Mantis.User.getVar('callsperpage'));
                        this.showCallsField.setValue(Mantis.User.getVar('showcalls'));
                        this.orderCallsField.setValue(Mantis.User.getVar('ordercalls'));
                        this.showClosedField.setValue(Mantis.User.getVar('showclosed'));
                        this.commentOrderField.setValue(Mantis.User.getVar('commentorder'));
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
                                { html: '&nbsp;',bodyStyle: "background-color:#dfe8f6;" },
                                this.clearSettingsButton
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
                                    if (res.result !== undefined) {
                                        msg = res.result.info;
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
                        this.oldPasswordField,
                        this.passwordField,
                        this.passwordStrengthIndicator,
                        this.passwordConfirmField,
                        {
                            layout:'hbox',
                            items: [
                                this.passwordChangeButton,
                                { html: '&nbsp;',bodyStyle: "background-color:#dfe8f6;" },
                                this.clearPasswordFormButton
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
                        this.changePasswordForm
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