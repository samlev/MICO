/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/admin/Mantis.SystemSettings.js
 ** 
 ** Description: The system settings section of the system
 *******************************************************************************
 ******************************************************************************/

Mantis.SystemSettings = function () {
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
                this.menuId = Mantis.SystemMenu.addItem('System Settings', 'Mantis.SystemSettings.show()','user');
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
                    hideLabel: true
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
                    value: '',
                    disabled: true,
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
                    disabled: true,
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
                
                // debug mode
                this.simpleCronField = new Ext.form.Checkbox({
                    checked: false,
                    disabled: true,
                    hideLabel: true
                });
                
                // debug mode fieldset
                this.simpleCronFieldset = new Ext.form.FieldSet({
                    title: 'Use simple cron',
                    items: [
                        {
                            html: 'The simple cron should only be used if you do not have access to '+
                                  'a proper cron system. It will only run when a user has Mantis open. '+
                                  'If you have access to proper task scheduler, you can set it to call '+
                                  'notify.php using a command similar to the one below:',
                            bodyStyle:'padding-bottom:3px;'
                        },
                        new Ext.form.TextField({
                            value:'/usr/bin/wget -q '+APP_ROOT+'/notify.php > /dev/null',
                            disabled:true,
                            width: 400,
                            hideLabel: true
                        }),
                        this.simpleCronField
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
                        this.loadSettings();
                    }, 
                    scope: this
                });
                
                // perferences form
                this.panel = new Ext.form.FormPanel({
                    id: "Mantis.SystemSettings.panel",
                    items: [
                        this.debugModeFieldset,
                        this.mailFromFieldset,
                        this.sessionLengthFieldset,
                        this.simpleCronFieldset,
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
            
            Mantis.Application.showPanel('Mantis.SystemSettings.panel');
            this.loadSettings();
        },
        loadSettings: function() {
            // disable the fields until we have loaded the values
            this.debugModeField.disable();
            this.mailFromField.disable();
            this.sessionLengthField.disable();
            this.simpleCronField.disable();
            
            // now load the values
            var conn = new Ext.data.Connection();
            
            // send the logout request
            conn.request({
                url:APP_ROOT+'/api.php?f=getSystemSettings',
                params: {
                    session: Mantis.User.getSession()
                },
                callback: function (options, success, response) {
                    var res = Ext.decode(response.responseText);
                    if (success && res.success) {
                        // enable the settings fields
                        this.debugModeField.enable();
                        this.mailFromField.enable();
                        this.sessionLengthField.enable();
                        this.simpleCronField.enable();
                        
                        // set the values
                        this.debugModeField.setValue(res.DEBUG_MODE);
                        this.mailFromField.setValue(res.MAIL_FROM);
                        this.sessionLengthField.setValue(res.SESSION_LENGTH);
                        this.simpleCronField.setValue(res.SIMPLE_CRON);
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
                    url:APP_ROOT+'/api.php?f=setSystemSettings',
                    params: {
                        session: Mantis.User.getSession(),
                        DEBUG_MODE: this.debugModeField.getValue(),
                        MAIL_FROM: this.mailFromField.getValue(),
                        SESSION_LENGTH: this.sessionLengthField.getValue(),
                        SIMPLE_CRON: this.simpleCronField.getValue()
                    },
                    callback: function (options, success, response) {
                        var res = Ext.decode(response.responseText);
                        if (success && res.success) {
                            // hide the 'wait' box
                            Ext.Msg.hide();
                            // notify the user that the setting shave been updated
                            Ext.Msg.alert("System Settings", "The system settings have been updated");
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