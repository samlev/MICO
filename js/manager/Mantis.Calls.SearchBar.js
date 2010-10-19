/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/manager/Mantis.Calls.SearchBar.js
 ** 
 ** Description: Defines the 'calls' searchbar for manager users
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
                            ['Calls opened by me','opened'],
                            ['All calls','all']
                        ]
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:Mantis.User.getVarDefault('showcalls','assigned'),
                    mode:'local',
                    triggerAction:'all',
                    width:130
                });
                
                this.filterField.on('select', function () {
                    Mantis.Calls.ViewCalls.gridStore.load({params:{start:0,limit:Mantis.User.getVarDefault('callsperpage',30)}});
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
                    value:Mantis.User.getVarDefault('ordercalls','recent'),
                    mode:'local',
                    triggerAction:'all',
                    width:100
                });
                
                this.orderField.on('select', function () {
                    Mantis.Calls.ViewCalls.gridStore.load({params:{start:0,limit:Mantis.User.getVarDefault('callsperpage',30)}});
                }, this);
                
                // whether to show closed or not
                this.showClosedField = new Ext.form.Checkbox({
                    checked:false
                });
                this.showClosedField.setValue(Mantis.User.getVar('showclosed'));
                
                this.showClosedField.on('check', function () {
                    Mantis.Calls.ViewCalls.gridStore.load({params:{start:0,limit:Mantis.User.getVarDefault('callsperpage',30)}});
                }, this);
                
                // and build the toolbar
                this.toolbar = new Ext.Toolbar ({
                    items: [
                        'Show: ',
                        this.filterField,
                        ' ordered by: ',
                        this.orderField,
                        '-',
                        ' Show closed? ',
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
                    {name:'filter',value:Mantis.User.getVarDefault('showcalls','assigned')},
                    {name:'order',value:Mantis.User.getVarDefault('ordercalls','recent')},
                    {name:'closed',value:Mantis.User.getVarDefault('showclosed',false)}
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