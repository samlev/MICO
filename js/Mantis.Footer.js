/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Sphodro.Footer.js
 ** 
 ** Description: A simple footer for the application with version, about page,
 **              and some other items.
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

Sphodro.Footer = function () {
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
                        "Sphodro",
                        '-',
                        { html: '<a href="#" onclick="Sphodro.Footer.showAbout();">About Sphodro</a>'},
                        "->",
                        "Version: "+MANTIS_VERSION
                    ]
                });
            }
            
            return this.bar;
        },
        /** Shows the 'About Sphodro' window */
        showAbout: function () {
            if (this.aboutWindow === undefined) {
                // build the 'About Sphodro' HTML 
                var aboutHTML = '<h1>Sphodro</h1>'; // Title
                // Version
                aboutHTML += '<p style="font-weight:bold;color:#88BB88;" align="right">Version '+MANTIS_VERSION+'</p>';
                // Licence
                aboutHTML += '<p>Sphodro is released under the <a href="http://www.gnu.org/licenses/lgpl-3.0-standalone.html" target="_new">GNU LGPL</a> '+
                             'licence version 3.0, and is available for free, without warranty.</p>';
                // Acknowledgements
                aboutHTML += '<p>Icons from the <a href="http://www.famfamfam.com/lab/icons/silk/" target="_new">silk icon set</a> '+
                             'were used in this system.</p>';
                // Copyright
                aboutHTML += '<p style="color:#88BB88;">All code and images are &copy; 2010 to <a href="http://www.samuellevy.com/" style="color:#88BB88;" target="_new">Samuel Levy</a>, unless otherwise noted.</p>';
                
                // build the window
                this.aboutWindow = new Ext.Window({
                    title:'About Sphodro',
                    modal:false,
                    closeAction:'hide',
                    width: 700,
                    height: 550,
                    bodyStyle: 'background: #f0fff0 url('+APP_ROOT+'/skin/static/about_bg.png) repeat-y;',
                    layout:'hbox',
                    items: [
                        // Large Sphodro logo on the left
                        {
                            html:'<img src="'+APP_ROOT+'/skin/static/sphodro_large.png" alt="Sphodro Large" />',
                            width: 250,
                            height: 510,
                            bodyStyle:'background:none;padding-top:10px;'
                        },
                        // Spacer to get over the transition gradient
                        {
                            width:100,
                            bodyStyle:'background:none'
                        },
                        // about sphodro text
                        {
                            html: aboutHTML,
                            width: 340,
                            height: 500,
                            bodyStyle:'background:none;padding:10px;',
                            cls: 'about-sphodro'
                        }
                    ]
                });
            }
            
            // show the window
            this.aboutWindow.show();
        }
    };
} ();
