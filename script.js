const display = document.getElementById("display");
let history = JSON.parse(localStorage.getItem("history")) || [];
let historyIndex = history.length - 1;

function addNum(value) {
    display.value += value;
}

let clearPressed = false;

function clearDisplay() {
    if (!clearPressed) {
        display.value = "";
        clearPressed = true;
        return;
    }

    // Second click
    history = [];
    localStorage.removeItem("history");

    historyIndex = -1;

    display.value = "";
    clearPressed = false;
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {

    if (display.value === "") return;

    try {

        let expression = display.value;

        expression = expression.replace(/(\d)\(/g, "$1*(");

        let result = eval(expression);

        history.push(display.value + " = " + result);
        localStorage.setItem("history", JSON.stringify(history))||[];
        display.value = result;
        historyIndex = history.length - 1;


    } catch (err) {
        console.log(err);
        display.value = "Error";
    }

}

function showHistory() {
    if (history.length === 0) {
        display.value = "Not available";
        return;
    }

    display.value = history[historyIndex];

    if (historyIndex > 0) {
        historyIndex--;
    }
}

function forshowHistory() {
    if (history.length === 0) {
        display.value = "Not available";
        return;
    }

    if (historyIndex < history.length - 1) {
        historyIndex++;
        display.value = history[historyIndex];
    }
}