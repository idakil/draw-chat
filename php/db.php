<?php
session_start();

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


//$q = "CREATE DATABASE IF NOT EXISTS wordbase";
/*
$sana = "a";
$kategoria = "b";

$sql = "INSERT INTO words (word, category) VALUES ($sana, $kategoria)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
*/


$sql = "SELECT * FROM words ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

$a = $result->fetch_assoc()["word"];

$_SESSION['word'] = $a;
//echo $a;

echo $_SERVER['REMOTE_ADDR'];
$conn->close();