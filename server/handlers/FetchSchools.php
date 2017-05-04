<?php

class FetchSchools{
    public $values;
    private $fullQuery;
    function __construct($passedValues){
        $this->values = $passedValues;
        $this->queryStart =     "SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out ";
        $this->queryMiddle =    "FROM `schools` s ";
        $this->queryEnd =       "WHERE (
                                            `lat` BETWEEN " .
                                                $this->values['mapBounds']['sw']['lat'].
                                                " AND " .
                                                $this->values['mapBounds']['ne']['lat'] . "
                                            ) AND (
                                                `lng` BETWEEN " .
                                                $this->values['mapBounds']['sw']['lng'] .
                                                " AND ".
                                                $this->values['mapBounds']['ne']['lng']."
                                            ) ";
        if (isset($this->values['pickAMajor'])){
            $this->queryStart .=    ", p.external, ps.p_pct AS percent, ps.deg_2, ps.deg_4 ";
            $this->queryMiddle .=   "JOIN programs_to_schools ps ON s.uid=ps.uid 
                                     JOIN programs p ON p.pid=ps.pid ";
            $this->queryEnd .=      "AND p.external=\"{$this->values['pickAMajor']}\" ";
        }
        $this->fullQuery = $this->queryStart.$this->queryMiddle.$this->queryEnd;
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

        $result = $dbConn->query($this->fullQuery);
        if(empty($result)) {
            $this->output['errors'][] = 'Query failed to reach database.';
        } else {
            if(mysqli_num_rows($result) > 0){
                $this->output['success'] = true;
                $this->output['schools']=[];
                while($row = mysqli_fetch_assoc($result)){
                    $this->output['schools'][] = $row;
                }
                foreach ($this->output['schools'] as $row=>$school ){
                    $this->output['schools'][$row]['distance'] = $this->getDistance($this->values['latLng']['lat'],$this->values['latLng']['lng'],floatval($school['lat']),floatval($school['lng']));
                }
                usort($this->output['schools'], array($this, "cmp"));
            } else {
                $this->output['success'] = true;
                $this->output['errors'][] = 'Search returned zero results';
            }
        }

//        $this->output['request'] = $this->values;
//        $this->output['query'] = $this->fullQuery;

        array_splice($this->output['schools'],500);
        return $this->output;
    }

    public function getDistance($centerLatitude, $centerLongitude, $schoolLatitude, $schoolLongitude) {
        $earth_radius = 6371;
        $dLat = deg2rad($schoolLatitude - $centerLatitude);
        $dLon = deg2rad($schoolLongitude - $centerLongitude);
        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($centerLatitude)) * cos(deg2rad($schoolLatitude)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * asin(sqrt($a));
        return $earth_radius * $c;
    }

    public function cmp($a, $b){
        return $a['distance'] < $b['distance'] ? -1 : 1;
    }
}

?>