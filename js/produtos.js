const comprarButtons = document.querySelectorAll('.botao');
comprarButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        addProductToCart(productId);
        alert('Produto adicionado ao carrinho com sucesso');
    });
});

function addProductToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = getProductDetails(productId);

    let existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function getProductDetails(productId) {
    // Substitua isso com a lógica para obter os detalhes do produto com base no ID
    const products = [
        { id: 'produto1', name: 'E-YOOO-Mini Slim', price: 199.99, image: 'images/E-YOOO-Mini-SLIM.png' },
        { id: 'produto2', name: 'Teclado mecânico com fio G101D', price: 44.53, image: 'images/teclado2.png' },
        // Adicione todos os produtos aqui...
    ];

    return products.find(product => product.id === productId);
}
