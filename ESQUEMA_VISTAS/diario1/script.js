// script.js
document.getElementById('diaryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const achievements = document.getElementById('achievements').value;
    const gratitude = document.getElementById('gratitude').value;
    const challenges = document.getElementById('challenges').value;
    const mood = document.getElementById('mood').value;
    const imageInput = document.getElementById('imageInput').files[0];

    // Guardar la entrada en localStorage
    const diaryEntry = {
        date: new Date(),
        achievements: achievements,
        gratitude: gratitude,
        challenges: challenges,
        mood: mood,
        imageName: imageInput ? imageInput.name : ''
    };
    localStorage.setItem('diaryEntry', JSON.stringify(diaryEntry));
    console.log('Diario guardado:', diaryEntry);

    alert('Entrada guardada con éxito!');
});
