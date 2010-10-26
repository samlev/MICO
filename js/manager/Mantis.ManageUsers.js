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
                
                // user grid
                this.userGrid = new Ext.grid.EditorGridPanel({
                    id:'Mantis.ManageUsers.userGrid',
                    title:'All Users',
                    store: this.userGridStore,
                    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
                    autoSizeColumns: false, 
                    cm: new Ext.grid.ColumnModel([
                        {header: "Username", dataIndex: "username", id: "username", width: 100},
                        {header: "Name", dataIndex: "name", id: "name", width: 140},
                        {header: "Email", dataIndex: "email", id: "email", width: 140},
                        {header: "Role", dataIndex: "role", id: "role", width: 100}
                    ])
                });
                
                
                // set up the panel
                this.panel = new Ext.TabPanel({
                    id:'Mantis.ManageUsers.panel',
                    items: [
                        this.userGrid
                    ],
                    activeItem:0
                });
                
                // Add to the main panel
                Mantis.Application.addPanel(this.panel);
            }
            
            // mark this panel as selected
            Mantis.SystemMenu.markSelected(this.menuId);
            Mantis.Application.showPanel('Mantis.ManageUsers.panel');
        }
    };
} ();