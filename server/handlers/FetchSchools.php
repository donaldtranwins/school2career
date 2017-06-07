<?php

class FetchSchools{
    public $data;
    private $fullQuery;
    function __construct($request){
        $this->data = $request;
        $queryStart =     "SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.size, s.adm_rate, s.sat_avg ";
        $queryMiddle =    "FROM `schools` s ";
        $queryEnd = isset($this->data['mapBounds']) && isset($this->data['latLng'])
            ? "WHERE (
                        `lat` BETWEEN 
                                      ".floatval($this->data['mapBounds']['sw']['lat'])." 
                                      AND 
                                      ".floatval($this->data['mapBounds']['ne']['lat'])."
                     ) AND (
                        `lng` BETWEEN 
                                      ".floatval($this->data['mapBounds']['sw']['lng'])." 
                                      AND 
                                      ".floatval($this->data['mapBounds']['ne']['lng'])."
                     ) AND "
            : "WHERE     " ;
        $queryEndFormatted = isset($this->data['mapBounds']) && isset($this->data['latLng'])
            ? "WHERE (`lat` BETWEEN ".floatval($this->data['mapBounds']['sw']['lat'])." AND  ".floatval($this->data['mapBounds']['ne']['lat']).") AND (`lng` BETWEEN ".floatval($this->data['mapBounds']['sw']['lng'])." AND ".floatval($this->data['mapBounds']['ne']['lng']).") AND "
            : "WHERE " ;
        $this->filters = [];
        $tables = [];
        $reference = [
            "programs" => "JOIN programs p ON pts.pid=p.pid ",
            "pts" => "JOIN programs_to_schools pts ON s.uid=pts.uid "
        ];
        if (isset($this->data['pickAMajor'])){
            array_push($tables, "pts", 'programs');
            $this->filters[] = ' Major';
            $queryEnd .=      'p.external="'.addslashes($this->data['pickAMajor']).'" AND ';
            $queryEndFormatted .=      'p.external="'.addslashes($this->data['pickAMajor']).'" AND ';
        }
        if (isset($this->data['tuitionSlider'])){ //This block never fires on Landing Page since there is no slider

            if ($tuition_sanitized = floatval($this->data['tuitionSlider'])) {
                $this->filters[] = ' Tuition';
                $queryEnd .= "s.tuition_out<$tuition_sanitized AND ";
                $queryEndFormatted .= "s.tuition_out<$tuition_sanitized AND ";
            }
            if ($this->data['public'] === false || $this->data['public'] === "false"){
                $this->filters[] = ' Public';
                $queryEnd .=          "s.ownership<>1 AND ";
                $queryEndFormatted .=          "s.ownership<>1 AND ";
            }
            if ($this->data['private'] === false || $this->data['private'] === "false"){
                $this->filters[] = ' Private';
                $queryEnd .=          "s.ownership=1 AND ";
                $queryEndFormatted .=          "s.ownership=1 AND ";
            }
            if ($this->data['voc'] === false || $this->data['voc'] === "false"){
                $this->filters[] = ' Vocational';
                $queryEnd .=      "s.vocational=0 AND ";
                $queryEndFormatted .=      "s.vocational=0 AND ";
            }
            if ($this->data['aa'] === false || $this->data['aa'] === "false"){
                $this->filters[] = ' Associates';
                array_push($tables, "pts", 'programs');
                $queryEnd .=      "pts.deg_2=0 AND ";
                $queryEndFormatted .=      "pts.deg_2=0 AND ";
            }
            if ($this->data['bs'] === false || $this->data['bs'] === "false"){
                $this->filters[] = ' Bachelors';
                array_push($tables, "pts", 'programs');
                $queryEnd .=      "pts.deg_4=0 AND ";
                $queryEndFormatted .=      "pts.deg_4=0 AND ";
            }
        }
        $queryEnd = substr($queryEnd,0,-4)."GROUP BY s.uid";
        $queryEndFormatted = substr($queryEndFormatted,0,-4)."GROUP BY s.uid";

        $uniqueTables = array_keys(array_flip($tables));
        while($tablesToJoin = array_shift($uniqueTables)){
            $queryMiddle .= $reference[$tablesToJoin];
        }

        $this->fullQuery = $queryStart.$queryMiddle.$queryEnd;
        $this->formattedQuery = $queryStart.$queryMiddle.$queryEndFormatted;
    }

    public $output = ['status' => []];

    public function processRequest(){
        require_once 'connectDb.php';
        RequestError::validateClientRequest('FetchSchools',$this->data);

        $result = $dbConn->query($this->fullQuery);
        if(empty($result)) {
            $this->output['status'] = '422 - Unprocessable Entity, Bad Query';
        } else {
            if(mysqli_num_rows($result) > 0){
                $this->output['status'] = 200;
                $this->output['schools']=[];
                while($row = mysqli_fetch_assoc($result)){
                    $this->output['schools'][] = $row;
                }
                foreach ($this->output['schools'] as $row=>$school ){
                    $this->output['schools'][$row]['distance'] = $this->getDistance(
                        floatval($this->data['latLng']['lat']),
                        floatval($this->data['latLng']['lng']),
                        floatval($school['lat']),
                        floatval($school['lng']));
                }
                usort($this->output['schools'], array($this, "cmp"));
                $this->output['schools'] = array_slice($this->output['schools'],0,100,true);
                $this->output['debug']['total results'] = count($this->output['schools']);
            } else {
                $this->output['status'] = "200 - Search returned zero results";
            }
        }
        $this->output['debug']['request'] = $this->data;
        $this->output['debug']['filters'] = $this->filters;
        $this->output['debug']['full query'] = $this->fullQuery;
        $this->output['debug']['formatted query'] = $this->formattedQuery;
        $dbConn->close();
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