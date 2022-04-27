// Your code goes here
'use strict';

// ask user for numbers
const firstNumber = askForANumber('first number');
const secondNumber = askForANumber('second number');

// call out function with predefined params
findNumbersInRow(firstNumber, secondNumber);

/**
 * Ask a number
 * @return {number} - response from user
 */
function askForANumber(name) {
    return Number(prompt(`Please, enter the ${name} number.`, '0'));
}

/**
 * Find all numbers between two
 * @param from {number}
 * @param to {number}
 * @return {[]} - array of numbers
 */
function findNumbersInRow (from, to) {
    let response = [];
    
    // validate input
    if (!Number.isInteger(from) || !Number.isInteger(to) || !(from < to)) {
        alert('Invalid input data');
        
        return response;
    }
    
    // fill the array with numbers
    for (let i = from + 1; i < to; i++) {
        response.push(i);
    }
    
    alert(`First number: ${from}
Second number: ${to}
Numbers between: ${response}`);
    
    return response;
}
