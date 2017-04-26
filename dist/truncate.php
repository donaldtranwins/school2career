<?php

// Formats Zip Code into 5 digits instead of ZIP+4
$zip = mysqli_query($conn, "UPDATE $tablename SET ZIP = LEFT(ZIP,5) WHERE LENGTH(`ZIP`) > 5;");
if(empty($zip)){
    $zip = 'database connection error';
} else {
    $rows = mysqli_affected_rows($conn);
    $zip = $rows > 0 ? "SUCCESS: $zip zip codes changed"
        : $rows === 0 ? 'Zip codes not updated' :  'Error in Query' ;
//    if ($rows > 0) {
//        $zip = "SUCCESS: $zip zip codes changed";
//    } else {
//        $zip = 'Zip codes not updated';
//    }
}
print "<br>=-=-=-=-= ".$zip." =-=-=-=-=";

// Removes schools that are Currently not in operation

// Removes ITT Tech id_system = 7329

?>
