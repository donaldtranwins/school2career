<?php
require_once '../server/handlers/header.php';
header::declare();
$ch = curl_init();

/**
 * The front-end functionality for this feature has not yet been implemented.
 *  This handler calls the Traitify API with the payload of the users responses from the assessment.
 *  The response payload from the API is taken and delivered to the front-end.
 */
curl_setopt($ch, CURLOPT_URL, "https://api-sandbox.traitify.com/v1/assessments");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"deck_id\": \"career-deck\"}");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_USERPWD, "34c1358b6d4a7efbb5d0be446b" . ":" . "x");

$headers = ["Content-Type: application/json"];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);

echo ($result);