(() => {
    const TIME_FOR_ROUND_MS = 5000;
    const SCORE_PER_CLICK = 1;
    const SESSION_STORAGE_KEY = 'FL19_HW10_BEST_RESULTS';

    // get basic UI elements
    const startButton = document.querySelector('#startButton');
    const clickButton = document.querySelector('#clickButton');
    const showBestResultButton = document.querySelector('#showBestResultButton');
    const showBestResultsButton = document.querySelector('#showBestResultsButton');
    const clearBestResultButton = document.querySelector('#clearBestResultButton');
    const clearBestResultsButton = document.querySelector('#clearBestResultsButton');
    
    const getNickname = (() => {
        const input = document.querySelector('#nicknameInput');
        
        return () => input.value;
    })();
    
    const bestResults = {
        _data: JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)) || {},
        
        save() {
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(this._data));
            
            return this._data;
        },
    
        set(nickname, value) {
            if (value > (this._data[nickname] || 0)) {
                this._data[nickname] = value;
    
                this.save();
            }
    
            return {nickname, value};
        },
        
        get(nickname) {
            return {nickname, value: this._data[nickname] || 0};
        },
    
        clear(nickname) {
            this._data[nickname] = 0;
    
            this.save();
    
            return {nickname, value: 0};
        },
        
        getAtAll() {
            const values = Object.values(this._data);
            const nicknames = Object.keys(this._data);
            
            let maximum = {nickname: '', value: 0};
            for (let i = 0; i < values.length; i++) {
                if (values[i] > maximum.value) {
                    maximum.value = values[i];
                    maximum.nickname = nicknames[i];
                }
            }
            
            return maximum;
        },
        
        clearAtAll() {
            const best = this.getAtAll();
    
            this._data[best.nickname] = 0;
    
            this.save();
            
            return best;
        }
    };

    // listening game start
    startButton.addEventListener('click', startGame);
    showBestResultButton.addEventListener('click', showBestResult);
    showBestResultsButton.addEventListener('click', showBestResults);
    clearBestResultButton.addEventListener('click', clearBestResult);
    clearBestResultsButton.addEventListener('click', clearBestResults);
    
    function checkNickname(nickname) {
        if (nickname === '') {
            throw new Error('Empty nickname');
        }
    }
    
    function startGame() {
        const nickname = getNickname();
        
        // handling errors inside algorithm
        try {
            checkNickname(nickname);
            
            // init basic value
            let clickCount = 0;
            const clickClb = () => {
                clickCount += SCORE_PER_CLICK;
            };
            
            clickButton.addEventListener('click', clickClb);
            
            // start timer
            setTimeout(() => {
                clickButton.removeEventListener('click', clickClb);
                
                bestResults.set(nickname, clickCount);
                
                alert(`You clicked ${clickCount} times`);
            }, TIME_FOR_ROUND_MS);
            
        } catch (error) {
            alert(error.message);
        }
    }
    
    function showBestResult() {
        try {
            const nickname = getNickname();
            checkNickname(nickname);
            
            const bestResult = bestResults.get(nickname);
            alert(`Best result is: ${bestResult.value}`);
        } catch (error) {
            alert(error.message);
        }
    }
    
    function showBestResults() {
        const bestResult = bestResults.getAtAll();
        alert(`Best result for the whole time is: ${bestResult.value} by ${bestResult.nickname}`);
    }
    
    function clearBestResult() {
        try {
            const nickname = getNickname();
            checkNickname(nickname);
    
            const bestResult = bestResults.clear(nickname);
            alert(`Best result by: ${bestResult.nickname} is cleared!`);
        } catch (error) {
            alert(error.message);
        }
    }
    
    function clearBestResults() {
        const bestResult = bestResults.clearAtAll();
        alert(`Best result by: ${bestResult.nickname} is cleared!`);
    }
})();