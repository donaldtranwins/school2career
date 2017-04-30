<?php
print("hi <br>");

set_time_limit(120);

/** @var    boolean $ignore_header  If true, will run fgetcsv once */
/** @var    string  $filename       Path to csv file to import*/
$ignore_header = true;
$filename = 'includes/private/MERGED2014_15_PP.csv';

/** Require:  Imports a @var object $conn       Object returned from mysqli_connect
    Include:  Imports a @var array  $columns    Columns to import from the CSV */
$handle = fopen($filename, "r") or exit("Could not open file ($filename)");
//require("includes/private/connect_to_dev.php");
require("includes/connect_to_localbox.php");    // $conn
require("includes/columns_to_import.php");      // $columns
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$initiateQuery = file_get_contents('includes/create_both_tables.sql');
if (mysqli_query($conn,$initiateQuery)){
    unset($initiateQuery);
} else {
    die('Could not create initial tables');
};


if($ignore_header){
    fgetcsv($handle, "r");
    $ignore_header = false;
}

$row = 1;
while($data = fgetcsv($handle, "r")){
    $row++;
    if ($data[2]==="7329" || $data[289]==="1" || $data[21]==="NULL" || $data[22]==="NULL" ) { //ITT Tech, Distance Only, No lat, No lng
        print "<br>Skipping row #$row: {$data[3]}";
        continue;
    }

    //$query = "INSERT INTO `database` ({$columns[0]}`, `{$columns[3]}`) VALUES (\"{$data[0]}\", \"{$data[3]}\")";
    $insertStart = "INSERT INTO `";
    $dataColumns = "school_data` (";
    $queryColumns = "school_query` (";
    $dataValues = ') VALUES (';
    $queryValues = ') VALUES (';
    $insertEnd = ');';
//    $firstValue = true;
    foreach($columns as $index => $column) {
//        if ($firstValue){
//            $firstValue = false;
//        } else {
//            $dataColumns .= ', ';
//            $queryColumns .= ', ';
//            $dataValues .= ', ';
//            $queryValues .= ', ';
//        }
//        if ($column['table'] === 'school_query') {
//            $queryColumns .= ", `$column[name]`";
//            $queryValues .= ", \"{$data[$index]}\"";
//        } else if ($column['table'] === 'school_data') {
//            $dataColumns .= ", `$column[name]`";
//            $dataValues .= ", \"{$data[$index]}\"";
//        } else if ($column['table'] === 'both') {
//            $dataColumns .= "`$column[name]`";
//            $dataValues .= "\"{$data[$index]}\"";
//            $queryColumns .= "`$column[name]`";
//            $queryValues .= "\"{$data[$index]}\"";
//        }
        switch ($column['table']){
            case 'both':
                $dataColumns .= "`$column[name]`";
                $dataValues .= "\"{$data[$index]}\"";
            case 'school_query':
                $queryColumns .= ", `$column[name]`";
                $queryValues .= ", \"{$data[$index]}\"";
                break;
            case 'school_data':
                $dataColumns .= "`$column[name]`";
                $dataValues .= "\"{$data[$index]}\"";
                break;
            default:
                continue;
        }
    }
    $insertToData = $insertStart.$dataColumns.$dataValues.$insertEnd;
    $insertToQuery = $insertStart.$queryColumns.$queryValues.$insertEnd;


    if (!mysqli_query($conn,$insertToData)){
        printf("<br>Error: %s\n".mysqli_error($conn), mysqli_errno($conn));
    }

    if (!mysqli_query($conn,$insertToQuery)){
        printf("<br>Error: %s\n".mysqli_error($conn), mysqli_errno($conn));
    }
}


//include("truncate.php"); //deprecated  //comment in, if you want to modify the data after creating everything
mysqli_query($conn,"ALTER TABLE `school_query` CHANGE COLUMN `uid` `uid_q` int(8) UNSIGNED NOT NULL;");

mysqli_close($conn);
fclose($handle);

?>