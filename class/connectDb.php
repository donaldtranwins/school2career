<?php
    $dbConn = new mysqli('','','','');
    if(isset($dbConn->connect_error)){
        die('Database Connection Error!');
    }
?>