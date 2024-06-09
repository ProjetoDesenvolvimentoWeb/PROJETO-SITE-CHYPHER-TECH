 // Código Tainara Função para remover um produto
 function removerProduto(id_produto) {
    fetch(`http://localhost/Cypher_Tech/src/php/apiProdutos.php?id_produto=${id_produto}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao deletar o produto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Produto deletado com sucesso:', data);
        // Atualizar a lista de produtos após a exclusão
        carregarProdutos(); // Chama a função para recarregar os produtos após a exclusão
    })
    .catch(error => console.error('Erro:', error));
}


    // Código Tainara Função para carregar os produtos
    function carregarProdutos() {
        fetch('http://localhost/Cypher_Tech/src/php/apiProdutos.php')
            .then(response => response.json())
            .then(data => {
                const produtosLista = document.getElementById('produtos-lista');
                produtosLista.innerHTML = '';
                data.forEach(produto => {
                    const preco = produto.preco !== undefined ? produto.preco : 0;
                    const quantidade = produto.quantidade !== undefined ? produto.quantidade : 0;
                    const total = preco * quantidade;

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${produto.nome}</td>
                        <td>R$ ${preco}</td>
                        <td>${quantidade}</td>
                        <td>R$ ${total}</td>
                        <td><button class="btn btn-danger btn-sm" onclick="removerProduto(${produto.id_produto})">Remover</button></td>
                    `;
                    produtosLista.appendChild(row);
                });
            })
    }

    document.addEventListener('DOMContentLoaded', carregarProdutos);
    
//Código do PARA onde ocorre a soma do total dos produtos 
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const renderCart = () => {
        const cartTableBody = document.querySelector("tbody");
        cartTableBody.innerHTML = "";
        let total = 0;

        cart.forEach(product => {
            const productTotal = (product.preco * product.quantidade).toFixed(2);
            total += parseFloat(productTotal);

            const productRow = document.createElement("tr");
            productRow.innerHTML = `
                <td>
                    <div class="produto">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="info">
                            <div class="name">${product.name}</div>
                            <div class="category">${product.category || ''}</div>
                        </div>
                    </div>
                </td>
                <td>R$ ${product.preco.toFixed(2)}</td>
                <td>
                    <div class="qty">
                        <button class="qty-minus" data-id="${product.id}"><i class='bx bx-minus'></i></button>
                        <span>${product.quantidade}</span>
                        <button class="qty-plus" data-id="${product.id}"><i class='bx bx-plus'></i></button>
                    </div>
                </td>
                <td>R$ ${productTotal}</td>
                <td><button class="remove" data-id="${product.id}"><i class='bx bx-x'></i></button></td>
            `;
            cartTableBody.appendChild(productRow);
        });

        document.querySelector(".sub-total").textContent = `R$ ${total.toFixed(2)}`;
        document.querySelector(".total").textContent = `R$ ${total.toFixed(2)}`;
    };

    const updateQuantity = (id, delta) => {
        const product = cart.find(product => product.id === id);
        if (product) {
            product.quantidade += delta;
            if (product.quantidade < 1) product.quantidade = 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    };

    const removeProduct = (id) => {
        const productIndex = cart.findIndex(product => product.id === id);
        if (productIndex > -1) {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    };

    document.addEventListener("click", (e) => {
        if (e.target.closest(".qty-minus")) {
            const id = e.target.closest(".qty-minus").dataset.id;
            updateQuantity(id, -1);
        }

        if (e.target.closest(".qty-plus")) {
            const id = e.target.closest(".qty-plus").dataset.id;
            updateQuantity(id, 1);
        }

        if (e.target.closest(".remove")) {
            const id = e.target.closest(".remove").dataset.id;
            removeProduct(id);
        }
    });

    renderCart();
});