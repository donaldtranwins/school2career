<?php
    spl_autoload_register(function ($class_name) {
        require_once '../../server/handlers/'.$class_name . '.php';
    });
    header::declare();

    $clientRequest = isset($_GET['schid'])
        ? new singleSchoolRequest()
        : (
        $_SERVER['CONTENT_TYPE'] == 'application/json' && empty($_GET)
            ? new multipleSchoolRequest(json_decode(file_get_contents('php://input'), true))
            : new requestError()
        );

    echo json_encode($clientRequest ->processRequest());

?>