<?php
    /** All handlers are in a directory behind the DocumentRoot.
     * This function loads all the .php files in the ../server/handlers folder, as needed
     */
    spl_autoload_register(function ($class_name) {
        require_once '../server/handlers/'.$class_name . '.php';
    });
    header::declare();

    /**  If the request php contains an ID in the GET, we load OneSchool.php
     * Otherwise, we check the headers.  Success returns a payload, Fail returns an error
     */
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
