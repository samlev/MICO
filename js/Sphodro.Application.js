/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Sphodro.Application.js
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

Ext.namespace ("Sphodro");

Sphodro.Application = function () {
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
                if (Sphodro.Footer !== undefined) {
                    footer = Sphodro.Footer.getFooter();
                }
                
                // Set up the holder panel
                this.panel = new Ext.Panel ({
                    id: "Sphodro.Application.panel", 
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
                    id: "Sphodro.Application.viewport", 
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
                
                if (Sphodro.Login !== undefined) { // if the login page is defined, show it
                    Sphodro.Login.show();
                } else if (Sphodro.PasswordSet !== undefined) { // if the 'password set' form is defined, show it.
                    Sphodro.PasswordSet.show();
                } else if (Sphodro.Calls !== undefined) { // if the main 'calls' section is defined, show it
                    // show standard application components
                    Sphodro.SystemMenu.show(); // system and user menus
                    
                    // Set the left ('system') menu items
                    Sphodro.Calls.init(); // initialize calls panel
                    Sphodro.User.Status.init(); // initialize the user status panel
                    // initialises the manage users panel
                    if (Sphodro.ManageUsers !== undefined) {
                        Sphodro.ManageUsers.init ();
                    }
                    
                    // set the right ('user') menu items
                    // initialise the system settings panel
                    if (Sphodro.SystemSettings !== undefined) {
                        Sphodro.SystemSettings.init ();
                    }
                    Sphodro.User.Preferences.init(); // initialize the user preferences panel
                    // add the user logout menu item
                    Sphodro.SystemMenu.addItem('Log out','Sphodro.User.logout()','user');
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
    Sphodro.Application.init ();
});
