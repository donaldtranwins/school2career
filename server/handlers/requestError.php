<?php
class RequestError{
    public static function validateClientRequest(){
        return 'error';
    }

    public $output = [
        'success' => false,
        'errors' => []
    ];

    public function processRequest(){
        $this->output['errors']['message'][] = !empty($_SERVER['CONTENT_TYPE']) && empty($_GET) ? 'Invalid Request! Please configure application/json!' : 'Invalid URL Parameters';
        return $this->output;
    }
}