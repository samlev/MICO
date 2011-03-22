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
            aboutLink_text: "About Mico",
            version_text: function (version) { return "Version: "+version; },
            aboutWindow_title: "About MICO",
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
            }
        },
        // Language for Mico.Calls.js
        Calls: {
            menu_text: "Calls",
            // Check Updates
            sessionExpired_title: "Session Expired",
            sessionExpired_text: "Your session has expired.<br /><br />You will now be redirected to the login page.",
            loadUpdates_title: "Loading updated calls",
            loadUpdated_text: "Call updated",
            // Language for Mico.Calls.AddCall.js
            AddCall: {
                title: "Take a call",
                // Caller details
                callerNameField_emptyText: "Caller's name",
                callerNameField_hint: "caller",
                callerCompanyField_emptyText: "Caller's company",
                callerCompanyField_label: "From",
                callerCompanyField_hint: "company",
                // Recipient details
                userField_emptyText: "Select recipient",
                userField_label: "Called for",
                userAddExtraButton_text: "Add",
                userAddExtraButton_tooltip: "Add another recipient",
                userFieldExtra_label: "OR",
                // Message
                callerMessageBox_emptyText: "Message for recipient(s)...",
                callerMessageBox_label: "About",
                // Contact details
                callerContactField_emptyText: "Caller's Phone Number/Email",
                callerContactField_label: "Contact them at",
                callerContactAddExtraButton_text: "Add",
                callerContactAddExtraButton_tooltip: "Add another contact method",
                callerContactFieldExtra_label: "OR",
                // Call Priority
                callPriorityField_label: "This call is",
                // Call Action
                callActionField_data:[
                    ['Call back ASAP'],
                    ['Call back by Close Of Business'],
                    ['Call back whenever you can'],
                    ['Caller will email/call again later'],
                    ['No need to call back']
                ],
                callActionField_default: "Call back ASAP",
                callActionField_label: "Action required",
                // Buttons
                addCallButton_text: "Add Call",
                clearFormButton_text: "Clear",
                // Functions - add call
                validateRecipientsError_title: "Error",
                validateRecipientsError_text: "Please select a recipient for this call",
                callerDetailsError_title: "Error",
                callerDetailsError_text: "Please enter either a caller name, company name, message, or contact details"
            },
            // Language for Mico.Calls.SearchBar.js
            SearchBar: {
                filterField_label: "Show",
                orderField_label: "ordered by",
                showClosedField_label: "Show closed?"
            },
            // Language for Mico.Calls.ViewCalls.js
            ViewCalls: {
                // Grid headers
                header_date: "At",
                header_caller: "Caller",
                header_company: "From",
                header_message: "Message",
                header_contact: "Contact",
                header_priority: "Priority",
                header_action: "Action",
                header_close: "Mark as closed",
                // Call details - comments
                comment_blank: "No comments",
                commentOrder_label: "View Comments",
                // Call details - update
                closeCallRadio_boxLabel: "Close call",
                escalateCallRadio_boxLabel: "Escalate call",
                justCommentRadio_boxLabel: "Just Comment",
                reopenCallCheck_boxLabel: "Re-open call",
                userCombo_emptyText: "Escalate to",
                commentText_emptyText: "Comment",
                addCallButton_text: "Update Call",
                clearFormButton_text: "Clear",
                // Show call detail panel
                callInfo_date: function (date, time) { return date+" at "+time; },
                callInfo_closed: "Closed",
                callInfo_callTakerSelf: "Call taken by you",
                callInfo_callTakerOther: function (taker) { return "Call taken by "+taker; },
                callInfo_callerUnkown: "Someone",
                callInfo_callerLine: function (caller, company) {
                    // Caller's name
                    line = caller;
                    // Caller's company is included only if not empty
                    if (company.length) {
                        line += " from " + company;
                    }
                    return line + " called for";
                },
                callInfo_selfRecipient: "You",
                callInfo_messageLabel: "Message",
                callInfo_noMessage: "No message was left.",
                callInfo_contactLabelMulti: "Contact them via",
                callInfo_contactLabelSingle: function (contact) { return "Contact them via "+contact; },
                callInfo_contactNone: "No contact details were left.",
                callInfo_actionRequired: "Action required",
                // Show Comments function
                showComments_today: "Today",
                showComments_yesterday: "Yesterday",
                showComments_selfComment: "You",
                showComments_commentHeader: function (action, name) { return action+" by "+name; },
                // grid renderers
                renderDate_today: function (time) { return time; },
                renderDate_yesterday: function (time) { return time+" Yesterday";},
                renderDate_other: function (date) { return date;},
                renderDate_quicktip: function (date, time) { return date+" at "+time; },
                renderClose_open: "Close call",
                renderClose_closed: "Call closed"
            }
        },
        // Language for Mico.Utils.js
        Utils: {
            // Language for Mico.Utils.CommonStores.js
            CommonStores: {
                callsSearchFilter: {
                    assigned: "Calls assigned to me",
                    opened: "Calls opened by me",
                    all: "All calls"
                },
                callsOrderFilter: {
                    recent: "Most recent",
                    urgent: "Most urgent"
                },
                callPriority: {
                    critical: "Critical",
                    urgent:'Urgent',
                    moderate:'Moderate',
                    minor:'Minor',
                    negligible:'Negligible'
                },
                userTypes: {
                    admin: "Administrator",
                    manager: "Manager",
                    user: "Standard User",
                    disabled: "Disabled"
                },
                commentOrder: {
                    oldest: "Oldest first",
                    newest: "Newest first"
                },
                notifyTime: {
                    immediate:'immediately',
                    halfhour:'once every half hour',
                    hour:'once every hour',
                    never:'never'
                },
                notifyReason:{
                    assigned:'assigned to me',
                    updated:'updated'
                },
                languageOptions:{
                    EN: "English",
                    ES: "Spanish",
                    RU: "Russian",
                    DE: "German"
                }
            }
        },
        // Language for Mico.User.js
        User: {
            logoutWait_title: "Log out",
            logoutWait_text: "Logging you out",
            logoutConfirmation_title: "Logged Out",
            logoutConfirmation_text: "You have been logged out. Please wait while you are redirected.",
            // Language for Mico.User.Preferences.js
            Preferences: {
                menu_text: "My Preferences",
                // User Settings and Preferences
                settingsPanel_title: "Settings and Preferences",
                saveSettingsButton_text: "Save Settings",
                saveSettingsButtonWait_title: "Save Settings",
                saveSettingsButtonWait_text: "Saving your settings",
                resetSettingsButton_text: "Reset",
                // User Settings and Preferences - Your Settings
                settingsFieldset_title: "Your settings",
                settingsFieldset_description: 'Your name and email address are '+
                    'used to notify you of calls assigned to you, and for resetting '+
                    'your password. Please ensure that they are correct.',
                nameField_fieldLabel: "Your name",
                nameField_blankText: "You must enter your name",
                emailField_fieldLabel: "Your email address",
                emailField_blankText: "You must enter your email address",
                // User Settings and Preferences - Display preferences
                preferencesFieldset_title: "Display preferences",
                preferencesFieldset_description: 'The date and time format '+
                    'settings will take affect immediately, but the other '+
                    'settings may not take affect until the next time you log in.',
                timeFormatField_fieldLabel: "Time format",
                timeFormatField_display: {
                    gia:"12 hour with am/pm",
                    Hi: "24 hour, leading zeros",
                    Gi: "24 hour, no leading zeros"
                },
                dateFormatField_fieldLabel: "Date format",
                dateFormatField_display: {
                    jSMY:"Textual",
                    dmY: "UK (Day/Month/Year)",
                    mdY: "US (Month/Day/Year",
                    Ymd: "Year-Month-Day"
                },
                callsPerPageField_fieldLabel: "Calls per page",
                showCallsField_fieldLabel: "Show",
                orderCallsField_fieldLabel: "Order",
                showClosedField_fieldLabel: "Show closed calls",
                commentOrderField_fieldLabel: "Call comment order",
                // Change Password
                changePasswordForm_title: "Change Password",
                changePasswordForm_description: 'There are no restrictions on your password, but a medium-strong password is advised',
                passwordFieldset_title: "Change your password",
                // Password fields
                oldPasswordField_fieldLabel: "Current Password",
                passwordField_blankText: "You must enter your current password",
                passwordField_fieldLabel: "New Password",
                passwordField_blankText: "You must enter a new password",
                passwordStrengthIndicator_fieldLabel: "Strength",
                passwordConfirmField_fieldLabel: "Confirm New Password",
                passwordConfirmField_blankText: "You must enter your password",
                // Password strength
                passwordStrength_blank: "Enter password",
                passwordStrength_weak: "Weak",
                passwordStrength_medium: "Medium",
                passwordStrength_strong: "Strong",
                passwordStrength_verystrong: "Very Strong",
                // Saving new password
                passwordChangeButton_text: "Change Password",
                passwordChangeButtonWait_title: "Change Password",
                passwordChangeButtonWait_text: "Changing your password",
                passwordChangeButtonConfirmation_title: "Password Changed",
                passwordChangeButtonConfirmation_text: "Your password has successfully been changed",
                clearPasswordFormButton_text: "Clear",
                // Notification settings
                notificationsForm_title: "Notification Settings",
                notificationsForm_description: 'This section allows you to manage '+
                    'your email notification settings. Notifications are only '+
                    'sent to you about calls that are assigned to you.',
                notificationFieldset_title: "Email notification options",
                sendNotificationsField_fieldLabel: "Send me email notifications",
                criticalNotifyTime_label: "For <b>CRITICAL</B> calls, notify me",
                criticalNotifyReason_label: "when they are",
                urgentNotifyTime_label: "For <b>URGENT</B> calls, notify me",
                urgentNotifyReason_label: "when they are",
                moderateNotifyTime_label: "For <b>MODERATE</B> calls, notify me",
                moderateNotifyReason_label: "when they are",
                minorNotifyTime_label: "For <b>MINOR</B> calls, notify me",
                minorNotifyReason_label: "when they are",
                negligibleNotifyTime_label: "For <b>NEGLIGIBLE</B> calls, notify me",
                negligibleNotifyReason_label: "when they are",
                saveNotificationsButton_text: "Save Settings",
                saveNotificationsButtonWait_title: "Save Settings",
                saveNotificationsButtonWait_text: "Saving your notification settings",
                resetNotificationsButton_text: 'Reset'
            }
        }
    };
} ();