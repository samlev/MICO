/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.Calls.js
 ** 
 ** Description: The main 'calls' section of the system
 *******************************************************************************
 ******************************************************************************/
Mantis.Calls = function () {
    var menuId;
    
    // main panel
    var panel;
    
    // add call panel - break it up into a number of smaller forms
    // caller form
    var callerForm;
    var callerNameStore;
    var callerNameField;
    var callerCompanyStore;
    var callerCompanyField;
    var userField;
    var userStore;
    // caller contact form
    var callerContactForm;
    // Message form
    var callerMessageForm;
    var callerMessageBox;
    var addCallPanel;
    
    return {
        /** Adds the link to the menu */
        init: function () {
            if (this.menuId == undefined) {
                this.menuId = Mantis.SystemMenu.addItem('Calls', 'Mantis.Calls.show()');
            }
        },
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                this.buildAddCallPanel();
                this.buildViewCallsPanel();
                
                // set up the panel
                this.panel = new Ext.Panel({
                    id:'Mantis.Calls.panel',
                    layout:'border',
                    items:[
                        this.addCallPanel,
                        this.viewCallsPanel
                    ]
                });
                
                // Add to the main panel
                Mantis.Application.addPanel(this.panel);
                
                // mark this panel as selected
                Mantis.SystemMenu.markSelected(this.menuId);
            }
            
            Mantis.Application.showPanel('Mantis.Calls.panel');
        },
        /** Builds the 'add call' panel */
        buildAddCallPanel: function () {
            if (this.addCallPanel == undefined) {
                // Caller form
                this.callerNameStore = new Ext.data.Store({
                    url: APP_ROOT+"/api.php?f=getCallerName",
                    reader: new Ext.data.JsonReader ({
                        root: "caller", 
                        id: "name"
                    }, [
                        {name: "name", mapping: "name"}, 
                        {name: "match", mapping: "match"}
                    ]), 
                    baseParams: {
                        session: Mantis.User.getSession()
                    }
                });
                
                // and the field
                this.callerNameField = new Ext.form.ComboBox({
                    store: this.callerNameStore,
                    triggerAction: 'all',
                    hideTrigger:true,
                    required:false,
                    allowBlank:true,
                    editable:true,
                    valueField:'name',
                    displayField:'name',
                    tpl:Mantis.Utils.callerTemplate,
                    mode:'remote',
                    enableKeyEvents: true,
                    emptyText:"Caller's name"
                });
                
                // Load a search
                this.callerNameField.on('keyup', function() {
                    if (this.callerNameField.getValue().length >= 3) {
                        // caller name field is our search term
                        var s = this.callerNameField.getValue();
                        // caller company field is our filter
                        var f = this.callerNameField.getValue();
                        // and search
                        this.callerNameStore.load({params:{search:s,filter:f}});
                    }
                }, this);
                
                // caller company
                this.callerCompanyStore = new Ext.data.Store({
                    url: APP_ROOT+"/api.php?f=getCompanyName", 
                    reader: new Ext.data.JsonReader ({
                        root: "company", 
                        id: "name"
                    }, [
                        {name: "name", mapping: "name"}, 
                        {name: "match", mapping: "match"}
                    ]), 
                    baseParams: {
                        session: Mantis.User.getSession()
                    }
                });
                
                // and the field
                this.callerCompanyField = new Ext.form.ComboBox({
                    store: this.callerCompanyStore,
                    triggerAction: 'all',
                    hideTrigger:true,
                    required:false,
                    allowBlank:true,
                    editable:true,
                    valueField:'name',
                    displayField:'name',
                    tpl:Mantis.Utils.callerTemplate,
                    mode:'remote',
                    enableKeyEvents: true,
                    emptyText:"Caller's company"
                });
                
                // Load a search
                this.callerCompanyField.on('keyup', function() {
                    if (this.callerCompanyField.getValue().length >= 3) {
                        // caller name field is our filter
                        var f = this.callerNameField.getValue();
                        // caller company field is our search term
                        var s = this.callerNameField.getValue();
                        // and search
                        this.callerCompanyField.load({params:{search:s,filter:f}});
                    }
                }, this);
                
                // get the list of users
                this.userStore = new Ext.data.Store({
                    url: APP_ROOT+"/api.php?f=getUsers", 
                    reader: new Ext.data.JsonReader ({
                        root: "users", 
                        id: "id"
                    }, [
                        {name: "id", mapping: "id"}, 
                        {name: "name", mapping: "name"}, 
                        {name: "status", mapping: "status"}, 
                        {name: "statustext", mapping: "statustext"},
                        {name: "active", value:1}
                    ]), 
                    baseParams: {
                        session: Mantis.User.getSession()
                    }
                });
                
                // and the caller form
                this.callerForm = new Ext.Panel({
                    id:'Mantis.Calls.callerForm',
                    layout:'form',
                    items:[
                        this.callerNameField,
                        {html:'Called from'},
                        this.callerCompanyField,
                        {html:'For'}
                    ],
                    defaults: {
                        hideLabel:true
                    }
                });
                
                // and build the panel
                this.addCallPanel = new Ext.Panel ({
                    id: "Mantis.Calls.addCallPanel", 
                    region:'west',
                    width: 300,
                    collapsible: false,
                    layout: 'vbox',
                    items: [
                        this.callerForm
                    ],
                    bodyStyle: 'padding:3px;',
                    title:'Take a call'
                });
            }
        },
        buildViewCallsPanel: function () {
            if (this.viewCallsPanel == undefined) {
                this.viewCallsPanel = new Ext.Panel({
                    html:"<p>Calls and stuff go here</p>",
                    region:'center',
                    tbar:Mantis.CallsToolbar.getToolbar()
                });
            }
        }
    };
} ();

Ext.onReady (function () {
    Mantis.Application.init ();
});