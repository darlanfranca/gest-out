function displayUserProfiles() {
    let userList = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    let userTable = document.getElementById('userTable');
    userTable.innerHTML = '';

    let headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Usuário</th><th>Senha</th><th>Ações</th>';
    userTable.appendChild(headerRow);

    userList.forEach((user, index) => {
        let newRow = document.createElement('tr');

        let usernameCell = document.createElement('td');
        usernameCell.innerHTML = '<strong>' + user.username + '</strong>';
        newRow.appendChild(usernameCell);

        let passwordCell = document.createElement('td');
        passwordCell.innerHTML = '<span id="password-' + index + '">' + user.password + '</span>';
        newRow.appendChild(passwordCell);

        let actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <button class="btn btn-warning" onclick="editProfile(${index})">Editar</button>
            <button class="btn btn-danger" onclick="deleteProfile(${index})">Deletar</button>
        `;
        newRow.appendChild(actionsCell);

        userTable.appendChild(newRow);
    });
}

function editProfile(index) {
    let userList = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    let user = userList[index];

    Swal.fire({
        title: 'Editar Perfil',
        html:
            `<input id="swal-input1" class="swal2-input" value="${user.username}" placeholder="Digite o novo nome de usuário">` +
            `<input id="swal-input2" class="swal2-input" type="password" value="${user.password}" placeholder="Digite a nova senha">`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
            const newUsername = Swal.getPopup().querySelector('#swal-input1').value;
            const newPassword = Swal.getPopup().querySelector('#swal-input2').value;

            if (!newUsername || !newPassword) {
                Swal.showValidationMessage('Digite um nome de usuário e uma senha válidos.');
            }

            user.username = newUsername;
            user.password = newPassword;

            localStorage.setItem('registeredUsers', JSON.stringify(userList));

            Swal.fire({
                title: 'Perfil Atualizado',
                text: 'O perfil foi atualizado com sucesso.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });

            displayUserProfiles();
        },
    });
}

function deleteProfile(index) {
    let userList = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    Swal.fire({
        title: 'Digite sua senha para confirmar:',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
            if (password === userList[index].password) {
                userList.splice(index, 1);
                localStorage.setItem('registeredUsers', JSON.stringify(userList));

                return true;
            } else {
                Swal.showValidationMessage('Senha inválida, tente novamente.');
            }
        },
        allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Usuário Apagado',
                text: 'O usuário foi apagado com sucesso.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });

            displayUserProfiles();
        }
    });
}