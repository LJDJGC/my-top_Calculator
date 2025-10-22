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
    if (op === '/' && op2 ==='0') {
        return "Zero Division Error";
    }
    
    let calculateResult;
    if (op === '+') {
        calculateResult = add(op1, op2);
    } else if (op === '-') {
        calculateResult = subtract(op1, op2);
    } else if (op === '*') {
        calculateResult = multiply(op1, op2);
    } else if (op === '/') {
        calculateResult = divide(op1, op2);
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
    if(firstOperand === null || operatorValue === null || waitingForNewInput === true) {

        return;
    }
    const secondOperand = praseFloat(currentDisplayValue);
    const result = operate(firstOperand, secondOperand, operatorValue);
    if (result === "Zero Division Error") {
        updateDisplay(result);
        clearCalculator();
        return;
    }
    updateDisplay(result);

    firstOperand = null;
    operatorValue = null;
    waitingForNewInput = false;
}

function handleOperator(nextOperator) {
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operatorValue && !waitingForNewInput) {
        const result = operate(firstOperand, inputValue, operatorValue);

        if (result === "Zero Division Error") {
            updateDisplay(result);
            clearCalculator();
            return;
        }

        firstOperand = result;
        updateDisplay(result);
    }

    operatorValue = nextOperator;
    waitingForNewInput = true;
}

function clearCalculator() {
    currentDisplayValue = '0';
    firstOperand = null;
    operatorValue = null;
    waitingForNewInput = false;
    updateDisplay(currentDisplayValue);
}

const MAX_DIGITS = 9;
function updateDisplay() {
    if (result === "Zero Division Error") {
        display.textContent = "OMG";
        return;
    }
    let displayString = String(value);

    if (displayString.length > MAX_DIGITS) {
        const num = parseFloat(value);
        let roundString = num.toPrecision(MAX_DIGITS).replace(/\.?0+$/, '');

        displayString = roundString;
    }

    currentDisplayValue = displayString;
    display.textContent = displayString;
}

allButtons.forEach(button => {
    const buttonValue = button.textContent;
    const buttonId = button.id;
    
    const operatorMap = {
        'add': '+',
        'subtract': '-',
        'multiply': '*',
        'divide': '/'
    };
    
    button.addEventListener('click' () => {
        const operatorSymbol = operatorMap[buttonID];

        if (!isNaN(parseFloat(buttonValue)) && buttonValue !== '.') {
            inputDigit(buttonValue);
        } if(operatorSymbol) {
            handleOperator(operatorSymbol);
        } else if(buttonId === 'equals') {
            handleEquals();
        } else if(buttonId === 'clear') {
            clearCalculator();
        }
    });
});

