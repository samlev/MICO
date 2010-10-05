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
    // menu id
    var menuId;
    
    // main panel
    var panel;
    
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
                
                // Build the panels
                Mantis.Calls.AddCall.show();
                Mantis.Calls.ViewCalls.show();
                
                // Add to the main panel
                Mantis.Application.addPanel(this.panel);
                
                // mark this panel as selected
                Mantis.SystemMenu.markSelected(this.menuId);
            }
            
            Mantis.Application.showPanel('Mantis.Calls.panel');
        },
        /** Adds a panel to this panel
         * @param panel {Ext.Panel} The panel to add
         */
        addPanel: function (panel) {
            this.panel.add(panel);
        }
    };
} ();