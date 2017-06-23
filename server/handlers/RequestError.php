<?php
class RequestError{
    function __construct($passedValues){
        $this->errorMessage = $passedValues;
    }

    /**
     * Currently only validates and sanitizes the OneSchool API call.  Does not validate for the FetchSchools call.
     *
     * We started to validate all user inputs here but found if was more efficient to sanitize each call differently.
     *      The reason being: the datatypes we get from the front end are mostly integers and booleans,
     *      so we explicitly cast their types before it hits our database.  The only string, the major, is
     *      selected from a drop-down menu, which we also sanitize before it hits the database.
     * */
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
