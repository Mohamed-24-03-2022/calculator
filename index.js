const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const eraserButton = document.querySelector(".eraser");
const equalButton = document.querySelector(".equal");
const input = document.querySelector("#display");
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

const choosingOperator = () => {
    operatorButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            operatorArray.push(e.target.textContent);

            // if result does exist
            if (result !== 0) {
                firstInputString = `${result}`;
                secondInputArray.pop();
            }
            input.value = `${firstInputString} ${operatorArray[0]} ${secondInputString}`;
        });
    });
};

const calculate = () => {
    equalButton.addEventListener("click", (e) => {
        firstInputNumber = Number(firstInputString);
        secondInputNumber = Number(secondInputString);
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
                result = operate(divide, firstInputNumber, secondInputNumber);
                input.value = result;
                break;
            default:
                break;
        }
        firstInputArray.splice(0, firstInputArray.length);
        secondInputArray.splice(0, secondInputArray.length);
        operatorArray.splice(0, operatorArray.length);
        firstInputString = "";
        secondInputString = "";
    });
};

const writingNumbers = () => {
    numberButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (
                operatorArray.includes("*") ||
                operatorArray.includes("/") ||
                operatorArray.includes("-") ||
                operatorArray.includes("+")
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
    choosingOperator();
    calculate();
};
writingNumbers();

// fix +/- button
// fix modulo button
// fix dot button
// make it capable for multiple calculations in a row
// dividing on 0 error display
