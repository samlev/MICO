/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: install/js/Mico.LanguageSelect.js
 ** 
 ** Description: Allows the user to select a language for the installer
 **              NB: This file is only available in English
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

Mico.LanguageSelect = function () {
    // edit fields
    var languageField;
    var languageFieldset;
    
    // buttons
    var saveLanguageButton;
    var continueButton;
    
    // main panel
    var panel;
    
    return {
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // Language field
                this.languageField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    fieldLabel: 'Select Language',
                    store: new Ext.data.ArrayStore ({
                        fields:['lang','display'],
                        data: Mico.Utils.CommonStores.languageOptions
                    }),
                    displayField:'display',
                    valueField:'lang',
                    value:'EN',
                    mode:'local',
                    triggerAction:'all'
                });
                
                // Language select fieldset
                this.languageFieldset = new Ext.form.FieldSet({
                    title: "Language Selection",
                    items: [
                        {
                            html: "Select a language to use while installing MICO. "+
                                  "You may change your language once MICO is installed.",
                            bodyStyle:'padding-bottom:3px;'
                        },
                        this.languageField
                    ]
                });
                
                // The button for saving the language settings
                this.saveLanguageButton = new Ext.Button({
                    text:  "Set Language", 
                    handler: function () {
                        this.saveLanguage();
                    }, 
                    scope: this
                });
                
                // Button for continuing installation
                this.continueButton = new Ext.Button({
                    text:  "Continue", 
                    handler: function () {
                        window.location.reload(true);
                    },
                    disabled: true,
                    scope: this
                });
                
                // perferences form
                this.panel = new Ext.form.FormPanel({
                    id: "Mico.LanguageSelect.panel",
                    autoScroll:true,
                    items: [
                        this.languageFieldset,
                        {
                            layout:'hbox',
                            items: [
                                this.saveLanguageButton,
                                { html: '&nbsp;' },
                                this.continueButton
                            ]
                        }
                    ],
                    cls: 'main-form-panel',
                    bodyStyle: "padding:5px;"
                });
                
                // Add to the main panel
                Mico.Application.addPanel(this.panel);
            }
            
            Mico.Application.showPanel('Mico.LanguageSelect.panel');
        },
        /** Saves the language */
        saveLanguage: function() {
            // check if the form is valid
            if (this.panel.getForm().isValid()) {
                // show that something is happening
                Ext.Msg.wait("Saving Language", "Saving your language preference.",{
                    closable:false,
                    modal:true
                });
                
                // save the values
                var conn = new Ext.data.Connection();
                
                // send the logout request
                conn.request({
                    url:'api/saveLanguage.php',
                    params: {
                        LANGUAGE: this.languageField.getValue()
                    },
                    callback: function (options, success, response) {
                        var res = Ext.decode(response.responseText);
                        if (success && res.success) {
                            // hide the 'wait' box
                            Ext.Msg.hide();
                            // notify the user that the language has been updated
                            Ext.Msg.alert("Language Saved", "Your language has been saved. Press 'Continue' to proceed with the installation.", function () { Mico.LanguageSelect.continueButton.enable(); });
                        } else {
                            Ext.Msg.hide();
                            var msg = Mico.Lang.Common.unknownError_text;
                            if (res.info !== undefined) {
                                msg = res.info;
                            }
                            Ext.Msg.alert(Mico.Lang.Common.unknownError_title, msg);
                        }
                    },
                    scope: this
                });
            }
        }
    };
} ();