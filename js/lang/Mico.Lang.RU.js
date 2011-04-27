/*******************************************************************************
 *******************************************************************************
 ** Author: Sergey Volobuev <sergey.volobuev@gmail.com>
 ** 
 ** File: js/lang/Mico.Lang.RU.js
 ** 
 ** Description: Russian Language file
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
Mico.Lang = function () {
    return {
        // Language for Mico.Application.js
        Application: {
            logout: "Выход"
        },
        // Language for Mico.Login.js
        Login: {
            // Login form
            usernameField_fieldLabel: "Имя пользователя",
            usernameField_blankText: "Вы должны ввести имя пользователя",
            passwordField_fieldLabel: "Пароль",
            passwordField_blankText: "Вы должны ввести пароль",
            forgottenPasswordLink: "Забыли пароль?",
            loginButton: "Войти",
            // Reset password form
            resetPasswordUsernameField_fieldLabel: "Имя пользователя",
            resetPasswordUsernameField_blankText: "Вы должны ввести имя пользователя",
            resetPasswordInstruction: "Введите своё имя пользвателя и мы отправим дальнейшие инструкции на ваш e-mail.",
            cancelButton: "Отменить",
            resetPasswordButton: "Сменить пароль",
            // Login function alert
            loginInvalidErrorAlert_title: "Ошибка",
            loginInvalidErrorAlert_text: "Проверьте отмеченные поля",
            // Password reset function alerts
            resetPasswordSuccess_title: "Сменить пароль",
            resetPasswordSuccess_text: "Дальнейшие инструкции отправлены на ваш e-mail.",
            resetPasswordError_title: "Ошибка",
            resetPasswordError_text: "Проверьте отмеченные поля"
        },
        // Language for Mico.PasswordSet.js
        PasswordSet: {
            // Password set form
            usernameField_fieldLabel: "Имя пользователя",
            usernameField_blankText: "Вы должны ввести имя пользователя",
            passwordField_fieldLabel: "Пароль",
            passwordField_blankText: "Вы должны ввести пароль",
            passwordStrengthIndicator_fieldLabel: "Сложность",
            passwordConfirmField_fieldLabel: "Подтвердить пароль",
            passwordConfirmField_blankText: "Вы должны ввести пароль",
            setPasswordButton: "Сохранить пароль",
            // Password strength
            passwordStrength_blank: "Введите пароль",
            passwordStrength_weak: "Слабо",
            passwordStrength_medium: "Удовлетворительно",
            passwordStrength_strong: "Хорошо",
            passwordStrength_verystrong: "Отлично",
            // Password set function alerts
            setPasswordInvalid_title: "Ошибка",
            setPasswordInvalid_text: "Проверьте отмеченные поля",
            setPasswordInvalidMatch_text: "Пароль и подтверждение должны совпадать",
            setPasswordSuccess_title: "Пароль сохранён",
            setPasswordSuccess_text: "Ваш пароль сохранён.<br /><br />Сейчас вы будете перенаправлены на страницу входа."
        },
        // Language for Mico.Footer.js
        Footer: {
            aboutLink_text: "О Mico",
            version_text: function (version) { return "Версия: "+version; },
            aboutWindow_title: "О Mico",
            showAboutBody_html: function (version) {
                var aboutHTML = '<h1>Организатор входящих звонков</h1>'; // Title
                // Version
                aboutHTML += '<p style="font-weight:bold;color:#88BB88;" align="right">Версия '+version+'</p>';
                // Licence
                aboutHTML += '<p>Mico доступен под лицензией <a href="http://www.gnu.org/licenses/lgpl-3.0-standalone.html" target="_new">GNU LGPL</a> '+
                             'версии 3.0, бесплатно, без каких-либо гарантий.</p>';
                // Acknowledgements
                aboutHTML += '<p>В этой системе используются иконки из <a href="http://www.famfamfam.com/lab/icons/silk/" target="_new">набора иконок silk</a>.</p>';
                // Copyright
                aboutHTML += '<p style="color:#88BB88;">Весь код и изображения &copy; 2010 to <a href="http://www.samuellevy.com/" style="color:#88BB88;" target="_new">Сэм Леви</a>, кроме случаев отмеченных отдельно.</p>';
                
                return aboutHTML;
            }
        },
        // Language for Mico.Calls.js
        Calls: {
            menu_text: "Звонки",
            // Check Updates
            sessionExpired_title: "Сессия завершилась",
            sessionExpired_text: "Ваша сессия завершилась.<br /><br />Сейчас вы будете перенаправлены на страницу входа.",
            loadUpdates_title: "Загружаю обновлённые звонки",
            loadUpdated_text: "Звонок обновлён",
            // Language for Mico.Calls.AddCall.js
            AddCall: {
                title: "Принять звонок",
                // Caller details
                callerNameField_emptyText: "Имя звонившего",
                callerNameField_hint: "звонил",
                callerCompanyField_emptyText: "Компания звонившего",
                callerCompanyField_label: "откуда",
                callerCompanyField_hint: "компания",
                // Recipient details
                userField_emptyText: "Выбрать получателя",
                userField_label: "Звонил по поводу",
                userAddExtraButton_text: "Добавить",
                userAddExtraButton_tooltip: "Добавить ещё получателя",
                userFieldExtra_label: "ИЛИ",
                // Message
                callerMessageBox_emptyText: "Сообщение получателю",
                callerMessageBox_label: "About",
                // Contact details
                callerContactField_emptyText: "Номер телефона или email звонившего",
                callerContactField_label: "Когда связаться",
                callerContactAddExtraButton_text: "Добавить",
                callerContactAddExtraButton_tooltip: "Добавить ещё способ связаться",
                callerContactFieldExtra_label: "ИЛИ",
                // Call Priority
                callPriorityField_label: "Важность",
                // Call Action
                callActionField_data:[
                    ['Связаться СРОЧНО'],
                    ['Связаться до конца дня'],
                    ['Связаться когда будет время'],
                    ['Звонивший позвонит или напишет сам'],
                    ['Не надо связываться']
                ],
                callActionField_default: "Связаться СРОЧНО",
                callActionField_label: "Требуется действие",
                // Buttons
                addCallButton_text: "Добавить звонок",
                clearFormButton_text: "Очистить",
                // Functions - add call
                validateRecipientsError_title: "Ошибка",
                validateRecipientsError_text: "Выберите получателя этого звонка",
                callerDetailsError_title: "Ошибка",
                callerDetailsError_text: "Введите имя звонившего, компанию, сообщение или контактную информацию"
            },
            // Language for Mico.Calls.SearchBar.js
            SearchBar: {
                filterField_label: "Показать",
                orderField_label: "отсортированные по",
                showClosedField_label: "Показать закрытые?"
            },
            // Language for Mico.Calls.ViewCalls.js
            ViewCalls: {
                // Grid headers
                header_date: "Время",
                header_caller: "Звонивший",
                header_company: "От",
                header_message: "Сообщение",
                header_contact: "Контакт",
                header_priority: "Срочность",
                header_action: "Действие",
                header_close: "Закрыть",
                // Call details - comments
                comment_blank: "Неть комментариев",
                commentOrder_label: "Показать комментарии",
                // Call details - update
                closeCallRadio_boxLabel: "Закрыть свонок",
                escalateCallRadio_boxLabel: "Увеличить важность",
                justCommentRadio_boxLabel: "Просто комментировать",
                reopenCallCheck_boxLabel: "Открыть звонок",
                userCombo_emptyText: "Увеличить важность до",
                commentText_emptyText: "Комментарий",
                addCallButton_text: "Обновить звонок",
                clearFormButton_text: "Очистить",
                // Show call detail panel
                callInfo_date: function (date, time) { return date+" в "+time; },
                callInfo_closed: "Закрыт",
                callInfo_callTakerSelf: "Звонок принят вами",
                callInfo_callTakerOther: function (taker) { return "Звонок принял "+taker; },
                callInfo_callerUnkown: "Кто-то",
                callInfo_callerLine: function (caller, company) {
                    // Caller's name
                    line = caller;
                    // Caller's company is included only if not empty
                    if (company.length) {
                        line += " из " + company;
                    }
                    return line + " звонил";
                },
                callInfo_selfRecipient: "Вам",
                callInfo_messageLabel: "Сообщение",
                callInfo_noMessage: "Сообщение не оставлено.",
                callInfo_contactLabelMulti: "Свзяаться с ними через",
                callInfo_contactLabelSingle: function (contact) { return "Связаться с ними через "+contact; },
                callInfo_contactNone: "Не оставлено контакта.",
                callInfo_actionRequired: "Требуется действие",
                // Show Comments function
                showComments_today: "Сегодня",
                showComments_yesterday: "Вчера",
                showComments_selfComment: "Вы",
                showComments_commentHeader: function (action, name) { return action+" by "+name; },
                // grid renderers
                renderDate_today: function (time) { return time; },
                renderDate_yesterday: function (time) { return time+" Вчера";},
                renderDate_other: function (date) { return date;},
                renderDate_quicktip: function (date, time) { return date+" в "+time; },
                renderClose_open: "Закрыть звонок",
                renderClose_closed: "Звонок закрыт"
            }
        },
        // Language for Mico.Utils.js
        Utils: {
            // Language for Mico.Utils.CommonStores.js
            CommonStores: {
                callsSearchFilter: {
                    assigned: "Звонки назначенные мне",
                    opened: "Звонки открытые мной",
                    all: "Все звонки"
                },
                callsOrderFilter: {
                    recent: "Самые свежие",
                    urgent: "Самые срочные"
                },
                callPriority: {
                    critical: "Супер-срочно",
                    urgent:'Срочно',
                    moderate:'Средне-срочно',
                    minor:'Не очень срочно',
                    negligible:'Не срочно'
                },
                userTypes: {
                    admin: "Администратор",
                    manager: "Менеджер",
                    user: "Стандартный пользователь",
                    disabled: "Отключён"
                },
                commentOrder: {
                    oldest: "Вначале старые",
                    newest: "Вначале новые"
                },
                notifyTime: {
                    immediate:'сразу же',
                    halfhour:'раз в полчаса',
                    hour:'раз в час',
                    never:'никогда'
                },
                notifyReason:{
                    assigned:'назначено мне',
                    updated:'обновлено'
                },
                languageOptions:{
                    EN: "Английский",
                    ES: "Испанский",
                    RU: "Русский",
                    DE: "Немецкий"
                }
            }
        },
        // Language for Mico.User.js
        User: {
            logoutWait_title: "Выход",
            logoutWait_text: "Выхожу...",
            logoutConfirmation_title: "Вы вышли",
            logoutConfirmation_text: "Вы вышли. Сейчас мы вас перенаправим",
            // Language for Mico.User.Preferences.js
            Preferences: {
                menu_text: "Мои предпочтения",
                // User Settings and Preferences
                settingsPanel_title: "Настройки и предпочтения",
                saveSettingsButton_text: "Сохранить настройки",
                saveSettingsButtonWait_title: "Сохранение настроек",
                saveSettingsButtonWait_text: "Сохраняю ваши настройки",
                resetSettingsButton_text: "Сброс",
                // User Settings and Preferences - Your Settings
                settingsFieldset_title: "Ваши настройки",
                settingsFieldset_description: 'Ваше имя и адрес email'+
                    'используются чтобы уведомлять вас о назначенных вам звонках и чтобы '+
                    'вы смогли изменить свой пароль. Убедитесь что это данные верны',
                nameField_fieldLabel: "Ваше имя",
                nameField_blankText: "Вы должны ввести своё имя",
                emailField_fieldLabel: "Ваш адрес email",
                emailField_blankText: "Вы должны ввести свой адрес email",
                // User Settings and Preferences - Display preferences
                preferencesFieldset_title: "Настройки отображения",
                preferencesFieldset_description: 'Настройки формата даты и времени '+
                    'начнут действовать немедленно, но остальные настройки '+
                    'могут потребовать от вас выйти из системы и зайти снова',
                timeFormatField_fieldLabel: "Формат времени",
                timeFormatField_display: {
                    gia:"12 часов с am/pm",
                    Hi: "24 часа с ведущими нолями",
                    Gi: "24 hour без ведущих нолей"
                },
                dateFormatField_fieldLabel: "Формат даты",
                dateFormatField_display: {
                    jSMY:"Текстовый",
                    dmY: "Британский (День/Месяц/Год)",
                    mdY: "Американский (Месяц/День/Год)",
                    Ymd: "Год-Месяц-День"
                },
                callsPerPageField_fieldLabel: "Звонков на страницу",
                showCallsField_fieldLabel: "Показать",
                orderCallsField_fieldLabel: "Порядок",
                showClosedField_fieldLabel: "Показывать закрытые звонки",
                commentOrderField_fieldLabel: "Порядок комментариев",
                languageField_fieldLabel: "Язык",
                // Change Password
                changePasswordForm_title: "Изменить пароль",
                changePasswordForm_description: 'Мы не ограничиваем вас в выборе пароля, но рекомендуем не использовать слишком простые пароли',
                passwordFieldset_title: "Сменить пароль",
                // Password fields
                oldPasswordField_fieldLabel: "Текущий пароль",
                passwordField_blankText: "Вы должны ввести свой текущий пароль",
                passwordField_fieldLabel: "Новый пароль",
                passwordField_blankText: "Вы должны ввести новый пароль",
                passwordStrengthIndicator_fieldLabel: "Сложность",
                passwordConfirmField_fieldLabel: "Подтвердить новый пароль",
                passwordConfirmField_blankText: "Вы должны ввести свой пароль",
                // Password strength
                passwordStrength_blank: "Введите пароль",
                passwordStrength_weak: "Слабо",
                passwordStrength_medium: "Удовлетворительно",
                passwordStrength_strong: "Хорошо",
                passwordStrength_verystrong: "Отлично",
                // Saving new password
                passwordChangeButton_text: "Сменить пароль",
                passwordChangeButtonWait_title: "Смена пароля",
                passwordChangeButtonWait_text: "Меняю пароль...",
                passwordChangeButtonConfirmation_title: "Пароль изменён",
                passwordChangeButtonConfirmation_text: "Ваш пароль был успешно изменён",
                clearPasswordFormButton_text: "Очистить",
                // Notification settings
                notificationsForm_title: "Настройки уведомления",
                notificationsForm_description: 'Этот раздел позволяет вам менять настройки уведомлений'+
                    'Вы будете уведомлены только о звонках назначенных вам.',
                notificationFieldset_title: "Почтовые уведомления",
                sendNotificationsField_fieldLabel: "Посылайте мне уведомления по email",
                criticalNotifyTime_label: "Для <b>КРИТИЧЕСКИХ</B> звонков, уведомляйте меня",
                criticalNotifyReason_label: "когда они",
                urgentNotifyTime_label: "Для <b>СРОЧНЫХ</B> звонков, уведомляйте меня",
                urgentNotifyReason_label: "когда они",
                moderateNotifyTime_label: "Для <b>СРЕДНЕ-ВАЖНЫХ</B> звонков, уведомляйте меня",
                moderateNotifyReason_label: "когда они",
                minorNotifyTime_label: "Для <b>НЕ ОЧЕНЬ ВАЖНЫХ</B> звонков, уведомляйте меня",
                minorNotifyReason_label: "когда они",
                negligibleNotifyTime_label: "Для <b>НЕСУЩЕСТВЕННЫХ</B> звонков, уведомляйте меня",
                negligibleNotifyReason_label: "когда они",
                saveNotificationsButton_text: "Сохранить настройки",
                saveNotificationsButtonWait_title: "Сохранение настроек",
                saveNotificationsButtonWait_text: "Сохраняю ваши настройки уведомления",
                resetNotificationsButton_text: 'Сброс'
            },
            // Language for Mico.User.Status.js
            Status: {
                menu_text: "Установить статус",
                statusField_data: {
                    available: "Доступен",
                    away: "Отошёл",
                    busy: "Занят",
                    offline: "В офлайне"
                },
                statusField_fieldLabel: "Статус",
                statusTextField_fieldLabel: "Подробности",
                statusOptions_data: {
                    available: "Доступен",
                    offline: "В офлайне",
                    busy: [['Занят'],['Говорит по телефону'],['На совещании']],
                    away: [['Отошёл'],['На обеде'],['Недоступен']]
                },
                setStatusButton_text: "Установить статус",
                cancelButton_text: "Отменить",
                panel_title: "Установить статус"
            }
        },
        // Language for Mico.ManageUsers.js
        ManageUsers: {
            menu_text: "Управление пользователями",
            // Toolbar
            userFilterField_label: "Просмотр",
            userFilterField_data: {
                active:'Активные пользователи',
                disabled:'Неактивные пользователи',
                admin:'Администраторы',
                manager:'Менеджеры',
                user:'Стандартные пользователи',
                all:'Все пользователи' 
            },
            addUsersButton_text:"Добавить пользователей",
            // Grid
            header_username: "Имя пользователя",
            header_name: "Имя",
            header_email: "Адрес email",
            header_role: "Роль",
            header_password: "Сбросить пароль",
            // Reset password function
            resetPasswordConfirmation_title: "Сбросить пароль",
            resetPasswordConfirmation_text: "Пользователю был отправлен email для сброса пароля",
            // Add users form
            usernameField_fieldLabel: "Имя пользователя",
            nameField_fieldLabel: "Имя",
            emailField_fieldLabel: "Адрес email",
            roleField_fieldLabel: "Роль",
            addUserButton_text: "Добавить пользователя",
            addUserButtonConfirmation_title: "Пользователь добавлен",
            addUserButtonConfirmation_text: "Пользователь добавлен, ему отправлено письмо с инструкциями",
            clearAddUsersButton_text: "Очистить",
            hideAddUsersButton_text: "Закрыть",
            addUsersPanel_title: "Все пользователи",
            // Grid renderers
            renderResetPassword: {
                disabled: "Пользователь заблокирован",
                active: "Сбросить пароль"
            }
        },
        // Language for Mico.SystemSettings.js
        SystemSettings: {
            menu_text: "Системные настройки",
            // Debug mode
            debugModeField_boxLabel: "Использовать отладочный режим",
            debugModeFieldset_title: "Отладочный режим",
            debugModeFieldset_description: "Отладочный режим полезен если вы "+
                "работаете над кодом Mico или испытываете ошибки. "+
                "Для лучшей производительности лучше оставить эту опцию выключенной.",
            // From email
            mailFromFieldset_title: 'Адрес "от кого"',
            mailFromFieldset_description: "Обратный адрес писем по установке и сбросу пароля, "+
                "а также уведомлений.",
            // Session length
            sessionLengthField_data: {
                halfhour: '30 минут',
                onehour: '1 час',
                twohours: '2 часа',
                oneday: '1 день',
                threedays: '3 дня',
                oneweek: '1 неделя',
                twoweeks: '2 недели',
                onemonth: '1 месяц',
                oneyear: '1 год'
            },
            sessionLengthFieldset_title: "Длительность сессии",
            sessionLengthFieldset_description: "Ктонтролирует сколько сессия будет  "+
                "сохраняться пока пользователь не работает в Mico. Короткая "+
                "сессия безопаснее, но зато длинная позволяет "+
                "не вводить логин и пароль каждый раз когда открываете приложение.",
            // Simple cron
            simpleCronField_boxLabel: "Использовать простой планировщик",
            simpleCronFieldset_title: "Простой планировщик",
            simpleCronFieldset_description: "Планировщик это периодическая задача "+
                "рассылающая уведомления по email.<br /><br />"+
                'Используйте "простой cron" только если у вас нет доступа '+
                "к нормальному системному планировщику. Простой планировщик будет работать только пока Mico работает<br /><br />"+
                "Если у вас есть доступ к системному планировщику задач, вы можете настроить его чтобы он вызывал "+
                "<b>"+APP_ROOT+"/notify.php</b> используя команду похожую на ту что ниже. "+
                "Планировщик должен запускать скрипт как минимум каждые 5 минут чтобы "+
                "уведомления рассылались своевременно.<br /><br />"+
                "<i>Обратите внимание что команда может отличаться от той что внизу "+
                "в зависимости от того как настроен ваш сервер. В случае проблем "+
                "обратитесь к администратору сервера или сотруднику хостинг-провайдера "+
                "за инструкциями по настройке системного планировщика.</i>",
            // L10n settings - language
            languageFieldset_title: "Язык по-умолчанию",
            languageFieldset_description: "Это язык используемый в системе по-умолчанию "+
                "Пользователи могут выбрать другой язык, но этот "+
                "будет использован на странице входа и смены пароля "+
                "или если пользователь не выбрал язык.",
            // Save settings
            saveSettingsButton_text: "Сохранить настройки",
            resetSettingsButton_text: "Сброс",
            // Load settings
            loadSettingsWait_title: "Загрузка",
            loadSettingsWait_text: "Загружаю настройки с сервера",
            // Save settings
            saveSettingsWait_title: "Сохранить настройки",
            saveSettingsWait_text: "Сохранаю системные настройки",
            saveSettingsConfirmation_title: "Системные настройки",
            saveSettingsConfirmation_text: "Системные настройки обновлены"
        },
        // Language for Mico.Upgrader.js
        Upgrader: {
            upgradeButton_text: "Обновление",
            version_upToDate: "Mico уже самой последней версии.",
            version_upgrade: function (OLD_VERSION, NEW_VERSION) {
                message = "<h1>Mico должен быть обновлён.</h1>"+
                          "<p>Нажмите кнопку 'Обновить' чтобы обновить Mico с версии "+
                          OLD_VERSION+" до версии "+NEW_VERSION+"</p>";
                
                return message;
            },
            // Do upgrade
            doUpgradeWait_title: "Обновить",
            doUpgradeWait_text: "Обновляю MICO",
            doUpgradeConfirmation_title:"Обновление",
            doUpgradeConfirmation_text:"MICO успешно обновлён.<br /><br />"+
                "Сейчас вы будете перенаправлены."
        },
        // Language for Mico.ConfigSetup.js
        ConfigSetup: {
            instructions: "Шаг 1: настройте базу данных",
            // Path settings
            automaticPathField_boxLabel: "Автоматические настройки пути (рекомендуется)",
            FS_ROOT_Field_fieldLabel: "Корневая директория файловой системы",
            WEB_DOMAIN_Field_fieldLabel: "Веб домен",
            WEB_ROOT_Field_fieldLabel: "Web Root",
            APP_ROOT_Field_fieldLabel: "Application Root",
            pathSettingsFieldset_title: "Настройки пути и файловой системы",
            pathSettingsFieldset_description: "Следующие настройки определяют где  "+
                "Mico находится на сервере и как получить к нему доступ из интернет. "+
                "Меняйте продвинутые настройки только если вы знаете что делаете.",
            // Database settings
            hostField_fieldLabel: "Хост",
            userField_fieldLabel: "Имя пользователя",
            passField_fieldLabel: "Пароль",
            nameField_fieldLabel: "База данных",
            prefField_fieldLabel: "Префикс имён таблиц",
            databaseSettingsFieldset_title: "Настройки базы данных",
            databaseSettingsFieldset_description: "Это настройки "+
                "базы данных MySQL. Префикс имён таблиц позволяет хранить данные Mico data отдельно "+
                "от других таблиц в случае если Mico делит базу данных с другими приложениями.",
            // Buttons
            saveSettingsButton_text: "Сохранить настройки",
            resetSettingsButton_text: "Сброс",
            // Save settings function
            checkSettingsWait_title: "Проверяю настройки",
            checkSettingsWait_text: "Проверяю настройки базы данных",
            saveSettingsWait_title: "Установка",
            saveSettingsWait_text: "Установка Mico",
            saveSettingsConfirmation_title: "Установка",
            saveSettingsConfirmation_text: "Шаг 1 завершён. Второй шаг это конфигурация системы."
        },
        // Language for Mico.SystemSetup.js
        SystemSetup: {
            // Debug mode
            debugModeField_boxLabel: "Использовать отладочный режим",
            debugModeFieldset_title: "Отладочный режим",
            debugModeFieldset_description: "Отладочный режим используется "+
                "когда вы работаете над кодом Mico или когда вы испытываете ошибки. "+
                "Для лучшей производительности рекомендуется.",
            // From email
            mailFromFieldset_title: "Адрес отправителя",
            mailFromFieldset_description: "Адрес отправителя используется в сообщениях об "+
                "установке и смене пароля, а также в уведомлениях.",
            // Session length
            sessionLengthField_data: {
                halfhour: '30 минут',
                onehour: '1 час',
                twohours: '2 часа',
                oneday: '1 день',
                threedays: '3 дня',
                oneweek: '1 неделя',
                twoweeks: '2 недели',
                onemonth: '1 месяц',
                oneyear: '1 год'
            },
            sessionLengthFieldset_title: "Длительность сессии",
            sessionLengthFieldset_description: "Длительность сессии определяет как долго "+
                "сессия Mico открыта. Короткие "+
                "сессии безопаснее, но долгие позволяют пользователю "+
                "не вводить пароль каждый раз когда открывается приложение.",
            // Simple cron
            simpleCronField_boxLabel: "Использовать простой планировщик",
            simpleCronFieldset_title: "Простой планировщик",
            simpleCronFieldset_description: "Планировщик это периодическая задача "+
                "рассылающая уведомления по email.<br /><br />"+
                'Используйте "простой cron" только если у вас нет доступа '+
                "к нормальному системному планировщику. Простой планировщик будет работать только пока Mico работает<br /><br />"+
                'После установки системы закладка "Системные настройки" будет содержать'+
                "дальнейшие инструкции по настройке планировщика.",
                
               
            // L10n settings - language
            languageFieldset_title: "Язык по умолчанию",
            languageFieldset_description: "Это язык используемый в системе по-умолчанию "+
                "Пользователи могут выбрать другой язык, но этот "+
                "будет использован на странице входа и смены пароля, а также если "+
                "пользователь ещё не выбрал язык.",
            // First user
            usernameField_fieldLabel: "Имя пользователя",
            usernameField_blankText: "Вы должны ввести своё имя пользователя",
            nameField_fieldLabel: "Имя",
            nameField_blankText: "Вы должны ввести своё имя",
            emailField_fieldLabel: "Адрес email",
            emailField_blankText: "Вы должны ввести свой адрес email",
            // Password
            passwordField_fieldLabel: "Пароль",
            passwordField_blankText: "Вы должны ввести свой пароль",
            passwordStrengthIndicator_fieldLabel: "Сложность",
            passwordConfirmField_fieldLabel: "Подтвердите пароль",
            passwordConfirmField_blankText: "Вы должны ввести пароль",
            // Password strength
            passwordStrength_blank: "Введите пароль",
            passwordStrength_weak: "Слабо",
            passwordStrength_medium: "Удовлетворительно",
            passwordStrength_strong: "Хорошо",
            passwordStrength_verystrong: "Отлично",
            // Fieldset
            passwordFieldset_title: "Первый пользователь",
            passwordFieldset_description: "Первый пользователь будет администратором "+
                "и сможет добавлять других пользователей.",
            // Buttons
            saveSettingsButton_text: "Сохранить настройки",
            resetSettingsButton_text: "Сброс",
            // Function
            saveSettingsWait_title: "Сохранить настройки",
            saveSettingsWait_text: "Сохраняю системные настройки",
            saveSettingsConfirmation_title: "Установка завершена",
            saveSettingsConfirmation_text: "Установка Mico успешно завершена.<br /><br />"+
                "Пожалуйста удалите папку 'install' для безопасности.<br /><br />"+
                "Вы будете перенаправлены на страницу входа."
        },
        // Language for Mico.Installed.js
        Installed: {
            placeholder: "<h2>Установка Mico успешно завершена.</h2>"+
                         "<p>Установка Mico завершена. Рекомендуется удалить папку "+
                         "'install' и всё её содержимое.</p>"+
                         "<p>Это требуется для безопасности.</p>"+
                         '<p><a href="../">Щёлкните здесь</a> для перехода на страницу входа.</p>'
        },
        // Common language
        Common: {
            unknownError_title: "Ошибка",
            unknownError_text: "Неизвестная системная ошибка"
        }
    };
} ();