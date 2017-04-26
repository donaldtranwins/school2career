<?php

class getParams{
    public $values;
    function __construct($_values){
        $this->values = $_values;
    }

    public $output = [
        'success' => false,
        'errors' => []
    ];

    public function findInvalidValues(){
        if(empty($this->values['lat'])){
            echo 'Invalid Latitude';
            $this->output['errors'][] = 'Invalid Latitude';
        } elseif (empty($this->values['lng'])){
            echo 'Invalid Longitude';
            $this->output['errors'][] = 'Invalid Longitude';
        }  elseif (empty($this->values['pickAMajor'])){
            echo 'Invalid Major';
            $this->output['errors'][] = 'Invalid Major';
        }
    }
}

?>