/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.SystemMenu.js
 ** 
 ** Description: A simple container for the top/system menu
 *******************************************************************************
 ******************************************************************************/
Mantis.SystemMenu = function () {
    var menu;
    var selected;
    var items;
    
    return {
        /** Build and show the system menu */
        show: function () {
            if (this.menu == undefined) {
                this.items = [];
                
                this.menu = new Ext.Panel ({
                    id:'Mantis.SystemMenu.menu',
                    layout:'hbox',
                    applyTo:'systemMenu',
                    bodyStyle:'background:none;'
                });
            }
        },
        /** Adds a text item and links to the passed function
         * @param text {string} The text of the item
         * @param func {string} The function to call when clicked as a string
         * @returns {int} The item ID
         */
        addItem: function (text,func) {
            // get the item
            var id = this.items.length;
            // add it to the items array
            this.items[id] = new Ext.Panel({html:'<a href="#" onclick="Mantis.SystemMenu.markSelected('+id+');'+func+';">'+text+'</a>',bodyStyle:'background:none;'});
            // add it to the menu
            this.menu.add(this.items[id]);
            
            // and layout
            this.menu.doLayout();
            
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
                    this.items[this.selected].removeClass('menuItemSelected');
                }
                // select this item
                this.items[id].addClass('menuItemSelected');
                this.selected = id;
            }
        }
    };
} ();