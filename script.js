let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Jogador humano
let gameActive = true;

const statusDisplay = document.getElementById('result');
const boardElement = document.getElementById('board');

// Inicializa o tabuleiro
function initBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-cell-index', index);
        cellElement.addEventListener('click', handleCellClick);
        cellElement.textContent = cell;
        boardElement.appendChild(cellElement);
    });
}

// Manipula o clique na célula
function handleCellClick(event) {
    const clickedCellIndex = event.target.getAttribute('data-cell-index');

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkResult();

    if (gameActive) {
        cpuMove();
    }
}

// Movimento da CPU
function cpuMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cpuCellIndex = availableCells[randomIndex];
        board[cpuCellIndex] = 'O';
        document.querySelector(`[data-cell-index='${cpuCellIndex}']`).textContent = 'O';
        checkResult();
    }
}

// Verifica o resultado do jogo
function checkResult() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = 'Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Reinicia o jogo
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = '';
    initBoard();
}

// Inicializa o tabuleiro ao carregar a página
initBoard();