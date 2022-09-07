// MAIN CALCULATOR
const calculator = {
  displayValue: '0', //string value for input of user / result of operation
  firstArgument: null, // first operand
  SecondArgument: false,
  operator: null,
};
// INPUTING DIGIT
function inputDigit(digit) {
  const { displayValue, SecondArgument } = calculator;

  if (SecondArgument === true) {
    calculator.displayValue = digit;
    calculator.SecondArgument = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}
// INPUTING DECIMAL
function inputDecimal(dot) {
  if (calculator.SecondArgument === true) {
  	calculator.displayValue = "0."
    calculator.SecondArgument = false;
    return
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}
// INPUTING NEXT OPERATOR
function handleOperator(nextOperator) {
  const { firstArgument, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);
  // adding another operator to the output.
  if (operator && calculator.SecondArgument)  {
    calculator.operator = nextOperator;
    return;
  }

  // 
  if (firstArgument == null && !isNaN(inputValue)) {
    calculator.firstArgument = inputValue;
  } else if (operator) {
    const result = calculate(firstArgument, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstArgument = result;
  }

  calculator.SecondArgument = true;
  calculator.operator = nextOperator;
}

function calculate(firstArgument, secondArgument, operator) {
  if (operator === '+') {
    return firstArgument + secondArgument;
  } else if (operator === '-') {
    return firstArgument - secondArgument;
  } else if (operator === '*') {
    return firstArgument * secondArgument;
  } else if (operator === '/') {
    return firstArgument / secondArgument;
  }
  return secondArgument;
}


function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstArgument = null;
  calculator.SecondArgument = false;
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