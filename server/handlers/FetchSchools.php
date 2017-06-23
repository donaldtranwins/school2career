<?php

class FetchSchools{
    public $data;
    private $fullQuery;
    function __construct($request){
        $this->data = $request;
        /**
         * Dynamic Query is built here.  Base variables are declared which we will concatenate onto.
         * Every we sanitize all variables before querying our database.
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

        /** We have a whitelist of column names to accept and search for by explicitly checking for the specific fields,
         * as opposed to looping through everything received from the $_GET.
         *
         * Some of these column names exist in separate tables, thus we must only JOIN tables to our search
         * when columns from those other tables are actually are used.
         *
         * We must also not join the same table twice.  Thus, we have a lookup table $reference with tables to use $tables.
         *  @var    $tables         array which will contain names of tables to be joined to the query.  not unique values
         *  @var    $reference      array (associative) serving as a lookup table containing the actual string to concat to the query
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
        if (isset($this->data['tuitionSlider'])){
            if ($tuition_sanitized = floatval($this->data['tuitionSlider'])) {
                $queryEnd .= "s.tuition_out<$tuition_sanitized AND ";
            }
        }
        if ((bool)$this->data['public'] === false){
            $queryEnd .=          "s.ownership<>1 AND ";
        }
        if ((bool)$this->data['private'] === false){
            $queryEnd .=          "s.ownership=1 AND ";
        }
        if ((bool)$this->data['voc'] === false){
            $queryEnd .=      "s.vocational=0 AND ";
        }
        if ((bool)$this->data['aa'] === false){
            array_push($tables, "pts", 'programs');
            $queryEnd .=      "pts.deg_2=0 AND ";
        }
        if ((bool)$this->data['bs'] === false){
            array_push($tables, "pts", 'programs');
            $queryEnd .=      "pts.deg_4=0 AND ";
        }
      
        $queryEnd = substr($queryEnd,0,-4)."GROUP BY s.uid";

        /** @var  $uniqueTables     array of unique table names parsed from the values of $tables
         * @var   $tablesToJoin     string representing the keys to pair with values from $reference table.
         *                              the values are JOIN clauses which we concatenate to our query.
         */
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
                // sorts the schools from shortest distance to largest distance, then only keeps 100 schools
                usort($this->output['schools'], array($this, "cmp"));
                $this->output['schools'] = array_slice($this->output['schools'],0,100,true);
            } else {
                $this->output['status'] = "200 - Search returned zero results";
            }
        }
        $dbConn->close();
        return $this->output;
    }

    /**
     * @return  int     the distance between the school and the map center, accounting for curvature of the earth
     * */
    public function getDistance($centerLatitude, $centerLongitude, $schoolLatitude, $schoolLongitude) {
        $earth_radius = 6371;
        $dLat = deg2rad($schoolLatitude - $centerLatitude);
        $dLon = deg2rad($schoolLongitude - $centerLongitude);
        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($centerLatitude)) * cos(deg2rad($schoolLatitude)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * asin(sqrt($a));
        return $earth_radius * $c;
    }

    /**
     * @return  int     helper function used in our usort() that sorts the array of schools in ascending order
     * */
    public function cmp($a, $b){
        return $a['distance'] < $b['distance'] ? -1 : 1;
    }
}

?>
