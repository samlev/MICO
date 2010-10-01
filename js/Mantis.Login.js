Mantis.Login = function () {
    var dlgLogin;
    var usernameField;
    var passwordField;
    var resetPasswordUsernameField;
    var loginForm;
    var resetPasswordForm;
    
    return {
        show: function () {
            if (this.loginForm === undefined) {
                // login form 'username' field
                this.usernameField = new Ext.form.TextField ({
                    name: "username", 
                    fieldLabel: "&nbsp;Username", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your username"
                });
                
                // login form 'password' field
                this.passwordField = new Ext.form.TextField ({
                    name: "password", 
                    fieldLabel: "&nbsp;Password", 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your password"
                });
                
                // forgotten password 'username' field
                this.resetPasswordUsernameField = new Ext.form.TextField ({
                    name: "username", 
                    fieldLabel: "Username", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your username"
                });
                
                // login form
                this.loginForm = new Ext.form.FormPanel({
                    id: "Mantis.Login.loginForm", 
                    url: "api.php?f=login", 
                    method: "POST",
                    region:"center",
                    standardSubmit: false,
                    labelWidth:110,
                    items: [
                        this.usernameField,
                        this.passwordField
                    ], 
                    keys: [
                        {
                            key: [10, 13], 
                            fn: function () {
                                // catch 'enter' and 'return' keypresses
                                //     and submit the form
                                this.doLogin ();
                            }, 
                            scope: this
                        }
                    ], 
                    buttons: [
                        {
                            html: '<a href="#" onclick="Mantis.Login.dlgLogin.layout.setActiveItem(\'Mantis.Login.resetPasswordForm\')">Forgotten Password?</a>',
                            layout: 'fit',
                            region: 'south'
                        },
                        {
                            text: "Login", 
                            handler: function () {
                                this.doLogin();
                            }, 
                            scope: this,
                            width:135
                        }
                    ], 
                    bodyStyle: "padding:5px;background-color:#dfe8f6;",
                    buttonAlign:'right'
                });
                
                // forgotten password form
                this.resetPasswordForm = new Ext.form.FormPanel({
                    id: "Mantis.Login.resetPasswordForm", 
                    url: "api.php?f=resetPassword", 
                    method: "POST",
                    region:"center",
                    standardSubmit: false,
                    labelWidth:110,
                    items: [
                        this.resetPasswordUsernameField,
                        {
                            html:'Enter your username and further isntructions will be emailed to you.',
                            bodyStyle:'background-color:#dfe8f6;'
                        }
                    ], 
                    keys: [
                        {
                            key: [10, 13], 
                            fn: function () {
                                // catch 'enter' and 'return' keypresses
                                //     and submit the form
                                this.doPasswordReset ();
                            }, 
                            scope: this
                        }
                    ], 
                    buttons: [
                        {
                            text: "Cancel", 
                            handler: function () {
                                this.dlgLogin.layout.setActiveItem('Mantis.Login.loginForm');
                            }, 
                            scope: this,
                            width:120
                        },
                        {
                            text: "Reset Password", 
                            handler: function () {
                                this.doPasswordReset();
                            }, 
                            scope: this,
                            width:120
                        }
                    ], 
                    bodyStyle: "padding:5px;background-color:#dfe8f6;",
                    buttonAlign:'center'
                });
                
                // the actual window
                this.dlgLogin = new Ext.Window({
                    modal:false, 
                    height:110,
                    width:275,
                    layout: "card", 
                    items: [
                        this.loginForm,
                        this.resetPasswordForm
                    ], 
                    collapsed: false, 
                    collapsible: false, 
                    minimizable: false,
                    resizable: false, 
                    autoScroll: false, 
                    closable: false,
                    draggable: false,
                    activeItem: 'Mantis.Login.loginForm'
                });
            }
            // show the login dialog
            this.dlgLogin.show();
        },
        doLogin: function() {
            // don't even try to submit the form if it's not valid.
            if (this.loginForm.getForm().isValid()) {
                this.loginForm.getForm().submit({
                    success: function (form, action) {
                        // Set up the user
                        this.dlgLogin.hide();
                        // refresh the page
                        location.reload(true);
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
                Ext.Msg.alert("Error", "Please check the marked fields");
            }
        },
        doPasswordReset: function() {
            // don't even try to submit the form if it's not valid.
            if (this.resetPasswordForm.getForm().isValid()) {
                this.resetPasswordForm.getForm().submit({
                    success: function (form, action) {
                        // go back to the login form
                        this.dlgLogin.layout.setActiveItem('Mantis.Login.loginForm');
                        // notify the user
                        Ext.Msg.alert("Password reset", 'Further instructions have been sent to your email address.');
                        
                        // reset the forms
                        this.loginForm.reset();
                        this.resetPasswordForm.reset();
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
                Ext.Msg.alert("Error", "Please check the marked fields");
            }
        }
    };
} ();