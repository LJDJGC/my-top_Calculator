function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let operand1 = 3;
let operand2 = 5;
let operator = '+';

function operate(op1, op2, op) {
    let calculateResult;
    if (op === '+') {
        calculateResult = add(op1, op2);
    } else if (op === '-') {
        calculateResult = subtract(op1, op2);
    } else if (op === '*') {
        calculateResult = multiply(op1, op2);
    } else if (op === '/') {
        calculateResult = divide(op1, op2);
        if (op2 === 0) {
            return "Error: Cannot divide by zero";
        }
    } 
    return calculateResult;
}

let result = operate(operand1, operand2, operator);

console.log(result);

const buttons = document.getElementById('buttons');
const allButtons = document.querySelectorAll('button');
const display = document.getElementById('display');


let currentDisplayValue = '0';
let firstOperand = null;
let operatorValue = null;
let waitingForNewInput = false;


function inputDigit(digit) {
    if (currentDisplayValue === '0') {
        currentDisplayValue = digit;
    } else {
        currentDisplayValue += digit; 
    }

    display.textContent = currentDisplayValue;
}

function handleEquals() {
    if(firstOperand !== null && operatorValue !== null && waitingForNewInput === false) {

        return result = currentDisplayValue;
    }
    firstOperand = null;
    operatorValue = null;
}

function handleOperator() {
    if(firstOperand !== null && operatorValue !== null && waitingForNewInput === false) {

        return result = currentDisplayValue;
    }
    currentDisplayValue = firstOperand;
    operatorValue = buttonValue;
    waitingForNewInput = true;
}

function clearCalculator() {
    currentDisplayValue = '0';
    firstOperand = null;
    operatorValue = null;
    waitingForNewInput = false;
    updateDisplay(currentDisplayValue);
}

function updateDisplay() {
    if (result === Number() && result.length > 9) {
        toFixed(Number());
    }
}

allButtons.forEach(button => {
    const buttonValue = button.textContent;
    const buttonId = button.id;

    button.addEventListener('click', () => {

        if (!isNaN(parseFloat(buttonValue)) && buttonValue != '.') {
            inputDigit(buttonValue);
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(buttonId)) {
            firstOperand = parseFloat(currentDisplayValue);
            operatorValue = buttonValue;
            waitingForNewInput = true;
        }
    
    });
});

