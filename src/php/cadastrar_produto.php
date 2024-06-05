
<?php
session_start();
    $conn = mysqli_connect("localhost", "root", "123456", "cypher");

    $nome = trim($_POST['nome']);
    $preco = trim($_POST['preco']);
    $descricao = trim($_POST['descricao']);
    $sql = "INSERT INTO produtos
    (nome,preco,descricao) 
    VALUES 
    ('$nome', '$preco', '$descricao')";

    $result = $conn -> query($sql);
    if($result){
        echo '<script>alert("Produto cadastrado com sucesso!!"); window.location.href = "./main.php"</script>';
    }else{
        echo '<script>alert("ERROR"); window.location.href = "../cadastrarProdutos.php"</script>';
    }
    
?>