`use strict`;

const DEFAULT_LIVES = 3;
const DEFAULT_MULTIPLIER = 1;
const DEFAULT_MAX_NUMBER = 8;
const MAX_NUMBER_STEP = 4;

const PRIZE_MIN = 25;
const PRIZE_MED = 50;
const PRIZE_MAX = 100;
const PRIZE_CONFIG = [PRIZE_MIN, PRIZE_MED, PRIZE_MAX];

let isPlaying = true;

while (isPlaying) {
    isPlaying = askForAGame();
    
    if (isPlaying) {
        // setup basic values as defaults
        let lives = DEFAULT_LIVES;
        let multiplier = DEFAULT_MULTIPLIER;
        let maximumNumber = DEFAULT_MAX_NUMBER;
        let prize = 0;
    
        while (lives > 0) {
            // check if player is guess the number
            if (askForANumber(maximumNumber) === getRandomNumber(maximumNumber)) {
                // add prize to bank
                prize += PRIZE_CONFIG[lives - 1] * multiplier;
                
                // increase prize multiplier
                multiplier += 1;
                
                // increase current level of complexity
                maximumNumber += MAX_NUMBER_STEP;
            
                // reset all lives to default value
                lives = DEFAULT_LIVES;
            } else {
                // decrease lives count
                lives--;
            }
            
            // in case all lives is lost
            if (lives === 0) {
                sayGameOver(prize);
            }
        }
    } else {
        sayBye();
    }
}

/**
 * Ask for a new game
 * @return {boolean} - response from user
 */
function askForAGame() {
    return Boolean(confirm('Do you want to play a game?'));
}

/**
 * Ask for a number
 * @return {number} - response from user
 */
function askForANumber(maximum) {
    return Number(prompt(
        `Please, enter a number of pocket on which the ball could land from 0 to ${maximum}.`,
        '0'
    ));
}

/**
 * Say bye to user if he decided to not participate the game
 */
function sayBye() {
    alert('You did not become a billionaire, but can.');
}

/**
 * Say bye to user if he spent all lives in game
 */
function sayGameOver(prize) {
    alert(`Thank you for your participation. Your prize is: ${prize} $`);
}

/**
 * Generate random integer
 * @param maximum - maximum available number
 * @return {number} - response from randomizer
 */
function getRandomNumber(maximum) {
    return Math.floor(Math.random() * (maximum + 1));
}