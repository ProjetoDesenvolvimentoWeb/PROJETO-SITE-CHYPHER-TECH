document.addEventListener("DOMContentLoaded", () => {
    const cart = [
        {
            id: 1,
            name: "Nome do Produto 1",
            category: "Categoria",
            price: 79.99,
            quantity: 2,
            image: "https://picsum.photos/100/120"
        },
        {
            id: 2,
            name: "Nome do Produto 2",
            category: "Categoria",
            price: 79.99,
            quantity: 2,
            image: "https://picsum.photos/100/120"
        }
    ];

    const renderCart = () => {
        const cartTableBody = document.querySelector("tbody");
        cartTableBody.innerHTML = "";
        let total = 0;

        cart.forEach(product => {
            const productTotal = (product.price * product.quantity).toFixed(2);
            total += parseFloat(productTotal);

            const productRow = document.createElement("tr");
            productRow.innerHTML = `
                <td>
                    <div class="produto">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="info">
                            <div class="name">${product.name}</div>
                            <div class="category">${product.category}</div>
                        </div>
                    </div>
                </td>
                <td>R$ ${product.price.toFixed(2)}</td>
                <td>
                    <div class="qty">
                        <button class="qty-minus" data-id="${product.id}"><i class='bx bx-minus'></i></button>
                        <span>${product.quantity}</span>
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
        const product = cart.find(product => product.id === parseInt(id));
        if (product) {
            product.quantity += delta;
            if (product.quantity < 1) product.quantity = 1;
            renderCart();
        }
    };

    const removeProduct = (id) => {
        const productIndex = cart.findIndex(product => product.id === parseInt(id));
        if (productIndex > -1) {
            cart.splice(productIndex, 1);
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