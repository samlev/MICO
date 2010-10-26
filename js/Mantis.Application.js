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

Ext.BLANK_IMAGE_URL = "skin/static/s.gif";

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
                    enableTabScroll:true,
                    items: [{
                            region: "north", 
                            layout: "fit", 
                            contentEl: "pageHeader",
                            height: 90
                        }, 
                        this.panel
                    ]
                });
                
                if (Mantis.Login !== undefined) { // if the login page is defined, show it
                    Mantis.Login.show();
                } else if (Mantis.PasswordSet !== undefined) { // if the 'password set' form is defined, show it.
                    Mantis.PasswordSet.show();
                } else {
                    // show standard application components
                    Mantis.SystemMenu.show(); // system and user menus
                    Mantis.Calls.init(); // initialize calls panel
                    Mantis.User.Preferences.init(); // initialize the user preferences panel
                    Mantis.User.Status.init(); // initialize the user status panel
                    
                    // initialises the manage users panel
                    if (Mantis.ManageUsers !== undefined) {
                        Mantis.ManageUsers.init ();
                    }
                    
                    // add the user logout menu
                    Mantis.SystemMenu.addItem('Log out','Mantis.User.logout()','user');
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
