<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/lang/EN.php
 ** 
 ** Description: Defines basic strings for the English language
 **
 ** Copyright (c) 2011 Samuel Levy
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

// All language files must define a "$language_strings" variable
$language_strings = array(
    // Language for api.php
    "api/UnknownFunction"       => "Unknown function requested",
    "api/APIError"              => "API Error",
    /** PUBLIC API **/
    // Language for resetPassword.php
    "resetPassword/Success"     => "An email was sent to %%EMAIL%% with further isntructions.",
    // Language for setPassword.php
    "setPassword/Success"       => "Password has successfully been set.",
    /** USER API **/
    // Language for addCall.php
    "addCall/NoRecipient"       => "Please select a recipient for the call",
    "addCall/NoCallInfo"        => "Please enter either a caller name, company name, message, or contact details",
    "addCall/RecipientError"    => "There was a problem adding your call. Please check your recipients and try again",
    "addCall/FieldError"        => "There was a problem adding your call. Please check your fields and try again",
    // Language for changePassword.php
    "changePassword/Success"    => "Password has successfully been changed",
    /** MANAGER API **/
    // Language for addUser.php
    "addUser/ErrorAdding"       => "Error adding user",
    "addUser/AddAdminPermError" => "You do not have permission to add an administrative user",
    "addUser/InvalidRole"       => "User's role is not valid",
    "addUser/NameEmailBlank"    => "User's name and email cannot be blank",
    "addUser/UsernameInUse"     => "Username already in use",
    "addUser/InvalidUsername"   => "Username may contain only letters and numbers, optionally separated by a period (.), dash (-), or underscore (_)",
    // Language for updateUser.php
    "updateUser/BlankField"     => "User's %%FIELD%% cannot be blank",
    "updateUser/RolePermission" => "You do not have permission to set that role",
    "updateUser/OwnRole"        => "You may not change your own role",
    "updateUser/InvalidRole"    => "Not a valid role",
    "updateUser/UnknownField"   => "Unknown field",
    "updateUser/PermissionError"=> "You do not have permission to update that user",
    /** ADMINISTRATOR API **/
    // Language for setSystemSettings.php
    "setSystemSettings/Debug"   => "Debug mode must be either true or false.",
    "setSystemSettings/Mail"    => "From email cannot be blank.",
    "setSystemSettings/Session" => "Session length must be a valid period of time.",
    "setSystemSettings/Cron"    => "Simple cron must be either true or false.",
    "setSystemSettings/Language"=> "Language is not valid.",
    /** INCLUDES **/
    // Language for auto_login.php
    "auto_login/waitText"       => "You are being logged into the system. Please wait.",
    "auto_login/waitTitle"      => "Logging in",
    /** CLASSES AND EXCEPTIONS **/
    // Language for Call.class.php
    "Call/load/CallNotFoundException"           => "Cannot find call information",
    "Call/commit/CallClosed"                    => "Call closed",
    "Call/commit/CallReopenedEscalatedPerson"   => "Call reopened and escalated to 1 person",
    "Call/commit/CallReopenedEscalatedPeople"   => "Call reopened and escalated to %%NUM_PEOPLE%% people",
    "Call/commit/CallReopenedEscalated"         => "Call reopened and escalated",
    "Call/commit/CallReopened"                  => "Call reopened",
    "Call/commit/CallEscalatedPerson"           => "Call escalated to 1 person",
    "Call/commit/CallEscalatedPeople"           => "Call escalated to %%NUM_PEOPLE%% people",
    "Call/commit/CallEscalated"                 => "Call escalated",
    "Call/commit/CallAssignedPerson"            => "Call assigned to 1 person",
    "Call/commit/CallAssignedPeople"            => "Call assigned to %%NUM_PEOPLE%% people",
    "Call/commit/Comment"                       => "Comment",
    "Call/commit/CallClosedException"           => "Cannot update call - it has been closed",
    "Call/commit/CallUpdateException"           => "Nothing to update",
    "Call/commit/CallPermissionException"       => "User is not authorized to update call",
    // Language for Notifier.class.php
    "Notifier/run/NewCall"                      => "You have 1 new call",
    "Notifier/run/NewCalls"                     => "You have %%NUM_CALLS%% new calls",
    "Notifier/run/UpdatedCall"                  => "You have 1 updated call",
    "Notifier/run/UpdatedCalls"                 => "You have %%NUM_CALLS%% updated calls",
    "Notifier/run/NewAndUpdatedCalls"           => "You have %%NUM_CALLS%% new and updated calls",
    "Notifier/run/CallAssigned"                 => "Call assigned to you by %%ACTOR_NAME%%",
    "Notifier/run/CallUpdated"                  => "Call updated by %%ACTOR_NAME%%",
    "Notifier/run/CallerNoName"                 => "Someone",
    "Notifier/run/CallAssignedNoCompNoMess"     => "%%NAME%% called, and left no message.",
    "Notifier/run/CallAssignedNoCompWithMess"   => "%%NAME%% called, and left this message:",
    "Notifier/run/CallAssignedWithCompNoMess"   => "%%NAME%% from %%COMPANY%% called, and left no message.",
    "Notifier/run/CallAssignedWithCompWithMess" => "%%NAME%% from %%COMPANY%% called, and left this message:",
    "Notifier/run/CallUpdatedNoComp"            => "%%NAME%% called on %%DATE%% at %%TIME%%.",
    "Notifier/run/CallUpdatedWithComp"          => "%%NAME%% from %%COMPANY%% called on %%DATE%% at %%TIME%%.",
    "Notifier/run/CallComment"                  => "%%ACTION%% by %%NAME%%",
    "Notifier/run/LoginLink"                    => "Please go to %%APP_ROOT%% to respond to these calls.",
    "Notifier/run/NotificationMessage"          => "You can change your notification settings in the 'Preferences' area.",
    "Notifier/run/NotificationMessage"          => "You can change your notification settings in the 'Preferences' area.",
    "Notifier/run/SubjectNewCall"               => "Mico notification - 1 new call",
    "Notifier/run/SubjectNewCalls"              => "Mico notification - %%NUM_CALLS%% new calls",
    "Notifier/run/SubjectUpdatedCall"           => "Mico notification - 1 updated call",
    "Notifier/run/SubjectUpdatedCalls"          => "Mico notification - %%NUM_CALLS%% updated calls",
    "Notifier/run/SubjectNewAndUpdatedCalls"    => "Mico notification - %%NUM_CALLS%% new and updated calls",
    /** COMMON STRINGS **/
    "critical"          => "Critical",
    "urgent"            => "Urgent",
    "moderate"          => "Moderate",
    "minor"             => "Minor",
    "negligible"        => "Negligible"
);
?>