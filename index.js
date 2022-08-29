const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const eraserButton = document.querySelector(".eraser");
const equalButton = document.querySelector(".equal");
const input = document.querySelector("#display");
const plusMinusButton = document.querySelector(".plusMinus");
const dotButton = document.querySelector(".dot");
const allButtons = document.querySelectorAll("button");
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
    result = num1 + num2;
    return Math.round((result + Number.EPSILON) * 100) / 100;
};
const subtract = (num1, num2) => {
    result = num1 - num2;
    return Math.round((result + Number.EPSILON) * 100) / 100;
};
const multiply = (num1, num2) => {
    result = num1 * num2;
    return Math.round((result + Number.EPSILON) * 100) / 100;
};
const divide = (num1, num2) => {
    result = num1 / num2;
    return Math.round((result + Number.EPSILON) * 100) / 100;
};
const modulo = (num1, num2) => {
    return num1 % num2;
};
const plusMinus = (num) => {
    result = num * -1;
    return Math.round((result + Number.EPSILON) * 100) / 100;
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
    dotButton.disabled = false;
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
    if (!firstInputString.includes(".") || !secondInputString.includes(".")) {
        dotButton.disabled = false;
    }
});

const operatorGenerator = (e) => {
    operatorArray.push(e.target.textContent);

    if (
        firstInputString !== "" &&
        operatorArray[0] !== "" &&
        secondInputString === ""
    ) {
        operatorArray.splice(0, operatorArray.length);
        operatorArray.push(e.target.textContent);
    }
    if (firstInputString === "") {
        firstInputString = secondInputString;
    }
    if (result !== 0) {
        firstInputString = `${result}`;
        result = 0;
    }

    if (firstInputString !== "" && secondInputString !== "") {
        calculate();
        e.target.click();
    }
    input.value = `${firstInputString} ${operatorArray[0]} ${secondInputString}`;
    dotButton.disabled = false;
};

operatorButtons.forEach((button) => {
    button.addEventListener("click", operatorGenerator);
});

const launchingCalculation = (opIndex) => {
    switch (opIndex) {
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
                input.value = "Error";
            } else {
                secondInputNumber = secondInputNumber;
                result = operate(divide, firstInputNumber, secondInputNumber);
                input.value = result;
            }
            break;
        case "%":
            result = operate(modulo, firstInputNumber, secondInputNumber);
            input.value = result;
            break;
        default:
            (input.value = firstInputNumber), secondInputNumber;
            break;
    }
};
const calculate = () => {
    if (secondInputString === "") return;
    firstInputNumber = Number(firstInputString);
    secondInputNumber = Number(secondInputString);
    launchingCalculation(operatorArray[0]);
    firstInputArray.splice(0, firstInputArray.length);
    secondInputArray.splice(0, secondInputArray.length);
    operatorArray.splice(0, operatorArray.length);
    firstInputString = "";
    secondInputString = "";
    dotButton.disabled = false;
};
equalButton.addEventListener("click", calculate);

const disableDotButton = (inputString) => {
    if (inputString.includes(".")) {
        dotButton.disabled = true;
    } else if (!inputString.includes(".")) {
        dotButton.disabled = false;
    }
};
const writingNumbers = (e) => {
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
        disableDotButton(secondInputString);
        input.value = `${firstInputString} ${operatorArray[0]} ${secondInputString}`;
    } else {
        firstInputArray.push(e.target.textContent);
        firstInputString = firstInputArray.join().replace(/[,]/g, "");
        disableDotButton(firstInputString);
        input.value = firstInputString;
    }
};
numberButtons.forEach((button) => {
    button.addEventListener("click", writingNumbers);
});

plusMinusButton.addEventListener("click", () => {
    // input.value = input.value * -1;
    if (input.value !== "") {
        if (secondInputString !== "" || operatorArray[0]) {
            secondInputString = operate(plusMinus, secondInputString).toString();
            input.value = `${firstInputString} ${operatorArray[0]} ${secondInputString}`;
        } else {
            result = operate(plusMinus, input.value);
            input.value = result;
        }
        result = 0;
    }
});

const pressButton = (e) => {
    numberButtons.forEach((button) => {
        if (e.key === button.textContent) {
            button.click();
            button.classList.add("button-keydown");
        }
    });
    operatorButtons.forEach((button) => {
        if (e.key === button.textContent) {
            button.click();
            button.classList.add("button-keydown");
            button.click();

        }
    });
    if (e.key === "Enter") {
        equalButton.click();
        equalButton.classList.add("equal-keydown");
    } else if (e.key === "Backspace") {
        eraserButton.click();
        eraserButton.classList.add("button-keydown");
    }
    if (result !== 0) input.value = result;
    allButtons.forEach((button) => {
        button.blur();
    });
};
window.addEventListener("keyup", pressButton);
// to remove the css classes after clicking in the button
allButtons.forEach(button => {
    button.addEventListener("transitionend", (e) => {
        e.target.classList.remove("button-keydown");
        e.target.classList.remove("equal-keydown");
    });
});