<?php
print("hi <br>");

/** @var    boolean $ignore_header  If true, will run fgetcsv once */
/** @var    string  $filename       Path to csv file to import*/
$ignore_header = true;
$filename = 'includes/smalltest.csv';

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
    print_r($data);
    if ($data[2]===7329 || $data[289]===1 || empty($data[21]) || empty($data[22]) ) { //ITT Tech, Distance Only, No lat, No lng
        print "<br>Skipping #$row: {$data[3]}";
        continue;
    }
    print "<br>Row $row from CSV: ";

    //$query = "INSERT INTO `database` ({$columns[0]}`, `{$columns[3]}`) VALUES (\"{$data[0]}\", \"{$data[3]}\")";
    $insertStart = "INSERT INTO `";
    $queryColumns = "school_query` (";
    $dataColumns = "school_data` (";
    $queryValues = ') VALUES (';
    $dataValues = ') VALUES (';
    $insertEnd = ');';

    $firstValue = true;
    foreach($columns as $index => $column) {
        if ($firstValue){
            $firstValue = false;
        } else {
            $queryColumns .= ', ';
            $dataColumns .= ', ';
            $queryValues .= ', ';
            $dataValues .= ', ';
        }
        if ($column['table'] === 'school_query') {
            $queryColumns .= "`$column[name]`";
            $queryValues .= "\"{$data[$index]}\"";
        } else if ($column['table'] === 'school_data') {
            $dataColumns .= "`$column[name]`";
            $dataValues .= "\"{$data[$index]}\"";
        } else if ($column['table'] === 'both') {
            $queryColumns .= "`$column[name]`";
            $queryValues .= "\"{$data[$index]}\"";
            $dataColumns .= "`$column[name]`";
            $dataValues .= "\"{$data[$index]}\"";
        }
    }
    $insertToQuery = $insertStart.$queryColumns.$queryValues.$insertEnd;
    $insertToData = $insertStart.$dataColumns.$dataValues.$insertEnd;
    print "<br>======= ".$insertToData." ==========";
    print "<br>======= ".$insertToQuery." ==========";
    $result = mysqli_query($conn,$insertToData);
    $result = mysqli_query($conn,$insertToQuery);
    if(empty($result)){
        $result = 'database connection error';
    } else {
        $inserted = mysqli_affected_rows($conn);
        $result = $inserted === 1 ? 'SUCCESS' : "some sort of insert error on Row $row" ;
    }
    print "<br>++++++++ ".$result." ++++++++";
}


//include("truncate.php"); //comment in, if you want to modify the data after creating everything


mysqli_close($conn);
fclose($handle);

?>