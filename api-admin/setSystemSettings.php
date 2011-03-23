<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-admin/setSystemSettings.php
 ** 
 ** Description: Sets the system settings that can be changed by an admin user
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

// get values
$DEBUG_MODE = boolval($_POST['DEBUG_MODE'],true);
$MAIL_FROM = trim(remove_linebreaks(html_scrub($_POST['MAIL_FROM'])));
$SESSION_LENGTH = trim(remove_linebreaks(html_scrub($_POST['SESSION_LENGTH'])));
$SIMPLE_CRON = boolval($_POST['SIMPLE_CRON'],true);
$LANGUAGE = trim(remove_linebreaks(html_scrub($_POST['LANGUAGE'])));

// set what we can
if ($DEBUG_MODE !== null) {
    // if the setting is different, save it
    if (Settings::get('DEBUG_MODE')!=$DEBUG_MODE) {
        Settings::set('DEBUG_MODE',$DEBUG_MODE);
    }
} else {
    // if we have an error already, make multiple lines
    if ($error) {
        $error_message .= "<br />";
    } else {
        $error_message = "";
    }
    // mark the error
    $error = true;
    $error_message .= "Debug mode must be either true or false.";
}

if (strlen($MAIL_FROM)) {
    // if the setting is different, save it
    if (Settings::get('MAIL_FROM')!=$MAIL_FROM) {
        Settings::set('MAIL_FROM',$MAIL_FROM);
    }
} else {
    // if we have an error already, make multiple lines
    if ($error) {
        $error_message .= "<br />";
    } else {
        $error_message = "";
    }
    // mark the error
    $error = true;
    $error_message .= "From email cannot be blank.";
}

// check that 'session length' is a valid time period
if (preg_match('/^[1-9][0-9]{0,2} (minute|hour|day|week|month|year)s?$/i',$SESSION_LENGTH)) {
    // if the setting is different, save it
    if (Settings::get('SESSION_LENGTH')!=$SESSION_LENGTH) {
        Settings::set('SESSION_LENGTH',$SESSION_LENGTH);
    }
} else {
    // if we have an error already, make multiple lines
    if ($error) {
        $error_message .= "<br />";
    } else {
        $error_message = "";
    }
    // mark the error
    $error = true;
    $error_message .= "Session length must be a valid period of time.";
}

// simple cron
if ($SIMPLE_CRON !== null) {
    // if the setting is different, save it
    if (Settings::get('SIMPLE_CRON')!=$SIMPLE_CRON) {
        Settings::set('SIMPLE_CRON',$SIMPLE_CRON);
    }
} else {
    // if we have an error already, make multiple lines
    if ($error) {
        $error_message .= "<br />";
    } else {
        $error_message = "";
    }
    // mark the error
    $error = true;
    $error_message .= "Simple cron must be either true or false.";
}

// check that 'language' is a valid language option
if (preg_match('/^[A-Z]{2}$/',$LANGUAGE)) {
    // if the setting is different, save it
    if (Settings::get('LANGUAGE')!=$LANGUAGE) {
        Settings::set('LANGUAGE',$LANGUAGE);
    }
} else {
    // if we have an error already, make multiple lines
    if ($error) {
        $error_message .= "<br />";
    } else {
        $error_message = "";
    }
    // mark the error
    $error = true;
    $error_message .= "Language is not valid.";
}

// no error? respond with success
if (!$error) {
    $data = array("success"=>true);
}
?>