const calculator = {
  displayValue: 0,
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.innerText = calculator.displayValue;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function inputDegit(degit) {
  const currentValue = calculator.displayValue.toString();

  if (currentValue.length === 14) {
    return;
  } else if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = degit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      calculator.displayValue === 0 ? degit : calculator.displayValue + degit;
  }
}

function inputDecemal(dot) {
  const currentValue = calculator.displayValue.toString();

  if (currentValue.length === 14) {
    return;
  } else if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  } else if (currentValue.indexOf(".") === -1) {
    calculator.displayValue += dot;
  }
}

function handleOperator(NextOperator) {
  const { firstOperand, operator } = calculator;
  const inputValue = parseFloat(calculator.displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = NextOperator;
    return;
  } else if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(5))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = NextOperator;
}

function handleEqual() {
  const { firstOperand, operator } = calculator;
  const inputValue = parseFloat(calculator.displayValue);

  if (firstOperand === null || operator === null) {
    return;
  } else if (operator && !calculator.waitingForSecondOperand) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(5))}`;

    calculator.firstOperand = result;
    calculator.waitingForSecondOperand = true;
    calculator.operator = null;
  }
}

function resetCalculator() {
  calculator.displayValue = 0;
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function deleteKey() {
  calculator.displayValue = calculator.displayValue.toString().slice(0, -1);
  if (calculator.displayValue === "") {
    calculator.displayValue = 0;
  }

  if (calculator.waitingForSecondOperand) {
    calculator.firstOperand = parseFloat(calculator.displayValue);
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
}

document.querySelectorAll("button").forEach(function (button) {
  button.addEventListener("click", function (event) {
    const { target } = event;

    if (target.classList.contains("operator")) {
      handleOperator(target.value);
      updateDisplay();
      return;
    } else if (target.classList.contains("decimal")) {
      inputDecemal(target.value);
      updateDisplay();
      return;
    } else if (target.classList.contains("equal-sign")) {
      handleEqual();
      updateDisplay();
      return;
    } else if (target.classList.contains("delete-key")) {
      deleteKey();
      updateDisplay();
      return;
    } else if (target.classList.contains("all-clear")) {
      resetCalculator();
      updateDisplay();
      return;
    }

    inputDegit(target.value);
    updateDisplay();
  });
});
