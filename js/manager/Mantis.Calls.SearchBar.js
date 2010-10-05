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
    var orderFilter;
    
    return {
        getToolbar: function () {
            if (this.toolbar === undefined) {
                this.orderFilter = new Ext.form.ComboBox({
                    allowBlank:false,
                    editable:false,
                    store: new Ext.data.SimpleStore ({
                        fields:['type','filter'],
                        data: [
                            ['Most recent calls for me','recent'],
                            ['Most urgent calls for me','urgent'],
                            ['Calls taken by me','opened'],
                            ['All calls','all']
                        ]
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:'recent',
                    mode:'local',
                    triggerAction:'all'
                });
                
                // and build the toolbar
                this.toolbar = new Ext.Toolbar ({
                    items: [
                        { text:'Show:' },
                        this.orderFilter,
                        '->',
                        { text:'filter' }
                    ]
                });
            }
            
            return this.toolbar;
        }
    };
} ();