/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mico.Calls.ViewCalls.js
 ** 
 ** Description: The 'view calls' section of the system
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

Mico.Calls.ViewCalls = function () {
    // view calls grid
    var gridStore;
    var grid;
    var pager;
    
    // call detail panel
    var callDetailPanel;
    var callInfoPanel;
    var callCommentPanel;
    
    // the call update panel and form
    var updateOptionsRadioGroup;
    var updateStatusRadio;
    var escalateCallRadio;
    var priorityCombo;
    var userCombo;
    var justCommentRadio;
    var commentText;
    var callUpdatePanel;
    var updateButton;
    var clearButton;
    
    // main panel
    var panel;
    
    return {
        /** Shows the panel */
        show: function () {
            if (this.panel === undefined) {
                // build the store
                this.gridStore = new Ext.data.Store({
                    url: APP_ROOT+"/api.php?f=getCalls", 
                    reader: new Ext.data.JsonReader ({
                        root: "calls", 
                        id: "id",
                        totalProperty: 'total'
                    }, [
                        {name: "id", mapping: "id"}, 
                        {name: "taker", mapping: "taker"}, 
                        {name: "date", mapping: "date", type: 'date', dateFormat:'Y-m-d H:i:s'}, 
                        {name: "caller", mapping: "caller"}, 
                        {name: "company", mapping: "company"}, 
                        {name: "message", mapping: "message"}, 
                        {name: "users", mapping: "users"}, 
                        {name: "contact", mapping: "contact"}, 
                        {name: "priority", mapping: "priority"}, 
                        {name: "status", mapping: "status"}, 
                        {name: "action", mapping: "action"}, 
                        {name: "recipient", mapping: "recipient"}, 
                        {name: "comments", mapping: "comments"}
                    ]), 
                    baseParams: {
                        session: Mico.User.getSession()
                    }
                });
                
                // the pager
                this.pager = new Ext.PagingToolbar({
                    store: this.gridStore,
                    pageSize:parseInt(Mico.User.getVarDefault('callsperpage',30),10)
                });
                
                // get the filter parameters
                this.gridStore.on('beforeload',function () {
                    var filters = Mico.Calls.SearchBar.getFilter();
                    
                    // rebuild the base parameters
                    var bp = {
                        session: Mico.User.getSession()
                    }
                    
                    // add the new parameters
                    for (var i=0; i < filters.length; i++) {
                        bp[filters[i].name] = filters[i].value
                    }
                    
                    this.gridStore.baseParams = bp;
                }, this);
                
                var sm = new Ext.grid.CheckboxSelectionModel();
                
                // build the grid
                this.grid = new Ext.grid.GridPanel({
                    id:'Mico.Calls.ViewCalls.grid',
                    region:'center',
                    cm: new Ext.grid.ColumnModel ([
                        sm,
                        {header: Mico.Lang.Calls.ViewCalls.header_date, dataIndex: "date", id: "date", width: 120, sortable: false, renderer: renderDate},
                        {header: Mico.Lang.Calls.ViewCalls.header_caller, dataIndex: "caller", id: "caller", width: 120, sortable: false, renderer: renderGeneric},
                        {header: Mico.Lang.Calls.ViewCalls.header_company, dataIndex: "company", id: "company", width: 120, sortable: false, renderer: renderGeneric},
                        {header: Mico.Lang.Calls.ViewCalls.header_message, dataIndex: "message", id: "message", width: 200, sortable: false, renderer:renderMessage},
                        {header: Mico.Lang.Calls.ViewCalls.header_contact, dataIndex: "contact", id: "contact", width: 150, sortable: false, renderer: renderContact},
                        {header: Mico.Lang.Calls.ViewCalls.header_priority, dataIndex: "priority", id: "priority", width: 80, sortable: false, renderer: renderPriority},
                        {header: Mico.Lang.Calls.ViewCalls.header_action, dataIndex: "action", id: "action", width: 120, sortable: false, renderer: renderGeneric},
                        {header: Mico.Lang.Calls.ViewCalls.header_close, id: "close", width: 100, renderer: renderClose}
                    ]),
                    sm:sm,
                    store:this.gridStore,
                    autoSizeColumns: false, 
                    autoExpandColumn: "message", 
                    autoExpandMin: 100, 
                    autoExpandMax: 5000,
                    bbar:this.pager
                });
                
                // show the call detail if a single row is selected
                this.grid.getSelectionModel().on('selectionchange', function (sm) {
                    if (sm.getCount() == 1) {
                        this.showCallDetail(sm.getSelected());
                    } else {
                        this.callDetailPanel.hide();
                        this.panel.doLayout();
                    }
                }, this);
                
                // Build the lower panel
                // build the call info panel
                this.callInfoPanel = new Ext.Panel({
                    id:'Mico.Calls.ViewCalls.callInfoPanel',
                    width:250,
                    height:250,
                    autoScroll:true,
                    html:'&nbsp;',
                    bodyStyle:'padding:3px;'
                });
                
                // build the ability to pick the ocmment order
                this.commentOrder = new Ext.form.ComboBox ({
                    allowBlank:false,
                    editable:false,
                    store: new Ext.data.ArrayStore ({
                        fields:['type','filter'],
                        data: Mico.Utils.CommonStores.commentOrder
                    }),
                    displayField:'type',
                    valueField:'filter',
                    value:Mico.User.getVarDefault('commentorder','newest'),
                    mode:'local',
                    triggerAction:'all',
                    width:100
                });
                
                // Refresh the comments if it's changed
                this.commentOrder.on('select', function () {
                    var rec = this.grid.getSelectionModel().getSelected();
                    this.showComments(rec.get('comments'));
                }, this);
                
                // build the comment panel
                this.callCommentPanel = new Ext.Panel ({
                    id:'Mico.Calls.ViewCalls.callCommentPanel',
                    width:250,
                    height:250,
                    autoScroll:true,
                    layout:'vbox',
                    cls:'dynamic-panel-scroll-y',
                    bodyStyle:'padding:3px;border-left:2px solid #BBBBBB;',
                    items: [
                        {html:'<i>'+Mico.Lang.Calls.ViewCalls.comment_blank+'</i>'}
                    ],
                    tbar:[
                        '->',
                        Mico.Lang.Calls.ViewCalls.commentOrder_label+':',
                        this.commentOrder
                    ]
                });
                
                // radio options ('new' or open call)
                this.closeCallRadio = new Ext.form.Radio({
                    boxLabel:Mico.Lang.Calls.ViewCalls.closeCallRadio_boxLabel,
                    checked:true,
                    name:'action'
                }); // when selected, closes the call
                this.escalateCallRadio = new Ext.form.Radio({
                    boxLabel:Mico.Lang.Calls.ViewCalls.escalateCallRadio_boxLabel,
                    checked:false,
                    name:'action'
                }); // when selected adds a user to the call (if selected), and changes the priority
                this.justCommentRadio = new Ext.form.Radio({
                    boxLabel:Mico.Lang.Calls.ViewCalls.justCommentRadio_boxLabel,
                    checked:false,
                    name:'action'
                }); // when selected, dows nothing
                
                // re-open call checkbox
                this.reopenCallCheck = new Ext.form.Checkbox({
                    boxLabel:Mico.Lang.Calls.ViewCalls.reopenCallCheck_boxLabel,
                    checked:false,
                    listeners: {
                        scope:this,
                        'check': function () {
                            if (this.reopenCallCheck.getValue()) {
                                this.commentText.enable();
                                this.addCallButton.enable();
                                this.clearFormButton.enable();
                            } else {
                                this.commentText.disable();
                                this.addCallButton.disable();
                                this.clearFormButton.disable();
                            }
                        }
                    }
                });
                
                // priority combo box
                this.priorityCombo = new Ext.form.ComboBox({
                    allowBlank:false,
                    required:false,
                    editable:false,
                    store: new Ext.data.ArrayStore ({
                        fields:['priority','view'],
                        data: Mico.Utils.CommonStores.callPriority
                    }),
                    displayField:'view',
                    valueField:'priority',
                    value:'moderate',
                    mode:'local',
                    triggerAction:'all',
                    width:120,
                    tpl:Mico.Utils.priorityTemplate(),
                    listeners:{
                        scope:this,
                        'select': function () { this.escalateCallRadio.setValue(true); }
                    }
                });
                
                // user store
                this.userStore = new Ext.data.Store({
                    url: APP_ROOT+"/api.php?f=getUsers", 
                    reader: new Ext.data.JsonReader ({
                        root: "users", 
                        id: "id"
                    }, [
                        {name: "id", mapping: "id"}, 
                        {name: "name", mapping: "name"}, 
                        {name: "status", mapping: "status"}, 
                        {name: "statustext", mapping: "statustext"}
                    ]), 
                    baseParams: {
                        session: Mico.User.getSession()
                    },
                    disableCaching:true
                });
                
                // user combo box
                this.userCombo = new Ext.form.ComboBox({
                    store: this.userStore,
                    triggerAction: 'all',
                    required:false,
                    allowBlank:true,
                    editable:false,
                    valueField:'id',
                    displayField:'name',
                    tpl:Mico.Utils.userTemplate(),
                    mode:'remote',
                    enableKeyEvents: true,
                    emptyText:Mico.Lang.Calls.ViewCalls.userCombo_emptyText,
                    width:120,
                    listeners:{
                        scope:this,
                        'focus': function () { this.userStore.load(); }, // display the dropdown on focus,
                        'select': function () { this.escalateCallRadio.setValue(true); }
                    }
                });
                
                // comment text
                this.commentText = new Ext.form.TextArea({
                    width:200,
                    height:70,
                    emptyText:Mico.Lang.Calls.ViewCalls.commentText_emptyText,
                    allowBlank:true,
                    required:false
                });
                
                // buttons
                this.addCallButton = new Ext.Button({
                    text:Mico.Lang.Calls.ViewCalls.addCallButton_text,
                    scope:this,
                    handler: function() {
                        var rec = this.grid.getSelectionModel().getSelected();
                        
                        // get the updates
                        var updates = {};
                        // Check if the call is open or closed
                        if (rec.get('status')=='closed') {
                            // if the call is closed, check the 'open call' value
                            if (this.reopenCallCheck.getValue()) {
                                updates.status = 'new';
                                
                                // add the comment
                                var com = String(this.commentText.getValue()).trim();
                                if (com.length > 0) {
                                    updates.comment = com;
                                }
                            }
                        } else {
                            var com = String(this.commentText.getValue()).trim();
                            
                            // check if we're closing the call
                            if (this.closeCallRadio.getValue()) {
                                updates.status = 'closed';
                                
                                // add the comment (if there is one)
                                if (com.length > 0) {
                                    updates.comment = com;
                                }
                            // or escalating the call
                            } else if (this.escalateCallRadio.getValue()) {
                                if (this.priorityCombo.getValue()) {
                                    updates.priority = this.priorityCombo.getValue();
                                }
                                if (this.userCombo.getValue()) {
                                    updates.users = this.userCombo.getValue();
                                }
                                
                                // add the comment (if there is one)
                                if (com.length > 0) {
                                    updates.comment = com;
                                }
                            // or just commenting
                            } else {
                                // add the comment
                                if (com.length > 0) {
                                    updates.comment = com;
                                }
                            }
                        }
                        
                        Mico.Calls.updateCall(rec.get('id'), updates);
                    }
                });
                
                // clear form button
                this.clearFormButton = new Ext.Button({
                    text:Mico.Lang.Calls.ViewCalls.clearFormButton_text,
                    scope:this,
                    handler: function() {
                        // just reload this view
                        this.showCallDetail(this.grid.getSelectionModel().getSelected());
                    }
                });
                
                this.callUpdatePanel = new Ext.Panel ({
                    id:'Mico.Calls.ViewCalls.callUpdatePanel',
                    width:250,
                    height:250,
                    layout:'form',
                    bodyStyle:'padding-left:8px;border-left:2px solid #BBBBBB;',
                    items: [
                        this.reopenCallCheck,
                        this.justCommentRadio,
                        this.escalateCallRadio,
                        this.priorityCombo,
                        this.userCombo,
                        this.closeCallRadio,
                        {html:'<hr />',width:180,bodyStyle:'padding-left:10px;'},
                        this.commentText,
                        {
                            layout:'hbox',
                            items: [
                                this.addCallButton,
                                {html:'&nbsp;'},
                                this.clearFormButton
                            ]
                        }
                    ],
                    defaults: {
                        hideLabel:true
                    }
                });
                
                // and the wrapper panel
                this.callDetailPanel = new Ext.Panel({
                    id:'Mico.Calls.ViewCalls.callDetailPanel',
                    region:'south',
                    layout:'hbox',
                    items:[
                        this.callInfoPanel,
                        this.callCommentPanel,
                        this.callUpdatePanel
                    ],
                    height:250,
                    width:750
                });
                
                // build the panel
                this.panel = new Ext.Panel({
                    id:'Mico.Calls.ViewCalls.panel',
                    layout:'border',
                    region:'center',
                    tbar:Mico.Calls.SearchBar.getToolbar(),
                    items:[
                        this.grid,
                        this.callDetailPanel
                    ]
                });
                
                // and add the panel to the calls section
                Mico.Calls.addPanel(this.panel);
                
                // set up the auto updater
                setTimeout('Mico.Calls.checkUpdates()',15000);
            }
            
            // load the store
            this.gridStore.load({params:{start:0,limit:Mico.User.getVarDefault('callsperpage',30)}});
            if (this.grid.getSelectionModel().hasSelection()) {
                this.grid.getSelectionModel().clearSelections();
            }
            this.callDetailPanel.hide();
        },
        /** Show the call detail panel
         * @param rec {Ext.data.Record} The call to use to populate the panel
         */
        showCallDetail: function(rec) {
            // show the panel
            this.callDetailPanel.show();
            this.panel.doLayout();
            
            // Build the call HTML
            var callInfoHTML = "";
            // time
            d = "<b>"+rec.get('date').format(Mico.User.getVarDefault('dateformat','jS M, Y'))+"</b>"
            t = "<b>"+rec.get('date').format(Mico.User.getVarDefault('timeformat','g:ia'))+"</b>"
            callInfoHTML += Mico.Lang.Calls.ViewCalls.callInfo_date(d,t);
            // priority
            if (rec.get('status') == 'new') {
                callInfoHTML += ' - <span class="priority-'+rec.get('priority')+'">'+Mico.Lang.Utils.CommonStores.callPriority[rec.get('priority')]+'</span>';
            } else {
                callInfoHTML += ' - <span class="call-closed">'+Mico.Lang.Calls.ViewCalls.callInfo_closed+'</span>';
            }
            
            // taker
            if (rec.get('taker').id == Mico.User.user_id) {
                callInfoHTML += "<br />"+Mico.Lang.Calls.ViewCalls.callInfo_callTakerSelf;
            } else {
                callInfoHTML += "<br />"+Mico.Lang.Calls.ViewCalls.callInfo_callTakerOther(rec.get('taker').name);
            }
            
            // caller name
            n = Mico.Lang.Calls.ViewCalls.callInfo_callerUnkown;
            
            // Check if we actually have a caller name
            if (rec.get('caller').length) {
                n = rec.get('caller');
            }
            
            // Get the caller line
            callInfoHTML += "<br /><br />"+Mico.Lang.Calls.ViewCalls.callInfo_callerLine(n, rec.get('company'));
            
            // recipients
            if (rec.get('users').length>1) {
                callInfoHTML += ":"
                // get the users
                var users = rec.get('users');
                
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id == Mico.User.user_id) {
                        callInfoHTML += "<br /> - <b>"+Mico.Lang.Calls.ViewCalls.callInfo_selfRecipient+"</b>";
                    } else {
                        callInfoHTML += "<br /> - "+users[i].name;
                    }
                }
            } else {
                if (rec.get('users')[0].id == Mico.User.user_id) {
                    callInfoHTML += " <b>"+Mico.Lang.Calls.ViewCalls.callInfo_selfRecipient+"</b>";
                } else {
                    callInfoHTML += " "+rec.get('users')[0].name;
                }
            }
            
            // message
            if (rec.get('message').length) {
                callInfoHTML += "<br /><br /><b>"+Mico.Lang.Calls.ViewCalls.callInfo_messageLabel+":</b><br />"+String(rec.get('message')).split("\n").join("<br />");
            } else {
                callInfoHTML += "<br /><br /><b>"+Mico.Lang.Calls.ViewCalls.callInfo_noMessage+"</b>";
            }
            
            callInfoHTML += "<hr />";
            
            // contact details
            if (rec.get('contact').length>1) {
                callInfoHTML += Mico.Lang.Calls.ViewCalls.callInfo_contactLabelMulti+":";
                
                var contact = rec.get('contact');
                for (var i = 0; i < contact.length; i++) {
                    callInfoHTML += "<br /> - "+contact[i];
                }
            } else if (rec.get('contact').length == 1) {
                callInfoHTML += Mico.Lang.Calls.ViewCalls.callInfo_contactLabelSingle("<b>"+rec.get('contact')[0]+"</b>");
            } else {
                callInfoHTML += "<b>"+Mico.Lang.Calls.ViewCalls.callInfo_contactNone+"</b>";
            }
            
            // action
            if (rec.get('action').length) {
                callInfoHTML += "<br /><br />"+Mico.Lang.Calls.ViewCalls.callInfo_actionRequired+": <b>"+rec.get('action')+"</b>";
            }
            
            this.callInfoPanel.update(callInfoHTML);
            
            // now the call comments panel
            var comments = rec.get('comments');
            this.showComments(comments);
            
            // set up the call update panel
            if (rec.get('status') == 'closed') {
                // hide some fields
                this.closeCallRadio.hide();
                this.escalateCallRadio.hide();
                this.priorityCombo.hide();
                this.userCombo.hide();
                this.justCommentRadio.hide();
                // show the 're-open call' field
                this.reopenCallCheck.show();
                this.reopenCallCheck.setValue(false);
                // disable the comment text
                this.commentText.setValue('');
                this.commentText.disable();
                // disable the buttons
                this.addCallButton.disable();
                this.clearFormButton.disable();
                
                // set the priority field
                this.priorityCombo.setValue(rec.get('priority'));
                this.userCombo.reset();
                this.justCommentRadio.setValue(true);
                
                // layout the panel
                this.callUpdatePanel.doLayout();
            } else {
                // hide the 're-open call' field
                this.reopenCallCheck.hide();
                // show the fields for open calls
                this.closeCallRadio.show();
                this.escalateCallRadio.show();
                this.priorityCombo.show();
                this.userCombo.show();
                this.justCommentRadio.show();
                this.justCommentRadio.setValue(true);
                // enable the comment text
                this.commentText.setValue('');
                this.commentText.enable();
                // enable the escalate fields
                this.priorityCombo.enable();
                this.userCombo.enable();
                this.userCombo.reset();
                // set the priority field
                this.priorityCombo.setValue(rec.get('priority'));
                // enable the buttons
                this.addCallButton.enable();
                this.clearFormButton.enable();
                
                // layout the panel
                this.callUpdatePanel.doLayout();
            }
        },
        /** Shows the 'comments' part of the call info box
         * @param comments {array} An array of comments, ordered oldest first
         */
        showComments: function (comments) {
            // clear previous comments
            this.callCommentPanel.removeAll(true);
            
            // Check if we have any comments
            if (comments.length) {
                // check if we're ordering oldest first or newest first (newest is default)
                if (this.commentOrder.getValue() == 'oldest') {
                    var i = 0; // the counter
                    var l = comments.length; // the length of the comments array
                    var m = 1; // the direction to move
                } else {
                    var i = comments.length - 1; // the counter as the length of the comments array
                    var l = -1; // the target
                    var m = -1;
                }
                
                var first = true;
                
                // display each of the comments
                for (i; i != l; i+=m) {
                    var comment = comments[i];
                    
                    // build the comment HTML - cheat using a table
                    var commentHTML = '<table style="width:230px">';
                    // build a date object
                    var date = Date.parseDate(comment.date,'Y-m-d H:i:s');
                    var today = new Date();
                    // and show the date
                    commentHTML += '<tr><td style="vertical-align:top;text-align:left;"><b>'+date.format(Mico.User.getVarDefault('timeformat','g:ia'))+'</b></td>';
                    
                    // get the day
                    var day = '';
                    if (date.getDayOfYear() == today.getDayOfYear()) { // check if the call was taken today
                        day = Mico.Lang.Calls.ViewCalls.showComments_today;
                    } else if (date.getDayOfYear() == (today.getDayOfYear()-1) || // check if the call was taken yesterday
                               (today.getDayOfYear() == 0 && (date.format('m-d') == '12-31' && // check if we're on the border of a year
                                                             (parseInt(date.format('Y'))==(parseInt(today.format('Y'))-1))))) { // and that the years are consecutive
                        day = Mico.Lang.Calls.ViewCalls.showComments_yesterday;
                    } else {
                        // just show the date
                        day = date.format(Mico.User.getVarDefault('dateformat','jS M, Y'));
                    }
                    // add the day to the HTML
                    commentHTML += '<td style="vertical-align:top;text-align:right;">'+day+'</td><tr/>';
                    
                    // add the action
                    a = '<b>'+comment.action+'</b>';
                    u = '<b>'+(comment.user_id == Mico.User.user_id?
                                    Mico.Lang.Calls.ViewCalls.showComments_selfComment:
                                    comment.commenter)+'</b>';
                    
                    commentHTML += '<tr><td colspan="2">'+Mico.Lang.Calls.ViewCalls.showComments_commentHeader(a,u)+'</td></tr>';
                    
                    // and add the comment (if there is one)
                    if (comment.comment.length) {
                        commentHTML += '<tr><td colspan="2">'+comment.comment.split("\n").join("<br />")+'</td></tr>';
                    }
                    
                    // and close the table.
                    commentHTML += '</table>';
                    
                    // and the style
                    var bstyle = 'padding-top:3px;padding-bottom:3px;';
                    // add a separator
                    if (first) {
                        first = false;
                    } else {
                        bstyle += 'border-top:1px dashed #DDDDDD;';
                    }
                    
                    this.callCommentPanel.add(new Ext.Panel({html:commentHTML,bodyStyle:bstyle,width:245}));
                }
            } else {
                // no comments
                this.callCommentPanel.add({html:'<i>'+Mico.Lang.Calls.ViewCalls.comment_blank+'</i>'});
            }
            
            // make sure the panel is displayed properly
            this.callCommentPanel.doLayout();
        }
    };
    
    /** Grid renderer for dates */
    function renderDate(val, meta, rec, row, col, store) {
        var value = '';
        
        // check that we have a date object
        if (typeof(val)=='object') {
            var today = new Date();
            
            if (val.getDayOfYear() == today.getDayOfYear()) { // check if the call was taken today
                value = Mico.Lang.Calls.ViewCalls.renderDate_today(val.format(Mico.User.getVarDefault('timeformat','g:ia')));
            } else if (val.getDayOfYear() == (today.getDayOfYear()-1) || // check if the call was taken yesterday
                       (today.getDayOfYear() == 0 && (val.format('m-d') == '12-31' && // check if we're on the border of a year
                                                     (parseInt(val.format('Y'))==(parseInt(today.format('Y'))-1))))) { // and that the years are consecutive
                value = Mico.Lang.Calls.ViewCalls.renderDate_yesterday(val.format(Mico.User.getVarDefault('timeformat','g:ia')));
            } else {
                // just show the date
                value = ' ' + Mico.Lang.Calls.ViewCalls.renderDate_other(val.format(Mico.User.getVarDefault('dateformat','jS M, Y')));
            }
            
            // render the tooltip/quicktip
            d = val.format(Mico.User.getVarDefault('dateformat','jS M, Y'));
            t = val.format(Mico.User.getVarDefault('timeformat','g:ia'));
            
            meta.attr = 'ext:qtip="'+Mico.Lang.Calls.ViewCalls.renderDate_quicktip(d,t)+'"';
        } else {
            value = val;
        }
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // and return our formatted value
        return value;
    }
    
    /** Grid renderer for the 'contact' field */
    function renderContact(val, meta, rec, row, col, store) {
        var value = '';
        
        // check that we have a date object
        if (typeof(val)=='object') {
            var title = '';
            
            // build the qtip
            for (var i = 0; i < val.length; i++) {
                if (i != 0) {
                    title += "<br />";
                }
                title += val[i];
            }
            //  ensure that no HTML is rendered
            title = title.split("&").join("&amp;");
            meta.attr = 'ext:qtip="'+title+'"';
        }
        value = val;
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // and return our formatted value
        return value;
    }
    
    /** Grid renderer for the 'message' field */
    function renderMessage(val, meta, rec, row, col, store) {
        var value = '';
        var title = '';
        // split out the title
        title = val.split("\n").join("<br />");
        // ensure that no HTML is rendered
        title = title.split("&").join("&amp;");
        
        // check that we have a date object
        if (title.length > 0) {
            meta.attr = 'ext:qtip="'+title+'"';
        }
        // get the value
        value = val;
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // and return our formatted value
        return value;
    }
    
    /** Grid renderer for the 'priority' field */
    function renderPriority(val, meta, rec, row, col, store) {
        var value = '';
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // add the class
        value = '<span class="priority-'+val+'">'+Mico.Lang.Utils.CommonStores.callPriority[val]+'</span>';
        
        return value;
    }
    
    /** Grid renderer for the 'close call' column */
    function renderClose(val, meta, rec, row, col, store) {
        var value = '';
        
        if (rec.get('status')=='new') {
            value = '<a href="#" onclick="Mico.Calls.updateCall('+rec.get('id')+',{status:\'closed\'})">'+Mico.Lang.Calls.ViewCalls.renderClose_open+'</a>';
        } else {
            value = Mico.Lang.Calls.ViewCalls.renderClose_closed;
        }
        
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        // and return our formatted value
        return value;
    }
    
    /** Generic grid renderer to apply the 'call-closed' class on fields */
    function renderGeneric(val, meta, rec, row, col, store) {
        // set the CSS class
        meta.css = 'call-'+rec.get('status');
        
        return val;
    }
} ();