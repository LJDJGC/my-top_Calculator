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

allButtons.forEach(button => {
    const buttonValue = button.textContent;

    if (!isNaN(parseFloat(buttonValue)) && buttonValue != '.') {
        inputDigit(buttonValue);
    }

    if (button.id === 'zero') {
        if (currentDisplayValue !== '0' || currentDisplayValue.includes('.')) {
            currentDisplayValue += '0';
        }
    }

    if (button.id === 'one') {
        if (currentDisplayValue === '0') {
            currentDisplayValue = '1';
        } else {
        currentDisplayValue += '1';
        }
    }

    if (button.id === 'two') {
        if (currentDisplayValue === '0') {
            currentDisplayValue = '2';
        } else {
        currentDisplayValue += '2';
        }
    }

    if (button.id === 'three') {
        if (currentDisplayValue === '0') {
            currentDisplayValue = '3';
        } else {
        currentDisplayValue += '3';
        }
    }

    if (button.id === 'four') {
        if (currentDisplayValue === '0') {
            currentDisplayValue = '4';
        } else {
        currentDisplayValue += '4';
        }
    }

    if (button.id === 'five') {
        if (currentDisplayValue === '0') {
            currentDisplayValue = '5';
        } else {
        currentDisplayValue += '5';
        }
    }

    if (button.id === 'six') {
        if (currentDisplayValue === '0') {
            currentDisplayValue = '6';
        } else {
        currentDisplayValue += '6';
        }
    }

    if (button.id === 'seven') {
        if (currentDisplayValue === '0') {
            currentDisplayValue = '7';
        } else {
        currentDisplayValue += '7';
        }
    }

    if (button.id === 'eight') {
        if (currentDisplayValue === '0') {
            currentDisplayValue = '8';
        } else {
        currentDisplayValue += '8';
        }
    }

    if (button.id === 'nine') {
        if (currentDisplayValue === '0') {
            currentDisplayValue = '9';
        } else {
        currentDisplayValue += '9';
        }
    }

    if (button.id === 'period') {
        if (!currentDisplayValue.includes('.')) {
            currentDisplayValue += '.';
        }
    }

    if (button.id === 'add') {
        const firstOperand = parseFloat(currentDisplayValue);
        operatorValue = '+';
        waitingForNewInput = true;
    }

    if (button.id === 'subtract') {
        const firstOperand = parseFloat(currentDisplayValue);
        operatorValue = '-';
        waitingForNewInput = true;
    }

    if (button.id === 'multiply') {
        const firstOperand = parseFloat(currentDisplayValue);
        operatorValue = '×';
        waitingForNewInput = true;
    }

    if (button.id === 'divide') {
        const firstOperand = parseFloat(currentDisplayValue);
        operatorValue = '÷';
        waitingForNewInput = true;
    }


    
});


