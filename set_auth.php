<?php
session_start();
 if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && ( $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' ) )
{

    $_SESSION['user_logged_in'] = serialize(json_encode($_POST['data']));


 $_SESSION['user_login_token'] =$_POST['data']['token']['token'];

     $data['token']=$_POST['data']['token']['token'];

     //after login redirect to dashboard as per role
     switch ($_POST['data']['user_role']) {

        case 1:
            $data['url']='user';
            break;

        case 2:
            $data['url']='user';
            break;

        default:
            $data['url']='user?page=modules/pavilion/base-pavilion';
            break;
    }

 echo json_encode($data); 
}
?>

