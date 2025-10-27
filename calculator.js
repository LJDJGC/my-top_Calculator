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

function handleEqual() {
    if(firstOperand === null || operatorValue === null || waitingForNewInput === true) {

        return;
    }
    const secondOperand = parseFloat(currentDisplayValue);
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
        firstOperand = parseFloat(currentDisplayValue);
    } else if (operatorValue && !waitingForNewInput) {
        const result = operate(firstOperand, parseFloat(currentDisplayValue), operatorValue);

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
function updateDisplay(value) {
    if (value === "Zero Division Error") {
        display.textContent = "OMG:(";
        return;
    }
    let tempString = num.toPrecision(MAX_DIGITS + 1);
    let displayString = String(value);

    if (tempString.length > String(num).length && String(num).includes('e') === false) {
        let roundString = num.toPrecision(MAX_DIGITS).replace(/\.?0+$/, '');

        displayString = roundString;
    }

    currentDisplayValue = displayString;
    display.textContent = displayString;
}

function inputPeriod() {
    if (currentDisplayValue.includes('.')=== false) {
        currentDisplayValue += '.';
        display.textContent = currentDisplayValue;
    }
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

    button.addEventListener('click', () => {
        const operatorSymbol = operatorMap[buttonId];

        if (!isNaN(parseFloat(buttonValue)) && buttonValue !== '.') {
            inputDigit(buttonValue);
        } else if(operatorSymbol) {
            handleOperator(operatorSymbol);
        } else if(buttonId === 'equal') {
            handleEqual();
        } else if(buttonId === 'clear') {
            clearCalculator();
        } else if(buttonId === 'period') {
            inputPeriod();
        }
    });
});


