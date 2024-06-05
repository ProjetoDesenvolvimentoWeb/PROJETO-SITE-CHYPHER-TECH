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
        get_produtos();
        break;
    case 'POST':
        // Handle POST request
        add_produtos();
        break;
    case 'PUT':
        // Handle PUT request
        update_produtos();
        break;
    case 'DELETE':
        // Handle DELETE request
        delete_produtos();
        break;
    default:
        // Invalid request method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_produtos() {
    global $mysqli;
    $query = "SELECT * FROM produtos ORDER BY id DESC";
    $result = mysqli_query($mysqli, $query);
    $produtos = array();
    while($row = mysqli_fetch_assoc($result)) {
        $produtos[] = $row;
    }
    echo json_encode($produtos);
}

function add_produtos() {
    global $mysqli;
    $name = $data["nome"];
    $email = $data["preço"];
    $senha = $senha["descrição"];
    $query = "INSERT INTO produtos(name, preço,descrição) VALUES('$name', '$preço', '$descrição')";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'produtos Added Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'produtos Addition Failed.');
    }
    echo json_encode($response);
}

function update_produtos() {
    global $mysqli;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"];
    $name = $data["name"];
    $senha = $data["preço"];
    $email = $data["descrição"];
    $query = "UPDATE produtos SET name='$name', preço='$preço', descrição='$descrição' WHERE id=$id";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'produtos Updated Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'produtos Updation Failed.');
    }
    echo json_encode($response);
}

function delete_produtos() {
    global $mysqli;
    $id = intval($_GET["id"]);
    $query = "DELETE FROM produtos WHERE id=$id";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'produtos Deleted Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'produtos Deletion Failed.');
    }
    echo json_encode($response);
}
?>