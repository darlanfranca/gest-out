    
function saveOrUpdateItem() {

    let counter = parseInt(localStorage.getItem('itemCounter')) || 1;

    let item = {
        item: counter,
        patrimonio: document.getElementById('patrimonioInput').value,
        equipamento: document.getElementById('equipamentoInput').value,
        marca: document.getElementById('marcaInput').value,
        modelo: document.getElementById('modeloInput').value,
        sn: document.getElementById('snInput').value,
        cliente: document.getElementById('clienteInput').value,
        situacao: document.getElementById('situacaoInput').value,
    };

    counter++;
    localStorage.setItem('itemCounter', counter);

    let itemList = JSON.parse(localStorage.getItem('itemList')) || [];

    let itemIndex = itemList.findIndex(existingItem => existingItem.patrimonio === item.patrimonio);

    if (itemIndex !== -1) {
        itemList[itemIndex] = item;
    } else {
        itemList.push(item);
    }

    localStorage.setItem('itemList', JSON.stringify(itemList));

    clearForm();
    displayItems();
}

function displayItems() {
    let itemList = JSON.parse(localStorage.getItem('itemList')) || [];

    let tableBody = document.getElementById('tableBody');

    tableBody.innerHTML = '';

    itemList.forEach(item => {
        let tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${item.item}</td>
            <td>${item.patrimonio}</td>
            <td>${item.equipamento}</td>
            <td>${item.marca}</td>
            <td>${item.modelo}</td>
            <td>${item.sn}</td>
            <td>${item.cliente}</td>
            <td>${item.situacao}</td>
            <td>
            <button class="btn btn-warning edit-btn" data-patrimonio="${item.patrimonio}">Editar</button>

            <button class="btn btn-danger" onclick="deleteItem('${item.patrimonio}')">Deletar</button>
            </td>
        `;
        tableBody.appendChild(tableRow);
    });
}

function editItem(patrimonio) {
    let itemList = JSON.parse(localStorage.getItem('itemList')) || [];

    let item = itemList.find(existingItem => existingItem.patrimonio === patrimonio);

    if (item) {
        document.getElementById('itemInput').value = item.item;
        document.getElementById('patrimonioInput').value = item.patrimonio;
        document.getElementById('equipamentoInput').value = item.equipamento;
        document.getElementById('marcaInput').value = item.marca;
        document.getElementById('modeloInput').value = item.modelo;
        document.getElementById('snInput').value = item.sn;
        document.getElementById('clienteInput').value = item.cliente;
        document.getElementById('situacaoInput').value = item.situacao;
        $("#itemModal").modal('show');
    }
}

// Use o jQuery para lidar com o clique no botão de edição
$(document).ready(function(){
    $(".edit-btn").click(function(){
        var patrimonio = $(this).data("patrimonio");
        editItem(patrimonio);
    });
});


function deleteItem(patrimonio) {
    Swal.fire({
        title: 'Confirmação',
        text: 'Você tem certeza que deseja excluir este item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let itemList = JSON.parse(localStorage.getItem('itemList')) || [];
            itemList = itemList.filter(existingItem => existingItem.patrimonio !== patrimonio);
            localStorage.setItem('itemList', JSON.stringify(itemList));
            displayItems();
            

            Swal.fire(
                'Excluído!',
                'O item foi excluído com sucesso.',
                'success'
            );
        }
    });
}

function clearForm() {
    document.getElementById('itemInput').value = '';
    document.getElementById('patrimonioInput').value = '';
    document.getElementById('equipamentoInput').value = '';
    document.getElementById('marcaInput').value = '';
    document.getElementById('modeloInput').value = '';
    document.getElementById('snInput').value = '';
    document.getElementById('clienteInput').value = '';
    document.getElementById('situacaoInput').value = '';
}
displayItems();
