<?php
print("hi <br>");

$filename = 'includes/smalltest.csv';
$handle = fopen($filename, "r") or exit("Could not open file ($filename)");

//require("includes/private/connect_to_dev.php");
require("includes/connect_to_localbox.php");
include("includes/columns_to_import.php");

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$ignore_header = true; // comment out if table has no headers
while($data = fgetcsv($handle, "r")){
    if($ignore_header){
        $ignore_header = false;
        continue;
    }
    print "<br>Row from CSV: ";
    print_r($data);
    //$query = "INSERT INTO `database` ({$columns[0]}`, `{$columns[3]}`) VALUES (\"{$data[0]}\", \"{$data[3]}\")";
    $queryStart = 'INSERT INTO `imported_from_csv` (';
    $queryMiddle = ') VALUES (';
    $queryEnd = ');';
    $comma = false;
    foreach($columns as $index => $column){
        if ($comma){
            $queryStart .= ', ';
            $queryMiddle .= ', ';
        } else {
            $comma = true;
        }
        $queryStart .= "`$column[name]`";
        $queryMiddle .= "\"{$data[$index]}\"";
    }
    $query = $queryStart.$queryMiddle.$queryEnd;
    print "<br>======= ".$query." ==========";
    $result = mysqli_query($conn,$query);
    if(empty($result)){
        $result = 'database connection error';
    } else {
        $insert = mysqli_affected_rows($conn);
        if ($insert === 1) {
            $result = 'SUCCESS';
        } else {
            $result = 'some sort of insert error';
        }
    }
    print "<br>=-=-=-=-= ".$result." =-=-=-=-=";
}

mysqli_close($conn);
fclose($handle);

?>