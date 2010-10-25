/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.User.Status.js
 ** 
 ** Description: Allows the user to change their status
 *******************************************************************************
 ******************************************************************************/

Mantis.User.Status = function () {
    // menu id
    var menuId;
    
    // main panel
    var panel;
    
    return {
        /** Adds the link to the menu */
        init: function () {
            if (this.menuId == undefined) {
                this.menuId = Mantis.SystemMenu.addItem('Set Status', 'Mantis.User.Preferences.show()','system');
            }
        },
        /** Shows the panel */
        show: function () {
            if (this.panel == undefined) {
                // ensure that the menu item is initialised
                if (this.menuId == undefined) {
                    this.init();
                }
                
                this.statusField = new Ext.form.ComboBox({
                    allowBlank:false,
                    editable:false,
                    store: new Ext.data.SimpleStore ({
                        fields:['status','name'],
                        data: [
                            ['available','Available'],
                            ['away','Away'],
                            ['busy','Busy'],
                            ['offline','Appear Offline']
                        ]
                    }),
                    displayField:'name',
                    valueField:'status',
                    value:Mantis.User.getVarDefault('status','available'),
                    mode:'local',
                    triggerAction:'all',
                    tpl:Mantis.Utils.userTemplate,
                    listeners: {
                        scope:this,
                        'select': function () {
                            // TODO
                        }
                    }
                });
                
                this.statusTextStore = new Ext.data.SimpleStore ({
                    fields:['text'],
                    data: this.statusText(Mantis.User.getVarDefault('status','available'))
                });
                
                this.statusTextField = new Ext.form.ComboBox({
                    store: this.statusTextStore,
                    triggerAction: 'all',
                    hideTrigger:true,
                    required:false,
                    allowBlank:true,
                    editable:true,
                    autoSelect:false,
                    valueField:'name',
                    displayField:'name',
                    tpl:Mantis.Utils.callerTemplate('name'),
                    mode:'remote',
                    enableKeyEvents: true,
                    width:200,
                    value:Mantis.User.getVarDefault('statustext','Available')
                });
                
                // set up the main panel
                this.panel = new Ext.Window({
                    id:'Mantis.User.Status.panel',
                    layout:form,
                    modal:true,
                    closable:false,
                    closeAction:'hide',
                    items: [
                        this.statusField,
                        this.statusTextField
                    ]
                });
            }
            
            this.panel.show();
        },
        statusText: function (status) {
            if (this.statusOptions === undefined) {
                this.statusOptions = {
                    available:[['Available']],
                    offline:[['Offline']],
                    busy:[['Busy','On the phone','In a meeting']],
                    away:[['Away','Out to lunch','Not available']]
                }
            }
            
            return this.statusOptions[status];
        }
    };
} ();