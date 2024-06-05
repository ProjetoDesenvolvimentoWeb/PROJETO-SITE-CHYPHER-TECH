<?php
$host="localhost";
$user="root";
$password="853611";
$dbName= "MySQL";

$connection = new mysql($host,$user,$password,$dbName);
if($connection -> conection_error){
    die("Connection Failed.$connection->conection_error");
}

?>