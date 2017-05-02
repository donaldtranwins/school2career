<?php
class RequestError{
    function __construct($passedValues){
        $this->errorMessage = $passedValues;
    }

    public static function validateClientRequest(){
        return 'error';
    }

    public $output = [
        'success' => false,
        'errors' => []
    ];

    public function processRequest(){
        $this->output['errors']['message'][] = $this->errorMessage;
        return $this->output;
    }
}
