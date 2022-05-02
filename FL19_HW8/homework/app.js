// #1
function extractCurrencyValue(param) {
    const CONDITION = 16;
    
    // remove all non digital symbols
    let response = param.replace(/[^\d.]/g, '');
    
    // main condition
    if (response.length >= CONDITION) {
        response = BigInt(response);
    } else {
        response = Number(response);
    }
    
    return response;
}
// console.log(extractCurrencyValue('120 USD')); // 120
// console.log(extractCurrencyValue('1283948234720742 EUR')); // 1283948234720742n

// #2
let object = {
    name: 'Ann',
    age: 16,
    hobbies: undefined,
    degree: null,
    isChild: false,
    isTeen: true,
    isAdult: false
}

function clearObject(object) {
    const response = {...object};
    
    for (let key in response) {
        if (response.hasOwnProperty(key)) {
    
            let value = response[key];
    
            // cleanup
            if (typeof value === 'undefined' || value === null || value === false || value === 0) {
                delete response[key];
            }
        }
    }
    
    return response;
}
// console.log(clearObject(object)); // { name: 'Ann', age: 16, isTeen: true }


// #3
function getUnique(param) {
    return Symbol(param);
}
// console.log(getUnique('Test')) // Symbol('Test')


// #4
function countBetweenTwoDays(startDate, endDate) {
    const MS_IN_DAY = 1000 * 3600 * 24;
    const MS_IN_WEEK = 7 * MS_IN_DAY;
    const MS_IN_MONTH = 4 * MS_IN_WEEK;
    
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    
    const odds = Math.abs(endDateObject.getTime() - startDateObject.getTime());
    const days = Math.round(odds / MS_IN_DAY);
    const weeks = Math.round(odds / MS_IN_WEEK);
    const months = Math.round(odds / MS_IN_MONTH);
    
    return `The difference between dates is: ${days} day(-s), ${weeks} week(-s), ${months} month(-s)`;
}
// console.log(countBetweenTwoDays('03/22/22', '05/25/22')); // The difference between dates is: 64 day(-s), 9 week(-s), 2 month(-s)


// #5
// First
function filterArray(arr) {
    return Array.from(new Set(arr));
}

function filterArray2(arr) {
    let result = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i]);
        }
    }
    
    return result;
}
// console.log(filterArray([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9])); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(filterArray2([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9])); // [1, 2, 3, 4, 5, 6, 7, 8, 9]