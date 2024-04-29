// script.js
document.getElementById('negativeThoughtsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const negativeThought = document.getElementById('negativeThought').value;
    const thoughtAnalysis = document.getElementById('thoughtAnalysis').value;
    const newThought = document.getElementById('newThought').value;

    console.log("Pensamiento Negativo Guardado:", { negativeThought, thoughtAnalysis, newThought });
    alert('Tu pensamiento ha sido reestructurado y guardado con éxito.');
    // Aquí podríamos también enviar los datos a un servidor o guardarlos en localStorage, etc.
});
