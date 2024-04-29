// script.js
document.getElementById('assessmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const results = {
        question1: parseInt(document.getElementById('question1').value),
        question2: parseInt(document.getElementById('question2').value),
        question3: parseInt(document.getElementById('question3').value),
        // TODO Añadir getters para mas preguntas
    };

    const score = Object.values(results).reduce((acc, cur) => acc + cur, 0); // Sumar todos los valores
    displayResults(score);
});

function displayResults(score) {
    const resultsContainer = document.getElementById('resultsContainer');
    console.log(score)
    let recommendation;

    if (score < 5) {
        recommendation = "Pareces estar bien emocionalmente. Sigue manteniendo un buen equilibrio en tu vida.";
    } else if (score < 10) {
        recommendation = "Hay algunas señales de estrés. Considera actividades de relajación y, si es necesario, busca apoyo profesional.";
    } else {
        recommendation = "Es importante que hables con un profesional de la salud mental. Hay señales de que podrías estar experimentando altos niveles de estrés o ansiedad.";
    }
    //TODO Modificar score

    resultsContainer.innerHTML = `<h3>Resultados de la Autoevaluación</h3><p>${recommendation}</p>`;
}
