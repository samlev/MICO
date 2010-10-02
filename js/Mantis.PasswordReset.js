Mantis.PasswordReset = function () {
    var usernameField;
    var passwordField;
    var passwordConfirmField;
    var confirmationKeyField;
    var setPasswordForm;
    
    return {
        show: function () {
            if (this.loginForm === undefined) {
                // set password form 'username' field
                this.usernameField = new Ext.form.TextField ({
                    name: "username", 
                    fieldLabel: "Username", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your username"
                });
                
                // set password form 'password' field
                this.passwordField = new Ext.form.TextField ({
                    name: "password1", 
                    fieldLabel: "Password", 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your password",
                    enableKeyEvents: true
                });
                
                this.passwordField.on('keyup', function() {
                    var pass = this.passwordField.getValue();
                    
                    var points = Mantis.Utils.passwordStrength(pass);
                    
                    var text = 'Weak';
                    
                    // test the strength
                    if (points == 0) {
                        text = 'Enter password';
                    } else if (points > 35) {
                        text = 'Super Strong';
                    } else if (points > 25) {
                        text = 'Strong';
                    } else if (points > 10) {
                        text = 'Medium';
                    }
                    
                    this.passwordStrengthIndicator.updateProgress((points/50),text,true);
                }, this);
                
                this.passwordStrengthIndicator = new Ext.ProgressBar({
                    fieldLabel: 'Strength',
                    text: 'Enter password',
                    value: 0,
                    width:135
                })
                
                // reset password form 'password confirmation' field
                this.passwordConfirmField = new Ext.form.TextField ({
                    name: "password2", 
                    fieldLabel: "Confirm Password", 
                    inputType: "password", 
                    width: 135, 
                    allowBlank: false, 
                    blankText: "You must enter your password"
                });
                
                this.requestConfirmationKeyField = new Ext.form.Hidden ({
                    name: "confirmation_key",
                    value: CONFIRMATION_KEY
                });
                
                // set form
                this.setPasswordForm = new Ext.form.FormPanel({
                    id: "Mantis.PasswordReset.setPasswordForm", 
                    url: "api.php?f=setPassword", 
                    method: "POST",
                    region:"center",
                    standardSubmit: false,
                    labelWidth:110,
                    items: [
                        this.usernameField,
                        this.passwordField,
                        this.passwordStrengthIndicator,
                        this.passwordConfirmField,
                        this.requestConfirmationKeyField
                    ], 
                    keys: [
                        {
                            key: [10, 13], 
                            fn: function () {
                                // catch 'enter' and 'return' keypresses
                                //     and submit the form
                                this.doSetPassword ();
                            }, 
                            scope: this
                        }
                    ], 
                    buttons: [
                        {
                            text: "Set Password", 
                            handler: function () {
                                this.doSetPassword();
                            }, 
                            scope: this,
                            width:135
                        }
                    ], 
                    bodyStyle: "padding:5px;background-color:#dfe8f6;",
                    buttonAlign:'center'
                });
                
                
                // the actual window
                this.dlgSetPassword = new Ext.Window({
                    modal:false, 
                    height:160,
                    width:275,
                    layout: "fit", 
                    items: [
                        this.setPasswordForm
                    ], 
                    collapsed: false, 
                    collapsible: false, 
                    minimizable: false,
                    resizable: false, 
                    autoScroll: false, 
                    closable: false,
                    draggable: false
                });
            }
            // show the login dialog
            this.dlgSetPassword.show();
        },
        doSetPassword: function() {
            // don't even try to submit the form if it's not valid.
            if (this.setPasswordForm.getForm().isValid()) {
                this.setPasswordForm.getForm().submit({
                    success: function (form, action) {
                        // Set up the user
                        this.dlgSetPassword.hide();
                        // refresh the page
                        Ext.Msg.alert('Password set','Your password has been set.<br /><br />You will now be redirected to the login page.',function () {window.location('index.php');}, this);
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