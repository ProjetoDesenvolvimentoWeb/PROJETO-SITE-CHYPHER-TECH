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
    case 'POST':
        // Handle POST request
        login();
        break;
        case 'OPTIONS':
            // Para pré-voo CORS
            header("HTTP/1.1 200 OK");
            break;
        default:
            header("HTTP/1.0 405 Method Not Allowed");
            break;
    }
function login() {
    global $mysqli;
    $data = json_decode(file_get_contents("php://input"), true);
    $usuario = $data["usuario"];
    $senha = $data["senha"];

    // Consulta no banco de dados para verificar se o usuário existe e a senha está correta
    $query = "SELECT * FROM user WHERE usuario = '$usuario' AND senha = '$senha'";
    $result = mysqli_query($mysqli, $query);

    if (mysqli_num_rows($result) == 1) {
        // Usuário autenticado com sucesso
        $response = array('status' => 1, 'status_message' => 'Login Successful.');
    } else {
        // Senha incorreta ou usuário não encontrado
        $response = array('status' => 0, 'status_message' => 'Invalid Username or Password.');
    }

    echo json_encode($response);
}

?>