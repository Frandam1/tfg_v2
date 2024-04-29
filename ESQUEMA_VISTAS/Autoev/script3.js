document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        const category = form.id.replace('Form', '');
        displayHistory(category)
    });
});

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const category = form.id.replace('Form', '');
    const questions = form.querySelectorAll('select');

    const results = Array.from(questions).map(question => parseInt(question.value));
    const score = calculateScore(results);

    saveResults(category, score);
    displayResults(category, score);
    console.log(score)
}

function calculateScore(results) {
    // Puede ajustarse según la categoría si es necesario
    return results.reduce((acc, cur) => acc + cur, 0);
}

function saveResults(category, score) {
    const currentData = JSON.parse(localStorage.getItem(`${category}Data`) || '[]');
    const newData = {
        date: new Date().toISOString(),
        score: score
    };
    currentData.push(newData);
    localStorage.setItem(`${category}Data`, JSON.stringify(currentData));
}

function displayResults(category, score) {
    const resultsContainerId = `${category}-results`;
    let resultsContainer = document.getElementById(resultsContainerId);
    if (!resultsContainer) {
        const tabPane = document.querySelector(`#${category}`);
        resultsContainer = document.createElement('div');
        resultsContainer.id = resultsContainerId;
        resultsContainer.className = 'mt-3';
        tabPane.appendChild(resultsContainer);
    }

    let recommendation = getRecommendation(category, score);
    resultsContainer.innerHTML = `
        <div class="card">
            <div class="card-header">
                Resultados de la Autoevaluación
            </div>
            <div class="card-body">
                <h5 class="card-title">Puntuación: ${score}</h5>
                <p class="card-text">${recommendation}</p>
            </div>
        </div>`;
}

function getRecommendation(category, score) {
    if (category === 'anxiety') {
        if (score < 5) {
            return "Pareces estar bien emocionalmente. Sigue manteniendo un buen equilibrio en tu vida.";
        } else if (score < 10) {
            return "Hay algunas señales de estrés. Considera actividades de relajación y, si es necesario, busca apoyo profesional.";
        } else {
            return "Es importante que hables con un profesional de la salud mental. Hay señales de que podrías estar experimentando altos niveles de estrés o ansiedad.";
        }
    } else if (category === 'depression') {
        if (score < 5) {
            return "No presentas signos significativos de depresión.";
        } else if (score < 10) {
            return "Puedes estar experimentando síntomas leves de depresión. Considera hablarlo con alguien de confianza.";
        } else {
            return "Es aconsejable buscar apoyo profesional para manejar los síntomas de depresión que estás experimentando.";
        }
    }
    // Añade más lógicas de recomendación para otras categorías como estrés, bienestar, calidad del sueño, etc.
}

// Función para mostrar el historial de resultados
function displayHistory(category) {
    const historyData = JSON.parse(localStorage.getItem(`${category}Data`) || '[]');
    const historySectionId = `${category}-history`;
    let historySection = document.getElementById(historySectionId);

    if (!historySection) {
        const container = document.querySelector(`#${category}`);
        const toggleButton = document.createElement('button');
        toggleButton.className = 'btn btn-info mt-3';
        toggleButton.textContent = 'Mostrar/Ocultar Historial';
        toggleButton.onclick = () => toggleVisibility(historySectionId);

        historySection = document.createElement('div');
        historySection.id = historySectionId;
        historySection.className = 'mt-3 d-none'; // 'd-none' es una clase de Bootstrap para ocultar elementos

        container.appendChild(toggleButton);
        container.appendChild(historySection);
    }

    let content = '<h5 class="mb-3">Historial de Respuestas</h5>';
    historyData.forEach(item => {
        const date = new Date(item.date).toLocaleDateString("es-ES", {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        content += `<div class="card mb-2">
            <div class="card-body">
                <p class="card-text">Fecha: ${date}, Puntuación: ${item.score}</p>
                <button onclick="deleteEntry('${category}', '${item.date}')" class="btn btn-danger btn-sm">Eliminar</button>
            </div>
        </div>`;
    });
    historySection.innerHTML = content;
}

function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('d-none'); // Cambia la visibilidad con cada clic
    }
}

function deleteEntry(category, date) {
    if (!confirm("¿Estás seguro de que deseas eliminar esta entrada?")) return;
    let historyData = JSON.parse(localStorage.getItem(`${category}Data`) || '[]');
    historyData = historyData.filter(item => item.date !== date);
    localStorage.setItem(`${category}Data`, JSON.stringify(historyData));
    displayHistory(category); // Actualizar la visualización del historial después de eliminar
}


