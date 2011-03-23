/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/manager/Mico.ManageUsers.js
 ** 
 ** Description: The main 'calls' section of the system
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

Mico.ManageUsers = function () {
    // menu id
    var menuId;
    
    // main panel
    var panel;
    
    return {
        /** Adds the link to the menu */
        init: function () {
            if (this.menuId == undefined) {
                this.menuId = Mico.SystemMenu.addItem(Mico.Lang.ManageUsers.menu_text, 'Mico.ManageUsers.show()','system');
            }
        },
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // ensure that the menu item is initialised
                if (this.menuId == undefined) {
                    this.init();
                }
                
                // grid store
                this.userGridStore = new Ext.data.Store({
                    url: APP_ROOT+"/api.php?f=getAllUsers", 
                    reader: new Ext.data.JsonReader ({
                        root: "users", 
                        id: "id",
                        totalProperty: 'total'
                    }, [
                        {name: "id", mapping: "id"}, 
                        {name: "username", mapping: "username"}, 
                        {name: "name", mapping: "name"}, 
                        {name: "email", mapping: "email"}, 
                        {name: "role", mapping: "role"}
                    ]), 
                    baseParams: {
                        session: Mico.User.getSession()
                    }
                });
                
                // before load listener
                this.userGridStore.on ('beforeload', function () {
                    // add the filter field as a parameter
                    this.userGridStore.baseParams = {
                        session: Mico.User.getSession(),
                        filter: this.userFilterField.getValue()
                    }
                }, this)
                
                // the filter field
                this.userFilterField = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    store: new Ext.data.ArrayStore ({
                        fields:['type','filter'],
                        data: [
                            [Mico.Lang.ManageUsers.userFilterField_data.active,'active'],      // shows all users with roles 'user','manager', or 'admin'
                            [Mico.Lang.ManageUsers.userFilterField_data.disabled,'disabled'],
                            [Mico.Lang.ManageUsers.userFilterField_data.admin,'admin'],
                            [Mico.Lang.ManageUsers.userFilterField_data.manager,'manager'],
                            [Mico.Lang.ManageUsers.userFilterField_data.user,'user'],
                            [Mico.Lang.ManageUsers.userFilterField_data.all,'all']             // shows all users
                        ]
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:'active',
                    mode:'local',
                    triggerAction:'all',
                    width:100,
                    listeners: {
                        scope:this,
                        'select': function () {
                            this.userGridStore.load({params:{start:0,limit:parseInt(Mico.User.getVarDefault('callsperpage',30),10)}})
                        }
                    }
                });
                
                // add users button
                this.addUsersButton = new Ext.Button({
                    text:'Add Users',
                    scope:this,
                    handler: function() {
                        // just reload this view
                        this.showAddUsers();
                    }
                });
                
                // the pager
                this.pager = new Ext.PagingToolbar({
                    store: this.userGridStore,
                    pageSize:parseInt(Mico.User.getVarDefault('callsperpage',30),10)
                });
                
                // user grid
                this.userGrid = new Ext.grid.EditorGridPanel({
                    id:'Mico.ManageUsers.userGrid',
                    store: this.userGridStore,
                    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
                    autoSizeColumns: false,
                    layout:'fit',
                    clicksToEdit:1,
                    cm: new Ext.grid.ColumnModel([
                        {header: Mico.Lang.ManageUsers.header_username, dataIndex: "username", id: "username", width: 100, renderer: renderGeneric},
                        {header: Mico.Lang.ManageUsers.header_name, dataIndex: "name", id: "name", width: 140, renderer: renderGeneric, editor:new Ext.form.TextField({
                            name:'email',
                            allowBlank:false,
                            required:true
                        })},
                        {header: Mico.Lang.ManageUsers.header_email, dataIndex: "email", id: "email", width: 140, renderer: renderGeneric, editor:new Ext.form.TextField({
                            name:'email',
                            allowBlank:false,
                            required:true
                        })},
                        {header: Mico.Lang.ManageUsers.header_role, dataIndex: "role", id: "role", width: 100, renderer: renderRole, editor:new Ext.form.ComboBox ({
                            allowBlank:false,
                            editable:false,
                            name:'role',
                            store: new Ext.data.ArrayStore ({
                                fields:['display','role'],
                                data: Mico.Utils.CommonStores.userTypesAll
                            }),
                            displayField:'display',
                            valueField:'role',
                            mode:'local',
                            triggerAction:'all'
                        })},
                        {header: Mico.Lang.ManageUsers.header_password, id: "password", width: 100, renderer: renderResetPassword}
                    ]),
                    tbar:[
                        Mico.Lang.ManageUsers.userFilterField_label+': ',
                        this.userFilterField,
                        '-',
                        this.addUsersButton
                    ],
                    bbar:this.pager
                });
                
                // user grid listeners
                this.userGrid.on('beforeedit',function (e) {
                    var allowedit = true;
                    
                    // if the user is disabled, only allow editing of the 'role' field
                    if (e.record.get('role')=='disabled' && e.field != 'role') {
                        allowedit = false;
                    }
                    
                    // if the user isnt' an administrator, don't allow them to edit administrators
                    if (Mico.User.role != 'admin' && e.record.get('role') == 'admin') {
                        allowedit = false;
                    }
                    
                    // don't allow the user to edit their own role
                    if (Mico.User.user_id == e.record.get('id') && e.field == 'role') {
                        allowedit = false;
                    }
                    
                    return allowedit;
                }, this);
                
                
                this.userGrid.on('afteredit',function (e) {
                    var conn = new Ext.data.Connection();
                    
                    // send the logout request
                    conn.request({
                        url:APP_ROOT+'/api.php?f=updateUser',
                        params: {
                            session: Mico.User.getSession(),
                            id: e.record.get('id'),
                            field: e.field,
                            value: e.value
                        },
                        callback: function (options, success, response) {
                            var res = Ext.decode(response.responseText);
                            if (success && res.success) {
                                // commit the record
                                e.record.commit();
                            } else {
                                Ext.Msg.hide();
                                var msg = Mico.Lang.Common.unknownError_text;
                                if (res.info !== undefined) {
                                    msg = res.info;
                                }
                                Ext.Msg.alert(Mico.Lang.Common.unknownError_title, msg);
                                
                                // roll back the record
                                e.record.reject();
                            }
                        },
                        scope: this
                    });
                    
                    // if the user is disabled, only allow editing of the 'role' field
                    if (e.record.get('role')=='disabled' && e.field != 'role') {
                        allowedit = false;
                    }
                }, this);
                
                // set up the panel
                this.panel = new Ext.Panel({
                    id:'Mico.ManageUsers.panel',
                    layout: 'fit',
                    items: [
                        this.userGrid
                    ]
                });
                
                // Add to the main panel
                Mico.Application.addPanel(this.panel);
            }
            
            // mark this panel as selected
            Mico.SystemMenu.markSelected(this.menuId);
            Mico.Application.showPanel('Mico.ManageUsers.panel');
            
            // load the store
            this.userGridStore.load({params:{start:0,limit:parseInt(Mico.User.getVarDefault('callsperpage',30),10)}})
        },
        /** Sends a user a 'reset password' request
         * @param id {int} The user ID
         */
        resetPassword: function(id) {
            var conn = new Ext.data.Connection();
            
            // send the logout request
            conn.request({
                url:APP_ROOT+'/api.php?f=resetPassword',
                params: {
                    session: Mico.User.getSession(),
                    id: id
                },
                callback: function (options, success, response) {
                    var res = Ext.decode(response.responseText);
                    if (success && res.success) {
                        // notify the user that the action was successful
                        Ext.Msg.alert(Mico.Lang.ManageUsers.resetPasswordConfirmation_title,Mico.Lang.ManageUsers.resetPasswordConfirmation_text);
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
        },
        /** shows the 'add users' dialog */
        showAddUsers: function () {
            if (this.addUsersPanel === undefined) {
                // username field
                this.usernameField = new Ext.form.TextField({
                    fieldLabel:Mico.Lang.ManageUsers.usernameField_fieldLabel,
                    required:true,
                    allowBlank:false
                });
                
                // name field
                this.nameField = new Ext.form.TextField({
                    fieldLabel:Mico.Lang.ManageUsers.nameField_fieldLabel,
                    required:true,
                    allowBlank:false
                });
                
                // email field
                this.emailField = new Ext.form.TextField({
                    fieldLabel:Mico.Lang.ManageUsers.emailField_fieldLabel,
                    required:true,
                    allowBlank:false
                });
                
                this.roleField = new Ext.form.ComboBox ({
                    fieldLabel:Mico.Lang.ManageUsers.roleField_fieldLabel,
                    allowBlank:false,
                    editable:false,
                    required:true,
                    store: new Ext.data.ArrayStore ({
                        fields:['display','role'],
                        data: Mico.Utils.CommonStores.userTypesActive
                    }),
                    displayField:'display',
                    valueField:'role',
                    mode:'local',
                    triggerAction:'all',
                    value:'user',
                    width:120
                });
                
                // buttons
                this.addUserButton = new Ext.Button({
                    text:Mico.Lang.ManageUsers.addUserButton_text,
                    scope: this,
                    handler: function () {
                        var conn = new Ext.data.Connection();
                        
                        conn.request({
                            url:APP_ROOT+'/api.php?f=addUser',
                            params: {
                                session: Mico.User.getSession(),
                                username: this.usernameField.getValue(),
                                name: this.nameField.getValue(),
                                email: this.emailField.getValue(),
                                role: this.roleField.getValue()
                            },
                            callback: function (options, success, response) {
                                var res = Ext.decode(response.responseText);
                                if (success && res.success) {
                                    // notify the user that the action was successful
                                    Ext.Msg.alert(Mico.Lang.ManageUsers.addUserButtonConfirmation_title, Mico.Lang.ManageUsers.addUserButtonConfirmation_text);
                                    
                                    // clear the form
                                    this.usernameField.reset();
                                    this.nameField.reset();
                                    this.emailField.reset();
                                    this.roleField.reset();
                                    
                                    // reload the store
                                    this.userGridStore.reload();
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
                });
                // clear button to reset the fields
                this.clearAddUsersButton = new Ext.Button({
                    text:Mico.Lang.ManageUsers.clearAddUsersButton_text,
                    scope:this,
                    handler: function () {
                        // clear the fields
                        this.usernameField.reset();
                        this.nameField.reset();
                        this.emailField.reset();
                        this.roleField.reset();
                    }
                });
                // close/hide button to hide the panel
                this.hideAddUsersButton = new Ext.Button({
                    text:Mico.Lang.ManageUsers.hideAddUsersButton_text,
                    scope:this,
                    handler: function () {
                        // hide the dialog
                        this.addUsersPanel.hide();
                    }
                });
                
                // build the panel
                this.addUsersPanel = new Ext.Window({
                    id:'Mico.ManageUsers.addUsersPanel',
                    closeAction:'hide',
                    layout:'form',
                    title: Mico.Lang.ManageUsers.addUsersPanel_title,
                    modal:true,
                    items:[
                        this.usernameField,
                        this.nameField,
                        this.emailField,
                        this.roleField
                    ],
                    buttons:[
                        this.addUserButton,
                        this.clearAddUsersButton,
                        this.hideAddUsersButton
                    ],
                    bodyStyle:'padding:5px;',
                    width: 290,
                    height: 180
                });
            }
            
            // show the panel
            this.addUsersPanel.show();
            // clear the fields
            this.usernameField.reset();
            this.nameField.reset();
            this.emailField.reset();
            this.roleField.reset();
        }
    };
    
    /** Grid renderer for 'reset password' link */
    function renderResetPassword(val, meta, rec, row, col, store) {
        var value = '';
        
        // check if the user is disabled or not
        if (rec.get('role')=='disabled') {
            value = Mico.Lang.ManageUsers.renderResetPassword.disabled;
        } else {
            value = '<a href="#" onclick="Mico.ManageUsers.resetPassword('+rec.get('id')+')">'+Mico.Lang.ManageUsers.renderResetPassword.active+'</a>';
        }
        
        // set the CSS class
        meta.css = (rec.get('role')=='disabled'?'user-disabled':'');
        
        // and return our formatted value
        return value;
    }
    
    /** Grid renderer for the 'role' field */
    function renderRole(val, meta, rec, row, col, store) {
        var value = '';
        
        value = Mico.Lang.Utils.CommonStores.userTypes[rec.get('role')];
        
        // set the CSS class
        meta.css = (rec.get('role')=='disabled'?'user-disabled':'');
        
        // and return our formatted value
        return value;
    }
    
    /** Generic grid renderer to apply the 'user-disabled' class on fields */
    function renderGeneric(val, meta, rec, row, col, store) {
        var value = val;
        
        // set the CSS class
        meta.css = (rec.get('role')=='disabled'?'user-disabled':'');
        
        // and return our formatted value
        return value;
    }
} ();