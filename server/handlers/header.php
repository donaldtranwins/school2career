<?php
    class Header{
        public static function declare(){
            header('Content-type: application/json');
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        }
    }
?>
