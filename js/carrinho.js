// Função para obter os produtos do servidor
function get_Produtos() {
    fetch('apiProdutos.php', {
        method: 'GET',
        headers: {
            id: 3,
            nome: 'Monitor de Desktop',
            preco: 799.99,
            descricao: 'Monitor de Desktop, Resposta de 5 Ms, Monitor de Computador de 23,8 Polegadas, Taxa de Atualização de 60 Hz para Casa (plugue da ue).'        }
    })
    .then(response => response.json())
    .then(data => {
        // Aqui você pode manipular os dados retornados, como renderizar os produtos na sua página HTML
        console.log(data); // Exibe os produtos no console para depuração
        // Por exemplo, você pode chamar uma função para renderizar os produtos na sua página HTML
        renderizarProdutos(data);
    })
    .catch(error => console.error('Erro ao obter os produtos:', error));
}

// Função para renderizar os produtos na página HTML
function renderizarProdutos(produtos) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo anterior da tabela
    produtos.forEach(produtos => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${"Monitor de Desktop"}</td>
            <td>${799.99}</td>
            <td>${"Monitor de Desktop, Resposta de 5 Ms, Monitor de Computador de 23,8 Polegadas, Taxa de Atualização de 60 Hz para Casa (plugue da ue)"}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Chamada da função para obter os produtos quando a página é carregada
document.addEventListener('DOMContentLoaded', get_Produtos);
