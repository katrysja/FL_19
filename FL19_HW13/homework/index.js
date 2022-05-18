// board game
document.addEventListener('DOMContentLoaded', () => {
    const X_CLASS_PATTERN = 'playerX';
    const X_TEXT_PATTERN = 'X';
    const O_CLASS_PATTERN = 'playerO';
    const O_TEXT_PATTERN = 'O';
    
    const announcerContainer = document.querySelector('.announcer');
    const playerContainer = document.querySelector('.display-player')
    const resetButton = document.querySelector('#reset');
    
    const boardContainer = getGameBoard();
    document.querySelector('.container').replaceWith(boardContainer);
    
    let boardMapArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let currentStep = 0;
    let activeCell = [1, 1];
    
    boardContainer.addEventListener('click', onBoardClick);
    boardContainer.addEventListener('mouseover', onBoardOver);
    resetButton.addEventListener('click', onResetClick);
    window.addEventListener('keyup', onKeyPress);
    
    function onResetClick() {
        Array.from(boardContainer.children).forEach(el => updateCell(el));
        updateWinner(announcerContainer);
        updatePlayerHint(playerContainer);
    
        boardMapArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        currentStep = 0;
        
        resetButton.blur();
    }
    
    function onBoardClick(event) {
        const x = event.target.dataset.coordinateX;
        const y = event.target.dataset.coordinateY;
        
        // protect from double click
        if (boardMapArray[y][x] !== '') {
            return;
        }
    
        currentStep++;
    
        // update cell, current player
        if (currentStep % 2) {
            boardMapArray[y][x] = X_TEXT_PATTERN;
        } else {
            boardMapArray[y][x] = O_TEXT_PATTERN;
        }
        
        updateCell(event.target, currentStep);
        updatePlayerHint(playerContainer, currentStep);
        
        // in case someone win
        if (checkWinner(boardMapArray)) {
            lockBoard(boardMapArray);
            updateWinner(announcerContainer, currentStep);
        }
    }
    
    function onBoardOver(event) {
        const x = event.target.dataset.coordinateX;
        const y = event.target.dataset.coordinateY;
        
        if (x === undefined || y === undefined) {
            return;
        }
        
        // remove previous one
        const previousCell = boardContainer.querySelector('.active');
        previousCell.classList.remove('active');
        
        // show current selected
        event.target.classList.add('active');
        
        // save for future purpose
        activeCell = [x, y];
    }
    
    function onKeyPress(event) {
        let [x, y] = activeCell;
        
        switch (event.code) {
            case 'ArrowUp': y--; break;
            case 'ArrowRight': x++; break;
            case 'ArrowDown': y++; break;
            case 'ArrowLeft': x--; break;
            
            default:
                // console.log();
                break;
        }
    
        x = Math.max(0, Math.min(x, 2));
        y = Math.max(0, Math.min(y, 2));
    
        // remove previous one
        const previousCell = boardContainer.querySelector('.active');
        previousCell.classList.remove('active');
    
        // show current selected
        const nextCell = boardContainer.querySelector(`[data-coordinate-x="${x}"][data-coordinate-y="${y}"]`);
        nextCell.classList.add('active');
        
        if (event.code === 'Enter') {
            const customClickEvent = new CustomEvent('click');
            Object.defineProperty(customClickEvent, 'target', {writable: false, value: nextCell});
            boardContainer.dispatchEvent(customClickEvent);
        }
    
        activeCell = [x, y];
    }
    
    function getGameBoard() {
        const board = document.createElement('div');
        board.classList.add('container');
        
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement('div');
            cell.classList.add('tile');
            cell.dataset.coordinateX = i % 3;
            cell.dataset.coordinateY = i / 3 | 0;
            board.appendChild(cell);
            
            if (i === 4) {
                cell.classList.add('active');
            }
        }
        
        return board;
    }
    
    function lockBoard(array) {
        array.forEach((row, y) => {
            row.forEach((el, x) => {
                array[y][x] = 'false';
            })
        });
    }
    
    function checkWinner(array) {
        /*
            MAP, just for understanding
            
                x1  x2  x3
            y1 ['', '', ''],
            y2 ['', '', ''],
            y3 ['', '', '']
         */
        
        return currentStep > 4 && (
            // axis ox
            array[0][0] !== '' && array[0][0] === array[0][1] && array[0][1] === array[0][2] ||
            array[1][0] !== '' && array[1][0] === array[1][1] && array[1][1] === array[1][2] ||
            array[2][0] !== '' && array[2][0] === array[2][1] && array[2][1] === array[2][2] ||
            
            // axis oy
            array[0][0] !== '' && array[0][0] === array[1][0] && array[1][0] === array[2][0] ||
            array[0][1] !== '' && array[0][1] === array[1][1] && array[1][1] === array[2][1] ||
            array[0][2] !== '' && array[0][2] === array[1][2] && array[1][2] === array[2][2] ||
            
            // diagonals
            array[0][0] !== '' && array[0][0] === array[1][1] && array[1][1] === array[2][2] ||
            array[0][2] !== '' && array[0][2] === array[1][1] && array[1][1] === array[2][0]
        );
    }
    
    function updateCell(container, step) {
        if (step !== undefined) {
            if (step % 2) {
                container.innerText = X_TEXT_PATTERN;
                container.classList.add(X_CLASS_PATTERN);
            } else {
                container.innerText = O_TEXT_PATTERN;
                container.classList.add(O_CLASS_PATTERN);
            }
        } else {
            container.innerText = '';
            container.classList.remove(X_CLASS_PATTERN);
            container.classList.remove(O_CLASS_PATTERN);
        }
    }
    
    function updatePlayerHint(container, step) {
        if (step !== undefined) {
            if (step % 2) {
                container.innerText = O_TEXT_PATTERN;
            } else {
                container.innerText = X_TEXT_PATTERN;
            }
    
            container.classList.toggle(X_CLASS_PATTERN);
            container.classList.toggle(O_CLASS_PATTERN);
        } else {
            container.innerText = X_TEXT_PATTERN;
            container.classList.add(X_CLASS_PATTERN);
            container.classList.remove(O_CLASS_PATTERN);
        }
    }
    
    function updateWinner(container, step) {
        if (step !== undefined) {
            container.classList.remove('hide');
    
            if (step % 2) {
                container.innerHTML =
                    `Player <span class="display-player ${X_CLASS_PATTERN}">${X_TEXT_PATTERN}</span> Won`;
            } else {
                container.innerHTML =
                    `Player <span class="display-player ${X_CLASS_PATTERN}">${X_TEXT_PATTERN}</span> Won`;
            }
        } else {
            container.classList.add('hide');
            container.innerHTML = '';
        }
    }
});

// drag and drop avatars
document.addEventListener('DOMContentLoaded', () => {
    const avatarIconsContainer = document.querySelector('.avatar');
    const avatarDropTargets = document.querySelectorAll('.avatar-container');
    
    let avatarDragged;
    
    // listen drop events for icons
    avatarIconsContainer.addEventListener('dragstart', onAvatarDragStart);
    avatarIconsContainer.addEventListener('drop', onAvatarDrop);
    
    // create drop targets
    avatarDropTargets.forEach(el => {
        el.addEventListener('dragenter', preventDefault);
        el.addEventListener('dragover', preventDefault);
    });
    
    function onAvatarDragStart(event) {
        avatarDragged = event.target;
    }
    
    function onAvatarDrop(event) {
        event.target.append(avatarDragged);
        event.target.removeEventListener('dragenter', preventDefault);
        event.target.removeEventListener('dragover', preventDefault);
        avatarDragged = undefined;
    }
    
    function preventDefault(event) {
        return event.preventDefault();
    }
});