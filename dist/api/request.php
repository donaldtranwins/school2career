<?php
    spl_autoload_register(function ($class_name) {
        require_once '../../server/handlers/'.$class_name . '.php';
    });
    header::declare();

    if (!empty($_SERVER['CONTENT_TYPE'])){
        switch ($_SERVER['CONTENT_TYPE']){
            case 'application/json':    //  Body is encoded in JSON
                $clientRequest = new clientRequest(json_decode(file_get_contents('php://input'), true));
                echo $clientRequest->processRequest();
                break;
            case 'application/x-www-form-urlencoded':   //  Body is url-encoded
                echo "Please configure application/json";
                break;
            default:
                break;
        }
    }

?>