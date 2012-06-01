/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mico.SimpleCron.js
 ** 
 ** Description: A simple cron script which polls the 'notify'
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
Mico.SimpleCron = function () {
    return {
        /** Runs the cron */
        run: function () {
            var conn = new Ext.data.Connection();
            
            // call the notify function
            conn.request({
                url:APP_ROOT+"/notify.php"
            });
        }
    };
} ();

Ext.onReady (function () {
    // run the cron every 2 minutes
    setInterval('Mico.SimpleCron.run()',120000);
});
