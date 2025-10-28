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
    if (op === '/' && op2 === 0) {
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
    if (waitingForNewInput) {
        currentDisplayValue = digit;
        waitingForNewInput = false;
    } else if (currentDisplayValue === '0') {
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
        currentDisplayValue = "0";
        return;
    }

    let displayString = String(value);

    if (displayString.length > MAX_DIGITS && !displayString.includes('e')) {
        displayString = Number(value).toPrecision(MAX_DIGITS);
        displayString = displayString.replace(/\.?0+$/, '');
    }

    if (displayString.length > MAX_DIGITS && displayString.includes('e')) {

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

function backSpace() {
    currentDisplayValue = currentDisplayValue.slice(0, -1);
    if (currentDisplayValue === '' || currentDisplayValue === '-') {
        currentDisplayValue = '0';
    }

    updateDisplay(currentDisplayValue);
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
        } else if (buttonId === 'backspace') {
            backSpace();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }

    if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperator(e.key);
    } else if (e.key === 'Enter') {
        handleEqual();
    } else if (e.key === 'Escape' || e.key === 'c') {
        clearCalculator();
    } else if (e.key === 'Backspace') {
        backSpace();
    } else if (e.key === '.') {
        inputPeriod();
    }
});


