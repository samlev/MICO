/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Sphodro.User.Status.js
 ** 
 ** Description: Allows the user to change their status
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Sphodro is free software: you can redistribute it and/or
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

Sphodro.User.Status = function () {
    // menu id
    var menuId;
    
    // main panel
    var panel;
    
    return {
        /** Adds the link to the menu */
        init: function () {
            if (this.menuId == undefined) {
                this.menuId = Sphodro.SystemMenu.addItem('Set Status', 'Sphodro.User.Status.show()','system');
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
                            ['available','Available'],
                            ['away','Away'],
                            ['busy','Busy'],
                            ['offline','Appear Offline']
                        ]
                    }),
                    displayField:'name',
                    valueField:'status',
                    mode:'local',
                    triggerAction:'all',
                    tpl:Sphodro.Utils.userTemplate(),
                    listeners: {
                        scope:this,
                        'select': function () {
                            // load the store
                            this.statusTextStore.loadData(this.statusText(this.statusField.getValue()),false);
                            
                            // if appear offline, don't give the user an option for the status text
                            if (this.statusField.getValue() == "offline") {
                                this.statusTextField.setValue('Offline');
                                this.statusTextField.disable();
                            } else {
                                this.statusTextField.setValue(this.statusTextStore.getAt(0).get('text'));
                                this.statusTextField.enable();
                            }
                        }
                    },
                    fieldLabel:'Status',
                    width:160
                });
                
                // store
                this.statusTextStore = new Ext.data.ArrayStore ({
                    fields:['text'],
                    data: this.statusText(Sphodro.User.getVarDefault('status','available'))
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
                    fieldLabel:'Extra details',
                    listeners: {
                        scope:this,
                        'focus': function () { this.statusTextField.doQuery('',true); }
                    }
                });
                
                // set status button
                this.setStatusButton = new Ext.Button({
                    text:'Set Status',
                    scope:this,
                    handler: function() {
                        // set the variables in the user
                        Sphodro.User.setVar('status',this.statusField.getValue());
                        Sphodro.User.setVar('statustext',this.statusTextField.getValue());
                        // commit the changes
                        Sphodro.User.commit();
                        this.panel.hide();
                    }
                });
                
                // cancel button
                this.cancelButton = new Ext.Button({
                    text:'Cancel',
                    scope:this,
                    handler: function() {
                        this.panel.hide();
                    }
                });
                
                // set up the main panel
                this.panel = new Ext.Window({
                    id:'Sphodro.User.Status.panel',
                    layout:'form',
                    modal:true,
                    closable:false,
                    closeAction:'hide',
                    height:110,
                    width:300,
                    bodyStyle:'padding:8px;',
                    items: [
                        this.statusField,
                        this.statusTextField
                    ],
                    buttons: [
                        this.setStatusButton,
                        this.cancelButton
                    ],
                    listeners:{
                        scope: this,
                        'hide': function () {
                            // show the call panel when this dialog hides
                            Sphodro.Calls.show();
                        }
                    }
                });
            }
            
            // show the panel
            this.panel.show();
            // set the values
            this.statusField.setValue(Sphodro.User.getVarDefault('status','available'));
            this.statusTextField.setValue(Sphodro.User.getVarDefault('statustext','Available'));
            // Disable the 'statustext' field if the status is 'offline'
            if (this.statusField.getValue() == "offline") {
                this.statusTextField.setValue('Offline');
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
                    available:[['Available']],
                    offline:[['Offline']],
                    busy:[['Busy'],['On the phone'],['In a meeting']],
                    away:[['Away'],['Out to lunch'],['Not available']]
                }
            }
            
            return this.statusOptions[status];
        }
    };
} ();