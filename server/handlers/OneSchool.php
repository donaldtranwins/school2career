<?php
    class OneSchool{

        public $output = [
            'success' => false,
            'errors' => []
        ];

        private $query = "SELECT * FROM `metadata` m JOIN `query` q ON m.uid=q.uid WHERE m.uid = ";

        public function processRequest(){
            require_once 'connectDb.php';

            echo ($_GET['schid']);

            $result = $dbConn->query($this->query . $_GET['schid']);
            if(empty($result)) {
                $this->output['errors'][] = 'Query failed to reach database.';
            } else {
                if(mysqli_num_rows($result) > 0){
                    $this->output['success'] = true;
                    $this->output['schools']=[];
                    while($row = mysqli_fetch_assoc($result)){
                        $this->output['schools'][] = $row;
                    }
                } else {
                    $this->output['errors'][] = 'No school on that id';
                }
            }
            return $this->output;
        }
    }
?>