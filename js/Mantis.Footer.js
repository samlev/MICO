/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.Footer.js
 ** 
 ** Description: A simple footer for the application with version, about page,
 **              and some other items.
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mantis Simple Call Centre is free software: you can redistribute it and/or
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

Mantis.Footer = function () {
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
                        "Mantis Simple Call Centre",
                        '-',
                        { html: '<a href="#" onclick="Mantis.Footer.showAbout();">About Mantis</a>'},
                        "->",
                        "Version: "+MANTIS_VERSION
                    ]
                });
            }
            
            return this.bar;
        },
        showAbout: function () {
            if (this.aboutWindow === undefined) {
                var aboutHTML = '<h1>Mantis Simple Call Centre</h1>';
                aboutHTML += '<p style="font-weight:bold;color:#88BB88;" align="right">Version '+MANTIS_VERSION+'</p>';
                aboutHTML += '<p>Mantis is released under the <a href="http://www.gnu.org/licenses/lgpl-3.0-standalone.html" target="_new">GNU LGPL</a> '+
                             'licence, and is available for free, without warranty.</p>';
                aboutHTML += '<p>Icons from the <a href="http://www.famfamfam.com/lab/icons/silk/" target="_new">silk icon set</a> '+
                             'were used in this system.</p>';
                aboutHTML += '<p style="color:#88BB88;">All code and images are &copy; 2010 to <a href="http://www.samuellevy.com/" style="color:#88BB88;" target="_new">Samuel Levy</a>, unless otherwise noted.</p>';
                
                this.aboutWindow = new Ext.Window({
                    title:'About Mantis',
                    modal:false,
                    closeAction:'hide',
                    width: 700,
                    height: 550,
                    bodyStyle: 'background: #f0fff0 url('+APP_ROOT+'/skin/static/about_bg.png) repeat-y;',
                    layout:'hbox',
                    items: [
                        {
                            html:'<img src="'+APP_ROOT+'/skin/static/mantis_large.png" alt="Mantis Large" />',
                            width: 250,
                            height: 500,
                            bodyStyle:'background:none;padding-top:10px;'
                        },
                        {
                            width:100,
                            bodyStyle:'background:none'
                        },
                        {
                            html: aboutHTML,
                            width: 340,
                            height: 500,
                            bodyStyle:'background:none;padding:10px;',
                            cls: 'about-mantis'
                        }
                    ]
                })
            }
            
            this.aboutWindow.show();
        }
    };
} ();
