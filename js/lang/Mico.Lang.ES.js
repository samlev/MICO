/*******************************************************************************
 *******************************************************************************
 ** Author: Jorge Luis Loza <jorge@ciclopesl.com>
 ** 
 ** File: js/lang/Mico.Lang.ES.js
 ** 
 ** Description: Spanish Language file
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
Mico.Lang = function () {
    return {
        // Language for Mico.Application.js
        Application: {
            logout: "Salir"
        },
        // Language for Mico.Login.js
        Login: {
            // Login form
            usernameField_fieldLabel: "Usuario",
            usernameField_blankText: "Introduce tu usuario",
            passwordField_fieldLabel: "Password",
            passwordField_blankText: "Introduce tu password",
            forgottenPasswordLink: "Has olvidado tu password?",
            loginButton: "Entrar",
            // Reset password form
            resetPasswordUsernameField_fieldLabel: "Usuario",
            resetPasswordUsernameField_blankText: "Introduce tu usuario",
            resetPasswordInstruction: "Introduce tu usuario y te mandaremos las indicaciones por email.",
            cancelButton: "Cancelar",
            resetPasswordButton: "Resetear Password",
            // Login function alert
            loginInvalidErrorAlert_title: "Error",
            loginInvalidErrorAlert_text: "Por favor, revisa los campos marcados",
            // Password reset function alerts
            resetPasswordSuccess_title: "Password reseteada",
            resetPasswordSuccess_text: "Las indicaciones han sido enviadas a tu email.",
            resetPasswordError_title: "Error",
            resetPasswordError_text: "Por favor, revisa los campos marcados"
        },
        // Language for Mico.PasswordSet.js
        PasswordSet: {
            // Password set form
            usernameField_fieldLabel: "Usuario",
            usernameField_blankText: "Introduce tu usuario",
            passwordField_fieldLabel: "Password",
            passwordField_blankText: "Debes introducir tu Password",
            passwordStrengthIndicator_fieldLabel: "Fortaleza",
            passwordConfirmField_fieldLabel: "Confirma tu Password",
            passwordConfirmField_blankText: "Debes introducir tu Password",
            setPasswordButton: "Establecer Password",
            // Password strength
            passwordStrength_blank: "Introduce tu Password",
            passwordStrength_weak: "Baja",
            passwordStrength_medium: "Media",
            passwordStrength_strong: "Buena",
            passwordStrength_verystrong: "Alta",
            // Password set function alerts
            setPasswordInvalid_title: "Error",
            setPasswordInvalid_text: "Por favor,Revisa los campos marcados",
            setPasswordInvalidMatch_text: "Las Passwords deben coincidir",
            setPasswordSuccess_title: "Password establecidad",
            setPasswordSuccess_text: "Tu Password ha sido establecida.<br /><br />Te redireccionamos a la página de acceso."
        },
        // Language for Mico.Footer.js
        Footer: {
            aboutLink_text: "Sobre Mico",
            version_text: function (version) { return "Version: "+version; },
            aboutWindow_title: "Sobre MICO",
            showAboutBody_html: function (version) {
                var aboutHTML = '<h1>Mantis Gestor de llamadas</h1>'; // Title
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
            menu_text: "LLamadas",
            // Check Updates
            sessionExpired_title: "Sesión Exppirada",
            sessionExpired_text: "Tu sesión ha expirado.<br /><br />Te redireccionamos a la página de acceso.",
            loadUpdates_title: "Guardando información de llamada",
            loadUpdated_text: "Llamada actualizada",
            // Language for Mico.Calls.AddCall.js
            AddCall: {
                title: "Atender una llamada",
                // Caller details
                callerNameField_emptyText: "Nombre del interlocutor",
                callerNameField_hint: "interlocutor",
                callerCompanyField_emptyText: "Empresa del interlocutor",
                callerCompanyField_label: "Desde",
                callerCompanyField_hint: "Empresa",
                // Recipient details
                userField_emptyText: "Seleciona receptor",
                userField_label: "Llamada para",
                userAddExtraButton_text: "Añadir",
                userAddExtraButton_tooltip: "Añadir otro receptor",
                userFieldExtra_label: "O",
                // Message
                callerMessageBox_emptyText: "Mensaje para el receptor...",
                callerMessageBox_label: "Sobre",
                // Contact details
                callerContactField_emptyText: "Teléfono/Email del interlocutor",
                callerContactField_label: "Comuníquese con ellos vía",
                callerContactAddExtraButton_text: "Añadir",
                callerContactAddExtraButton_tooltip: "Añadir otro método de contacto",
                callerContactFieldExtra_label: "O",
                // Call Priority
                callPriorityField_label: "Esta llamada es",
                // Call Action
                callActionField_data:[
                    ['LLamar inmediatamente'],
                    ['LLamar al terminar lo que estés haciendo'],
                    ['Llamar cuado puedas'],
                    ['Volverán a llamar/email'],
                    ['No necesita que se le llame']
                ],
                callActionField_default: "LLamar inmediatamente",
                callActionField_label: "Acción requerida",
                // Buttons
                addCallButton_text: "A&ntilde;adir Llamada",
                clearFormButton_text: "Limpiar",
                // Functions - add call
                validateRecipientsError_title: "Error",
                validateRecipientsError_text: "Por favor, selecciona receptor para esta llamada",
                callerDetailsError_title: "Error",
                callerDetailsError_text: "Por favor, introduce nombre del interlocutor, empresa, mensaje, o detalles de contacto"
            },
            // Language for Mico.Calls.SearchBar.js
            SearchBar: {
                filterField_label: "Mostrar",
                orderField_label: "Ordenado por",
                showClosedField_label: "Filtro cerrado?"
            },
            // Language for Mico.Calls.ViewCalls.js
            ViewCalls: {
                // Grid headers
                header_date: "A",
                header_caller: "Interlocutor",
                header_company: "Desde",
                header_message: "Mensaje",
                header_contact: "Contacto",
                header_priority: "Prioridad",
                header_action: "Acción",
                header_close: "Marcar como cerrada",
                // Call details - comments
                comment_blank: "Sin comentarios",
                commentOrder_label: "Ver comentarios",
                // Call details - update
                closeCallRadio_boxLabel: "Cerrar llamada",
                escalateCallRadio_boxLabel: "Escalar llamada",
                justCommentRadio_boxLabel: "Comentar",
                reopenCallCheck_boxLabel: "Reabrir llamada",
                userCombo_emptyText: "Escalada a",
                commentText_emptyText: "Commentar",
                addCallButton_text: "Actualizar llamada",
                clearFormButton_text: "Limpiar",
                // Show call detail panel
                callInfo_date: function (date, time) { return date+" at "+time; },
                callInfo_closed: "Cerrada",
                callInfo_callTakerSelf: "Llamadas registradas por ti",
                callInfo_callTakerOther: function (taker) { return "Lammadas registradas por "+taker; },
                callInfo_callerUnkown: "Cualquiera",
                callInfo_callerLine: function (caller, company) {
                    // Caller's name
                    line = caller;
                    // Caller's company is included only if not empty
                    if (company.length) {
                        line += " desde " + company;
                    }
                    return line + " llamada para";
                },
                callInfo_selfRecipient: "Tu",
                callInfo_messageLabel: "Mensaje",
                callInfo_noMessage: "No se han dejado mensajes.",
                callInfo_contactLabelMulti: "Cantactarlos por",
                callInfo_contactLabelSingle: function (contact) { return "Contactarlos por "+contact; },
                callInfo_contactNone: "No se han dejado mensajes.",
                callInfo_actionRequired: "Acción requerida",
                // Show Comments function
                showComments_today: "Hoy",
                showComments_yesterday: "Ayer",
                showComments_selfComment: "Tu",
                showComments_commentHeader: function (action, name) { return action+" por "+name; },
                // grid renderers
                renderDate_today: function (time) { return time; },
                renderDate_yesterday: function (time) { return time+" Ayer";},
                renderDate_other: function (date) { return date;},
                renderDate_quicktip: function (date, time) { return date+" a "+time; },
                renderClose_open: "Cerrar llamada",
                renderClose_closed: "Llamada cerrada"
            }
        },
        // Language for Mico.Utils.js
        Utils: {
            // Language for Mico.Utils.CommonStores.js
            CommonStores: {
                callsSearchFilter: {
                    assigned: "Llamadas para mi",
                    opened: "Llamadas registradas por mi",
                    all: "Todas las llamadas"
                },
                callsOrderFilter: {
                    recent: "Mas recientes",
                    urgent: "Mas urgentes"
                },
                callPriority: {
                    critical: "Critica",
                    urgent:'Urgente',
                    moderate:'Moderada',
                    minor:'Menor',
                    negligible:'Insignificante'
                },
                userTypes: {
                    admin: "Administrador",
                    manager: "Gestor",
                    user: "Usuario standar",
                    disabled: "Desactivado"
                },
                commentOrder: {
                    oldest: "Mas antiguos primero",
                    newest: "Mas nuevos primero"
                },
                notifyTime: {
                    immediate:'inmediatamente',
                    halfhour:'una vez cada media hora',
                    hour:'una vez cada hora',
                    never:'nunca'
                },
                notifyReason:{
                    assigned:'asignado a mi',
                    updated:'actualizado'
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
            logoutWait_title: "Salir",
            logoutWait_text: "Desconectar",
            logoutConfirmation_title: "Desconectado",
            logoutConfirmation_text: "Has sido desconectado. Espera mientras te redirigimos",
            // Language for Mico.User.Preferences.js
            Preferences: {
                menu_text: "Mis preferencias",
                // User Settings and Preferences
                settingsPanel_title: "Configuración y preferencias",
                saveSettingsButton_text: "Guardar configuración",
                saveSettingsButtonWait_title: "Guardar configuración",
                saveSettingsButtonWait_text: "Guardando configuración",
                resetSettingsButton_text: "Resetear",
                // User Settings and Preferences - Your Settings
                settingsFieldset_title: "Tu configuración",
                settingsFieldset_description: 'Tu nombre e email son '+
                    'usadas para notificarte las llamadas que se te asignan y para reseteos de '+
                    'tu Password. Por favor, revisa que los datos sean correctos.',
                nameField_fieldLabel: "Tu nombre",
                nameField_blankText: "Debes introducir tu nombre",
                emailField_fieldLabel: "Tu dirección de email",
                emailField_blankText: "Debes de introducir tu dirección de email",
                // User Settings and Preferences - Display preferences
                preferencesFieldset_title: "Mostrar preferencias",
                preferencesFieldset_description: 'Formato de fecha y hora '+
                    'algunas configuraciones tienen efecto inmediota, pero otras '+
                    'pueden no reflejarse hasta una nueva sesion.',
                timeFormatField_fieldLabel: "Formato de hora",
                timeFormatField_display: {
                    gia:"12 horas con am/pm",
                    Hi: "24 horas, completado con ceros",
                    Gi: "24 horas, no completado con ceros"
                },
                dateFormatField_fieldLabel: "Formato de fecha",
                dateFormatField_display: {
                    jSMY:"Textual",
                    dmY: "UK (Día/Mes/A&ntilde;o)",
                    mdY: "US (Mes/Día/A&ntilde;o)",
                    Ymd: "A&ntilde;o-Mes-Día"
                },
                callsPerPageField_fieldLabel: "Llamadas por páagina",
                showCallsField_fieldLabel: "Mostar",
                orderCallsField_fieldLabel: "Orden",
                showClosedField_fieldLabel: "Mostrar llamadas cerradas",
                commentOrderField_fieldLabel: "Call comment order",
                languageField_fieldLabel: "Languaje",
                // Change Password
                changePasswordForm_title: "Cambiar Password",
                changePasswordForm_description: 'No hay restricciones en tu Password, pero se recomienda una Password segura',
                passwordFieldset_title: "Cambia tu Password",
                // Password fields
                oldPasswordField_fieldLabel: "Password actual",
                passwordField_blankText: "Debes de introducir tu password actual",
                passwordField_fieldLabel: "Nueva Password",
                passwordField_blankText: "Debes introducir una nueva Password",
                passwordStrengthIndicator_fieldLabel: "Fortaleza",
                passwordConfirmField_fieldLabel: "Comfirma la nueva Password",
                passwordConfirmField_blankText: "Debes de introducir una Password",
                // Password strength
                passwordStrength_blank: "Introducir Password",
                passwordStrength_weak: "Baja",
                passwordStrength_medium: "Media",
                passwordStrength_strong: "Buena",
                passwordStrength_verystrong: "Alta",
                // Saving new password
                passwordChangeButton_text: "Cambiar Password",
                passwordChangeButtonWait_title: "Cambiar Password",
                passwordChangeButtonWait_text: "Cambiando tu password",
                passwordChangeButtonConfirmation_title: "Password cambiada",
                passwordChangeButtonConfirmation_text: "Tu Password ha sido cambiada correctamente",
                clearPasswordFormButton_text: "Limpiar",
                // Notification settings
                notificationsForm_title: "Configuración de notificaciones",
                notificationsForm_description: 'Esta sección te permite controlar '+
                    'la configuración de las notificaciones por email .Solo las notificaciones '+
                    'refrentes a lladas de llamadas asigandas a tí te serán  enviadas.',
                notificationFieldset_title: "Opciones de notificación por email",
                sendNotificationsField_fieldLabel: "Deseo notificación por email",
                criticalNotifyTime_label: "Notificar para llamada <b>CRITICA</b>",
                criticalNotifyReason_label: "Cuando existan",
                urgentNotifyTime_label: "Notificar para llamada <b>URGENTE</b> ",
                urgentNotifyReason_label: "Cuando existan",
                moderateNotifyTime_label: "Notificar para llamada <b>MODERADA</b>",
                moderateNotifyReason_label: "Cuando existan",
                minorNotifyTime_label: "Notificar para llamada <b>MENOR</b>",
                minorNotifyReason_label: "Cuando existan",
                negligibleNotifyTime_label: "Notificar para llamada <b>INSIGNIFICANTE</b>",
                negligibleNotifyReason_label: "Cuando existan",
                saveNotificationsButton_text: "Guardar configuración",
                saveNotificationsButtonWait_title: "Guardar configuración",
                saveNotificationsButtonWait_text: "Guardando tu configuración de notificación",
                resetNotificationsButton_text: 'Resetear'
            },
            // Language for Mico.User.Status.js
            Status: {
                menu_text: "Establecer estado",
                statusField_data: {
                    available: "Disponible",
                    away: "Fuera",
                    busy: "Ocupado",
                    offline: "Offline"
                },
                statusField_fieldLabel: "Estado",
                statusTextField_fieldLabel: "Detalles extra",
                statusOptions_data: {
                    available: "Disponible",
                    offline: "Offline",
                    busy: [['Ocupado'],['Al teléfono'],['En una reunión']],
                    away: [['Fuera'],['Comiendo'],['No disponible']]
                },
                setStatusButton_text: "Establecer estado",
                cancelButton_text: "Cancelar",
                panel_title: "Establecer estado"
            }
        },
        // Language for Mico.ManageUsers.js
        ManageUsers: {
            menu_text: "Gestión de usuarios",
            // Toolbar
            userFilterField_label: "Vista",
            userFilterField_data: {
                active:'Usuarios activos',
                disabled:'Usuarios inactivos',
                admin:'Administradores',
                manager:'Gestores',
                user:'Usuarios standar',
                all:'Todos' 
            },
            addUsersButton_text:"A&ntilde;adir usuarios",
            // Grid
            header_username: "Nombre de usuario",
            header_name: "Nombre",
            header_email: "Email",
            header_role: "Rol",
            header_password: "Resetear Password",
            // Reset password function
            resetPasswordConfirmation_title: "Resetear Password",
            resetPasswordConfirmation_text: "Un email de reseteo de Password le ha sido enviado al usuario",
            // Add users form
            usernameField_fieldLabel: "Nombre de usuario",
            nameField_fieldLabel: "Nombre",
            emailField_fieldLabel: "Email",
            roleField_fieldLabel: "Rol",
            addUserButton_text: "Añadir usuario",
            addUserButtonConfirmation_title: "Usuario Añadido",
            addUserButtonConfirmation_text: "El usuario ha sido Añadido. Se le ha enviado un email explicando el proceso para establecer su Password.",
            clearAddUsersButton_text: "Limpiar",
            hideAddUsersButton_text: "Cerrar",
            addUsersPanel_title: "Añadir usuarios",
            // Grid renderers
            renderResetPassword: {
                disabled: "Usuario desactivado",
                active: "Resetear Password"
            }
        },
        // Language for Mico.SystemSettings.js
        SystemSettings: {
            menu_text: "Configuración del sistema",
            // Debug mode
            debugModeField_boxLabel: "Usar mode depuración",
            debugModeFieldset_title: "Modo depuraciín",
            debugModeFieldset_description: "El modo depuraciín es de utilidad si "+
                "estás trabajando en el código,o si estás experimentando errores. "+
                "Para una mejor experiencia, se recomienda desactivar esta opción.",
            // From email
            mailFromFieldset_title: "Email desde",
            mailFromFieldset_description: "Email desde es el utilizado para enviar Passwords "+
                "establecer y resetear emails, asÃ­ como notificaciones por email.",
            // Session length
            sessionLengthField_data: {
                halfhour: '30 minutos',
                onehour: '1 hora',
                twohours: '2 houras',
                oneday: '1 día',
                threedays: '3 dias',
                oneweek: '1 semana',
                twoweeks: '2 semanas',
                onemonth: '1 mes',
                oneyear: '1 año'
            },
            sessionLengthFieldset_title: "Duración de la sesión",
           sessionLengthFieldset_description: "La duración de la sesión es el tiempo"+
                "que la sesión persiste mientras un usuario no tiene abierto MICO. Las sesiones cortas "+
                "son mas seguras, pero las largas evitan "+
                "que el usuario tenga que logearse cada vez que entre a la aplicación.",
            // Simple cron
            simpleCronField_boxLabel: "Usa cron simple",
            simpleCronFieldset_title: "Cron simple",
            simpleCronFieldset_description: "El cron es una tarea recurrente que "+
                "envía notificaciones por email.<br /><br />"+
                "El cron simple debe de usarse solo si no tienes acceso "+
                "al cron propio del sistema. Solo funciona si un usuario tiene Mico abierto.<br /><br />"+
                "Si tienes acceso al cron del sistema debes crear la tarea para lanzar "+
                "<b>"+APP_ROOT+"/notify.php</b> usando un comando similar al ejemplo. "+
                "Se debe lanzar cada 5 minutos para asegurar "+
                " que la notificación sale lo mas pronto posible.<br /><br />"+
                "<i>Cuidado, ya que su comando puede ser distinto dependiendo "+
                "en que servidor se programe. Si encuentras problemas, contacta "+
                "con el administrador del servidor o proveedor de hosting para asegurarte "+
                "que la tarea en el cron se ha establecido correctamente.</i>",
            // L10n settings - language
            languageFieldset_title: "Idioma por defecto",
            languageFieldset_description: "Este es el idioma usado en el  "+
                "sistema. Los usuarios pueden elegir su propio lenguaje, pero este "+
                "será usado en la página de acceso y en el formulario de cambio de Password, y si el  "+
                "usuario no ha seleccionado ningú lenguaje.",
            // Save settings
            saveSettingsButton_text: "Guardar configuración",
            resetSettingsButton_text: "Resetear",
            // Load settings
            loadSettingsWait_title: "Cargando",
            loadSettingsWait_text: "Cargando configuraciones desde el servidor",
            // Save settings
            saveSettingsWait_title: "Guardar configuración",
            saveSettingsWait_text: "Guardar configuración del sistema",
            saveSettingsConfirmation_title: "Configuración del sistema",
            saveSettingsConfirmation_text: "La configuración del sistema ha sido actualizada"
        },
        // Language for Mico.Upgrader.js
        Upgrader: {
            upgradeButton_text: "Actualizar",
            version_upToDate: "El gestor de llamadas Mantis está actuaizado.",
            version_upgrade: function (OLD_VERSION, NEW_VERSION) {
                message = "<h1>El gestor de llamadas Mantis necesita ser actualizado.</h1>"+
                          "<p>Clicando el botón 'Actualizar' Actualizarás MICO de la "+
                          "versión "+OLD_VERSION+" a la versión "+NEW_VERSION+"</p>";
                
                return message;
            },
            // Do upgrade
            doUpgradeWait_title: "Actualizar",
            doUpgradeWait_text: "Actualizar MICO",
            doUpgradeConfirmation_title:"Actualizar",
            doUpgradeConfirmation_text:"MICO se ha actualizado correctamente.<br /><br />"+
                "Ahora serás redireccionado a la pÃ¡gina de acceso."
        },
        // Language for Mico.ConfigSetup.js
        ConfigSetup: {
            instructions: "PAso 1: Establece la base de datos",
            // Path settings
            automaticPathField_boxLabel: "Usar rutas por defecto (Recomendado)",
            FS_ROOT_Field_fieldLabel: "Directorio root del sistema de ficheros",
            WEB_DOMAIN_Field_fieldLabel: "Dominio Web",
            WEB_ROOT_Field_fieldLabel: "Raíz del Web",
            APP_ROOT_Field_fieldLabel: "Raíz de la aplicación",
            pathSettingsFieldset_title: "Configuración de rutas y sistema de ficheros",
            pathSettingsFieldset_description: "La siguiente configuración define en donde "+
                "est&aacute Mico en tu servidor, Y como acceder vía de internet. "+
                "LA configuración avanzada es solo si sabes exactamente lo que estás haciendo",
            // Database settings
            hostField_fieldLabel: "Nombre del Host",
            userField_fieldLabel: "Nombre de usuario",
            passField_fieldLabel: "Password",
            nameField_fieldLabel: "Base de datos",
            prefField_fieldLabel: "prefijo de las tablas",
            databaseSettingsFieldset_title: "Configuración de la base de datos",
            databaseSettingsFieldset_description: "LA siguiente configuración es para "+
                "tu base de datos MySql. EL prefijo de las tablas permite a Mico separar los datos "+
                "de datos de otras aplicaciones cuando compartimos base de datos.",
            // Buttons
            saveSettingsButton_text: "Guardar configuración",
            resetSettingsButton_text: "Resetear",
            // Save settings function
            checkSettingsWait_title: "Checkear configuración",
            checkSettingsWait_text: "Checkeando la configuración de la base de datos",
            saveSettingsWait_title: "Instalando",
            saveSettingsWait_text: "Instalando Mico",
            saveSettingsConfirmation_title: "Instalando",
            saveSettingsConfirmation_text: "Paso 1 completado. El siguiente paso es establecer la configuración del sistema."
        },
        // Language for Mico.SystemSetup.js
        SystemSetup: {
            // Debug mode
            debugModeField_boxLabel: "Usar modo depuración",
            debugModeFieldset_title: "Modo depuración",
            debugModeFieldset_description: "El modo depuración es útil cuando "+
                "estás trabajando en la base de datos de MICO, o si experimentas errores. "+
                "PAra una mejor experiencia, te aconsejamos desactivar esta opción.",
            // From email
            mailFromFieldset_title: "Email desde",
            mailFromFieldset_description: "El email desde se utiliza para enviar las Password "+
                "Establecer y resetaer Paswords, asi como para las notificaciones por email.",
            // Session length
            sessionLengthField_data: {
                halfhour: '30 minutes',
                onehour: '1 hour',
                twohours: '2 hours',
                oneday: '1 day',
                threedays: '3 days',
                oneweek: '1 week',
                twoweeks: '2 weeks',
                onemonth: '1 month',
                oneyear: '1 year'
            },
            sessionLengthFieldset_title: "Tiempo de sesión",
            sessionLengthFieldset_description: "El tiempo de sesión es "+
                "El tiempo que la sesión persiste mientras el usuario no está con MICO abierto. Las sesiones cortas "+
                "son mas seguras, pero las largas evitan "+
                "que el usuario tenga que logearse cada vez que abra la aplicación.",
            // Simple cron
            simpleCronField_boxLabel: "Usa cron simple",
            simpleCronFieldset_title: "Cron simple",
            simpleCronFieldset_description: "El cron es una tarea recurrente que "+
                "envía notificaciones por email.<br /><br />"+
                "El cron simple debe de usarse solo si no tienes acceso "+
                "al cron propio del sistema. Sílo funciona si un usuario tiene Mico abierto.<br /><br />"+
                'Una vez instalado el sistema, en el apartado "Configuración del sistema" tendrás '+
                "instrucciones de como establecer la tarea del cron.",
        // L10n settings - language
            languageFieldset_title: "Idioma por defecto",
            languageFieldset_description: "Este es el idioma usado por el "+
                "sistema. Los usuarios pueden elegir su idioma preferido, pero este "+
                "será el usado para el acceso al sistema, para el formulario de cambio de Password y si el  "+
                "usuario no ha elegido idiamo.",
            // First user
            usernameField_fieldLabel: "Nombre de usuario",
            usernameField_blankText: "Debes de introducir tu nombre de usuario",
            nameField_fieldLabel: "Nombre",
            nameField_blankText: "Debes de introducir tu nombre",
            emailField_fieldLabel: "Email",
            emailField_blankText: "Debes de introducir tu email",
            // Password
            passwordField_fieldLabel: "Password",
            passwordField_blankText: "Debes de introducir tu Password",
            passwordStrengthIndicator_fieldLabel: "Fortaleza",
            passwordConfirmField_fieldLabel: "Confirma Password",
            passwordConfirmField_blankText: "Debes de introducir tu Password",
            // Password strength
            passwordStrength_blank: "Introduce Password",
            passwordStrength_weak: "Baja",
            passwordStrength_medium: "Media",
            passwordStrength_strong: "Buena",
            passwordStrength_verystrong: "Alta",
            // Fieldset
            passwordFieldset_title: "Usuario principal",
            passwordFieldset_description: "Tu usuario principal será un administrador "+
                "y puede incluir otros usuarios en el sistema.",
            // Buttons
            saveSettingsButton_text: "Guardar configuración",
            resetSettingsButton_text: "Resetear",
            // Function
            saveSettingsWait_title: "Guardar configuración",
            saveSettingsWait_text: "Guardando configuración del sistema",
            saveSettingsConfirmation_title: "Instalado",
            saveSettingsConfirmation_text: "Mico ha sido instalado correctamente.<br /><br />"+
                "Por seguridad, elimina la carpeta 'install' .<br /><br />"+
                "Te redireccionamos ahora a la página de acceso."
        },
        // Language for Mico.Installed.js
        Installed: {
            placeholder: "<h2>MICO ha sido instalado.</h2>"+
                         "<p>Mico está instalado. Es importante que borres la carpeta "+
                         "'install' y todos sus contenidos.</p>"+
                         "<p>Esto te ayudará amantener segura tu instalción.</p>"+
                         '<p><a href="../">Clicka aqui</a> para ir a la página de acceso.</p>'
        },
        // Common language
        Common: {
            unknownError_title: "Error",
            unknownError_text: "Error de systema desconocido"
        }
    };
} ();