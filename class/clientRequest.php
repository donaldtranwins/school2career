<?php

class clientRequest{
    public $values;
    private $locationQuery;
    function __construct($passedValues){
        $this->values = $passedValues;
        $this->locationQuery = "SELECT * FROM `school_data` WHERE (`lat` BETWEEN " .$this->values['mapBounds']['sw']['lat']. " AND " . $this->values['mapBounds']['ne']['lat'] . ") AND (`lng` BETWEEN " . $this->values['mapBounds']['sw']['lng'] . " AND ". $this->values['mapBounds']['ne']['lng'].")";
    }

    public $output = [
        'success' => false,
        'errors' => []
    ];


    public function processRequest(){
        require_once 'connectDb.php';
        if(empty($this->values)) {
            die('invalid values');
        }

        $result = $dbConn->query($this->locationQuery);
        if(empty($result)) {
            $this->output['errors'][] = 'database error!';
        } else {
            if(mysqli_num_rows($result) > 0){
                $this->output['success'] = true;
                $this->output['schools']=[];
                while($row = mysqli_fetch_assoc($result)){
                    $this->output['schools'][] = $row;
                }
            }
        }


        foreach ($this->output['schools'] as $schools ){
            $schools['distance'][]= $this->getDistance($this->values['latLng']['lat'],$this->values['latLng']['lng'],floatval($schools['lat']),floatval($schools['lng']));
        }

//        usort($this->output['data'], array($this, "cmp"));
        var_dump($this->output['schools']);




//        return json_encode($this->output);
    }

    public function getDistance($centerLatitude, $centerLongitude, $schoolLatitude, $schoolLongitude) {

        $earth_radius = 6371;

        $dLat = deg2rad($schoolLatitude - $centerLatitude);
        $dLon = deg2rad($schoolLongitude - $centerLongitude);

        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($centerLatitude)) * cos(deg2rad($schoolLatitude)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * asin(sqrt($a));
        return $earth_radius * $c;

    }

    function cmp($a, $b){
        return $a['distance'] < $b['distance'] ? 1 : -1;
    }
}

?>