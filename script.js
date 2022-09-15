// MAIN CALCULATOR
const calculator = {
  displayValue: '0', //string value for input of user / result of operation
  firstArgument: null, // first argument
  SecondArgument: false, // it checkes if first arg and operator have been inputted.
  operator: null, // operator
};
// INPUT DIGIT
function inputDigit(digit) {
  const { displayValue, SecondArgument } = calculator;
// Overwrite 'displayValue' with what was clicked
  if (SecondArgument === true) {
    calculator.displayValue = digit;
    calculator.SecondArgument = false;
  } else { // Overwrite `displayValue` if the current value is '0' otherwise add to it
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}
// INPUT DECIMAL
function inputDecimal(dot) {
  // if nothing is displayed as secondArgument then add '0.'
  if (calculator.SecondArgument === true) {
  	calculator.displayValue = "0."
    calculator.SecondArgument = false;
    return
  }
  // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // add the decimal point
    calculator.displayValue += dot;
  }
}
// INPUT NEXT OPERATOR
function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstArgument, displayValue, operator } = calculator
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);


  if (operator && calculator.SecondArgument)  {
    calculator.operator = nextOperator;
    return;
  }

  // verify that `firstArgument` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstArgument == null && !isNaN(inputValue)) {
  // Update firstArgument
    calculator.firstArgument = inputValue;
  } else if (operator) {
    const result = calculate(firstArgument, inputValue, operator);
    // Set maximum number of numbers after decimal point.
    // Get rid of repeating numbers after decimal point.
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstArgument = result;
  }

  calculator.SecondArgument = true;
  calculator.operator = nextOperator;
}
// CALCULATE
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

// RESET CALCULATOR
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstArgument = null;
  calculator.SecondArgument = false;
  calculator.operator = null;
}
// SHOWING CONTENT OF display.value ALL THE TIME
function updateDisplay() {
  // element with class 'calculator-screen'
  const display = document.querySelector('.calculator-screen');
  // updating value of element with contents of 'displayValue'
  display.value = calculator.displayValue;
}

updateDisplay();

// LISTENING FOR CLICKS ON THE CALCULATOR KEYS / DETERMINING PRESSED TYPE OF KEY
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const target = event.target; // extracting target of the click event
  const { value } = target; // target represents the element that was clicked
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
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});