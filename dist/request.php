<?php
    spl_autoload_register(function ($class_name) {
        require_once '../server/handlers/'.$class_name . '.php';
    });
    header::declare();

    $clientRequest = isset($_GET['schid'])
        ? new OneSchool()
        : (
        isset($_SERVER['CONTENT_TYPE']) && empty($_GET)
            ? ($_SERVER['CONTENT_TYPE'] == 'application/json'
                ? new FetchSchools(json_decode(file_get_contents('php://input'), true))
                : new RequestError('Please configure application json!'))
            : new RequestError('Invalid URL Parameters')
        );

    echo json_encode($clientRequest ->processRequest());

?>