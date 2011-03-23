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
    "api/UnknownFunction"   => "Unknown function requested",
    "api/APIError"          => "API Error",
    /** PUBLIC API **/
    "resetPassword/Success" => "An email was sent to %%EMAIL%% with further isntructions.",
    /** USER API **/
    // Language for addCall.php
    "addCall/NoRecipient"   => "Please select a recipient for the call",
    "addCall/NoCallInfo"    => "Please enter either a caller name, company name, message, or contact details",
    "addCall/RecipientError"=> "There was a problem adding your call. Please check your recipients and try again",
    "addCall/FieldError"    => "There was a problem adding your call. Please check your fields and try again",
    // Language for changePassword.php
    "changePassword/Success"=> "Password has successfully been changed"
);
?>