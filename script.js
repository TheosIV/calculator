function display() {
    buttons.forEach(button => {
        let clicked = button.textContent;
        
        button.addEventListener('click', () => {
            if (operationDisplay.textContent === "" && button.id === 'operator') {
                operationDisplay.innerText += "";
            }else if (button.id === 'operator' && operators.some(item => operationDisplay.textContent.includes(item))) {
                operationDisplay.innerText = clicked;
            }else if (button.id === 'operator' && !operators.some(item => operationDisplay.textContent.includes(item))) {
                operation.push(operationDisplay.textContent);
                resultDisplay.innerText += operationDisplay.textContent;
                operationDisplay.innerText = clicked;
            }else if (clicked === '0' && operationDisplay.textContent === '/') {
                dividingByZero = true
                operation.push(operationDisplay.textContent);
                resultDisplay.innerText += operationDisplay.textContent;
                alert("Math Error")
                operationDisplay.innerText = '0';
            }else if (button.id === 'number' && dividingByZero) {
                dividingByZero = false;
                operationDisplay.innerText = clicked;
            }else if (button.id === 'number' && !operators.some(item => operationDisplay.textContent.includes(item)) && previouslyClicked !== '=') {
                operationDisplay.innerText += clicked;
            }else if (button.id === 'number' && operators.some(item => operationDisplay.textContent.includes(item)) && previouslyClicked !== '=') {
                console.log('seb')
                operation.push(operationDisplay.textContent);
                resultDisplay.innerText += operationDisplay.textContent;
                operationDisplay.innerText = clicked;
            }else if (button.id === 'number' && previouslyClicked === '=') {
                resultDisplay.innerText = "";
                operationDisplay.innerText = clicked;
                previouslyClicked = null;
            }else if (button.id === '.' && !operationDisplay.textContent.includes('.') && !operators.some(item => operationDisplay.textContent.includes(item))) {
                operationDisplay.innerText += clicked;
            }else if (button.id === '.' && operationDisplay.textContent.includes('.')) {
                operationDisplay.innerText += "";
            }else if (button.id === 'equal') {
                
                if (operators.some(item => operationDisplay.textContent.includes(item)) || dividingByZero) {
                    console.log('mm')
                }else {
                    operation.push(operationDisplay.textContent);
                    console.log(operation)
                    operationDisplay.innerText = "";
                    resultDisplay.innerText = operate(operation);
                    ans = resultDisplay.textContent;
                    operation = [];
                    previouslyClicked = '=';
                }
            }else if (button.id == 'ans') {
                resultDisplay.innerText = "";
                operationDisplay.innerText = ans;
                previouslyClicked = null;
            }
            
        });
    });

    allClear.addEventListener('click', () => {
        operationDisplay.innerText = "";
        resultDisplay.innerText = "";
        operation = [];
    });
    
    clear.addEventListener('click', () => {
        operationDisplay.innerText = operationDisplay.textContent.slice(0, operationDisplay.textContent.length - 1); 
    });
};


function operate(array) {
    if (array.includes('x')|| array.includes('/')) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === 'x') {
                array[i-1] = +array[i-1] * +array[i+1]; 
                array.splice(i, 2);
                i -= 2;

            }else if (array[i] === '/') {
                array[i-1] = +array[i-1] / +array[i+1]; 
                array.splice(i, 2);
                i -= 2;

            }else {
                continue;
            };
        };
    };
    
    if (array.includes('-')) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === '-') {
                array[i-1] = +array[i-1] - +array[i+1]; 
                array.splice(i, 2);
                i -= 2;
            }else {
                continue;
            };
        };
    };
    if (array.includes('+')) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === '+') {
                array[i-1] = +array[i-1] + +array[i+1]; 
                array.splice(i, 2);
                i -= 2;
            }else {
                continue;
            };
        };
    };
    return array;
};


const buttons = document.querySelectorAll('.button');
const operationDisplay = document.querySelector('#operation');
const resultDisplay = document.querySelector('#result')
const decimalPoint = document.querySelector('#decimal-point');
const allClear = document.querySelector('#all-clear');
const clear = document.querySelector('#clear');
const operators = ['/', '+', '-', 'x'];
let operation = [];
let ans = null;
let previouslyClicked = null;
let dividingByZero = false;

display();