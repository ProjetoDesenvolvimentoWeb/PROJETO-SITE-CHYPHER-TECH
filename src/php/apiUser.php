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
        get_user();
        break;
    case 'POST':
        // Handle POST request
        add_user();
        break;
    case 'PUT':
        // Handle PUT request
        update_user();
        break;
    case 'DELETE':
        // Handle DELETE request
        delete_user();
        break;
        case 'OPTIONS':
            // Para pré-voo CORS
            header("HTTP/1.1 200 OK");
            break;
        default:
            header("HTTP/1.0 405 Method Not Allowed");
            break;
    }

function get_user() {
    global $mysqli;
    $query = "SELECT * FROM user ORDER BY id DESC";
    $result = mysqli_query($mysqli, $query);
    $user = array();
    while($row = mysqli_fetch_assoc($result)) {
        $user[] = $row;
    }
    echo json_encode($user);
}

function add_user() {
    global $mysqli;
    $data = json_decode(file_get_contents("php://input"), true);
    $usuario = $data["usuario"];
    $email = $data["email"];
    $senha = $data["senha"];
    $query = "INSERT INTO user(usuario, email,senha) VALUES('$usuario', '$email', '$senha')";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'user Added Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'user Addition Failed.');
    }
    echo json_encode($response);
}

function update_user() {
    global $mysqli;
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"];
    $usuario = $data["usuario"];
    $senha = $data["senha"];
    $query = "UPDATE user SET usuario='$usuario', senha='$senha' WHERE email='$email'";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'User updated successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'User updation failed.');
    }
    echo json_encode($response);
}


function delete_user() {
    global $mysqli;
    $id = intval($_GET["id"]);
    $query = "DELETE FROM user WHERE id=$id";
    if (mysqli_query($mysqli, $query)) {
        $response = array('status' => 1, 'status_message' => 'user Deleted Successfully.');
    } else {
        $response = array('status' => 0, 'status_message' => 'user Deletion Failed.');
    }
    echo json_encode($response);
}

?>