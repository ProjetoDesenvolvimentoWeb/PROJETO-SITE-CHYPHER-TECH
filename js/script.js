document.getElementById('formularioCadastro').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio do formulário
    
    // Pega os valores dos campos de entrada
    const usuario = document.getElementById('usuarioCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    
    const userData = {
        usuario: usuario,
        email: email,
        senha: senha
    };
    
    try {
        const response = await fetch('http://localhost/Cypher_Tech/src/php/apiUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        
        if (result.status === 1) {
            alert('Usuário cadastrado com sucesso!');
            // Limpar os campos após o cadastro bem-sucedido, se necessário
            document.getElementById('formularioCadastro').reset();
        } else {
            alert('Falha ao cadastrar usuário: ' + result.status_message);
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário: ' + error.message);
    }
});


document.getElementById('formularioLogin').addEventListener('submit', async function(event) {
event.preventDefault(); // Evita o envio do formulário

// Pega os valores dos campos de entrada
const usuario = document.getElementById('usuarioLogin').value;
const senha = document.getElementById('senhaLogin').value;

const loginData = {
    usuario: usuario,
    senha: senha
};

try {
    const response = await fetch('http://localhost/Cypher_Tech/src/php/apiLogin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });

    const result = await response.json();

    if (response.ok && result.status === 1) {
        alert('Login bem-sucedido!');
        // Redirecionar para a página produtos.html após o login bem-sucedido
        window.location.href = 'produtos.html';
    } else {
        alert('Falha no login: ' + result.status_message);
    }
} catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Erro ao fazer login: ' + error.message);
}
});