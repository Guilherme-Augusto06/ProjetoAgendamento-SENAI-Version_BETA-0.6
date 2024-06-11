document.addEventListener('DOMContentLoaded', function() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.select-row');
    const deleteForm = document.getElementById('deleteForm');
    const selectedIdsInput = document.getElementById('selectedIds');
    const deleteBtn = document.getElementById('deleteBtn');
    const filterBtn = document.getElementById('filterBtn');
    const filterModal = document.getElementById('filterModal');
    const filterAZBtn = document.getElementById('filterAZBtn');
    const filterNumBtn = document.getElementById('filterNumBtn');
    const roomRows = document.querySelectorAll('.student-table tbody tr');
    const addBtn = document.getElementById('addBtn');
    const addRoomModal = document.getElementById('addRoomModal');
    const addRoomForm = document.getElementById('addRoomForm');
    const closeBtns = document.querySelectorAll('.modal .close');
    const roomIdInput = document.getElementById('salaId'); // Novo input para o ID da sala
    const roomNameInput = document.getElementById('roomName');
    const roomNumberInput = document.getElementById('roomNumber');
    const roomTimeSelect = document.getElementById('roomTime');
    const roomPeriodSelect = document.getElementById('roomPeriod');
    const roomDaySelect = document.getElementById('roomDay');

    // Função para abrir a modal de adição
    addBtn.addEventListener('click', function() {
        const selectedCheckbox = document.querySelector('.select-row:checked');
        if (selectedCheckbox) {
            roomIdInput.value = selectedCheckbox.getAttribute('data-id'); // Define o ID da sala no campo oculto
            roomNameInput.value = selectedCheckbox.getAttribute('data-sala');
            roomNumberInput.value = selectedCheckbox.getAttribute('data-numero');
        }
        populateAvailableTimes();
        addRoomModal.style.display = 'block';
    });

    // Função para fechar modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            btn.closest('.modal').style.display = 'none';
        });
    });

    // Fecha a modal ao clicar fora dela
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
   

 // Configuração do formulário de adição
  // Código para a funcionalidade do modal de adição
  var modal = document.getElementById("addRoomModal");
  var btn = document.getElementById("addBtn");
  var span = document.getElementsByClassName("close")[0];
  var form = document.getElementById("addRoomForm");

  btn.onclick = function() {
      modal.style.display = "block";
  }

  span.onclick = function() {
      modal.style.display = "none";
  }

});
function openAddRoomModal() {
    const selectedCheckbox = document.querySelector('.select-row:checked');
    if (selectedCheckbox) {
        roomIdInput.value = selectedCheckbox.getAttribute('data-id'); // Define o ID da sala no campo oculto
        roomNameInput.value = selectedCheckbox.getAttribute('data-sala');
        populateAvailablePeriods();
        populateAvailableDays();
        addRoomModal.style.display = 'block';
    } 
}

// Evento para abrir a modal de adição ao clicar no botão de adicionar
addBtn.addEventListener('click', function() {
    openAddRoomModal();
});

// Função para fechar modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        btn.closest('.modal').style.display = 'none';
    });
});

// Fecha a modal ao clicar fora dela
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Configuração do formulário de adição
addRoomForm.onsubmit = function(event) {
    event.preventDefault();
    const formData = new FormData(addRoomForm);

    fetch(addRoomForm.action, {
        method: 'POST',
        headers: {
            'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                throw new Error(data.errors);
            });
        }
    }).then(data => {
        alert(data.message);
        addRoomModal.style.display = 'none';
        window.location.reload();
    }).catch(error => {
        console.error('Erro:', error);
        alert('Erro ao adicionar o agendamento: ' + error.message);
    });
}

// Função para atualizar o estado do checkbox "Select All"
function updateSelectAllState() {
    const allChecked = Array.from(rowCheckboxes).every(checkbox => checkbox.checked);
    selectAllCheckbox.checked = allChecked;
}

selectAllCheckbox.addEventListener('change', function() {
    rowCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
});

rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        updateSelectAllState();
    });
});

deleteForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedIds = Array.from(rowCheckboxes)
                            .filter(checkbox => checkbox.checked)
                            .map(checkbox => checkbox.getAttribute('data-id'));

    if (selectedIds.length > 0) {
        selectedIdsInput.value = selectedIds.join(',');
        deleteForm.submit();
    } else {
        alert('Por favor, selecione pelo menos um agendamento para excluir.');
    }
});

// Adiciona o evento de clique ao botão "Delete"
deleteBtn.addEventListener('click', function() {
    deleteForm.dispatchEvent(new Event('submit'));


// Função para ordenar as salas em ordem alfabética
function sortRoomsAlphabetically() {
    const sortedRooms = Array.from(roomRows).sort((a, b) => {
        const roomA = a.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const roomB = b.querySelector('td:nth-child(2)').textContent.toLowerCase();
        return roomA.localeCompare(roomB);
    });

    const tbody = document.querySelector('.student-table tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo atual
    sortedRooms.forEach(room => {
        tbody.appendChild(room);
    });
}

// Função para ordenar as salas em ordem numérica
function sortRoomsNumerically() {
    const sortedRooms = Array.from(roomRows).sort((a, b) => {
        const numA = parseInt(a.querySelector('td:nth-child(3)').textContent, 10);
        const numB = parseInt(b.querySelector('td:nth-child(3)').textContent, 10);
        return numA - numB;
    });

    const tbody = document.querySelector('.student-table tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo atual
    sortedRooms.forEach(room => {
        tbody.appendChild(room);
    });
}

filterAZBtn.addEventListener('click', function() {
    sortRoomsAlphabetically();
    filterModal.style.display = 'none';
});

filterNumBtn.addEventListener('click', function() {
    sortRoomsNumerically();
    filterModal.style.display = 'none';
});

filterBtn.addEventListener('click', function() {
    filterModal.style.display = 'block';
});

// Função para preencher os períodos disponíveis
function populateAvailablePeriods() {
    const availablePeriods = [
        'manhaA',
        'manhaB',
        'tardeA',
        'tardeB',
        'noiteA'
    ];

    roomPeriodSelect.innerHTML = ''; // Limpa as opções atuais

    availablePeriods.forEach(period => {
        const option = document.createElement('option');
        option.value = period;
        option.textContent = period;
        roomPeriodSelect.appendChild(option);
    });
}

// Função para preencher os dias disponíveis
function populateAvailableDays() {
    const availableDays = [
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
    ];

    roomDaySelect.innerHTML = ''; // Limpa as opções atuais

    availableDays.forEach(day => {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        roomDaySelect.appendChild(option);
    });
}
deleteForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedIds = Array.from(rowCheckboxes)
                            .filter(checkbox => checkbox.checked)
                            .map(checkbox => checkbox.getAttribute('data-id'));

    if (selectedIds.length > 0) {
        selectedIdsInput.value = selectedIds.join(',');
        deleteForm.submit();
        } else {
            alert('Por favor, selecione pelo menos uma sala para excluir.');
        }
    
});

});
});