<?php

// Conexão com o banco de dados
$host = "localhost";
$user = "root";
$password = "123456";
$dbname = "cypher"; // Corrigido para lowercase

$conn = new mysqli($host, $user, $password, $dbname); // Corrigido para utilizar $dbname

// Verifica a conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se existem produtos selecionados no formulário
    if(isset($_POST['produto']) && !empty($_POST['produto'])) {
        // Prepara a declaração SQL para inserir produtos no banco de dados
        $stmt = $conn->prepare("INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)");

        // Associa os parâmetros
        $stmt->bind_param("ssd", $nome, $descricao, $preco);

        // Itera sobre os produtos selecionados e insere no banco de dados
        foreach($_POST['produto'] as $produto) {
            // Aqui você pode processar os dados do produto, como obter a descrição e o preço com base no nome do produto
            // Por simplicidade, estou apenas definindo a descrição e o preço como strings vazias e 0, respectivamente
            $nome = $produto;
            $descricao = ""; // Substitua com a descrição real do produto
            $preco = 0; // Substitua com o preço real do produto

            // Executa a declaração preparada para inserir o produto no banco de dados
            $stmt->execute();
        }

        // Fecha a declaração preparada
        $stmt->close();

        echo "Produtos adicionados com sucesso!";
    } else {
        echo "Por favor, selecione pelo menos um produto.";
    }
}

// Fecha a conexão com o banco de dados
$conn->close();
?>

