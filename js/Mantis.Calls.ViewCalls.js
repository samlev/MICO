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
                        {name: "date", mapping: "date", type: 'date', dateFormat:'Y-m-d H:i:s'}, 
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
                
                var sm = new Ext.grid.CheckboxSelectionModel();
                
                // build the grid
                this.grid = new Ext.grid.GridPanel({
                    id:'Mantis.Calls.ViewCalls.grid',
                    region:'center',
                    cm: new Ext.grid.ColumnModel ([
                        sm,
                        {header: "At", dataIndex: "date", id: "date", width: 120, sortable: false, renderer: renderDate},
                        {header: "Caller", dataIndex: "caller", id: "caller", width: 120, sortable: false, renderer: renderGeneric},
                        {header: "From", dataIndex: "company", id: "company", width: 120, sortable: false, renderer: renderGeneric},
                        {header: "Message", dataIndex: "message", id: "message", width: 200, sortable: false, renderer:renderMessage},
                        {header: "Contact", dataIndex: "contact", id: "contact", width: 150, sortable: false, renderer: renderContact},
                        {header: "Priority", dataIndex: "priority", id: "priority", width: 80, sortable: false, renderer: renderPriority},
                        {header: "Action", dataIndex: "action", id: "action", width: 120, sortable: false, renderer: renderGeneric},
                        {header: "Mark as closed", id: "close", width: 100, renderer: renderClose}
                    ]),
                    sm:sm,
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
    
    function renderDate(val, meta, rec, row, col, store) {
        var value = '';
        
        // check that we have a date object
        if (typeof(val)=='object') {
            value += ''; val.format('g:ia');
            
            var today = new Date();
            
            if (val.getDayOfYear() == today.getDayOfYear()) { // check if the call was taken today
                value = val.format('g:ia')+' Today';
            } else if (val.getDayOfYear() == (today.getDayOfYear()-1) || // check if the call was taken yesterday
                       (today.getDayOfYear() == 0 && (val.format('m-d') == '12-31' && // check if we're on the border of a year
                                                     (parseInt(val.format('Y'))==(parseInt(today.format('Y'))-1))))) { // and that the years are consecutive
                value = val.format('g:ia')+' Yesterday';
            } else {
                // just show the date
                value = ' ' + val.format('jS M, Y');
            }
            
            meta.attr = 'ext:qtip="'+val.format('jS M, Y')+' at '+val.format('g:ia')+'"';
        } else {
            value = val;
        }
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // and return our formatted value
        return value;
    }
    
    function renderContact(val, meta, rec, row, col, store) {
        var value = '';
        
        // check that we have a date object
        if (typeof(val)=='object') {
            var title = '';
            
            // build the qtip
            for (var i = 0; i < val.length; i++) {
                if (i != 0) {
                    title += "<br />";
                }
                title += val[i];
            }
            //  ensure that no HTML is rendered
            title = title.split("&").join("&amp;");
            meta.attr = 'ext:qtip="'+title+'"';
        }
        value = val;
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // and return our formatted value
        return value;
    }
    
    function renderMessage(val, meta, rec, row, col, store) {
        var value = '';
        var title = '';
        // split out the title
        title = val.split("\n").join("<br />");
        // ensure that no HTML is rendered
        title = title.split("&").join("&amp;");
        
        // check that we have a date object
        if (title.length > 0) {
            meta.attr = 'ext:qtip="'+title+'"';
        }
        // get the value
        value = val;
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // and return our formatted value
        return value;
    }
    
    function renderPriority(val, meta, rec, row, col, store) {
        var value = '';
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // add the class
        value = '<span class="priority-'+val+'">'+val+'</span>';
        
        return value;
    }
    
    function renderClose(val, meta, rec, row, col, store) {
        var value = '';
        
        if (rec.get('status')=='new') {
            value = '<a href="#" onclick="Mantis.Calls.closeCall('+rec.get('id')+')">Close call</a>';
        } else {
            value = 'Call closed';
        }
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // and return our formatted value
        return value;
    }
    
    function renderGeneric(val, meta, rec, row, col, store) {
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        return val;
    }
} ();