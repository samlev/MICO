/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/manager/Mantis.Utils.CommonStores.js
 ** 
 ** Description: Common store data for manager users
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