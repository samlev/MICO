/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mico.Footer.js
 ** 
 ** Description: A simple footer for the application with version, about page,
 **              and some other items.
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

Mico.Footer = function () {
    var bar;
    
    var aboutWindow;
    
    return {
        /** Initialises the Application, and sets up a main card panel that all
         * other classes can add to.
         */
        getFooter: function () {
            if (this.bar === undefined) {
                this.bar = new Ext.Toolbar({
                    cls:'footer-bar',
                    items: [
                        "Mico",
                        '-',
                        { xtype:'box', html: '<a href="#" onclick="Mico.Footer.showAbout();">'+Mico.Lang.Footer.aboutLink_text+'</a>'},
                        "->",
                        Mico.Lang.Footer.version_text(MICO_VERSION)
                    ]
                });
            }
            
            return this.bar;
        },
        /** Shows the 'About Mico' window */
        showAbout: function () {
            if (this.aboutWindow === undefined) {
                // build the window
                this.aboutWindow = new Ext.Window({
                    title:Mico.Lang.Footer.aboutWindow_title,
                    modal:false,
                    closeAction:'hide',
                    width: 650,
                    height: 350,
                    resizable:false,
                    bodyStyle: 'background: #f0fff0 url('+APP_ROOT+'/skin/static/about_bg.png) repeat-y;',
                    layout:'hbox',
                    items: [
                        // Large Mico logo on the left
                        {
                            html:'<img src="'+APP_ROOT+'/skin/static/mico_large.png" alt="Mico Logo" />',
                            width: 200,
                            height: 310,
                            bodyStyle:'background:none;padding-top:10px;padding-left:25px;'
                        },
                        // Spacer to get over the transition gradient
                        {
                            width:100,
                            bodyStyle:'background:none'
                        },
                        // about mico text
                        {
                            html: Mico.Lang.Footer.showAboutBody_html(MICO_VERSION),
                            width: 340,
                            height: 300,
                            bodyStyle:'background:none;padding:10px;',
                            cls: 'about-mico'
                        }
                    ]
                });
            }
            
            // show the window
            this.aboutWindow.show();
        }
    };
} ();
