<?php
// DEPRECATED


// Changes Query table
// ALTER TABLE `school_query` CHANGE COLUMN `uid` `uid_q` int(8) UNSIGNED NOT NULL;

// Formats Zip Code into 5 digits instead of ZIP+4 -- Then alters column to be int
$zip = mysqli_query($conn, "UPDATE `school_query` SET zip = LEFT(zip,5) WHERE LENGTH(`zip`) > 5;");
$zipcol = null;
if(empty($zip)){
    $zip = 'database connection error';
} else {
    $zipcol = mysqli_query($conn, "UPDATE `school_query` SET `zip` int(5) NOT NULL;");
    $zipcol = empty($zipcol) ? ' Zip Col db error' : ' Zip Col Altered';
    $rows = mysqli_affected_rows($conn);
    $zip = $rows > 0 ? "SUCCESS: $rows zip codes changed" : $rows === 0 ? 'Zip codes not updated' :  'Error in Query' ;
}
print "<br>=-=-=-=-= ".$zip.$zipcol." =-=-=-=-=";

// Remove schools that are Distance Only
// "DELETE FROM `school_data` WHERE `online`=1";
// "DELETE FROM `school_query` WHERE `lat`=NULL";
// "DELETE FROM `school_query` WHERE `lng`=NULL";
// ALTER TABLE `school_query` CHANGE COLUMN `lat` lat` decimal(9,7) NOT NULL;
// ALTER TABLE `school_query` CHANGE COLUMN `lng` lng` decimal(9,7) NOT NULL;

// Removes ITT Tech id_system = 7329
// "DELETE FROM `school_data` WHERE `id_system`=7329";

?>
