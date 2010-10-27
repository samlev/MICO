/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/manager/Mantis.ManageUsers.js
 ** 
 ** Description: The main 'calls' section of the system
 *******************************************************************************
 ******************************************************************************/

Mantis.ManageUsers = function () {
    // menu id
    var menuId;
    
    // main panel
    var panel;
    
    return {
        /** Adds the link to the menu */
        init: function () {
            if (this.menuId == undefined) {
                this.menuId = Mantis.SystemMenu.addItem('Manage Users', 'Mantis.ManageUsers.show()','system');
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
                        session: Mantis.User.getSession()
                    }
                });
                
                // before load listener
                this.userGridStore.on ('beforeload', function () {
                    // add the filter field as a parameter
                    this.userGridStore.baseParams = {
                        session: Mantis.User.getSession(),
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
                            ['Active Users','active'],      // shows all users with roles 'user','manager', or 'admin'
                            ['Inactive Users','inactive'],
                            ['Administrators','admin'],
                            ['Managers','manager'],
                            ['Standard Users','user'],
                            ['All Users','all']             // shows all users
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
                            this.userGridStore.load({params:{start:0,limit:parseInt(Mantis.User.getVarDefault('callsperpage',30),10)}})
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
                    pageSize:parseInt(Mantis.User.getVarDefault('callsperpage',30),10)
                });
                
                // user grid
                this.userGrid = new Ext.grid.EditorGridPanel({
                    id:'Mantis.ManageUsers.userGrid',
                    store: this.userGridStore,
                    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
                    autoSizeColumns: false,
                    layout:'fit',
                    cm: new Ext.grid.ColumnModel([
                        {header: "Username", dataIndex: "username", id: "username", width: 100},
                        {header: "Name", dataIndex: "name", id: "name", width: 140},
                        {header: "Email", dataIndex: "email", id: "email", width: 140},
                        {header: "Role", dataIndex: "role", id: "role", width: 100},
                        {header: "Reset password", id: "password", width: 100, renderer: renderResetPassword}
                    ]),
                    tbar:[
                        'View: ',
                        this.userFilterField,
                        '-',
                        this.addUsersButton
                    ],
                    bbar:this.pager
                });
                
                
                // set up the panel
                this.panel = new Ext.Panel({
                    id:'Mantis.ManageUsers.panel',
                    layout: 'fit',
                    items: [
                        this.userGrid
                    ]
                });
                
                // Add to the main panel
                Mantis.Application.addPanel(this.panel);
            }
            
            // mark this panel as selected
            Mantis.SystemMenu.markSelected(this.menuId);
            Mantis.Application.showPanel('Mantis.ManageUsers.panel');
            
            // load the store
            this.userGridStore.load({params:{start:0,limit:parseInt(Mantis.User.getVarDefault('callsperpage',30),10)}})
        }
    };
    
    function renderResetPassword(val, meta, rec, row, col, store) {
        var value = '';
        
        if (rec.get('role')=='disabled') {
            value = 'User disabled';
        } else {
            value = '<a href="#" onclick="Mantis.ManageUsers.resetPassword('+rec.get('id')+')">Reset Password</a>';
        }
        
        // set the CSS class
        meta.css = (rec.get('role')=='disabled'?'user-disabled':'');
        
        // and return our formatted value
        return value;
    }
} ();