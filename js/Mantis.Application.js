/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.Application.js
 ** 
 ** Description: The main application/page framework that everything else uses
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Sphodro is free software: you can redistribute it and/or
 ** modify it under the terms of the GNU Lesser General Public License as
 ** published by the Free Software Foundation, either version 3 of the License,
 ** or (at your option) any later version.
 **
 ** This program is distributed in the hope that it will be useful, but WITHOUT
 ** ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 ** FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License
 ** for more details.
 **
 ** You should have received a copy of the GNU Lesser General Public License
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
                // get the footer if it's defined (it won't be for the installer)
                var footer;
                if (Mantis.Footer !== undefined) {
                    footer = Mantis.Footer.getFooter();
                }
                
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
                    activeItem:0,
                    bbar: footer
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
                } else if (Mantis.Calls !== undefined) { // if the main 'calls' section is defined, show it
                    // show standard application components
                    Mantis.SystemMenu.show(); // system and user menus
                    
                    // Set the left ('system') menu items
                    Mantis.Calls.init(); // initialize calls panel
                    Mantis.User.Status.init(); // initialize the user status panel
                    // initialises the manage users panel
                    if (Mantis.ManageUsers !== undefined) {
                        Mantis.ManageUsers.init ();
                    }
                    
                    // set the right ('user') menu items
                    // initialise the system settings panel
                    if (Mantis.SystemSettings !== undefined) {
                        Mantis.SystemSettings.init ();
                    }
                    Mantis.User.Preferences.init(); // initialize the user preferences panel
                    // add the user logout menu item
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

// When ExtJS is ready, initialize the application
Ext.onReady (function () {
    Mantis.Application.init ();
});
