<?php
/** Imports the US Department of Education Data Dumps for a single year.
 *
 *  Only imports the data that School2Career needs out of the 7700+ rows of schools and 8 million cells of data.
 *
 *  !! Update 06/01/2017 -- The Import Script now requires a few changes in order to work.  Since the creation
 *      of this script, the database schema has been restructured from 5 tables down to 3.
 *      The changes needed to make this script work:
 *          + includes/columns_to_import.php is up-to-date with the latest columns to use
 *          + data only needs to be imported into 1 table instead of 2
 *          + column's data type is no longer used and can be ignored
 *      Essentially, the database schema changes will make this import script even more simple and reduces complexity
 */

set_time_limit(120); //Average run time is ~65 seconds

/** @var    boolean $ignore_header  If true, will run fgetcsv once before the script runs */
/** @var    string  $filename       Path to csv file to import*/
$ignore_header = true;
$filename = 'includes/private/MERGED2014_15_PP.csv';

/** Require:  Imports a @var object $conn       Object returned from mysqli_connect
    Include:  Imports a @var array  $columns    Columns to import from the CSV */
$handle = fopen($filename, "r") or exit("Could not open file ($filename)");
require("includes/private/connect_to_dev.php");         // $conn
require("3-data-import-lookup_table-columns.php");      // $columns
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    die();
}

// Skips the first row of the CSV document
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

    //$sampleQueryStructure = "INSERT INTO `database` ({$columns[0]}`, `{$columns[3]}`) VALUES (\"{$data[0]}\", \"{$data[3]}\")";
    $insertStart = "INSERT INTO `";
    $dataColumns = "metadata_imported` (";
    $queryColumns = "query_imported` (";
    $dataValues = ') VALUES (';
    $queryValues = ') VALUES (';
    $insertEnd = ');';
    foreach($columns as $index => $column) {
        if ($column['table'] === 'query_imported') {
            $queryColumns .= ", `$column[name]`";
            $queryValues .= ", \"{$data[$index]}\"";
        } else if ($column['table'] === 'metadata_imported') {
            $dataColumns .= ", `$column[name]`";
            $dataValues .= ", \"{$data[$index]}\"";
        } else if ($column['table'] === 'both') {
            $dataColumns .= "`$column[name]`";
            $dataValues .= "\"{$data[$index]}\"";
            $queryColumns .= "`$column[name]`";
            $queryValues .= "\"{$data[$index]}\"";
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


mysqli_close($conn);
fclose($handle);

?>