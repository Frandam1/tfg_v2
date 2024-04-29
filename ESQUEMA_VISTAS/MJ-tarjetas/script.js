let moves = 0;
let matchFound = 0;
let gameStarted = false;
let firstCard, secondCard;
let lockBoard = false;
let timer, timeElapsed = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', startGame);
});

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    const symbols = ['😀', '🐶', '🍀', '🌸', '🌙', '⭐', '🍄', '❤️'];
    let cards = [...symbols, ...symbols]; // Duplicar y mezclar para el juego
    cards = shuffle(cards);

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards.forEach(symbol => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.symbol = symbol;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    resetGame();
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    isMatch ? disableCards() : unflipCards();
    updateMove();
    if (matchFound === 8) {
        gameOver();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    matchFound++;
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.textContent = '';  // Asegurar que el texto también se oculta
        secondCard.classList.remove('flipped');
        secondCard.textContent = ''; // Asegurar que el texto también se oculta
        resetBoard();
    }, 1500);
}

function updateMove() {
    moves++;
    document.getElementById('moves').textContent = `Movimientos: ${moves}`;
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function resetGame() {
    moves = 0;
    matchFound = 0;
    timeElapsed = 0;
    gameStarted = true;
    document.getElementById('moves').textContent = 'Movimientos: 0';
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById('time').textContent = `Tiempo: ${timeElapsed}s`;
    }, 1000);
}

function gameOver() {
    clearInterval(timer);
    alert(`¡Juego completado en ${moves} movimientos y ${timeElapsed} segundos!`);
}
