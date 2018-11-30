<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 30.11.2018
 * Time: 10.37
 */
$x = $_GET['x'];
$y = $_GET['y'];
$coords = "";
$coords->x = $x;
$coords->y = $y;
$jsoncoords = json_encode($coords);

echo $jsoncoords;