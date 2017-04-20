<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");

define('fromData',true);

if(empty($_GET['action'])){
    exit('No action specified');
} elseif ($_GET['action'] !== 'getData'){
    exit('Invalid action');
}

require 'mysql_connect.php';

$output = [
    'success'=> false,
    'errors'=>[]
];

$query = "SELECT * FROM `dummy_data`";
$result = mysqli_query($conn,$query);
if(empty($result))
{
    $output['errors'][] = 'database error!';
} else {
    if(mysqli_num_rows($result) > 0){
        $output['success'] = true;
        $output['data']=[];
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
    }
}

echo json_encode($output);

?>