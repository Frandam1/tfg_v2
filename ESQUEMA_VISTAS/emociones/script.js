// script.js
document.getElementById('moodForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const mood = document.getElementById('mood').value;
    const reason = document.getElementById('reason').value;
    const today = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD

    let moodData = JSON.parse(localStorage.getItem('moodData') || '[]');
    moodData.push({ date: today, mood: mood, reason: reason, id: Date.now() });
    localStorage.setItem('moodData', JSON.stringify(moodData));

    document.getElementById('moodFormContainer').style.display = 'none'; // Ocultar formulario
    displayLatestEntry(today, mood, reason);
    updateChart(moodData);
    loadPreviousEntries();
});

function displayLatestEntry(date, mood, reason) {
    const latestEntry = document.getElementById('latestEntry');
    latestEntry.innerHTML = `
        <h3>Último Registro</h3>
        <p>Fecha: ${date}</p>
        <p>Estado de Ánimo: ${mood}</p>
        <p>Motivo: ${reason}</p>
    `;
}

function loadPreviousEntries() {
    let moodData = JSON.parse(localStorage.getItem('moodData') || '[]');
    const previousEntries = document.getElementById('previousEntries');
    previousEntries.innerHTML = moodData.map(entry => `
        <div class="card mb-2">
            <div class="card-body">
                <p class="card-text">Fecha: ${entry.date}, Estado de Ánimo: ${entry.mood}, Motivo: ${entry.reason}</p>
                <button onclick="editEntry(${entry.id})" class="btn btn-warning btn-sm">Editar</button>
            </div>
        </div>
    `).join('');
}

function editEntry(entryId) {
    let moodData = JSON.parse(localStorage.getItem('moodData'));
    let entry = moodData.find(entry => entry.id === entryId);
    if (entry) {
        const newMood = prompt("Edita tu estado de ánimo:", entry.mood);
        const newReason = prompt("Edita el motivo:", entry.reason);
        if (newMood && newReason) {
            entry.mood = newMood;
            entry.reason = newReason;
            localStorage.setItem('moodData', JSON.stringify(moodData));
            loadPreviousEntries();
        }
    }
}

// Definir el número máximo de entradas por página
const ENTRIES_PER_PAGE = 3;

function loadPreviousEntries(page = 1) {
    let moodData = JSON.parse(localStorage.getItem('moodData') || '[]');
    const startIndex = (page - 1) * ENTRIES_PER_PAGE;
    const endIndex = startIndex + ENTRIES_PER_PAGE;
    const pageEntries = moodData.slice(startIndex, endIndex);

    const previousEntries = document.getElementById('previousEntries');
    previousEntries.innerHTML = pageEntries.map(entry => `
        <div class="card mb-2">
            <div class="card-body">
                <p class="card-text">Fecha: ${entry.date}, Estado de Ánimo: ${entry.mood}, Motivo: ${entry.reason}</p>
                <button onclick="editEntry(${entry.id})" class="btn btn-warning btn-sm">Editar</button>
            </div>
        </div>
    `).join('');

    // Añadir paginación
    addPagination(moodData.length, page);
}

function addPagination(totalEntries, currentPage) {
    const totalPages = Math.ceil(totalEntries / ENTRIES_PER_PAGE);
    const paginationContainer = document.createElement('nav');
    const paginationUL = document.createElement('ul');
    paginationUL.className = 'pagination';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.innerText = i;
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadPreviousEntries(i);
        });
        pageItem.appendChild(pageLink);
        paginationUL.appendChild(pageItem);
    }

    paginationContainer.appendChild(paginationUL);
    document.getElementById('previousEntries').appendChild(paginationContainer);
}


function updateChart(moodData) {
    const ctx = document.getElementById('moodChart').getContext('2d');
    const labels = moodData.map(data => data.date);
    const data = moodData.map(data => ({
        x: data.date,
        y: moodLevels[data.mood]
    }));
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Estado de Ánimo',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const moodLevels = {
    "Muy feliz": 5,
    "Feliz": 4,
    "Neutral": 3,
    "Triste": 2,
    "Muy triste": 1,
    "Ansioso": 2
};
