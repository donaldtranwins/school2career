<?php
class RequestError{
    function __construct($passedValues){
        $this->errorMessage = $passedValues;
    }

    public static function validateClientRequest($requestType,$inputToCheck = null){
        if($requestType === 'OneSchool'){
            return intval($_GET['schid']);
        } elseif ($requestType === 'FetchSchools' && empty($inputToCheck)){
            die('Error');
        }
    }

    public $output = ['status' => []];

    public function processRequest(){
        $this->output['status'][] = "405 Method Not Allowed {$this->errorMessage}";
        return $this->output;
    }
}
