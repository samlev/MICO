/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/admin/Mico.Utils.CommonStores.js
 ** 
 ** Description: Common store data for administrative users
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
Mico.Utils.CommonStores = function () {
    return {
        // search options for calls; admin users can see all calls in the system
        callsSearchFilter:[[Mico.Lang.Utils.CommonStores.callsSearchFilter.assigned,'assigned'],
                           [Mico.Lang.Utils.CommonStores.callsSearchFilter.opened,'opened'],
                           [Mico.Lang.Utils.CommonStores.callsSearchFilter.all,'all']],
        // order options for calls
        callsOrderFilter:[[Mico.Lang.Utils.CommonStores.callsOrderFilter.recent,'recent'],
                          [Mico.Lang.Utils.CommonStores.callsOrderFilter.urgent,'urgent']],
        // call priority
        callPriority:[['critical',Mico.Lang.Utils.CommonStores.callPriority.critical],
                      ['urgent',Mico.Lang.Utils.CommonStores.callPriority.urgent],
                      ['moderate',Mico.Lang.Utils.CommonStores.callPriority.moderate],
                      ['minor',Mico.Lang.Utils.CommonStores.callPriority.minor],
                      ['negligible',Mico.Lang.Utils.CommonStores.callPriority.negligible]],
        // order options for comments
        commentOrder:[[Mico.Lang.Utils.CommonStores.commentOrder.oldest,'oldest'],
                      [Mico.Lang.Utils.CommonStores.commentOrder.newest,'newest']],
        // Notification timing
        notifyTime:[['immediate',Mico.Lang.Utils.CommonStores.notifyTime.immediate],
                    ['30mins',Mico.Lang.Utils.CommonStores.notifyTime.halfhour],
                    ['60mins',Mico.Lang.Utils.CommonStores.notifyTime.hour],
                    ['never',Mico.Lang.Utils.CommonStores.notifyTime.never]],
        // Notification reasons
        notifyReason:[['assigned',Mico.Lang.Utils.CommonStores.notifyReason.assigned],
                      ['updated',Mico.Lang.Utils.CommonStores.notifyReason.updated]],
        /** USER MANAGEMENT **/
        // user types for adding users; admin users can set all user types
        userTypesActive:[[Mico.Lang.Utils.CommonStores.userTypes.admin,'admin'],
                         [Mico.Lang.Utils.CommonStores.userTypes.manager,'manager'],
                         [Mico.Lang.Utils.CommonStores.userTypes.user,'user']],
        // user types for editing users; amdin users can set all user types
        userTypesAll:[[Mico.Lang.Utils.CommonStores.userTypes.admin,'admin'],
                      [Mico.Lang.Utils.CommonStores.userTypes.manager,'manager'],
                      [Mico.Lang.Utils.CommonStores.userTypes.user,'user'],
                      [Mico.Lang.Utils.CommonStores.userTypes.disabled,'disabled']]
    };
} ();