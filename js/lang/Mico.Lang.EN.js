/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/lang/Mico.Lang.EN.js
 ** 
 ** Description: English Language file
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
Mico.Lang = function () {
    return {
        // Language for Mico.Application.js
        Application: {
            logout: "Log out"
        },
        // Language for Mico.Login.js
        Login: {
            // Login form
            usernameField_fieldLabel: "Username",
            usernameField_blankText: "You must enter your username",
            passwordField_fieldLabel: "Password",
            passwordField_blankText: "You must enter your password",
            forgottenPasswordLink: "Forgotten Password?",
            loginButton: "Login",
            // Reset password form
            resetPasswordUsernameField_fieldLabel: "Username",
            resetPasswordUsernameField_blankText: "You must enter your username",
            resetPasswordInstruction: "Enter your username and further isntructions will be emailed to you.",
            cancelButton: "Cancel",
            resetPasswordButton: "Reset Password",
            // Login function alert
            loginInvalidErrorAlert_title: "Error",
            loginInvalidErrorAlert_text: "Please check the marked fields",
            // Password reset function alerts
            resetPasswordSuccess_title: "Password reset",
            resetPasswordSuccess_text: "Further instructions have been sent to your email address.",
            resetPasswordError_title: "Error",
            resetPasswordError_text: "Please check the marked fields"
        },
        // Language for Mico.PasswordSet.js
        PasswordSet: {
            // Password set form
            usernameField_fieldLabel: "Username",
            usernameField_blankText: "You must enter your username",
            passwordField_fieldLabel: "Password",
            passwordField_blankText: "You must enter your password",
            passwordStrengthIndicator_fieldLabel: "Strength",
            passwordConfirmField_fieldLabel: "Confirm Password",
            passwordConfirmField_blankText: "You must enter your password",
            setPasswordButton: "Set Password",
            // Password strength
            passwordStrength_blank: "Enter password",
            passwordStrength_weak: "Weak",
            passwordStrength_medium: "Medium",
            passwordStrength_strong: "Strong",
            passwordStrength_verystrong: "Very Strong",
            // Password set function alerts
            setPasswordInvalid_title: "Error",
            setPasswordInvalid_text: "Please check the marked fields",
            setPasswordInvalidMatch_text: "Passwords must match",
            setPasswordSuccess_title: "Password set",
            setPasswordSuccess_text: "Your password has been set.<br /><br />You will now be redirected to the login page."
        },
        // Language for Mico.Footer.js
        Footer: {
            getFooterAbout_text: "About Mico",
            getFooterVersion_text: function (version) { return "Version: "+version; },
            showAboutBody_html: function (version) {
                var aboutHTML = '<h1>Mantis Inbound Call Organiser</h1>'; // Title
                // Version
                aboutHTML += '<p style="font-weight:bold;color:#88BB88;" align="right">Version '+version+'</p>';
                // Licence
                aboutHTML += '<p>Mico is released under the <a href="http://www.gnu.org/licenses/lgpl-3.0-standalone.html" target="_new">GNU LGPL</a> '+
                             'licence version 3.0, and is available for free, without warranty.</p>';
                // Acknowledgements
                aboutHTML += '<p>Icons from the <a href="http://www.famfamfam.com/lab/icons/silk/" target="_new">silk icon set</a> '+
                             'were used in this system.</p>';
                // Copyright
                aboutHTML += '<p style="color:#88BB88;">All code and images are &copy; 2010 to <a href="http://www.samuellevy.com/" style="color:#88BB88;" target="_new">Samuel Levy</a>, unless otherwise noted.</p>';
                
                return aboutHTML;
            },
            aboutWindow_title: "About MICO"
        }
    };
} ();