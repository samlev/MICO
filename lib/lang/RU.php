<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Sergey Volobuev <sergey.volobuev@gmail.com>
 ** 
 ** File: lib/lang/RU.php
 ** 
 ** Description: Defines basic strings for the Russian language
 **
 ** Copyright (c) 2011 Sergey Volobuev
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
    "api/UnknownFunction"       => "Запрошена неизвестная функция",
    "api/APIError"              => "Ошибка API",
    
    // Language for index.php
    "index/Upgrade/Title"       => "Инструкция по обновлению",
    "index/Upgrade/Text"        => "Код MICO был обновлён с версии ".
            "%%OLD_VERSION%% до версии %%NEW_VERSION%%. Для завершения процесса обновления ".
            '<a href="%%APP_ROOT%%/upgrade/">нажмите здесь</a>.',
    
    /** PUBLIC API **/
    // Language for resetPassword.php
    "resetPassword/Success"     => "Сообщение с дальнейшими инструкциями было отправлено на адрес %%EMAIL%%.",
    
    // Language for setPassword.php
    "setPassword/Success"       => "Пароль успешно установлен.",
    
    /** USER API **/
    // Language for addCall.php
    "addCall/NoRecipient"       => "Пожалуйста выберите получателя звонка",
    "addCall/NoCallInfo"        => "Введите имя звонившего, название компании, сообщение или как связаться",
    "addCall/RecipientError"    => "Проблема с добавлением звонка. Проверьте список получателей и попробуйте ещё раз",
    "addCall/FieldError"        => "Проблема с добавлением звонка. Проверьте все поля и попробуйте ещё раз",
    
    // Language for changePassword.php
    "changePassword/Success"    => "Пароль успешно изменён",
    
    /** MANAGER API **/
    // Language for addUser.php
    "addUser/ErrorAdding"       => "Ошибка при добавлении пользователя",
    "addUser/AddAdminPermError" => "У вас нет прав на добавление административного пользователя",
    "addUser/InvalidRole"       => "Неверная роль пользователя",
    "addUser/NameEmailBlank"    => "Имя пользователя и email не могут быть пустыми",
    "addUser/UsernameInUse"     => "Имя пользователя уже занято",
    "addUser/InvalidUsername"   => "Имя пользователя может содержать только латинские буквы и цифры, возможно разделённые точкой (.), дефисом (-) или знаком подчёркивания (_)",
    
    // Language for updateUser.php
    "updateUser/BlankField"     => "Поле %%FIELD%% пользователя не может быть пустым",
    "updateUser/RolePermission" => "У вас нет прав назначить эту роль",
    "updateUser/OwnRole"        => "Вы не можете сменить свою собственную роль",
    "updateUser/InvalidRole"    => "Роль не верна",
    "updateUser/UnknownField"   => "Неизвестное поле",
    "updateUser/PermissionError"=> "У вас нет разрешения менять данные этого пользователя",
    
    /** ADMINISTRATOR API **/
    // Language for setSystemSettings.php
    "setSystemSettings/Debug"   => "Отладочный режим должен быть true или false.",
    "setSystemSettings/Mail"    => "Адрес отправителя не может быть пустым.",
    "setSystemSettings/Session" => "Длительность сесии должна быть отрезок времени.",
    "setSystemSettings/Cron"    => "Простой планировшик должен быть true или false.",
    "setSystemSettings/Language"=> "Неверный язык.",
    
    /** INCLUDES **/
    // Language for auto_login.php
    "auto_login/waitText"       => "Вы входите в систему, подождите.",
    "auto_login/waitTitle"      => "Вход",
    
    /** CLASSES AND EXCEPTIONS **/
    // Language for Call.class.php
    "Call/load/CallNotFoundException"           => "Не могу найти информацию о звонке",
    "Call/commit/CallClosed"                    => "Звонок закрыт",
    "Call/commit/CallReopenedEscalatedPerson"   => "Звонок открыт заново и важность увеличена, перенаправлен 1 человеку",
    "Call/commit/CallReopenedEscalatedPeople"   => "Звонок открыт заново и важность увеличена, перенаправлен %%NUM_PEOPLE%% человекам",
    "Call/commit/CallReopenedEscalated"         => "Звонок открыт заново и важность увеличена",
    "Call/commit/CallReopened"                  => "Звонок открыт заново",
    "Call/commit/CallEscalatedPerson"           => "Важность увеличена, перенаправлен 1 человеку",
    "Call/commit/CallEscalatedPeople"           => "Важность увеличена, перенаправлен %%NUM_PEOPLE%% человекам",
    "Call/commit/CallEscalated"                 => "Важность увеличена",
    "Call/commit/CallAssignedPerson"            => "Звонок перенаправлен 1 человеку",
    "Call/commit/CallAssignedPeople"            => "Звонок перенаправлен %%NUM_PEOPLE%% человекам",
    "Call/commit/Comment"                       => "Комментарий",
    "Call/commit/CallClosedException"           => "Не могу обновить звонок потому что он закрыт",
    "Call/commit/CallUpdateException"           => "Нечего обновлять",
    "Call/commit/CallPermissionException"       => "Пользователь не авторизован обновлять звонок",
    
    // Language for Notifier.class.php
    "Notifier/run/NewAndUpdatedCalls"           => "Вас ждут %%NUM_CALLS%% новых и обновлённых звонков",
    "Notifier/run/NewCall"                      => "Вас ждёт один новый звонок",
    "Notifier/run/UpdatedCall"                  => "Вас ждёт один обновлённый звонок",
    "Notifier/run/NewCalls"                     => "Вас ждут %%NUM_CALLS%% новых звонков",
    "Notifier/run/UpdatedCalls"                 => "Вас ждут %%NUM_CALLS%% обновлённых звонков",
    "Notifier/run/CallAssigned"                 => "Вы перенаправили этот звонок %%ACTOR_NAME%%",
    "Notifier/run/CallUpdated"                  => "Звонок обновлён %%ACTOR_NAME%%",
    "Notifier/run/CallerNoName"                 => "кто-то",
    "Notifier/run/CallAssignedWithCompWithMess" => "Звонил %%NAME%% из %%COMPANY%% и оставил следующее сообщение:",
    "Notifier/run/CallAssignedNoCompWithMess"   => "Звонил %%NAME%% и оставил следующее сообщение:",
    "Notifier/run/CallAssignedWithCompNoMess"   => "Звонил %%NAME%% из %%COMPANY%%, сообщения не оставлено.",
    "Notifier/run/CallAssignedNoCompNoMess"     => "Звонил %%NAME%%, сообщения не оставлено.",
    "Notifier/run/CallUpdatedWithComp"          => "Звонил %%NAME%% из %%COMPANY%% в %%DATE%%, %%TIME%%.",
    "Notifier/run/CallUpdatedNoComp"            => "Звонил %%NAME%% в %%DATE%%, %%TIME%%.",
    "Notifier/run/CallComment"                  => "%%ACTION%% - %%NAME%%",
    "Notifier/run/ContactSingle"                => "Свзяаться с ними через %%CONTACT%%",
    "Notifier/run/ContactMultiple"              => "Свзяаться с ними через:",
    "Notifier/run/ContactNone"                  => "Нет контактной информации остались.",
    "Notifier/run/LoginLink"                    => "Пожалуйста перейдите %%APP_ROOT%% чтобы ответить на эти звонки.",
    "Notifier/run/NotificationMessage"          => 'Вы можете сменить настройки уведомлений на странице "Предпочтения".',
    "Notifier/run/SubjectNewAndUpdatedCalls"    => "Уведомление Mico - %%NUM_CALLS%% новых и обновлённых звонков",
    "Notifier/run/SubjectNewCall"               => "Уведомление Mico - 1 новый звонок",
    "Notifier/run/SubjectUpdatedCall"           => "Уведомление Mico - 1 обновлённый звонок",
    "Notifier/run/SubjectNewCalls"              => "Уведомление Mico - %%NUM_CALLS%% новых звонков",
    "Notifier/run/SubjectUpdatedCalls"          => "Уведомление Mico - %%NUM_CALLS%% обновлённых звонков",
    
    // Language for PasswordReset.class.php
    "PasswordReset/getRequest/Email"                                => "Уважаемый %%NAME%%,\r\n\r\n".
            "Это письмо было отправлено Вам как часть процедуры восстановления забытого пароля\r\n".
            "для Mico.\r\n\r\n".
            "Чтобы сменить пароль, посетите эту ссылку:\r\n".
            "%%APP_ROOT%%/set_password.php?k=%%KEY%%\r\n\r\n".
            "Эта ссылка станет неактивной примерно через сутки, в %%EXPIRE_TIME%%\r\n".
            "%%EXPIRE_DATE%% (серверное время)*.\r\n\r\n".
            "Если вы не собирались менять пароль или вспомнили его,\r\n".
            "просто удалите это сообщение\r\n\r\n".
            "Не отвечайте на это письмо.\r\n\r\n".
            "----------------------------------------------------------------------\r\n\r\n".
            "* Серверное время может отличаться от Вашего местного времени.",
    "PasswordReset/getRequest/Subject"                              => "Mico - Запрос на смену пароля",
    "PasswordReset/getRequest/PasswordResetMailErrorException"      => "Не удалось отправить сообщение. Пожалуйста свяжитесь с администратором.",
    "PasswordReset/getRequest/PasswordResetUserDisabledException"   => "Пользователь неактивен.",
    "PasswordReset/newUser/Email"                                   => "Уважаемый %%NAME%%,\r\n\r\n".
            "Это сообщение отправлено вам как часть процедуры регистрации пользователя\r\n".
            "для Mico.\r\n\r\n".
            "Чтобы установить Ваш пароль, используйте следующую ссылку:\r\n".
            "%%APP_ROOT%%/set_password.php?k=%%KEY%%\r\n\r\n".
            "Ваше имя пользователя для Mico: %%USERNAME%%\r\n\r\n".
            "Эта ссылка станет неактивной примерно через 3 суток, в  %%EXPIRE_TIME%%\r\n".
            "%%EXPIRE_DATE%% (серверное время)*.\r\n\r\n".
            "Если ссылка станет неактивной до того как вы её используете, вы также можете поменять пароль\r\n".
            "используя ссылку 'Забыли пароль?' на\r\n".
            "%%APP_ROOT%%\r\n\r\n".
            "Не отвечайте на это письмо.\r\n\r\n".
            "----------------------------------------------------------------------\r\n\r\n".
            "* Серверное время может отличаться от Вашего местного времени.",
    "PasswordReset/newUser/Subject"                                 => "Mico - Регистрация пользователя",
    "PasswordReset/newUser/PasswordResetMailErrorException"         => "Не удалось отправить сообщение. Пожалуйста свяжитесь с администратором.",
    "PasswordReset/newUser/PasswordResetUserDisabledException"      => "Пользователь неактивен.",
    
    // Language for Settings.class.php
    "Settings/get/SettingsNotFoundException"        => "Не удалось найти настройку",
    "Settings/history/SettingsNotFoundException"    => "Не удалось найти настройку",
    
    // Language for User.class.php
    "User/bySession/UserDisabled"                   => "Пользователь неактивен",
    "User/bySession/SessionExpired"                 => "Сессия завершилась",
    "User/bySession/SessionIdNotFound"              => "Не найден ID сессии",
    "User/bySession/SessionIdInvalid"               => "Неверный ID сессии",
    "User/byId/UserNotFoundException"               => "Не могу найти пользователя",
    "User/byUsername/UserNotFoundException"         => "Не могу найти пользователя",
    "User/login/UserLoginException"                 => "Имя пользователя или пароль неверны",
    "User/changePassword/OldPassword"               => "Старый пароль неверен",
    "User/changePassword/PasswordConfirmation"      => "Пароль и подтверждение пароля не совпадают",
    "User/changePassword/PasswordBlank"             => "Пароль не может быть пустым",
    "User/setPassword/RequestExpired"               => "Запрос на смену пароля не существует или деактивирован",
    "User/setPassword/PasswordConfirmation"         => "Пароль и подтверждение пароля не совпадают",
    "User/setPassword/PasswordBlank"                => "Пароль не может быть пустым",
    "User/load/UserNotFoundException"               => "Информация о пользователе не найдена",
    "User/commit/UserNotFoundException"             => "Не могу сохранить иформацию о пользователе",
    
    /** COMMON STRINGS **/
    "critical"          => "Супер-срочно",
    "urgent"            => "Срочно",
    "moderate"          => "Средне-срочно",
    "minor"             => "Не очень срочно",
    "negligible"        => "Не срочно"
);
?>