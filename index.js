const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const eraserButton = document.querySelector(".eraser");
const equalButton = document.querySelector(".equal");
const input = document.querySelector("#display");
const plusMinusButton = document.querySelector(".plusMinus");
//  first input
const firstInputArray = [];
let firstInputString = "";
let firstInputNumber = 0;
//  second input
const secondInputArray = [];
let secondInputString = "";
let secondInputNumber = 0;
//  operator
const operatorArray = [];
//  result
let result = 0;
let resultString = "";

const add = (num1, num2) => {
    return num1 + num2;
};

const subtract = (num1, num2) => {
    return num1 - num2;
};

const multiply = (num1, num2) => {
    return num1 * num2;
};

const divide = (num1, num2) => {
    return num1 / num2;
};
const modulo = (num1, num2) => {
    return num1 % num2;
};
const plusMinus = (num) => {
    return num * (-1);
};
const operate = (operator, num1, num2) => {
    return operator(num1, num2);
};

input.addEventListener("focus", (e) => {
    e.target.blur();
});

clearButton.addEventListener("click", () => {
    firstInputArray.splice(0, firstInputArray.length);
    secondInputArray.splice(0, secondInputArray.length);
    operatorArray.splice(0, operatorArray.length);
    firstInputString = "";
    secondInputString = "";
    result = 0;
    input.value = 0;
});

eraserButton.addEventListener("click", () => {
    if (secondInputString.length !== 0) {
        secondInputArray.pop();
        let erasedSecondString = secondInputString.slice(0, -1);
        secondInputString = erasedSecondString;
        erasedSecondString = secondInputString;
        input.value = `${firstInputString} ${operatorArray[0]} ${secondInputString}`;
    } else if (operatorArray.length !== 0) {
        operatorArray.pop();
        input.value = `${firstInputString}`;
    } else if (firstInputString.length !== 0) {
        firstInputArray.pop();
        let erasedSecondString = firstInputString.slice(0, -1);
        firstInputString = erasedSecondString;
        erasedSecondString = firstInputString;
        input.value = `${firstInputString}`;
    } else if (result !== 0) {
        result = result.toString();
        erasedString = result.slice(0, -1);
        result = erasedString;
        erasedString = resultString;
        input.value = `${result}`;
    }
    if (input.value === "") {
        firstInputString = "";
        secondInputString = "";
        result = 0;
        input.value = "0";
        operatorArray.splice(0, operatorArray.length);
    }
});


const operatorGenerator = (e) => {
    //// console.log(result, firstInputString, secondInputString);
    operatorArray.splice(0, operatorArray.length);
    operatorArray.push(e.target.textContent);

    // if result does exist
    if (result !== 0) {
        firstInputString = `${result}`;
        result = 0;
    }
    input.value = `${firstInputString} ${operatorArray[0]} ${secondInputString}`;

    // if firstInputString and secondInputString does exist
    if (firstInputString !== '' && secondInputString !== '') {
        //// console.log(result, firstInputString, secondInputString);
        equalButton.click();
        e.target.click();
    }
}


operatorButtons.forEach((button) => {
    button.addEventListener("click", operatorGenerator);
});


const launchingCalculation = () => {
    switch (operatorArray[0]) {
        case "*":
            result = operate(multiply, firstInputNumber, secondInputNumber);
            input.value = result;
            break;

        case "+":
            result = operate(add, firstInputNumber, secondInputNumber);
            input.value = result;
            break;
        case "-":
            result = operate(subtract, firstInputNumber, secondInputNumber);
            input.value = result;
            break;
        case "/":
            if (secondInputNumber === 0) {
                input.value = 'Error';
            }
            else {
                secondInputNumber = secondInputNumber;
                result = operate(divide, firstInputNumber, secondInputNumber);
                input.value = result;
            }
            break;
        case "%":
            result = operate(modulo, firstInputNumber, secondInputNumber);
            input.value = result;
            break;
        default: break;
    }
}
const calculate = () => {
    firstInputNumber = Number(firstInputString);
    secondInputNumber = Number(secondInputString);
    launchingCalculation();
    firstInputArray.splice(0, firstInputArray.length);
    secondInputArray.splice(0, secondInputArray.length);
    operatorArray.splice(0, operatorArray.length);
    firstInputString = "";
    secondInputString = "";
}
equalButton.addEventListener("click", calculate);


numberButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (result !== 0) result = 0;
        if (
            operatorArray.includes("*") ||
            operatorArray.includes("/") ||
            operatorArray.includes("-") ||
            operatorArray.includes("+") ||
            operatorArray.includes("%")
        ) {
            secondInputArray.push(e.target.textContent);
            secondInputString = secondInputArray.join().replace(/[,]/g, "");
            input.value = `${firstInputString} ${operatorArray[0]} ${secondInputString}`;
        } else {
            firstInputArray.push(e.target.textContent);
            firstInputString = firstInputArray.join().replace(/[,]/g, "");
            input.value = firstInputString;
        }
    });
});


plusMinusButton.addEventListener("click", () => {
    // input.value = input.value * -1;
    result = operate(plusMinus, input.value);
    input.value = result;
});

// fix +/- button
// fix modulo button
// make it capable for multiple calculations in a row
// dividing on 0 error display
//TODOS fix dot button
//TODOS Style it with bootstrap