<?php

class FetchSchools{
    public $data;
    private $fullQuery;
    function __construct($request){
        $this->data = $request;
        /**
         * Dynamic Query is built here.  Base variables are declared which we will concatenate onto.
         */
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

        /**
         * We must only JOIN tables to our search when columns from those other tables are actually are used.
         * We must also not join the same table twice.  Thus, the lookup table $reference with tables to use $tables.
         *      $tables         array of names of tables to search, non-unique
         *      $uniqueTables   array of names of unique table names parsed from $tables
         *      $reference      a lookup table which contains the actual string to concat to the query
         */
        $tables = [];
        $reference = [
            "programs" => "JOIN programs p ON pts.pid=p.pid ",
            "pts" => "JOIN programs_to_schools pts ON s.uid=pts.uid "
        ];
        if (isset($this->data['pickAMajor'])){
            array_push($tables, "pts", 'programs');
            $queryEnd .=      'p.external="'.addslashes($this->data['pickAMajor']).'" AND ';
        }
        if (isset($this->data['tuitionSlider'])){ //This block never fires on Landing Page since there is no slider
            /**
             * We also check for String "false" because axios.post(url,[input]) followed by json_decode(file_get_contents('php://input'), true)
             *      converts a Boolean FALSE to String "false"
             * */
            if ($this->data['public'] === false || $this->data['public'] === "false"){
                $queryEnd .=          "s.ownership<>1 AND ";
            }
            if ($this->data['private'] === false || $this->data['private'] === "false"){
                $queryEnd .=          "s.ownership=1 AND ";
            }
            if ($this->data['voc'] === false || $this->data['voc'] === "false"){
                $queryEnd .=      "s.vocational=0 AND ";
            }
            if ($this->data['aa'] === false || $this->data['aa'] === "false"){
                array_push($tables, "pts", 'programs');
                $queryEnd .=      "pts.deg_2=0 AND ";
            }
            if ($this->data['bs'] === false || $this->data['bs'] === "false"){
                array_push($tables, "pts", 'programs');
                $queryEnd .=      "pts.deg_4=0 AND ";
            }
        }
        $queryEnd = substr($queryEnd,0,-4)."GROUP BY s.uid";

        $uniqueTables = array_keys(array_flip($tables));
        while($tablesToJoin = array_shift($uniqueTables)){
            $queryMiddle .= $reference[$tablesToJoin];
        }

        $this->fullQuery = $queryStart.$queryMiddle.$queryEnd;
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
            } else {
                $this->output['status'] = "200 - Search returned zero results";
            }
        }
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
