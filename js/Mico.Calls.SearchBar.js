/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mico.Calls.SearchBar.js
 ** 
 ** Description: Defines the 'calls' searchbar
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
Mico.Calls.SearchBar = function () {
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
                    store: new Ext.data.ArrayStore ({
                        fields:['type','filter'],
                        data: Mico.Utils.CommonStores.callsSearchFilter
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:Mico.User.getVarDefault('showcalls','assigned'),
                    mode:'local',
                    triggerAction:'all',
                    width:140
                });
                
                this.filterField.on('select', function () {
                    Mico.Calls.ViewCalls.gridStore.load({params:{start:0,limit:Mico.User.getVarDefault('callsperpage',30)}});
                }, this);
                
                // the order
                this.orderField = new Ext.form.ComboBox({
                    allowBlank:false,
                    editable:false,
                    store: new Ext.data.ArrayStore ({
                        fields:['type','filter'],
                        data: Mico.Utils.CommonStores.callsOrderFilter
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:Mico.User.getVarDefault('ordercalls','recent'),
                    mode:'local',
                    triggerAction:'all',
                    width:100
                });
                
                this.orderField.on('select', function () {
                    Mico.Calls.ViewCalls.gridStore.load({params:{start:0,limit:Mico.User.getVarDefault('callsperpage',30)}});
                }, this);
                
                // whether to show closed or not
                this.showClosedField = new Ext.form.Checkbox({
                    checked:false,
                    bodyStyle:'margin-top:2px;'
                });
                this.showClosedField.setValue(Mico.User.getVar('showclosed'));
                
                this.showClosedField.on('check', function () {
                    Mico.Calls.ViewCalls.gridStore.load({params:{start:0,limit:Mico.User.getVarDefault('callsperpage',30)}});
                }, this);
                
                // and build the toolbar
                this.toolbar = new Ext.Toolbar ({
                    items: [
                        Mico.Lang.Calls.SearchBar.filterField_label+': ',
                        this.filterField,
                        ' '+Mico.Lang.Calls.SearchBar.orderField_label+': ',
                        this.orderField,
                        '-',
                        ' '+Mico.Lang.Calls.SearchBar.showClosedField_label+' ',
                        this.showClosedField
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
                    {name:'filter',value:Mico.User.getVarDefault('showcalls','assigned')},
                    {name:'order',value:Mico.User.getVarDefault('ordercalls','recent')},
                    {name:'closed',value:Mico.User.getVarDefault('showclosed',false)}
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