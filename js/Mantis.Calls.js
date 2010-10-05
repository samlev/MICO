/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.Calls.js
 ** 
 ** Description: The main 'calls' section of the system
 *******************************************************************************
 ******************************************************************************/
Ext.namespace('Mantis.Calls');

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
                
                // set up the panel
                this.panel = new Ext.Panel({
                    id:'Mantis.Calls.panel',
                    layout:'border'
                });
                
                Mantis.Calls.AddCall.show();
                this.buildViewCallsPanel();
                
                // Add to the main panel
                Mantis.Application.addPanel(this.panel);
                
                // mark this panel as selected
                Mantis.SystemMenu.markSelected(this.menuId);
            }
            
            Mantis.Application.showPanel('Mantis.Calls.panel');
        },
        /** Builds the 'view calls' panel */
        buildViewCallsPanel: function () {
            if (this.viewCallsPanel == undefined) {
                this.viewCallsPanel = new Ext.Panel({
                    html:"<p>Calls and stuff go here</p>",
                    region:'center',
                    tbar:Mantis.Calls.SearchBar.getToolbar()
                });
                
                this.addPanel(this.viewCallsPanel);
            }
        },
        /** Adds a panel to this panel
         * @param panel {Ext.Panel} The panel to add
         */
        addPanel: function (panel) {
            this.panel.add(panel);
        }
    };
} ();

Ext.onReady (function () {
    Mantis.Application.init ();
});