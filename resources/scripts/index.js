let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

function authenticate() {
    const usernameInput = $('#loginUsername');
    const passwordInput = $('#loginPassword');
    const errorMessage = $('#errorMessage');

    let username = usernameInput.val();
    let password = passwordInput.val();

    usernameInput.removeClass('is-invalid');
    passwordInput.removeClass('is-invalid');

    errorMessage.text('');

    if (!username || !password) {
        if (!username) {
            usernameInput.addClass('is-invalid');
        }
        if (!password) {
            passwordInput.addClass('is-invalid');
            errorMessage.text('Por favor, preencha todos os campos.');
        }
        return;
    }

    let user = registeredUsers.find(u => u.username === username && u.password === password);

    if (user) {
        window.location.href = 'pages/index/index.html';
    } else {
        passwordInput.addClass('is-invalid');
        errorMessage.text('Usuário ou senha incorretos. Por favor, tente novamente.');
    }
}

function goToLogin() {
    window.location.href = '../../index.html';
}

function redirectCadastro() {
    window.location.href = "pages/cadastro/index.html";
}

function toggleMenu() {
    let sideMenu = $('#sideMenu');
    sideMenu.toggle();
}

function logout() {
    window.location.href = '../../index.html';
}

function fecharModal() {
    var meuModal = document.getElementById('itemModal');
    meuModal.style.display = 'none';
    window.location.href = '../index/index.html';
}


function togglePasswordVisibility() {
    var senhaInput = $('#loginPassword');
    var icon = $('#showPassword');

    if (senhaInput.attr('type') === 'password') {
        senhaInput.attr('type', 'text');
        icon.removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
    } else {
        senhaInput.attr('type', 'password');
        icon.removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
    }
}

$(function() {
    const rememberCheckbox = $('#rememberCheckbox');
    const savedState = localStorage.getItem('rememberCheckboxState');

    if (savedState === 'checked') {
        rememberCheckbox.prop('checked', true);

        $('#loginUsername').val(localStorage.getItem('savedUsername'));
        $('#loginPassword').val(localStorage.getItem('savedPassword'));
    }

    rememberCheckbox.change(function() {
        const username = $('#loginUsername').val();
        const password = $('#loginPassword').val();

        if (rememberCheckbox.prop('checked')) {
            localStorage.setItem('rememberCheckboxState', 'checked');
            localStorage.setItem('savedUsername', username);
            localStorage.setItem('savedPassword', password);
        } else {
            localStorage.removeItem('rememberCheckboxState');
            localStorage.removeItem('savedUsername');
            localStorage.removeItem('savedPassword');
        }
    });
});


