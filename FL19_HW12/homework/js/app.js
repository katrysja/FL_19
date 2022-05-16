import {dictionary} from './dictionary.js';

const TRIES_COUNT = 6;
const SYMBOLS_COUNT = 5;

const boardContainer = document.querySelector('#boardContainer');
const resetButton = document.querySelector('#resetButton');
const checkButton = document.querySelector('#checkButton');

const board = getBoardHTML(TRIES_COUNT, SYMBOLS_COUNT);
boardContainer.append(board);

const boardArray = Array.from(board.querySelectorAll('.board__row'))
    .map(node => Array.from(node.querySelectorAll('.board__cell')));

startGame();

function startGame() {
    let word = getRandomWord();
    let round = 0;
    
    // enable round row
    boardArray[round].forEach(input => input.removeAttribute('disabled'));
    
    resetButton.addEventListener('click', () => {
        word = getRandomWord();
        round = 0;
        
        boardArray.forEach(row => row.forEach(input => {
            input.value = '';
            input.classList.remove('correct');
            input.classList.remove('exist');
            input.classList.remove('incorrect');
            input.setAttribute('disabled', 'disabled');
        }));
        boardArray[round].forEach(input => input.removeAttribute('disabled'));
        boardArray[round][0].focus();
    });
    
    checkButton.addEventListener('click', () => {
        const result = boardArray[round].map(input => input.value).join('').toLowerCase();
        
        if (dictionary.includes(result)) {
            boardArray[round].forEach(({value: letter}, i) => {
                const input = boardArray[round][i];
        
                if (letter === word[i]) {
                    input.classList.add('correct');
                } else if (word.includes(letter)) {
                    input.classList.add('exist');
                } else {
                    input.classList.add('incorrect');
                }
        
                input.setAttribute('disabled', 'disabled');
            });
            
            if (result !== word) {
                if (round === TRIES_COUNT - 1) {
                    alert('Game over.');
                } else {
                    round++;
                    boardArray[round].forEach(input => input.removeAttribute('disabled'));
                    boardArray[round][0].focus();
                }
            } else {
                alert('Congratulations! You won.');
            }
        } else {
            alert('Our dictionary doesn\'t content this word!');
        }
    });
}

function getRandomWord() {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
}

function getBoardHTML(row, column) {
    const container = document.createElement('div');
    container.classList.add('board__grid');
    
    for (let i = 0; i < row; i++) {
        const row = document.createElement('div');
        row.classList.add('board__row');
        
        for (let j = 0; j < column; j++) {
            const cell = document.createElement('input');
            cell.classList.add('board__cell');
            cell.setAttribute('type', 'text');
            cell.setAttribute('maxlength', '1');
            cell.setAttribute('disabled', 'disabled');
            row.appendChild(cell);
            
            cell.addEventListener('keyup', (event) => {
                if (event.code === 'Backspace' || event.code === 'ArrowLeft') {
                    cell.previousElementSibling && cell.previousElementSibling.focus();
                } else {
                    cell.nextElementSibling && cell.nextElementSibling.focus();
                }
                
                if (event.code === 'Enter') {
                    checkButton.dispatchEvent(new MouseEvent('click'));
                }
            });
        }
    
        container.appendChild(row);
    }
    
    return container;
}