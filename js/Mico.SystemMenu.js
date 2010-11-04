/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mico.SystemMenu.js
 ** 
 ** Description: A simple container for the top/system menu
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
Mico.SystemMenu = function () {
    var menuSystem;
    var menuUser;
    var selected;
    var items;
    
    return {
        /** Build and show the system and user menus */
        show: function () {
            if (this.menuSystem == undefined) {
                this.items = [];
                
                // system menu is the left side - it is for tabs which are system related
                this.menuSystem = new Ext.Panel ({
                    id:'Mico.SystemMenu.menuSystem',
                    layout:'hbox',
                    applyTo:'systemMenu',
                    bodyStyle:'background:none;'
                });
                
                // user menu is the right side - it is for tabs which are user related
                this.menuUser = new Ext.Panel ({
                    id:'Mico.SystemMenu.menuUser',
                    layout:'hbox',
                    layoutConfig:{
                        pack:'end'
                    },
                    applyTo:'userMenu',
                    bodyStyle:'background:none;'
                });
            }
        },
        /** Adds a text item and links to the passed function
         * @param text {string} The text of the item
         * @param func {string} The function to call when clicked as a string
         * @param menu {string} Which menu ('user' or 'system') to add the item to (default is 'system')
         * @returns {int} The item ID
         */
        addItem: function (text,func,menu) {
            // get the item
            var id = this.items.length;
            // add it to the items array
            this.items[id] = new Ext.Panel({
                id:'menu-item-'+id,
                html:'<div class="menu-item" onclick="Mico.SystemMenu.markSelected('+id+');'+func+';">'+text+'</a>',
                bodyStyle:'background:none;'
            });
            // add it to the menu
            if (menu == 'user') {
                this.menuUser.add(this.items[id]);
                // and layout
                this.menuUser.doLayout();
            } else {
                this.menuSystem.add(this.items[id]);
                // and layout
                this.menuSystem.doLayout();
            }
            
            return id;
        },
        /** Marks a menu item as selected
         * @param id {int} The item id
         */
        markSelected: function (id) {
            // check if the item id exists
            if (this.items[id] !== undefined) {
                // deselect the previously selected item
                if (this.selected != undefined) {
                    this.items[this.selected].removeClass('menu-item-selected');
                }
                
                // select this item
                this.items[id].addClass('menu-item-selected');
                this.selected = id;
            }
        }
    };
} ();