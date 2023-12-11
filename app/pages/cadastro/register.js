function registerAndRedirect() {
    let username = $('#signupUsername').val();
    let password = $('#signupPassword').val();

    // Verificar se algum campo está em branco
    if (!username || !password) {
        Swal.fire({
            title: 'Erro',
            text: 'Por favor, preencha todos os campos.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
        return; // Impedir a execução do restante da função se houver campos em branco
    }

    if (registeredUsers.some(user => user.username === username)) {
        Swal.fire({
            title: 'Erro',
            text: 'Usuário já cadastrado. Escolha um nome de usuário diferente.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    } else {
        Swal.fire({
            title: 'Usuário Cadastrado!',
            text: 'Seu usuário foi cadastrado com sucesso.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                // Adicionar usuário ao localStorage
                registeredUsers.push({ username, password });
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

                // Redirecionar para a tela de login
                window.location.href = '../../index.html';
            }
        });
    }
}

// Aplicando a máscara ao campo do CEP
$(function(){
    $('#cep').inputmask('99999-999');
});

function fillAddressByCep() {
    let cep = $('#cep').val();

    if (cep.length === 9) {
        $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
            if (!data.erro) {
                $('#logradouro').val(data.logradouro);
                $('#bairro').val(data.bairro);
                $('#cidade').val(data.localidade);
                $('#estado').val(data.uf);
            } else {
                alert('CEP não encontrado. Verifique o número digitado.');
            }
        });
    }
}