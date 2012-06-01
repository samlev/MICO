/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mico.User.Status.js
 ** 
 ** Description: Allows the user to change their status
 **
 ** Copyright (c) 2012 Samuel Levy
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

Mico.User.Status = function () {
    // menu id
    var menuId;
    
    // main panel
    var panel;
    
    return {
        /** Adds the link to the menu */
        init: function () {
            if (this.menuId == undefined) {
                this.menuId = Mico.SystemMenu.addItem(Mico.Lang.User.Status.menu_text, 'Mico.User.Status.show()','system',true);
            }
        },
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // ensure that the menu item is initialised
                if (this.menuId == undefined) {
                    this.init();
                }
                
                // status field
                this.statusField = new Ext.form.ComboBox({
                    allowBlank:false,
                    editable:false,
                    store: new Ext.data.ArrayStore ({
                        fields:['status','name'],
                        data: [
                            ['available',Mico.Lang.User.Status.statusField_data.available],
                            ['away',Mico.Lang.User.Status.statusField_data.away],
                            ['busy',Mico.Lang.User.Status.statusField_data.busy],
                            ['offline',Mico.Lang.User.Status.statusField_data.offline]
                        ]
                    }),
                    displayField:'name',
                    valueField:'status',
                    mode:'local',
                    triggerAction:'all',
                    tpl:Mico.Utils.userTemplate(),
                    listeners: {
                        scope:this,
                        'select': function () {
                            // load the store
                            this.statusTextStore.loadData(this.statusText(this.statusField.getValue()),false);
                            
                            // if appear offline, don't give the user an option for the status text
                            if (this.statusField.getValue() == "offline") {
                                this.statusTextField.setValue(Mico.Lang.User.Status.statusOptions_data.offline);
                                this.statusTextField.disable();
                            } else {
                                this.statusTextField.setValue(this.statusTextStore.getAt(0).get('text'));
                                this.statusTextField.enable();
                            }
                        }
                    },
                    fieldLabel:Mico.Lang.User.Status.statusField_fieldLabel,
                    width:160
                });
                
                // store
                this.statusTextStore = new Ext.data.ArrayStore ({
                    fields:['text'],
                    data: this.statusText(Mico.User.getVarDefault('status','available'))
                });
                
                // status text
                this.statusTextField = new Ext.form.ComboBox({
                    store: this.statusTextStore,
                    triggerAction: 'all',
                    hideTrigger:true,
                    required:false,
                    allowBlank:true,
                    editable:true,
                    autoSelect:false,
                    valueField:'text',
                    displayField:'text',
                    mode:'local',
                    enableKeyEvents: true,
                    width:160,
                    lazyInit:false,
                    fieldLabel:Mico.Lang.User.Status.statusTextField_fieldLabel,
                    listeners: {
                        scope:this,
                        'focus': function () { this.statusTextField.doQuery('',true); }
                    }
                });
                
                // set status button
                this.setStatusButton = new Ext.Button({
                    text:Mico.Lang.User.Status.setStatusButton_text,
                    scope:this,
                    handler: function() {
                        // set the variables in the user
                        Mico.User.setVar('status',this.statusField.getValue());
                        Mico.User.setVar('statustext',this.statusTextField.getValue());
                        // commit the changes
                        Mico.User.commit();
                        this.panel.hide();
                    }
                });
                
                // cancel button
                this.cancelButton = new Ext.Button({
                    text:Mico.Lang.User.Status.cancelButton_text,
                    scope:this,
                    handler: function() {
                        this.panel.hide();
                    }
                });
                
                // set up the main panel
                this.panel = new Ext.Window({
                    id:'Mico.User.Status.panel',
                    layout:'form',
                    title:Mico.Lang.User.Status.panel_title,
                    modal:true,
                    closable:false,
                    resizable:false,
                    closeAction:'hide',
                    height:120,
                    width:300,
                    bodyStyle:'padding:8px;',
                    items: [
                        this.statusField,
                        this.statusTextField
                    ],
                    buttons: [
                        this.setStatusButton,
                        this.cancelButton
                    ]
                });
            }
            
            // show the panel
            this.panel.show();
            // set the values
            this.statusField.setValue(Mico.User.getVarDefault('status','available'));
            this.statusTextField.setValue(Mico.User.getVarDefault('statustext',Mico.Lang.User.Status.statusOptions_data.available));
            // Disable the 'statustext' field if the status is 'offline'
            if (this.statusField.getValue() == "offline") {
                this.statusTextField.setValue(Mico.Lang.User.Status.statusOptions_data.offline);
                this.statusTextField.disable();
            } else {
                this.statusTextField.enable();
            }
        },
        /** Simple helper to return status text templates
         * @param status {string} The status type to retirieve templates for
         * @returns {array} Status templates
         */
        statusText: function (status) {
            // build the 'status options' object for retrieving templates
            if (this.statusOptions === undefined) {
                this.statusOptions = {
                    // Available and Offline only have single values
                    available:[[Mico.Lang.User.Status.statusOptions_data.available]],
                    offline:[[Mico.Lang.User.Status.statusOptions_data.offline]],
                    // Busy and Away already have arrays
                    busy:Mico.Lang.User.Status.statusOptions_data.busy,
                    away:Mico.Lang.User.Status.statusOptions_data.away
                }
            }
            
            return this.statusOptions[status];
        }
    };
} ();