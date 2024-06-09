document.addEventListener('DOMContentLoaded', () => {

    function mostrarPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(function(){
    popup.style.display = "none";
  }, 3000); // 3 segundos
}
    
    // Seleciona todos os botões de compra
    const botoesCompra = document.querySelectorAll('.botao');
    
    // Adiciona um event listener de clique a cada botão de compra
    botoesCompra.forEach(botao => {
        botao.addEventListener('click', async (event) => {
            // Evita o comportamento padrão do botão (por exemplo, recarregar a página)
            event.preventDefault();
            
            // Encontra o elemento do produto mais próximo do botão clicado
            const produtoElement = event.target.closest('.produto');
            
            // Extrai os dados do produto e remove espaços e quebras de linha desnecessárias
            const nome = produtoElement.querySelector('.nomeprod').innerText.trim();
            const descricao = produtoElement.querySelector('.paragrafotec1').innerText.trim();
            let preco = produtoElement.querySelector('.preco').innerText.trim();
            
            // Remove os dois primeiros caracteres do preço
            preco = preco.substring(2);
    
            // Cria o objeto com os dados do produto
            const produtoData = {
                nome,
                preco,
                descricao
            };

            try {
                console.log(produtoData);
                // Faz a requisição para o backend
                const response = await fetch('http://localhost/Cypher_Tech/src/php/apiProdutos.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(produtoData)
                });

                // Alerta de sucesso
                mostrarPopup()
            } catch (error) {
                // Exibe erros no console
                console.error('Erro ao adicionar ao carrinho:', error);
                
                // Alerta de erro
                alert(`Erro ao adicionar ao carrinho: ${error.message}`);
            }
        });
    });
});