
let items = [];

const itemForm = document.getElementById('itemForm');
const itemIdInput = document.getElementById('itemId');
const itemNameInput = document.getElementById('itemName');
const cancelEditButton = document.getElementById('cancelEditButton');


function renderItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        
        // Botão para editar o item
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => {
            editItem(index);
        });

        // Botão para excluir o item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            deleteItem(index);
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        itemList.appendChild(li);
    });
}

// Função para adicionar um novo item
function addItem(name) {
    items.push({ name });
    renderItems();
}

// Função para editar um item
function editItem(index) {
    const item = items[index];
    itemIdInput.value = index;
    itemNameInput.value = item.name;
    itemForm.querySelector('button[type="submit"]').textContent = 'Salvar Edição';
    cancelEditButton.style.display = 'inline-block';
}

// Função para salvar a edição de um item
function saveEdit() {
    const index = parseInt(itemIdInput.value);
    const newName = itemNameInput.value;
    if (index >= 0 && index < items.length && newName.trim() !== '') {
        items[index].name = newName;
        renderItems(); // Atualiza a lista após salvar a edição
        cancelEdit();
    }
}

// Função para cancelar a edição
function cancelEdit() {
    itemForm.reset();
    itemForm.querySelector('button[type="submit"]').textContent = 'Adicionar Item';
    cancelEditButton.style.display = 'none';
}

// Função para excluir um item
function deleteItem(index) {
    items.splice(index, 1);
    renderItems();
}

// Evento de envio do formulário para adicionar um novo item ou salvar a edição
itemForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (itemIdInput.value === '') {
        const itemName = itemNameInput.value.trim();
        if (itemName !== '') {
            addItem(itemName);
            itemForm.reset();
        }
    } else {
        saveEdit();
    }
});

// Evento de clique no botão "Cancelar"
cancelEditButton.addEventListener('click', cancelEdit);

// Renderiza os itens inicialmente
renderItems();