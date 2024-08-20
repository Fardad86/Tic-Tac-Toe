document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-btn');
    const message = document.getElementById('message');
    let currentPlayer = 'x';
    let boardState = Array(9).fill(null);

    function createBoard() {
        board.innerHTML = '';
        boardState = Array(9).fill(null);
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
        }
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    function handleCellClick(index) {
        if (boardState[index] !== null) return;
        boardState[index] = currentPlayer;
        updateBoard();
        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            board.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
        } else if (boardState.every(cell => cell !== null)) {
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function updateBoard() {
        const cells = board.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.className = 'cell';
            if (boardState[index] !== null) {
                cell.classList.add(boardState[index]);
                cell.textContent = boardState[index].toUpperCase();
            }
        });
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        return winPatterns.some(pattern => {
            return pattern.every(index => boardState[index] === currentPlayer);
        });
    }

    resetBtn.addEventListener('click', () => createBoard());

    createBoard();
});
