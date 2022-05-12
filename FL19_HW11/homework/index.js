//task 1
function getWeekDay (date) {
    const dateObject = new Date(date);
    const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayNumber = dateObject.getDay();
    
    return daysArray[dayNumber];
}
// console.log(getWeekDay(new Date(2020, 9, 22)));
// console.log(getWeekDay(Date.now()));

//task 2
function getAmountDaysToNewYear(days) {
    const date = new Date(days.replace(/(st)|(th)/, ''));
    
    const currentDate = new Date();
    currentDate.setMonth(date.getMonth(), date.getDate());
    
    const endOfTheYearDate = new Date();
    endOfTheYearDate.setMonth(11, 31);
    endOfTheYearDate.setHours(23, 59, 59, 999);
    
    const ONE_DAY = 1000 * 60 * 60 * 24;
    
    return Math.ceil((endOfTheYearDate - currentDate) / ONE_DAY);
}
// console.log(getAmountDaysToNewYear('30th August'));//124
// console.log(getAmountDaysToNewYear('1st January'));//365

// task 3
const MS_IN_DAY = 1000 * 3600 * 24;
const MS_IN_YEAR = 365 * MS_IN_DAY;

const birthday17 = new Date(2004, 12, 29);
const birthday15 = new Date(2006, 12, 29);
const birthday22 = new Date(2000, 9, 22);

function getApproveToPass(date) {
    const nowDate = new Date();
    const years = (nowDate - date) / MS_IN_YEAR;
    
    switch (true) {
        case years < 17:
            return `Hello adventurer, you are to yang for this quest wait for ${Math.ceil(18 - years)} years more!`;
        
        case years < 18:
            return 'Hello adventurer, you are to yang for this quest wait for few more months!';
        
        default:
            return 'Hello adventurer, you may pass!';
    }
}

// console.log(getApproveToPass(birthday17));
// console.log(getApproveToPass(birthday15));
// console.log(getApproveToPass(birthday22));

//task 4
const elementP = 'tag="div" class="text" style={color: #aeaeae;} value="Hello World!"';

function transformStringToHtml(string) {
    const [,tag] = string.match(/tag="(.*?)"/);
    const [,className] = string.match(/class="(.*?)"/);
    const [,styles] = string.match(/style={(.*?)}/);
    const [,value] = string.match(/value="(.*?)"/);

    return `<${tag} class="${className}" style="${styles}">${value}</${tag}>`;
}

console.log(transformStringToHtml(elementP));

//task 5
function isValidName(variables) {
    return /^[a-z]+[a-z0-9_$]*$/i.test(variables);
}

// console.log(isValidName('myVar!'));//false
// console.log(isValidName('myVar$'));//true
// console.log(isValidName('myVar_1'));//true
// console.log(isValidName('1_myVar'));//false

//task 6
const testStr = 'My name is John Smith. I am 27.';

function capitalize (string) {
    return string.replace(/\b[a-z]/g, char => char.toUpperCase());
}

// console.log(capitalize(testStr));

//task 7
function isValidPassword(string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(string);
}
// console.log(isValidPassword('agent007'));// false (no uppercase letter)
// console.log(isValidPassword('AGENT007'));// false (no lowercase letter)
// console.log(isValidPassword('AgentOOO'));// false (no numbers)
// console.log(isValidPassword('Age_007'));// false (too short)
// console.log(isValidPassword('Agent007'));// true

//task 8
function bubbleSort (array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }

    return array;
}

// console.log(bubbleSort([7,5,2,4,3,9])); //[2, 3, 4, 5, 7, 9]

//task 9
const inventory = [
    { name: 'milk', brand: 'happyCow', price: 2.1 },
    { name: 'chocolate', brand: 'milka', price: 3 },
    { name: 'beer', brand: 'hineken', price: 2.2 },
    { name: 'soda', brand: 'coca-cola', price: 1 } ];

function sortByItem () {
  return inventory.sort((a, b) => {
      if (a.name > b.name) {
          return 1;
      }
      
      if (a.name < b.name) {
          return -1;
      }
      
      return 0;
  });
}

// console.log(sortByItem({item: 'name', array: inventory})); // will return [
//{ "name": "beer", "brand": "hineken", "price": 2.2 },
//{ "name": "chocolate", "brand": "milka", "price": 3 },
//{ "name": "milk", "brand": "happyCow", "price": 2.1 },
//{ "name": "soda", "brand": "coca-cola", "price": 1 } ]

