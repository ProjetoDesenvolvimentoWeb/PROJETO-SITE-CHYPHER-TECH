<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Salada da Juci</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<header id="cabecalho">
    <div id="cab">        
        <h1>Salada da Juci</h1>        
        <div id="usuario">
            <a href="main.php">
            <p>
                <?php 
                // Start the session
                session_start();

                // Check if the session variable 'nome' is set
                if (isset($_SESSION['nome'])) {
                    echo "Seja bem vindo(a) " . $_SESSION['nome'];
                } else {
                    echo "Nenhum usuário logado.";
                }
                ?>
            </p>
            </a>
        </div>  
        <div id="sair">
            <button id="cadastrarProduto">
                <a href="logoff.php">Sair</a>
            </button>
        </div>  
    </div>
</header>
<br>
<br>
<main id="principal">
<button type="button" id="cadastrarProduto">
    <a href="form_produto.php">Cadastrar produto</a>
</button>
<h4>Produtos</h4>
<div id="resultado"></div>
</main> 
<script src="js/produtos.js"></script>   
</body>
</html>