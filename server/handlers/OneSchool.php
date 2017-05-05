<?php
    class OneSchool{

        public $output = [
            'success' => false,
            'errors' => []
        ];

        private $metadata = "SELECT s.uid, s.name, s.city, s.state, s.lat, s.lng, s.url, s.alias, s.size, s.demog_men, s.demog_women, s.adm_rate, s.sat_avg, s.ownership, s.tuition_in, s.tuition_out
                          FROM schools s
                          WHERE s.uid=";
        private $degrees = "SELECT p.external AS name, ps.p_pct AS percent, ps.deg_2, ps.deg_4, p.description 
                            FROM `programs_to_schools` ps
                            JOIN programs p ON ps.pid=p.pid
                            WHERE uid=";

        public function processRequest(){
            require_once 'connectDb.php';

            $query1 = $dbConn->query($this->metadata . $_GET['schid']);
            $query2 = $dbConn->query($this->degrees . $_GET['schid']);

            if(empty($query1) || empty($query2)) {
                $this->output['errors'][] = 'Queries failed to reach database.';
            } else {
                if(mysqli_num_rows($query1) > 0 && mysqli_num_rows($query2) > 0){
                    $this->output['success'] = true;
                    $row = mysqli_fetch_assoc($query1);
                    $row['programs'] = [];
                    while($item = mysqli_fetch_assoc($query2)){
                        $row['programs'][] = $item;
                    }
                    if (empty($row['programs']))
                        unset($row['programs']);

                    $this->output['school'] = $row;
                } else {
                    $this->output['errors'][] = 'No school found';
                }
            }

            if (empty($this->output['errors']))
                unset($this->output['errors']);
            return $this->output;
        }
    }
?>
