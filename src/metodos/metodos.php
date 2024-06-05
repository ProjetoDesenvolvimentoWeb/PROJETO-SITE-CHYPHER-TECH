//método pronto
<?php

require_once '../../database/product.php';

// Método para pegar as informações de um produto pelo ID
function findProductAction($conn, $id) {
    return findProductDb($conn, $id);
}

// Método para obter todas as informações dos produtos
function readProductAction($conn) {
    return readProductDb($conn);
}

// Método para criar um novo produto
function createProductAction($conn, $name, $description, $price) {
    $createProductDb = createProductDb($conn, $name, $description, $price);
    $message = $createProductDb == 1 ? 'success-create' : 'error-create';
    return header("Location: ../../../index.php?message=$message");
}

// Método para atualizar as informações de um produto
function updateProductAction($conn, $id, $name, $description, $price) {
    $updateProductDb = updateProductDb($conn, $id, $name, $description, $price);
    $message = $updateProductDb == 1 ? 'success-update' : 'error-update';
    return header("Location: ../../../index.php?message=$message");
}

// Método para deletar um produto
function deleteProductAction($conn, $id) {
    $deleteProductDb = deleteProductDb($conn, $id);
    $message = $deleteProductDb == 1 ? 'success-remove' : 'error-remove';
    return header("Location: ../../../index.php?message=$message");
}

?>
