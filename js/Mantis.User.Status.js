/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.User.Status.js
 ** 
 ** Description: Allows the user to change their status
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mantis Simple Call Centre is free software: you can redistribute it and/or
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

Mantis.User.Status = function () {
    // menu id
    var menuId;
    
    // main panel
    var panel;
    
    return {
        /** Adds the link to the menu */
        init: function () {
            if (this.menuId == undefined) {
                this.menuId = Mantis.SystemMenu.addItem('Set Status', 'Mantis.User.Status.show()','system');
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
                    tpl:Mantis.Utils.userTemplate,
                    listeners: {
                        scope:this,
                        'select': function () {
                            // load the store
                            this.statusTextStore.loadData(this.statusText(this.statusField.getValue()),false);
                            
                            // if appear offline, don't give the user an option
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
                    data: this.statusText(Mantis.User.getVarDefault('status','available'))
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
                
                this.setStatusButton = new Ext.Button({
                    text:'Set Status',
                    scope:this,
                    handler: function() {
                        Mantis.User.setVar('status',this.statusField.getValue());
                        Mantis.User.setVar('statustext',this.statusTextField.getValue());
                        Mantis.User.commit();
                        this.panel.hide();
                    }
                });
                
                this.cancelButton = new Ext.Button({
                    text:'Cancel',
                    scope:this,
                    handler: function() {
                        this.panel.hide();
                    }
                });
                
                // set up the main panel
                this.panel = new Ext.Window({
                    id:'Mantis.User.Status.panel',
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
                            Mantis.Calls.show();
                        }
                    }
                });
            }
            
            this.panel.show();
            // set the values
            this.statusField.setValue(Mantis.User.getVarDefault('status','available'));
            this.statusTextField.setValue(Mantis.User.getVarDefault('statustext','Available'));
            // enable/disable the 'statustext' field
            if (this.statusField.getValue() == "offline") {
                this.statusTextField.setValue('Offline');
                this.statusTextField.disable();
            } else {
                this.statusTextField.enable();
            }
        },
        statusText: function (status) {
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