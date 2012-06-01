/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mico.Application.js
 ** 
 ** Description: The main application/page framework that everything else uses
 **
 ** Copyright (c) 2012 Samuel Levy
 ** 
 ** Mico is free software: you can redistribute it and/or
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

Ext.namespace ("Mico");

Mico.Application = function () {
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
                if (Mico.Footer !== undefined) {
                    footer = Mico.Footer.getFooter();
                }
                
                // Set up the holder panel
                this.panel = new Ext.Panel ({
                    id: "Mico.Application.panel", 
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
                    id: "Mico.Application.viewport", 
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
                
                if (Mico.Login !== undefined) { // if the login page is defined, show it
                    Mico.Login.show();
                } else if (Mico.PasswordSet !== undefined) { // if the 'password set' form is defined, show it.
                    Mico.PasswordSet.show();
                } else if (Mico.Calls !== undefined) { // if the main 'calls' section is defined, show it
                    // show standard application components
                    Mico.SystemMenu.show(); // system and user menus
                    
                    // Set the left ('system') menu items
                    Mico.Calls.init(); // initialize calls panel
                    Mico.User.Status.init(); // initialize the user status panel
                    // initialises the manage users panel
                    if (Mico.ManageUsers !== undefined) {
                        Mico.ManageUsers.init ();
                    }
                    
                    // set the right ('user') menu items
                    // initialise the system settings panel
                    if (Mico.SystemSettings !== undefined) {
                        Mico.SystemSettings.init ();
                    }
                    Mico.User.Preferences.init(); // initialize the user preferences panel
                    // add the user logout menu item
                    Mico.SystemMenu.addItem(Mico.Lang.Application.logout,'Mico.User.logout()','user',true);
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
    Mico.Application.init ();
});
