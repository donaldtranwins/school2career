<?php

class FetchSchools{
    public $values;
    private $fullQuery;
    function __construct($passedValues){
        $validate = [
            "latLng" => [
                "lat" => FILTER_VALIDATE_FLOAT,
                "lng" => FILTER_VALIDATE_FLOAT
            ],
            "mapBounds" => [
                "ne" => [
                    "lat" => FILTER_VALIDATE_FLOAT,
                    "lng" => FILTER_VALIDATE_FLOAT
                ],
                "sw" => [
                    "lat" => FILTER_VALIDATE_FLOAT,
                    "lng" => FILTER_VALIDATE_FLOAT
                ]
            ],
            "location" => FILTER_SANITIZE_STRING,
            "pickAMajor" => FILTER_SANITIZE_STRING,
            "aa" => FILTER_VALIDATE_BOOLEAN,
            "bs" => FILTER_VALIDATE_BOOLEAN,
            "private" => FILTER_VALIDATE_BOOLEAN,
            "public" => FILTER_VALIDATE_BOOLEAN,
            "voc" => FILTER_VALIDATE_BOOLEAN
        ];
//        foreach ($passedValues as $key=>$value){
//            $passedValues[$key] = addslashes($value);
//        }
        $this->values = $passedValues;
        $queryStart =     "SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out ";
        $queryMiddle =    "FROM `schools` s ";
        $queryEnd = isset($this->values['mapBounds']) && isset($this->values['latLng'])
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
                          ) AND "
            : "WHERE     " ;

        $this->filters = [];

        $tables = [];
        $lookup = [
            "programs" => "JOIN programs p ON pts.pid=p.pid ",
            "pts" => "JOIN programs_to_schools pts ON s.uid=pts.uid "
        ];
        if (isset($this->values['pickAMajor'])){
            array_push($tables, "pts", 'programs');
            $this->filters[] = ' Major';
            $queryEnd .=      "p.external=\"{$this->values['pickAMajor']}\" AND ";
        }
        if (isset($this->values['tuitionSlider'])){ //This block never fires on Landing Page since there is no slider
            $this->filters[] = ' Tuition';
//            $sanitizedTuition = floatval(addslashes($this->values['tuitionSlider']));
//            if ($sanitizedTuition)
//                $queryEnd .=      "s.tuition_out<$sanitizedTuition AND ";
                $queryEnd .=      "s.tuition_out<{$this->values['tuitionSlider']} AND ";

            if ($this->values['private'] === true && $this->values['public'] === false){
                $this->filters[] = ' Public';
                $queryEnd .=          "s.ownership<>1 AND ";
            } else if ($this->values['public'] === true && $this->values['private'] === false){
                $this->filters[] = ' Private';
                $queryEnd .=          "s.ownership=1 AND ";
            }
            if ($this->values['voc'] === false){
                $this->filters[] = ' Vocational';
                $queryEnd .=      "s.vocational=0 AND ";
            }
            if ($this->values['aa'] === false){
                array_push($tables, "pts", 'programs');
                $this->filters[] = ' Associates';
                $queryEnd .=      "pts.deg_2=0 AND ";
            }
            if ($this->values['bs'] === false){
                array_push($tables, "pts", 'programs');
                $this->filters[] = ' Bachelors';
                $queryEnd .=      "pts.deg_4=0 AND ";
            }
        }
        $queryEnd = substr($queryEnd,0,-4);

        $uniqueTables = array_keys(array_flip($tables));
        while($reference = array_shift($uniqueTables)){
            $queryMiddle .= $lookup[$reference];
        }

        $this->fullQuery = $queryStart.$queryMiddle.$queryEnd;
    }

    public $output = ['status' => []];

    public function processRequest(){
        require_once 'connectDb.php';
        RequestError::validateClientRequest('FetchSchools',$this->values);

        $result = $dbConn->query($this->fullQuery);
        if(empty($result)) {
            $this->output['status'][] = '422 - Unprocessable Entity, Bad Query';
            $this->output['debug'][] = $dbConn->error;
        } else {
            if(mysqli_num_rows($result) > 0){
                $this->output['status'] = 200;
                $this->output['schools']=[];
                while($row = mysqli_fetch_assoc($result)){
                    $this->output['schools'][] = $row;
                }
//                if (isset($this->output['latLng'])){
                    foreach ($this->output['schools'] as $row=>$school ){
                        $this->output['schools'][$row]['distance'] = $this->getDistance($this->values['latLng']['lat'],$this->values['latLng']['lng'],floatval($school['lat']),floatval($school['lng']));
                    }
                    usort($this->output['schools'], array($this, "cmp"));
//                }
                $this->output['schools'] = array_slice($this->output['schools'],0,500,true);

                $this->output['debug']['total results'] = count($this->output['schools']);
            } else {
                $code = "200 - Search returned zero results on the following filters:";
                while ($filter = array_shift($this->filters)){
                    $code .= $filter;
                }
                $this->output['status'][] = $code;
            }
        }
        $this->output['debug']['request'] = $this->values;
        $this->output['debug']['query'] = $this->fullQuery;
        $this->output['debug']['filters'] = $this->filters;
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
