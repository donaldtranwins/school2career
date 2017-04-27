<?php
print("hi <br>");

/** @var    boolean $ignore_header  If true, will run fgetcsv once */
/** @var    string  $filename       Path to csv file to import*/
/** @var    string  $csv_db         Name of table within the database*/
$ignore_header = true;
$filename = 'includes/smalltest.csv';
$tablename = 'csv_db';

$handle = fopen($filename, "r")
    or exit("Could not open file ($filename)");

/** Require:  Imports a @var object $conn       Value returned from mysqli_connect
    Include:  Imports a @var array  $columns    Columns to import from the CSV */

//require("includes/private/connect_to_dev.php");
require("includes/connect_to_localbox.php");    // $conn
require("includes/columns_to_import.php");      // $columns
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}


if($ignore_header){
    fgetcsv($handle, "r"); //run once to skip the header
    $ignore_header = false;
}

$row = 1;
while($data = fgetcsv($handle, "r")){
    $row++;
    print "<br>Row $row from CSV: ";
    print_r($data);
    //$query = "INSERT INTO `database` ({$columns[0]}`, `{$columns[3]}`) VALUES (\"{$data[0]}\", \"{$data[3]}\")";
    $insertStart = "INSERT INTO `$tablename` (";
    $insertMiddle = ') VALUES (';
    $insertEnd = ');';
    $firstValue = true;
    foreach($columns as $index => $column){
        if ($firstValue){
            $insertStart .= ', ';
            $insertMiddle .= ', ';
        } else {
            $firstValue = false;
        }
        $queryStart .= "`$column[name]`";
        $queryMiddle .= "\"{$data[$index]}\"";
    }
    $insert = $insertStart.$insertMiddle.$insertEnd;
    print "<br>======= ".$insert." ==========";
    $result = mysqli_query($conn,$insert);
    if(empty($result)){
        $result = 'database connection error';
    } else {
        $inserted = mysqli_affected_rows($conn);
        $result = $inserted === 1 ? 'SUCCESS' : "some sort of insert error on Row $row" ;
    }
    print "<br>++++++++ ".$result." ++++++++";
}


include("truncate.php"); //include, if you want to modify the data after creating everything


mysqli_close($conn);
fclose($handle);

?>