/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.Calls.SearchBar.js
 ** 
 ** Description: Defines the 'calls' searchbar
 *******************************************************************************
 ******************************************************************************/
Mantis.Calls.SearchBar = function () {
    var toolbar;
    var filterField;
    var orderFilter;
    var showClosedField;
    var refreshButton;
    
    return {
        /** Build the toolbar
         * @returns {Ext.Toolbar} A toolbar
         */
        getToolbar: function () {
            if (this.toolbar === undefined) {
                // the filter
                this.filterField = new Ext.form.ComboBox({
                    allowBlank:false,
                    editable:false,
                    store: new Ext.data.SimpleStore ({
                        fields:['type','filter'],
                        data: [
                            ['Calls assigned to me','assigned'],
                            ['Calls opened by me','opened']
                        ]
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:'assigned',
                    mode:'local',
                    triggerAction:'all',
                    width:130
                });
                
                this.filterField.on('select', function () {
                    Mantis.Calls.ViewCalls.gridStore.load();
                }, this);
                
                // the order
                this.orderField = new Ext.form.ComboBox({
                    allowBlank:false,
                    editable:false,
                    store: new Ext.data.SimpleStore ({
                        fields:['type','filter'],
                        data: [
                            ['Most recent','recent'],
                            ['Most urgent','urgent']
                        ]
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:'recent',
                    mode:'local',
                    triggerAction:'all',
                    width:100
                });
                
                this.orderField.on('select', function () {
                    Mantis.Calls.ViewCalls.gridStore.load();
                }, this);
                
                // whether to show closed or not
                this.showClosedField = new Ext.form.Checkbox({
                    checked:false
                });
                
                this.showClosedField.on('check', function () {
                    Mantis.Calls.ViewCalls.gridStore.load();
                }, this);
                
                // a simple refresh button
                this.refreshButton = new Ext.Button({
                    text:'Refresh',
                    scope:this,
                    handler: function() {
                        Mantis.Calls.ViewCalls.gridStore.load();
                    }
                });
                
                // and build the toolbar
                this.toolbar = new Ext.Toolbar ({
                    items: [
                        { text:'Show:' },
                        this.filterField,
                        { text:'ordered by:' },
                        this.orderField,
                        '-',
                        { text:'Show closed?' },
                        this.showClosedField,
                        '->',
                        this.refreshButton
                    ]
                });
            }
            
            return this.toolbar;
        },
        /** Get the filters
         * @returns {array} An array of filter objects with 'name' and 'value' as properties
         */
        getFilter: function () {
            var filter;
            
            if (this.toolbar == undefined) {
                filter = [
                    {name:'filter',value:'assigned'},
                    {name:'order',value:'recent'},
                    {name:'closed',value:false}
                ];
            } else {
                filter = [
                    {name:'filter',value:this.filterField.getValue()},
                    {name:'order',value:this.orderField.getValue()},
                    {name:'closed',value:this.showClosedField.getValue()}
                ];
            }
            
            return filter;
        }
    };
} ();