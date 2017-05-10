<?php
class FetchSchools{
    public $values;
    private $fullQuery;
    function __construct($passedValues){
        $this->values = $passedValues;
        $queryStart =     "SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out ";
        $queryMiddle =    "FROM `schools` s ";
        $queryEnd = isset($this->values['mapBounds'])
                        ? "WHERE (
                                  `lat` BETWEEN 
                                      {$this->values['mapBounds']['sw']['lat']} 
                                      AND 
                                      {$this->values['mapBounds']['ne']['lat']}
                          ) AND (
                                  `lng` BETWEEN 
                                      {$this->values['mapBounds']['sw']['lng']} 
                                      AND 
                                      {$this->values['mapBounds']['ne']['lng']}
                          ) "
                        : "WHERE " ;
        $this->filters = [];
        $tables = [];
        $lookup = [
            "programs" => "JOIN programs p ON ps.pid=p.pid ",
            "pts" => "JOIN programs_to_schools ps ON s.uid=ps.uid "
        ];
        if (isset($this->values['pickAMajor'])){
            array_push($tables, "pts", 'programs');
            $this->filters[] = 'pickAMajor';
//            $queryStart .=    ", p.external, ps.p_pct ";
            $queryEnd .=      "AND p.external=\"{$this->values['pickAMajor']}\" ";
        }
        if (isset($this->values['tuitionSlider'])){ //This block will never fire on Landing Page
            $this->filters[] = 'tuitionSlider';
//            $queryStart .=    ", s.tuition_in, s.tuition_out ";
            $queryEnd .=      "AND s.tuition_out<{$this->values['tuitionSlider']} ";
            if ($this->values['private'] && !$this->values['public']){
                $this->filters[] = 'public';
//            $queryStart .=        ", s.ownership ";
                $queryEnd .=          "AND s.ownership<>1 ";
            } else if ($this->values['public'] && !$this->values['private']){
                $this->filters[] = 'private';
//            $queryStart .=        ", s.ownership ";
                $queryEnd .=          "AND s.ownership=1 ";
            }
            if ($this->values['voc'] === false){
                $this->filters[] = 'voc';
//            $queryStart .=    ", s.vocational ";
                $queryEnd .=      "AND s.vocational=0 ";
            }
            if ($this->values['aa'] === false){
//                array_push($tables, "pts", 'programs');
                $this->filters[] = 'aa';
//                $queryStart .=    ", ps.deg_2 ";
                $queryEnd .=      "AND ps.deg_2=0 ";
            }
            if ($this->values['bs'] === false){
//                array_push($tables, "pts", 'programs');
                $this->filters[] = 'bs';
//                $queryStart .=    ", ps.deg_4 ";
                $queryEnd .=      "AND ps.deg_4=0 ";
            }
        }
        $uniqueTables = array_keys(array_flip($tables));
        while($reference = array_shift($uniqueTables)){
            $queryMiddle .= $lookup[$reference];
        }
        $this->fullQuery = $queryStart.$queryMiddle.$queryEnd;
    }
    public $output = [
        'success' => false,
        'errors' => []
    ];
    public function processRequest(){
        require_once 'connectDb.php';
        RequestError::validateClientRequest('FetchSchools',$this->values);
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
                $this->output['schools'] = array_slice($this->output['schools'],0,500,true);
            } else {
                $this->output['success'] = true;
                $this->output['errors'][] = 'Search returned zero results';
            }
        }
//        $this->output['total results'] = count($this->output['schools']);
        $this->output['request'] = $this->values;
        $this->output['query'] = $this->fullQuery;
//        $this->output['filters'] = $this->filters;
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
