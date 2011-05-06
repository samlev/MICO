<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Jorge Luis Loza <jorge@ciclopesl.com>
 ** 
 ** File: lib/lang/ES.php
 ** 
 ** Description: Defines basic strings for the Spanish language
 **
 ** Copyright (c) 2011 Jorge Luis Loza
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
    "api/UnknownFunction"       => "Llamada a función desconocida",
    "api/APIError"              => "API Error",
    
    // Language for index.php
    "index/Upgrade/Title"       => "Instrucciones de actualización",
    "index/Upgrade/Text"        => "EL código de MICO ha sido actualizado desde la versión".
            "%%OLD_VERSION%% a la versión %%NEW_VERSION%%. Para completar la actualización ".
            'process, <a href="%%APP_ROOT%%/upgrade/">click aquí</a>.',
    
    /** PUBLIC API **/
    // Language for resetPassword.php
    "resetPassword/Success"     => "Se te ha enviado un email a %%EMAIL%% con las instrucciones a seguir",
    
    // Language for setPassword.php
    "setPassword/Success"       => "La password ha sido establecida.",
    
    /** USER API **/
    // Language for addCall.php
    "addCall/NoRecipient"       => "Por favor, selecciona un receptor para la llamadal",
    "addCall/NoCallInfo"        => "Por favor introduce un nombre de interlocutor, empresa, mensaje, o detalles de contacto",
    "addCall/RecipientError"    => "Hubo un problema añadiendo la llamada. Por favor, revisa el receptor e inténtalo de nuevo",
    "addCall/FieldError"        => "Hubo un problema añadiendo la llamada. Por favor, revisa los campos e inténtalo de nuevo",
    
    // Language for changePassword.php
    "changePassword/Success"    => "La password ha sido modificada con éxito",
    
    /** MANAGER API **/
    // Language for addUser.php
    "addUser/ErrorAdding"       => "Error añadiendo usuarior",
    "addUser/AddAdminPermError" => "No tienes permisos para añadir un usuario administrador",
    "addUser/InvalidRole"       => "El rol de usuario no es válido",
    "addUser/NameEmailBlank"    => "El nombre de usuario y el email no pueden estar en blanco",
    "addUser/UsernameInUse"     => "Nombre de usuario ya en uso",
    "addUser/InvalidUsername"   => "El nombre de usuario puede contener solo letras y números, opcionalmente separado por punto (.), guión (-), o subrayado (_)",
    
    // Language for updateUser.php
    "updateUser/BlankField"     => "El %%FIELD%% de usuario no puede estar en blanco",
    "updateUser/RolePermission" => "No tienes permisos para establecer ese rol",
    "updateUser/OwnRole"        => "No puedes cambiar tu propio rol",
    "updateUser/InvalidRole"    => "Rol no válido",
    "updateUser/UnknownField"   => "Campo desconocido",
    "updateUser/PermissionError"=> "No tienes permisos para actualizar este usuarior",
    
    /** ADMINISTRATOR API **/
    // Language for setSystemSettings.php
    "setSystemSettings/Debug"   => "Modo depuración debe estar activo o desactivado.",
    "setSystemSettings/Mail"    => "Email desde no puede estar en blanco.",
    "setSystemSettings/Session" => "El tiempo de sesión debe ser un valor válido.",
    "setSystemSettings/Cron"    => "Cron simple debe estar activo o desactivado.",
    "setSystemSettings/Language"=> "No es un lenguaje válido.",
    
    /** INCLUDES **/
    // Language for auto_login.php
    "auto_login/waitText"       => "Estás siendo registrado en el sistema. Espera por favor.",
    "auto_login/waitTitle"      => "Registrado",
    
    /** CLASSES AND EXCEPTIONS **/
    // Language for Call.class.php
    "Call/load/CallNotFoundException"           => "No se encuentra información de llamadaCannot ",
    "Call/commit/CallClosed"                    => "Llamada cerrada",
    "Call/commit/CallReopenedEscalatedPerson"   => "Llamada reabierta y escalada a 1 persona",
    "Call/commit/CallReopenedEscalatedPeople"   => "Llamada reabierta y escalada a %%NUM_PEOPLE%% personas",
    "Call/commit/CallReopenedEscalated"         => "Llamada reabierta y escalada",
    "Call/commit/CallReopened"                  => "Llamada reabierta",
    "Call/commit/CallEscalatedPerson"           => "Llamada escalada a 1 persona",
    "Call/commit/CallEscalatedPeople"           => "Llamada escalada a %%NUM_PEOPLE%% personas",
    "Call/commit/CallEscalated"                 => "Llamada escalada",
    "Call/commit/CallAssignedPerson"            => "Llamada asignada a 1 persona",
    "Call/commit/CallAssignedPeople"            => "Llamada asignada a %%NUM_PEOPLE%% personas",
    "Call/commit/Comment"                       => "Comentario",
    "Call/commit/CallClosedException"           => "No se puede actualizar la llamada- Está cerrada",
    "Call/commit/CallUpdateException"           => "Nada para actualizar",
    "Call/commit/CallPermissionException"       => "usuario no autorizado a actualizar la llamada",
    
    // Language for Notifier.class.php
    "Notifier/run/NewAndUpdatedCalls"           => "Tienes %%NUM_CALLS%% nuevas o modificadas",
    "Notifier/run/NewCall"                      => "Tienes 1 nueva llamada",
    "Notifier/run/UpdatedCall"                  => "Tienes 1 llamada modificada",
    "Notifier/run/NewCalls"                     => "Tienes %%NUM_CALLS%% llamadas nuevas",
    "Notifier/run/UpdatedCalls"                 => "Tienes %%NUM_CALLS%% llamadas actualizadass",
    "Notifier/run/CallAssigned"                 => "Llamada asignada por %%ACTOR_NAME%%",
    "Notifier/run/CallUpdated"                  => "Llamada actualizada por %%ACTOR_NAME%%",
    "Notifier/run/CallerNoName"                 => "Alguien",
    "Notifier/run/CallAssignedWithCompWithMess" => "Llamó %%NAME%% de %%COMPANY%% , y dejó este mensaje:",
    "Notifier/run/CallAssignedNoCompWithMess"   => "Llamó %%NAME%% y dejó este mensaje:",
    "Notifier/run/CallAssignedWithCompNoMess"   => "Llamó %%NAME%% de %%COMPANY%%, y no dejó mensajes.",
    "Notifier/run/CallAssignedNoCompNoMess"     => "Llamó %%NAME%% y no dejó mensajes.",
    "Notifier/run/CallUpdatedWithComp"          => "Llamó %%NAME%% de %%COMPANY%% el %%DATE%% a las %%TIME%%.",
    "Notifier/run/CallUpdatedNoComp"            => "Llamó %%NAME%% en %%DATE%% a las %%TIME%%.",
    "Notifier/run/CallComment"                  => "%%ACTION%% por %%NAME%%",
    "Notifier/run/ContactSingle"                => "Cantactarlos por %%CONTACT%%",
    "Notifier/run/ContactMultiple"              => "Cantactarlos por:",
    "Notifier/run/ContactNone"                  => "No hay información de contacto se quedaron.",
    "Notifier/run/LoginLink"                    => "Por favor, ve a  %%APP_ROOT%% para responder estas llamadass.",
    "Notifier/run/NotificationMessage"          => "Puedes cambiar la configuración de las notificaciones en el área 'Preferencias' ",
    "Notifier/run/SubjectNewAndUpdatedCalls"    => "Notificación de MICO - %%NUM_CALLS%% llamadas nuevas o actualizadas",
    "Notifier/run/SubjectNewCall"               => "Notificación de MICO - 1 llamada nueva",
    "Notifier/run/SubjectUpdatedCall"           => "Notificación de MICO - 1 llamada actualizada",
    "Notifier/run/SubjectNewCalls"              => "Notificación de MICO - %%NUM_CALLS%% llamadas nuevas",
    "Notifier/run/SubjectUpdatedCalls"          => "Notificación de MICO - %%NUM_CALLS%% llamadas actualizadas",
    
    // Language for PasswordReset.class.php
    "PasswordReset/getRequest/Email"                                => "Estimado %%NAME%%,\r\n\r\n".
            "Este email te ha sido enviado como parte del proceso de 'recuperación de password'\r\n".
            "de Mico.\r\n\r\n".
            "Para cambiar tu password, visita el siguiente lik:\r\n".
            "%%APP_ROOT%%/set_password.php?k=%%KEY%%\r\n\r\n".
            "Este link expira en aproximadamente 24 horas, a las  %%EXPIRE_TIME%%\r\n".
            "en %%EXPIRE_DATE%%, hora del servidor*.\r\n\r\n".
            "Si no respondes a este cambio de password, o has recordado\r\n".
            "tu password, por favor borra este mensaje\r\n\r\n".
            "No contestes a este emaill.\r\n\r\n".
            "----------------------------------------------------------------------\r\n\r\n".
            "* Nota: La hora del servidor puede diferir de tu hora local.",
    "PasswordReset/getRequest/Subject"                              => "Mico - Petición de reseteo de password",
    "PasswordReset/getRequest/PasswordResetMailErrorException"      => "No se pudo enviar email. Por favor contacta con el administrador.",
    "PasswordReset/getRequest/PasswordResetUserDisabledException"   => "EL usuario no está activo.",
    "PasswordReset/newUser/Email"                                   => "Estimado %%NAME%%,\r\n\r\n".
            "Este email te ha sido enviado como parte del proceso de registro de usuario\r\n".
            "de Mico.\r\n\r\n".
            "Para establecer tu password la primera vez, visita el siguiente link:\r\n".
            "%%APP_ROOT%%/set_password.php?k=%%KEY%%\r\n\r\n".
            "Tu nombre de usuario para Mico es: %%USERNAME%%\r\n\r\n".
            "Este link experirá aproximadamente en 72 horas, a las  %%EXPIRE_TIME%%\r\n".
            "en %%EXPIRE_DATE%%, hora del servidor *.\r\n\r\n".
            "Si el link expira antes de que puedas usarlo, Puedes también establecer tu \r\n".
            "password con el link de  'recuperación de password' en\r\n".
            "%%APP_ROOT%%\r\n\r\n".
            "No contestes a este email.\r\n\r\n".
            "----------------------------------------------------------------------\r\n\r\n".
            "* Nota: La hora del servidor puede diferir de tu hora local.",
    "PasswordReset/newUser/Subject"                                 => "Mico - Registro de usuario",
    "PasswordReset/newUser/PasswordResetMailErrorException"         => "No se pudo enviar email. Por favor contacta con el administrador.",
    "PasswordReset/newUser/PasswordResetUserDisabledException"      => "El usuario no está activo.",
    
    // Language for Settings.class.php
    "Settings/get/SettingsNotFoundException"        => "No se encuentra configuración",
    "Settings/history/SettingsNotFoundException"    => "No se encuentra configuración",
    
    // Language for User.class.php
    "User/bySession/UserDisabled"                   => "Usuario desactivado",
    "User/bySession/SessionExpired"                 => "Sesión expirada",
    "User/bySession/SessionIdNotFound"              => "ID de sesión no encontrado",
    "User/bySession/SessionIdInvalid"               => "ID de sesión inválido",
    "User/byId/UserNotFoundException"               => "No se puede encontrar el usuario",
    "User/byUsername/UserNotFoundException"         => "No se puede encontrar el usuario",
    "User/login/UserLoginException"                 => "Nombre de usuario o Password incorrecto",
    "User/changePassword/OldPassword"               => "Password anterior incorrecto",
    "User/changePassword/PasswordConfirmation"      => "No coincide la confirmación de Password",
    "User/changePassword/PasswordBlank"             => "El password no puede estar en blanco",
    "User/setPassword/RequestExpired"               => "La petición de establecimiento de Password no existe o ha expirado",
    "User/setPassword/PasswordConfirmation"         => "No coincide la confirmación de Password",
    "User/setPassword/PasswordBlank"                => "El password no puede estar en blanco",
    "User/load/UserNotFoundException"               => "No se encuentra información de usuario",
    "User/commit/UserNotFoundException"             => "No se puede guardar la información del usuario",
    
    /** COMMON STRINGS **/
    "critical"          => "Crítico",
    "urgent"            => "Urgent",
    "moderate"          => "Medio",
    "minor"             => "Menor",
    "negligible"        => "Insignificante"
);
?>