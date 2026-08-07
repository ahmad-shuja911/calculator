const display = document.getElementById("display");
let history = JSON.parse(localStorage.getItem("history")) || [];
let currentHistoryIndex = history.length - 1;


function addNum(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
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

        history.push(result);
        localStorage.setItem("history", JSON.stringify(history))||[];
        display.value = result;
        currentHistoryIndex = history.length - 1;


    } catch (err) {
        console.log(err);
        display.value = "Error";
    }

}

function showHistory() {
    if (history.length === 0) {
        display.value = "No history available";
        return;
    }
    console.log(currentHistoryIndex);
    display.value = history[currentHistoryIndex];
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
    }
}