const comprarButtons = document.querySelectorAll('.comprar');
comprarButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtenha o ID do produto a partir do atributo data-id
        const productId = button.getAttribute('data-id');
        
        // Aqui você pode adicionar lógica para buscar os detalhes do produto com base no ID
        
        // Exemplo de adicionar o produto ao carrinho (você pode substituir por sua própria lógica)
        alert('Produto adicionado ao carrinho! ID do Produto: ' + productId);
    });
});
