let resultDisp = document.querySelector(".Result");
let LastDisp = document.querySelector(".DisplayOperations");
let num1;
let num2;
let currOp = null;
let reset = false;

let numBtn = document.querySelector(".div4");
const operatorContainer = document.querySelector(".div5");
//create numeric keyboard
for (let i = 1; i <= 12; i++) {
  let btn = document.createElement("button");
  if (i === 10) {
    btn.innerText = ".";
  } else if (i === 11) {
    btn.innerText = "0";
  } else if (i === 12) {
    btn.innerText = "=";
  } else {
    btn.innerText = i;
  }
  btn.setAttribute("id", "button" + i);
  btn.setAttribute("value", btn.innerText);
  numBtn.appendChild(btn);
}

// create arithemetic operators buttons
let arithmeticOperators = ["CLEAR", "DELETE", "+", "-", "*", "/"];

for (let i = 0; i < arithmeticOperators.length; i++) {
  let btn = document.createElement("button");
  btn.innerText = arithmeticOperators[i];
  btn.setAttribute("id", arithmeticOperators[i]);

  operatorContainer.appendChild(btn);
}

numBtn.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.textContent));
});

operatorContainer.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => operation(btn.textContent));
});

function appendNumber(num) {
  if (resultDisp.textContent == "0" || reset) {
    resetScreen();
  }

  if (num == "=") {
    evaluate();
    reset = true;
  } else {
    resultDisp.textContent += num;
  }
}

function resetScreen() {
  resultDisp.textContent = "";
  reset = false;
}

function clear() {
  num1 = "";
  num2 = "";

  currOp = null;
  LastDisp.textContent = "";
  resultDisp.textContent = "0";
}

function del() {
  resultDisp.textContent = resultDisp.textContent.toString().slice(0, -1);
}
function operation(op) {
  if (currOp !== null && op !== "DELETE") {
    evaluate();
  }

  if (op == "CLEAR") {
    clear();
  } else if (op == "DELETE") {
    del();
  } else {
    num1 = resultDisp.textContent;
    currOp = op;
    LastDisp.textContent = `${num1} ${currOp}`;
    reset = true;
  }
}

function evaluate() {
  if (currOp == null || reset) {
    return;
  }
  num2 = resultDisp.textContent;
  resultDisp.textContent = operate(currOp, num1, num2);
  LastDisp.textContent = `${num1} ${currOp} ${num2} =`;
  currOp = null;
}

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

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);

    case "-":
      return subtract(a, b);

    case "*":
      return multiply(a, b);

    case "/":
      if (b == 0) return null;
      else return divide(a, b);

    default:
      return null;
  }
}
