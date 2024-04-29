document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
});

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const category = form.id.replace('Form', ''); // Extrae la categoría del id del formulario
    const questionId = `${category}Question1`;
    const answer = parseInt(document.getElementById(questionId).value);

    const currentData = JSON.parse(localStorage.getItem(`${category}Data`) || '[]');
    const newData = {
        date: new Date().toISOString(),
        answer: answer
    };
    currentData.push(newData);
    localStorage.setItem(`${category}Data`, JSON.stringify(currentData));

    alert('Gracias por completar la evaluación. Tus respuestas han sido guardadas.');
    form.reset();  // Resetea el formulario tras la sumisión
    displayHistory(category); // Muestra el historial de resultados
}

function displayHistory(category) {
    const historyData = JSON.parse(localStorage.getItem(`${category}Data`) || '[]');
    const historySectionId = `${category}-history`;
    let historySection = document.getElementById(historySectionId);

    if (!historySection) {
        // Crea una sección de historial si no existe
        const container = document.querySelector(`#${category}`);
        historySection = document.createElement('div');
        historySection.id = historySectionId;
        historySection.className = 'mt-4';
        container.appendChild(historySection);
    }

    if (historyData.length === 0) {
        historySection.innerHTML = '<p>No hay datos históricos disponibles.</p>';
    } else {
        const entriesHtml = historyData.map(entry => {
            const date = new Date(entry.date).toLocaleDateString("es-ES", {
                year: 'numeric', month: 'long', day: 'numeric'
            });
            return `<p>Fecha: ${date}, Respuesta: ${entry.answer}</p>`;
        }).join('');
        historySection.innerHTML = `<h4>Historial de Respuestas</h4>${entriesHtml}`;
    }
}
