/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/manager/Mantis.Utils.CommonStores.js
 ** 
 ** Description: Common store data for manager users
 **
 ** Copyright (c) 2010 Samuel Levy
 ** 
 ** Mantis Simple Call Centre is free software: you can redistribute it and/or
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
Mantis.Utils.CommonStores = function () {
    return {
        callsSearchFilter:[['Calls assigned to me','assigned'],['Calls opened by me','opened'],['All Calls','all']],
        callsOrderFilter:[['Most recent','recent'],['Most urgent','urgent']],
        userTypesActive:[['Manager','manager'],['Standard User','user']],
        userTypesAll:[['Manager','manager'],['Standard User','user'],['Disabled','disabled']],
        callPriority:[['critical','Critical'],['urgent','Urgent'],['moderate','Moderate'],['minor','Minor'],['negligible','Negligible']]
    };
} ();