<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: api-manager/updateUser.php
 ** 
 ** Description: Updates a user
 *******************************************************************************
 ******************************************************************************/

// get the values
$id = $_POST['id'];
$field = $_POST['field'];
$value = trim(html_scrub($_POST['value']));

// attempt to log the user in
try {
    // get the user
    $u = User::by_id($id);
    
    if (in_array($field,array('name','email','role'))) {
        // check and update the field
        switch ($field) {
            case 'name':
            case 'email':
                // make sure the value isn't empty
                if (strlen($value)) {
                    $u->set_var($field,$value);
                } else {
                    $error = true;
                    $error_message = "User's $field cannot be blank";
                }
                break;
            case 'role':
                // make sure the value isn't empty
                if (in_array($value,array('admin','manager','user','disabled'))) {
                    // check that the user isn't changing thier own role
                    if ($u->get_id() != $user->get_id()) {
                        $u->set_role($value);
                    } else {
                        $error = true;
                        $error_message = "You may not change your own role";
                    }
                } else {
                    $error = true;
                    $error_message = "Not a valid role";
                }
                break;
        }
        
        // No error? commit the change and set the response
        if ($error == false) {
            $u->commit();
            $data = array("success"=>true);
        }
    } else {
        $error = true;
        $error_message = "Unknown field";
    }
} catch (UserNotFoundException $e) {
    // couldn't log in - return the error message
    $error = true;
    $error_message=$e->getMessage();
} catch (PasswordResetException $e) {
    // There was a problem generating the request - return the error message
    $error = true;
    $error_message=$e->getMessage();
}
?>