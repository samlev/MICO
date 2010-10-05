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
    var userStore;
    var userField;
    var userAddExtraButton;
    // user extras
    var userExtrasPanel;
    var extraUserFieldCount;
    // Message form
    var callerMessageBox;
    var callerMessageForm;
    var callerContactStore;
    var callerContactField;
    var callerContactAddExtraButton;
    // caller contact form
    var callerContactExtraForm;
    var extraContactFieldCount;
    // priority/actions form
    var callPriorityField;
    var actionField;
    var priorityForm;
    
    // main panel
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
                    emptyText:"Caller's name",
                    width:200
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
                    emptyText:"Caller's company",
                    width:200
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
                        {name: "statustext", mapping: "statustext"}
                    ]), 
                    baseParams: {
                        session: Mantis.User.getSession()
                    }
                });
                
                // and the field
                this.userField = new Ext.form.ComboBox({
                    store: this.userStore,
                    triggerAction: 'all',
                    hideTrigger:false,
                    required:true,
                    allowBlank:false,
                    editable:false,
                    valueField:'id',
                    displayField:'name',
                    tpl:Mantis.Utils.userTemplate,
                    mode:'local',
                    enableKeyEvents: true,
                    emptyText:"Select recipient",
                    width:200
                });
                
                // load the user store
                this.userStore.load();
                
                this.userAddExtraButton = new Ext.Button({
                    text:'Add',
                    tooltip:'Add another recipient',
                    icon: APP_ROOT+'/skin/static/icons/add.png',
                    scope:this,
                    handler: function() {
                        this.addRecipient();
                    }
                });
                
                // and the caller form
                this.callerForm = new Ext.Panel({
                    id:'Mantis.Calls.callerForm',
                    layout:'form',
                    width:300,
                    items:[
                        this.callerNameField,
                        {html:'From'},
                        this.callerCompanyField,
                        {html:'Called for'},
                        {
                            layout:'hbox',
                            items:[
                                this.userField,
                                {html:'&nbsp;&nbsp;'},
                                this.userAddExtraButton
                            ]
                        }
                    ],
                    defaults: {
                        hideLabel:true
                    }
                });
                
                // the user extras panel
                this.userExtrasPanel = new Ext.Panel({
                    layout:'form',
                    labelWidth: 20,
                    bodyStyle:'padding-top:3px;'
                });
                this.extraUserFieldCount = 0;
                
                // The message box
                this.callerMessageBox = new Ext.form.TextArea({
                    width:270,
                    height:120,
                    emptyText:'Message for recipient(s)...',
                    allowBlank:false,
                    required:true
                });
                
                // caller contact store
                this.callerContactStore = new Ext.data.Store({
                    url: APP_ROOT+"/api.php?f=getCallerContacts",
                    reader: new Ext.data.JsonReader ({
                        root: "contacts", 
                        id: "contact"
                    }, [
                        {name: "contact", mapping: "contact"}, 
                        {name: "match", mapping: "match"}
                    ]), 
                    baseParams: {
                        session: Mantis.User.getSession()
                    }
                });
                
                // and the field
                this.callerContactField = new Ext.form.ComboBox({
                    store: this.callerContactStore,
                    triggerAction: 'all',
                    hideTrigger:true,
                    required:false,
                    allowBlank:true,
                    editable:true,
                    valueField:'contact',
                    displayField:'contact',
                    tpl:Mantis.Utils.callerTemplate,
                    mode:'local',
                    enableKeyEvents: true,
                    emptyText:"Caller's Phone Number/Email",
                    width:200
                });
                
                this.callerContactAddExtraButton = new Ext.Button({
                    text:'Add',
                    tooltip:'Add another contact method',
                    icon: APP_ROOT+'/skin/static/icons/add.png',
                    scope:this,
                    handler: function() {
                        this.addcallerContact();
                    }
                });
                
                // and the form to hold it
                this.callerMessageForm = new Ext.Panel({
                    id:'Mantis.Calls.callerMessageForm',
                    layout:'form',
                    width:300,
                    items:[
                        {html:'About'},
                        this.callerMessageBox,
                        {html:'Contact them at'},
                        {
                            layout:'hbox',
                            items:[
                                this.callerContactField,
                                {html:'&nbsp;&nbsp;'},
                                this.callerContactAddExtraButton
                            ]
                        }
                    ],
                    defaults: {
                        hideLabel:true
                    }
                });
                
                // the contact extras panel
                this.callerContactExtraForm = new Ext.Panel({
                    layout:'form',
                    labelWidth: 20,
                    bodyStyle:'padding-top:3px;'
                });
                this.extraContactFieldCount = 0;
                
                // priotiy and action form
                this.callPriorityField = new Ext.form.ComboBox({
                    allowBlank:false,
                    required:true,
                    editable:false,
                    store: new Ext.data.SimpleStore ({
                        fields:['priority','view'],
                        data: [
                            ['critical','Critical'],
                            ['urgent','Urgent'],
                            ['moderate','Moderate'],
                            ['minor','Minor'],
                            ['negligible','Negligible']
                        ]
                    }),
                    displayField:'view',
                    valueField:'priority',
                    value:'recent',
                    mode:'local',
                    triggerAction:'all',
                    value:'moderate',
                    tpl:Mantis.Utils.priorityTemplate
                });
                
                // action field
                this.callActionField = new Ext.form.ComboBox({
                    allowBlank:true,
                    editable:true,
                    store: new Ext.data.SimpleStore ({
                        fields:['action'],
                        data: [
                            ['Call back ASAP'],
                            ['Call back by Close Of Business'],
                            ['Call back whenever you can'],
                            ['Caller will email/call again later'],
                            ['No need to call back']
                        ]
                    }),
                    displayField:'action',
                    valueField:'action',
                    value:'Call back ASAP',
                    mode:'local',
                    triggerAction:'all',
                    hideTrigger:true,
                    maxLength:200
                });
                
                // and the form to hold the action and priority
                this.priorityForm = new Ext.Panel({
                    id:'Mantis.Calls.priorityForm',
                    layout:'form',
                    width:300,
                    items:[
                        {html:'This call is'},
                        this.callPriorityField,
                        {html:'Action required'},
                        this.callActionField
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
                        this.callerForm,
                        this.userExtrasPanel,
                        this.callerMessageForm,
                        this.callerContactExtraForm,
                        this.priorityForm
                    ],
                    bodyStyle: 'padding:3px;',
                    title:'Take a call'
                });
            }
        },
        /** Adds a new recipient dropdown to the 'add call' form */
        addRecipient: function () {
            // build a temporary field
            var tempUserField = new Ext.form.ComboBox({
                id:'tempUserField_'+this.extraUserFieldCount,
                store: this.userStore,
                triggerAction: 'all',
                hideTrigger:false,
                required:false,
                allowBlank:true,
                editable:false,
                valueField:'id',
                displayField:'name',
                tpl:Mantis.Utils.userTemplate,
                mode:'local',
                enableKeyEvents: true,
                emptyText:"Select recipient",
                width: 175,
                fieldLabel:'OR'
            });
            
            // add it to the panel
            this.userExtrasPanel.add(tempUserField);
            // increase the counter
            this.extraUserFieldCount ++;
            // ensure that the form is correctly laid out
            this.userExtrasPanel.doLayout();
            this.addCallPanel.doLayout();
        },
        /** Removes all the extra recipients from the 'add calls' form' */
        clearRecipients: function() {
            // remove all the fields and destroy them
            this.userExtrasPanel.removeAll(true);
            // reset the counter
            this.extraUserFieldCount = 0;
            // ensure that the form is correctly laid out
            this.userExtrasPanel.doLayout();
            this.addCallPanel.doLayout();
        },
        /** Adds a new recipient dropdown to the 'add call' form */
        addcallerContact: function () {
            // build a temporary field
            var tempContactField = new Ext.form.ComboBox({
                id:'tempContactField_'+this.extraContactFieldCount,
                store: this.callerContactStore,
                triggerAction: 'all',
                hideTrigger:true,
                required:false,
                allowBlank:true,
                editable:true,
                valueField:'contact',
                displayField:'contact',
                tpl:Mantis.Utils.callerTemplate,
                mode:'local',
                emptyText:"Caller's Phone Number/Email",
                width: 175,
                fieldLabel:'OR'
            });
            
            // add it to the panel
            this.callerContactExtraForm.add(tempContactField);
            // increase the counter
            this.extraContactFieldCount ++;
            // ensure that the form is correctly laid out
            this.callerContactExtraForm.doLayout();
            this.addCallPanel.doLayout();
        },
        /** Removes all the extra recipients from the 'add calls' form' */
        clearContacts: function() {
            // remove all the fields and destroy them
            this.callerContactExtraForm.removeAll(true);
            // reset the counter
            this.extraContactFieldCount = 0;
            // ensure that the form is correctly laid out
            this.callerContactExtraForm.doLayout();
            this.addCallPanel.doLayout();
        },
        /** Builds the 'view calls' panel */
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