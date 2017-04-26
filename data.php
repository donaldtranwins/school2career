<?php
spl_autoload_register(function ($class_name) {
    include './class/'.$class_name . '.php';
});
header::declare();
connectDb::init();

$clientRequest = new getParams($_POST);
$clientRequest ->findInvalidValues();
print_r($clientRequest ->output);


?>