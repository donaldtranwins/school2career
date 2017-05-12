<?php
    class OneSchool{
        public $output = ['status' => []];

        public function processRequest(){
            $checkResult = RequestError::validateClientRequest('OneSchool');
            $_GET['schid'] = $checkResult === 0 ? 217014 : $checkResult;
            require_once 'connectDb.php';

            $metadataQuery = "SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out
                          FROM schools s
                          WHERE s.uid=? ";
            $programsQuery = "SELECT p.external AS name, ps.p_pct AS percent, ps.deg_2 AS associates, ps.deg_4 AS bachelors, p.description 
                            FROM `programs_to_schools` ps
                            JOIN programs p ON ps.pid=p.pid
                            WHERE uid=? ";

            function doPreparedQuery($conn, $query, $param){
                if ( !($stmt = $conn->prepare($query)) ){
                    return "422 Unprocessible Entity - Statement failed to prepare: ".$conn->error;
                }
                if ( !($stmt->bind_param("i",$param)) ){
                    return "422 Unprocessible Entity - Parameters failed to bind: ".$stmt->error;
                }
                if ( !($stmt->execute()) ){
                    return "422 Unprocessible Entity - Statement failed to execute: ".$stmt->error;
                }
                $result = $stmt->get_result();
                $output = [];
                if ($result->num_rows) {
                    while ($row = $result->fetch_assoc()) {
                        $output[] = $row;
                    }
                }
                $stmt->close();
                return $output;
            }

            if ($school = doPreparedQuery($dbConn, $metadataQuery, $_GET['schid'])){
                if(is_array($school)){
                    $this->output['status'] = 200;
                    $this->output['school'] = $school[0];
                    if ($programs = doPreparedQuery($dbConn, $programsQuery,$_GET['schid']))
                        $this->output['school']['programs'] = $programs;
                } else {
                    $this->output['status'] = $school;
                }
            } else {
                $this->output['status'] = "404 Not Found - No school on ID: {$_GET['schid']}";
            }
            $dbConn->close();
            return $this->output;

//            // Query without using Prepared Statements
//            $metadata = $dbConn->query($this->metadataQuery . $_GET['schid']); //remove ? from constant before running
//            $programs = $dbConn->query($this->programsQuery . $_GET['schid']); //remove ? from constant before running
//
//            if(empty($metadata)) {
//                $this->output['status'][] = '422 - Unprocessable Entity, Bad Query';
//            } else {
//                if(mysqli_num_rows($metadata)){
//                    $this->output['status'] = 200;
//                    $school = mysqli_fetch_assoc($metadata);
//                    $school['programs'] = [];
//                    while($program = mysqli_fetch_assoc($programs)){
//                        $school['programs'][] = $program;
//                    }
//                    if (empty($school['programs']))
//                        unset($school['programs']);
//                    $this->output['school'] = $school;
//                } else {
//                    $this->output['status'] = "404 Not Found - No school on ID : {$_GET['schid']}";
//                }
//            }
//            $dbConn->close();
//            return $this->output;
        }
    }
?>
