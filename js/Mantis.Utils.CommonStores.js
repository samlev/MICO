/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.Utils.CommonStores.js
 ** 
 ** Description: Common store data for regular users
 *******************************************************************************
 ******************************************************************************/
Mantis.Utils.CommonStores = function () {
    return {
        searchFilter:[['Calls assigned to me','assigned'],['Calls opened by me','opened']],
        callsOrderFilter:[['Most recent','recent'],['Most urgent','urgent']],
        callPriority:[['critical','Critical'],['urgent','Urgent'],['moderate','Moderate'],['minor','Minor'],['negligible','Negligible']]
    };
} ();