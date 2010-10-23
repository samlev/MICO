/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: js/Mantis.SimpleCron.js
 ** 
 ** Description: A simple cron script which polls the 'notify'
 *******************************************************************************
 ******************************************************************************/
Mantis.SimpleCron = function () {
    return {
        /** Runs the cron */
        run: function () {
            var conn;
            
            // call the notify function
            conn.request({
                url:APP_ROOT+"/notify.php"
            });
        }
    };
} ();

Ext.onReady (function () {
    setInterval('Mantis.SimpleCron.run()',000);
});
