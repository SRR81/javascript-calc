const numButtons = document.getElementsByClassName("numpad");
const funcButtons = document.getElementsByClassName("funcpad");
var displayDiv = document.getElementById("display");

var readyForNewNumber = true;
var activeOp = "";
var storedValue = 0;

displayDiv.innerHTML = storedValue;

Array.from(numButtons).forEach((btn) => {
     btn.onclick = numClick;
});
Array.from(funcButtons).forEach((btn) => {
     btn.onclick = funcClick;
});

function numClick() {
     if (readyForNewNumber) {
          displayDiv.innerHTML = 0;
          readyForNewNumber = false;
     }
     if (displayDiv.innerHTML == "0" && this.value != ".") {
          displayDiv.innerHTML = this.value;
     } else {
          if (displayDiv.innerHTML.toString().length <= 9) {
               displayDiv.innerHTML += this.value;
          }
     }
}

function funcClick() {
     switch (this.value) {
          case "+":
               doOperation(this.value);
               break;
          case "-":
               doOperation(this.value);
               break;
          case "*":
               doOperation(this.value);
               break;
          case "/":
               doOperation(this.value);
               break;
          case "=":
               finishActiveOperations();
               storedValue = 0;
               break;
          case "C":
               resetActive();
               displayDiv.innerHTML = 0;
               storedValue = 0;
               break;
          case "CE":
               displayDiv.innerHTML = 0;
               readyForNewNumber = true;
               break;
          case "%":
               displayDiv.innerHTML = checkNumberSize((storedValue * Number(displayDiv.innerHTML)) / 100);
               break;
          case "+/-":
               displayDiv.innerHTML = checkNumberSize(-displayDiv.innerHTML);
               readyForNewNumber = true;
               break;
     }
}

function doOperation(operation) {
     finishActiveOperations();
     activeOp = operation;
     storedValue = Number(displayDiv.innerHTML);
     readyForNewNumber = true;
}

function resetActive() {
     activeOp = "";
     readyForNewNumber = true;
}

function checkNumberSize(number) {
     if (number.toString().length > 10) {
          return number.toExponential(5);
     } else {
          return number;
     }
}

function finishActiveOperations() {
     if (activeOp !== "" && !readyForNewNumber) {
          if (activeOp === "+") {
               storedValue += Number(displayDiv.innerHTML);
          } else if (activeOp === "-") {
               storedValue -= Number(displayDiv.innerHTML);
          } else if (activeOp === "*") {
               storedValue = storedValue * Number(displayDiv.innerHTML);
          } else if (activeOp === "/") {
               storedValue = storedValue / Number(displayDiv.innerHTML);
          }
          resetActive();
          displayDiv.innerHTML = checkNumberSize(storedValue);
     }
}
