<?php

$servername = "localhost";
$username = "username";
$password = "password";
$database = "wordbase";

if (isset($_POST['ok'])) {

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "SELECT image FROM words ORDER BY RAND() LIMIT 1";
    $result = $conn->query($sql);
    $conn->close();

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo $row["image"];
        }
    } else {
        echo "0 results";
    }
}
