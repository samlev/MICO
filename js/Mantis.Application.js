/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.Application.js
 ** 
 ** Description: The main application/page framework that everything else uses
 *******************************************************************************
 ******************************************************************************/
Ext.QuickTips.init ();

Ext.BLANK_IMAGE_URL = "skin/custom/static/s.gif";

Ext.namespace ("Mantis");

Mantis.Application = function () {
    var viewport;
    
    var panel;
    
    return {
        /** Initialises the Application, and sets up a main card panel that all
         * other classes can add to.
         */
        init: function () {
            if (this.viewport === undefined) {
                // Set up the holder panel
                this.panel = new Ext.Panel ({
                    id: "Mantis.Application.panel", 
                    region: "center", 
                    layout: "card",
                    items: [
                        {
                            bodyStyle: 'background-color:#B6E0A3;'
                        }
                    ],
                    activeItem:0
                });
                
                // Set up the viewport!
                this.viewport = new Ext.Viewport ({
                    id: "Mantis.Application.viewport", 
                    layout: "border",
                    items: [{
                            region: "north", 
                            layout: "fit", 
                            contentEl: "pageHeader",
                            height: 70
                        }, 
                        this.panel
                    ]
                });
            }
            
            if (Mantis.Login !== undefined) { // if the login page is defined, show it
                Mantis.Login.show();
            } else if (Mantis.PasswordSet !== undefined) { // if the 'password set' form is defined, show it.
                Mantis.PasswordSet.show();
            } else {
                // or check for normal application methods
                if (Mantis.SystemMenu !== undefined) { // if the system menu is defined, show it
                    Mantis.SystemMenu.show();
                }
            }
        },
        /** Adds a panel to the application
         * @param panel {Ext.Panel} A panel to add to the application
         */
        addPanel: function (panel) {
            this.panel.add (panel);
        },
        /** Adds a panel to the application
         * @param id {string} The id of the panel to show
         */
        showPanel: function (id) {
            this.panel.getLayout().setActiveItem (id);
        }
    };
} ();

Ext.onReady (function () {
    Mantis.Application.init ();
});