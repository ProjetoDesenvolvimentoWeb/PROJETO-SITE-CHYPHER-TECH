<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");
require_once("dbConnection.php");

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        // Handle GET request
        get_clientes();
        break;
    case 'POST':
        // Handle POST request
        add_clientes();
        break;
    case 'PUT':
        // Handle PUT request
        update_clientes();
        break;
    case 'DELETE':
        // Handle DELETE request
        delete_clientes();
        break;
    default:
        // Invalid request method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_clientes() {
    global $mysqli;
    $query = "SELECT * FROM clientes ORDER BY id DESC";
    $result = mysqli_query($mysqli, $query);
    $clientes = array();
    while($row = mysqli_fetch_assoc($result)) {
        $clientes[] = $row;
    }
    echo json_encode($clientes);
}

function add_clientes() {
    global $mysqli;
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data["name"];
    $email = $data["email"];
    $senha = $senha["senha"];
    $query = "INSERT INTO clientes(name, email,senha) VALUES('$name', '$email', '$senha')";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'clientes Added Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'clientes Addition Failed.');
    }
    echo json_encode($response);
}

function update_clientes() {
    global $mysqli;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"];
    $name = $data["name"];
    $senha = $data["senha"];
    $email = $data["email"];
    $query = "UPDATE clientes SET name='$name', senha='$senha', email='$email' WHERE id=$id";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'clientes Updated Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'clientes Updation Failed.');
    }
    echo json_encode($response);
}

function delete_clientes() {
    global $mysqli;
    $id = intval($_GET["id"]);
    $query = "DELETE FROM clientes WHERE id=$id";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'clientes Deleted Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'clientes Deletion Failed.');
    }
    echo json_encode($response);
}
?>