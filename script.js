function add(x, y) {
    return Math.round((+x + +y)*1000)/1000;
};

function subtract(x, y) {
    return Math.round((+x - +y)*1000)/1000;
};

function multiply(x, y) {
    return Math.round((+x * +y)*1000)/1000;
};

function divide(x, y) {
    return Math.round((+x / +y)*1000)/1000;
};

// operate function actually evaluate the entire operation and return mathematically the right result, which is not what the project is asking for
/*function operate(operationArray) {

    if (operationArray.includes('*') || operationArray.includes('/')) {
        for (let i = 0; i < operationArray.length - 1; i++) {
            if (operationArray[i] == '*') {
                operationArray[i-1] = multiply(operationArray[i-1], operationArray[i+1]);
                operationArray.splice(i, 2);
                i -= 2;
                
            }else if (operationArray[i] == '/') {
                operationArray[i-1] = divide(operationArray[i-1], operationArray[i+1]);
                operationArray.splice(i, 2);
                i -= 2;

            }else {
                continue;

            };
        };
    };

    if (operationArray.includes('-') || operationArray.includes('+')) {
        for (let i = 0; i < operationArray.length - 1; i++) {
            if (operationArray[i] == '-') {
                operationArray[i-1] = subtract(operationArray[i-1], operationArray[i+1]);
                operationArray.splice(i, 2);
                i -= 2;

            }else if (operationArray[i] == '+') {
                operationArray[i-1] = add(operationArray[i-1], operationArray[i+1]);
                operationArray.splice(i, 2);
                i -= 2;

            }else {
                continue;

            };
        };
    };

    return operationArray;
};*/

// Each pair of numbers being evaluated at a time, operationArray = [number, operator, number]
function operate(operationArray) {
    if (operationArray.includes('*')) {
        if (`${multiply(operationArray[0], operationArray[2])}`.length > 10) {

            return multiply(operationArray[0], operationArray[2]).toExponential(4);
        }else {
            return multiply(operationArray[0], operationArray[2]);
        };

    };

    if (operationArray.includes('/')) {
        if (`${divide(operationArray[0], operationArray[2])}`.length > 10) {

            return divide(operationArray[0], operationArray[2]).toExponential(4);
        }else {
            return divide(operationArray[0], operationArray[2]);
        };

    };
    
    if (operationArray.includes('+')) {
        if (`${add(operationArray[0], operationArray[2])}`.length > 10) {

            return add(operationArray[0], operationArray[2]).toExponential(4);
        }else {
            return add(operationArray[0], operationArray[2]);
        };
    };

    if (operationArray.includes('-')) {
        if (`${subtract(operationArray[0], operationArray[2])}`.length > 10) {

            return subtract(operationArray[0], operationArray[2]).toExponential(4);
        }else {
            return subtract(operationArray[0], operationArray[2]);
        };

    };

};

function displayNumbers(number) {
    const active = document.querySelector('.active');
    if (display.textContent == '0') {
        display.innerText = "";

    };
    
    if (active || equal.classList.value.includes('active')) {
        display.innerText = number;

    }else {
        if (display.textContent.length == 10) {
            display.innerText += "";
        }else {
            display.innerText += number;
        }

    };

};

function setOperator(operator) {
    operationArray.push(display.textContent, operator);
};

function setDecimalPoint() {
    const active = document.querySelector('.active');
    if (active) {
        if (!display.textContent.includes('.')) {
            display.innerText = '0.';
        };
    }else {
        if (!display.textContent.includes('.')) {
            display.innerText += '.';
        };
    };
};

function finalResult(operationArray) {
    if (operationArray.length === 3) {
        display.innerText = operate(operationArray);
    };
};

const buttons = document.querySelectorAll('.button');
const numbers = document.querySelectorAll('#number');
const operators = document.querySelectorAll('#operator');
const display = document.querySelector('#display');
const clear = document.querySelector('#clear');
const allClear = document.querySelector('#all-clear');
const decimalPoint = document.querySelector('#decimal');
const equal = document.querySelector('#equal');
let operationArray = [];

numbers.forEach(number => {
    number.addEventListener('click', () => {
        displayNumbers(number.textContent);
        operators.forEach(operator => {
            operator.classList.remove('active');
        });
        equal.classList.remove('active');
    });
    
});

decimalPoint.addEventListener('click', () => {
    setDecimalPoint();
    operators.forEach(operator => {
        operator.classList.remove('active');
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        const active = document.querySelector('.active');
        if (active) {
            active.classList.remove('active');
        };
        
        equal.classList.remove('active');
        e.target.classList.add('active');
        setOperator(e.target.textContent);

        if (operationArray.length == 4) {
            displayNumbers(operate([operationArray[0], operationArray[1], operationArray[2]]));
            operationArray[0] = display.textContent;
            operationArray.splice(1, 2);
        };

    });
    
});

clear.addEventListener('click', () => {
    if (display.textContent.length == 1) {
        display.innerText = "0";
    }else {
        display.innerText = display.textContent.slice(0, display.textContent.length-1);
    };
});

allClear.addEventListener('click', () => {
    display.innerText = "0";
    operationArray = [];
    operators.forEach(operator => {
        operator.classList.remove('active');
    });
} );

equal.addEventListener('click', () => {
    equal.classList.add('active');
    operationArray.push(display.textContent);
    finalResult(operationArray);
    operationArray = [];
});