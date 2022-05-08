// #1
function calculateSum(arr) {
    return arr.reduce((accumulator, number) => accumulator + number, 0);
}

// console.log(calculateSum([1, 2, 3, 4, 5])); //15

// #2
function isTriangle(a, b, c) {
    return a > 0 && b > 0 && c > 0 &&
        a + b > c &&
        b + c > a &&
        c + a > b;
}

// console.log(isTriangle(5, 6, 7)); //true
// console.log(isTriangle(2, 9, 3)); //false

// #3
function isIsogram(word) {
    const template = word.toLowerCase();
    const hash = {};
    
    for (let i = 0; i < template.length; i++) {
        if (hash[template[i]]) {
            return false;
        }
        
        hash[template[i]] = true;
    }
    
    
    
    return true;
}

// console.log(isIsogram('Dermatoglyphics')); //true
// console.log(isIsogram('abab')); //false

// #4
function isPalindrome(word) {
    let left = 0;
    let right = word.length - 1;
    
    while (left < right) {
        if (word[left] !== word[right]) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

// console.log(isPalindrome('Dermatoglyphics')); //false
// console.log(isPalindrome('abbabba')); //true

// #5
function showFormattedDate(dateObj) {
    const date = new Date(dateObj).toDateString().split(' ');
    const [, month, day, year] = date;
    
    return `${day} of ${month}, ${year}`;
}

// console.log(showFormattedDate(new Date('05/12/22'))); //'12 of May, 2022'

// #6
const letterCount = (str, letter) => {
    let count = 0;
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] === letter) {
            count++;
        }
    }
    
    return count;
}

// console.log(letterCount('abbaba', 'b')); //3

// #7
function countRepetitions(arr) {
    const objectArr = {};
    
    for (let i = 0; i < arr.length; i++) {
        const word = arr[i];
        
        if (objectArr[word] === undefined) {
            objectArr[word] = 0;
        }
    
        objectArr[word]++;
    }
    
    return objectArr;
}

// console.log(countRepetitions(['banana', 'apple', 'banana'])); // { banana: 2, apple: 1 }

// #8
function calculateNumber(arr) {
    const binaryString = arr.join('');
    
    return parseInt(binaryString, 2);
}

// console.log(calculateNumber([0, 1, 0, 1])); //5
// console.log(calculateNumber([1, 0, 0, 1])); //9