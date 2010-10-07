/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.Calls.ViewCalls.js
 ** 
 ** Description: The 'view calls' section of the system
 *******************************************************************************
 ******************************************************************************/

Mantis.Calls.ViewCalls = function () {
    // view calls grid
    var gridStore;
    var grid;
    
    // main panel
    var panel;
    
    return {
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // build the store
                this.gridStore = new Ext.data.Store({
                    url: APP_ROOT+"/api.php?f=getCalls", 
                    reader: new Ext.data.JsonReader ({
                        root: "calls", 
                        id: "id"
                    }, [
                        {name: "id", mapping: "id"}, 
                        {name: "taker", mapping: "taker"}, 
                        {name: "date", mapping: "date"}, 
                        {name: "caller", mapping: "caller"}, 
                        {name: "company", mapping: "company"}, 
                        {name: "message", mapping: "message"}, 
                        {name: "contact", mapping: "contact"}, 
                        {name: "priority", mapping: "priority"}, 
                        {name: "status", mapping: "status"}, 
                        {name: "action", mapping: "action"}, 
                        {name: "recipient", mapping: "recipient"}
                    ]), 
                    baseParams: {
                        session: Mantis.User.getSession()
                    }
                });
                
                // build the grid
                this.grid = new Ext.grid.EditorGridPanel({
                    id:'Mantis.Calls.ViewCalls.grid',
                    region:'center',
                    cm: new Ext.grid.ColumnModel ([
                        {header: "Taken by", dataIndex: "taker", id: "taker", width: 100, sortable: false},
                        {header: "At", dataIndex: "date", id: "date", width: 80, sortable: false},
                        {header: "Caller", dataIndex: "caller", id: "caller", width: 120, sortable: false},
                        {header: "From", dataIndex: "company", id: "company", width: 120, sortable: false},
                        {header: "Message", dataIndex: "message", id: "message", width: 200, sortable: false},
                        {header: "Contact", dataIndex: "contact", id: "contact", width: 150, sortable: false},
                        {header: "Priority", dataIndex: "priority", id: "priority", width: 150, sortable: false},
                        {header: "Action", dataIndex: "action", id: "action", width: 100, sortable: false}
                    ]),
                    store:this.gridStore,
                    autoSizeColumns: false, 
                    autoExpandColumn: "message", 
                    autoExpandMin: 100, 
                    autoExpandMax: 5000
                });
                
                this.gridStore.load();
                
                // build the panel
                this.panel = new Ext.Panel({
                    id:'Mantis.Calls.ViewCalls.panel',
                    layout:'border',
                    region:'center',
                    tbar:Mantis.Calls.SearchBar.getToolbar(),
                    items:[
                        this.grid
                    ]
                });
                
                // and add the panel to the calls section
                Mantis.Calls.addPanel(this.panel);
            }
        }
    };
} ();