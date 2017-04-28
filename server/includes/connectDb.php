<?php
    $dbConn = new mysqli('localhost','root','root','get_schooled');
    if(isset($dbConn->connect_error)){
        die('Database Connection Error!');
    }
?>