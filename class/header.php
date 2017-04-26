<?php
    class header{
        public static function declare(){
//            header('Content-type: application/json');
            header("Access-Control-Allow-Origin: *");
        }
    }
?>