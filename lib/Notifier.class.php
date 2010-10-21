<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: lib/Notifier.class.php
 ** 
 ** Description: Defines a simple class to encapsulate the Notification
 **              functionality
 *******************************************************************************
 ******************************************************************************/

class Notifier {
    /** Builds and sends all notification emails */
    static function run() {
        $tries = 0;
        
        // only try to get the lock 5 times before giving up
        while ($tries < 5) {
            // get the notifier lock
            if (Notifier::get_lock()) {
                
                // done, so release the lock and get out of the loop
                Notifier::release_lock();
                break;
            } else {
                // wait for a second before trying again
                sleep(1);
                // increase the number of tries
                $tries ++;
            }
        }
    }
    
    /** Gets the notification lock
     * @return bool If we aquired the notificatoin lock
     */
    static function get_lock() {
        $lock = false;
        
        // check if the lockfile exists
        if (!file_exists(FS_ROOT.'/notifier.lock')) {
            // open the file
            $f = fopen(FS_ROOT.'/notifier.lock','w');
            fputs ($f,microtime(true));
            fclose($f);
            $lock = true;
        }
        
        return $lock;
    }
    
    /** Releases the notification lock */
    static function release_lock() {
        if (!file_exists(FS_ROOT.'/notifier.lock')) {
            unlink(FS_ROOT.'/notifier.lock');
        }
    }
}
?>