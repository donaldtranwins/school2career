<?php
    class OneSchool{
        public $output = ['status' => []];
        private $metadataQuery = "SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out
                          FROM schools s
                          WHERE s.uid=";
        private $programsQuery = "SELECT p.external AS name, ps.p_pct AS percent, ps.deg_2 AS associates, ps.deg_4 AS bachelors, p.description 
                            FROM `programs_to_schools` ps
                            JOIN programs p ON ps.pid=p.pid
                            WHERE uid=";

        public function processRequest(){
            $checkResult = RequestError::validateClientRequest('OneSchool');
            $_GET['schid'] = $checkResult === 0 ? 217014 : $checkResult;
            require_once 'connectDb.php';

            $metadata = $dbConn->query($this->metadataQuery . $_GET['schid']);
            $programs = $dbConn->query($this->programsQuery . $_GET['schid']);

            if(empty($metadata) || empty($programs)) {
                $this->output['status'][] = '422 - Unprocessable Entity, Bad Query';
            } else {
                if(mysqli_num_rows($metadata) > 0){
                    $this->output['status'] = 200;
                    $school = mysqli_fetch_assoc($metadata);
                    $school['programs'] = [];
                    while($program = mysqli_fetch_assoc($programs)){
                        $school['programs'][] = $program;
                    }
                    $this->output['school'] = $school;
                } else {
                    $this->output['status'][] = "404 Not Found - No school on ID : {$_GET['schid']}";
                }
            }
            return $this->output;
        }
    }
?>
