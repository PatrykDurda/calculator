// MAIN CALCULATOR
const calculator = {
  displayValue: '0',
  firstOperand: null,
  SecondOperand: false,
  operator: null,
};
// INPUTING DIGIT
function inputDigit(digit) {
  const { displayValue, SecondOperand } = calculator;

  if (SecondOperand === true) {
    calculator.displayValue = digit;
    calculator.SecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}
// INPUTING DECIMAL
function inputDecimal(dot) {
  if (calculator.SecondOperand === true) {
  	calculator.displayValue = "0."
    calculator.SecondOperand = false;
    return
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}
// INPUTING NEXT OPERATOR
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);
  
  if (operator && calculator.SecondOperand)  {
    calculator.operator = nextOperator;
    return;
  }


  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.SecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}


function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.SecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});