<?php


if(isset($_POST['dataurl'])) {
    $image = $_POST['dataurl'];
    toDB($image);
}

function toDB($image2){
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

    $sql = $conn->prepare("INSERT INTO words (image) VALUES (?)");
    $null = NULL;
    $sql->bind_param("b", $null);
    $sql->send_long_data(0, $image2);
    $sql->execute();

    $conn->close();
}


