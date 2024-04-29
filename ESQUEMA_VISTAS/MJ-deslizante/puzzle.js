document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', startGame);
});

let moves = 0;
let gridSize = 4;  // 4x4 grid
let grid = [];
let emptySpot = { x: gridSize - 1, y: gridSize - 1 };

function startGame() {
    moves = 0;
    document.getElementById('moveCounter').textContent = 'Movimientos: 0';
    initializeGrid();
    shuffleGrid();
    drawGrid();
}

function initializeGrid() {
    grid = [];
    let number = 1;
    for (let y = 0; y < gridSize; y++) {
        grid[y] = [];
        for (let x = 0; x < gridSize; x++) {
            if (y === gridSize - 1 && x === gridSize - 1) {
                grid[y][x] = '';
                emptySpot = { x, y };
            } else {
                grid[y][x] = number++;
            }
        }
    }
}

function shuffleGrid() {
    for (let i = 0; i < 1000; i++) {
        let validMoves = getPossibleMoves();
        let move = validMoves[Math.floor(Math.random() * validMoves.length)];
        movePiece(move.y, move.x, true);
    }
}

function getPossibleMoves() {
    let moves = [];
    if (emptySpot.y > 0) moves.push({ x: emptySpot.x, y: emptySpot.y - 1 }); // Arriba
    if (emptySpot.x < gridSize - 1) moves.push({ x: emptySpot.x + 1, y: emptySpot.y }); // Derecha
    if (emptySpot.y < gridSize - 1) moves.push({ x: emptySpot.x, y: emptySpot.y + 1 }); // Abajo
    if (emptySpot.x > 0) moves.push({ x: emptySpot.x - 1, y: emptySpot.y }); // Izquierda
    return moves;
}

function drawGrid() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.textContent = grid[y][x];
            piece.style.visibility = grid[y][x] ? 'visible' : 'hidden';  // Asegurarse de que el espacio vacío está oculto
            if (grid[y][x]) {
                piece.addEventListener('click', () => movePiece(y, x));
            }
            gameBoard.appendChild(piece);
        }
    }
}


function movePiece(y, x) {
    if ((Math.abs(emptySpot.x - x) === 1 && emptySpot.y === y) || 
        (Math.abs(emptySpot.y - y) === 1 && emptySpot.x === x)) {
        // Intercambiar la pieza con el espacio en blanco
        grid[emptySpot.y][emptySpot.x] = grid[y][x];
        grid[y][x] = '';
        emptySpot = { x, y };

        moves++;
        document.getElementById('moveCounter').textContent = `Movimientos: ${moves}`;
        drawGrid();  // Redibujar el tablero para reflejar el movimiento
        checkIfSolved();
    }
}


function checkIfSolved() {
    let number = 1;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (grid[y][x] && grid[y][x] !== number++) {
                return;
            }
        }
    }
    gameOver();
}

function gameOver() {
    alert(`¡Juego completado en ${moves} movimientos!`);
}
