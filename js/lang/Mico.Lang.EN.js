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
        }
    };
} ();