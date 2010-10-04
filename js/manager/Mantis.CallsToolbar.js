/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/manager/Mantis.CallsToolbar.js
 ** 
 ** Description: Defines the 'calls' toolbar for manager users
 *******************************************************************************
 ******************************************************************************/
Mantis.CallsToolbar = function () {
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
                            ['Most Recent','recent'],
                            ['Most Urgent','urgent']
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