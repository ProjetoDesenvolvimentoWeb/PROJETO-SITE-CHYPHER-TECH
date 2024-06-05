
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const cartList = document.getElementById('cartList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const id = formData.get('id');

        const method = id ? 'PUT' : 'POST';
        const url = id ? `api.php?id=${id}` : 'api.php';

        fetch(url, {
            method: method,
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.status_message);
            form.reset();
            loadProducts();
        })
        .catch(error => console.error('Error:', error));
    });

    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit')) {
            const product = JSON.parse(event.target.dataset.product);
            document.getElementById('productId').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('description').value = product.description;
        }

        if (event.target.classList.contains('delete')) {
            const id = event.target.dataset.id;
            if (confirm('Are you sure you want to delete this product?')) {
                fetch(`api.php?id=${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.status_message);
                    loadProducts();
                })
                .catch(error => console.error('Error:', error));
            }
        }

        if (event.target.classList.contains('add-to-cart')) {
            const product = JSON.parse(event.target.dataset.product);
            fetch('cart.php', {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                alert(data.status_message);
                loadCart();
            })
            .catch(error => console.error('Error:', error));
        }
    });

    function loadProducts() {
        fetch('api.php')
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = data.map(product => `
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                        <p>${product.description}</p>
                        <button class="edit" data-product='${JSON.stringify(product)}'>Edit</button>
                        <button class="delete" data-id='${product.id}'>Delete</button>
                        <button class="add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</button>
                    </div>
                `).join('');
            })
            .catch(error => console.error('Error:', error));
    }

    function loadCart() {
        fetch('cart.php')
            .then(response => response.json())
            .then(data => {
                cartList.innerHTML = '<h2>Cart</h2>' + data.map(item => `
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.price}</p>
                        <p>${item.description}</p>
                    </div>
                `).join('');
            })
            .catch(error => console.error('Error:', error));
    }

    loadProducts();
    loadCart();
});
