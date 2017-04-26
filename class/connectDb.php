<?php
class connectDb{
    private static function connect(){
        $dbConn = new mysqli('','','','');
        if(isset($dbConn->connect_error)){
            die('Database Connection Error!');
        }
    }

    public static function init(){
        self::connect();
    }
}

?>