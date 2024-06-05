<?php
header('Content-Type: application/json');

// Inclui a configuração do banco de dados
include 'db_config.php';

// Obtém os dados do pedido da requisição
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['produtos']) || empty($data['produtos'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Dados do pedido inválidos']);
    exit;
}

// Prepara a consulta SQL
$sql = "INSERT INTO pedidos (produtos, data) VALUES (?, NOW())";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['message' => 'Erro ao preparar a consulta']);
    exit;
}

// Converte os produtos para uma string JSON
$produtos = json_encode($data['produtos']);
$stmt->bind_param('s', $produtos);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(['message' => 'Pedido salvo com sucesso']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Erro ao salvar o pedido']);
}

$stmt->close();
$conn->close();
?>
