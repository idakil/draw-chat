<?php

$servername = "localhost";
$username = "username";
$password = "password";
$database = "wordbase";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Valitaan tietokannasta kuva sattumanvaraisesti
$sql = "SELECT image FROM words ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo $row["image"];
    }
} else {
    echo "0 results";
}
$conn->close();

