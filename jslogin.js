document.addEventListener('DOMContentLoaded', function () {
    // Referências aos formulários
    const loginForm = document.getElementById('formularioLogin');
    const cadastroForm = document.getElementById('formularioCadastro');

    // Função de manipulação do envio do formulário de login
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const usuarioLogin = document.getElementById('usuarioLogin').value;
        const senhaLogin = document.getElementById('senhaLogin').value;

        // Validação específica para os dados de teste
        if (usuarioLogin === 'usuario' && senhaLogin === '12345') {
            // Simula o envio dos dados de login
            console.log('Usuário:', usuarioLogin);
            console.log('Senha:', senhaLogin);

            // Aqui você pode adicionar a lógica de envio dos dados para o servidor

            alert('Login realizado com sucesso!');
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });

    // Função de manipulação do envio do formulário de cadastro
    cadastroForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const usuarioCadastro = document.getElementById('usuarioCadastro').value;
        const emailCadastro = document.getElementById('emailCadastro').value;
        const senhaCadastro = document.getElementById('senhaCadastro').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        // Validação básica
        if (usuarioCadastro && emailCadastro && senhaCadastro && confirmarSenha) {
            if (senhaCadastro === confirmarSenha) {
                // Simula o envio dos dados de cadastro
                console.log('Usuário:', usuarioCadastro);
                console.log('Email:', emailCadastro);
                console.log('Senha:', senhaCadastro);

                // Aqui você pode adicionar a lógica de envio dos dados para o servidor

                alert('Cadastro realizado com sucesso!');
            } else {
                alert('As senhas não coincidem.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});

