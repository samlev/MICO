/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: upgrade/js/Mico.Upgrader.js
 ** 
 ** Description: The simple interface for the upgrader
 **
 ** Copyright (c) 2010 Samuel Levy
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

Mico.Upgrader = function () {
    // buttons
    var upgradeButton;
    
    // main panel
    var panel;
    
    return {
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // The button for saving the user's settings
                this.upgradeButton = new Ext.Button({
                    text: "Upgrade", 
                    handler: function () {
                        this.doUpgrade();
                    }, 
                    scope: this
                });
                
                var items;
                
                if (OLD_VERSION == NEW_VERSION) {
                    items = [
                        {
                            html:'<h1>Mantis Inbound Call Organiser is already up to date.</h1>'
                        }
                    ]
                } else {
                    items = [
                        {
                            html:'<h1>Mantis Inbound Call Organiser needs to be upgraded.</h1>'+
                                 "<p>Clicking the 'Upgrade' button below will upgrade MICO from "+
                                 "version "+OLD_VERSION+" to version "+NEW_VERSION+"</p>"
                        },
                        this.upgradeButton
                    ]
                }
                
                // Upgrader panel
                this.panel = new Ext.form.FormPanel({
                    id: "Mico.Upgrader.panel",
                    items: items,
                    cls: 'main-form-panel',
                    bodyStyle: "padding:5px;"
                });
                
                // Add to the main panel
                Mico.Application.addPanel(this.panel);
            }
            
            Mico.Application.showPanel('Mico.Upgrader.panel');
        },
        /** Performs the upgrade */
        doUpgrade: function() {
            // check if the form is valid
            if (this.panel.getForm().isValid()) {
                // show that something is happening
                Ext.Msg.wait('Upgrade','Upgrading MICO',{
                    closable:false,
                    modal:true
                });
                
                var conn = new Ext.data.Connection();
                
                // Check that we can connect to the database
                conn.request({
                    url:'api/upgrade.php',
                    callback: function (options, success, response) {
                        var res = Ext.decode(response.responseText);
                        if (success && res.success) {
                            // hide the 'wait' box
                            Ext.Msg.hide();
                            
                            Ext.Msg.alert("Upgraded", "MICO has now been successfully upgraded.<br /><br />"+
                                                      "You will now be redirected to the login page.", function () { window.location = '../' });
                        } else {
                            Ext.Msg.hide();
                            var msg = "Unknown system error";
                            if (res.info !== undefined) {
                                msg = res.info;
                            }
                            Ext.Msg.alert("Error", msg);
                        }
                    },
                    scope: this
                });
            }
        }
    };
} ();