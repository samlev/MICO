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
    
    // add call panel
    var callerNameField;
    var callerNameStore;
    var callerCompanyField;
    var callerCompanyStore;
    var userField;
    var userStore;
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
                
                // and build the panel
                this.addCallPanel = new Ext.Panel ({
                    id: "Mantis.Calls.addCallPanel", 
                    region:'west',
                    width: 300,
                    collapsible: false,
                    layout: 'form',
                    items: [
                        {html:'Some text or other'}
                    ],
                    bodyStyle: 'padding:3px;',
                    title:'Take a call'
                });
            }
        },
        buildViewCallsPanel: function () {
            if (this.viewCallsPanel == undefined) {
                this.viewCallsPanel = new Ext.Panel({html:"<p>Calls and stuff go here</p>",region:'center'});
            }
        }
    };
} ();

Ext.onReady (function () {
    Mantis.Application.init ();
});