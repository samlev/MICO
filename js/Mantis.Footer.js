/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.Footer.js
 ** 
 ** Description: A simple footer for the application with version, and some
 **              other items.
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
                this.aboutWindow = new Ext.Window({
                    title:'About Mantis',
                    modal:false,
                    closeAction:'hide',
                    width: 400,
                    height: 600
                })
            }
            
            this.aboutWindow.show();
        }
    };
} ();
