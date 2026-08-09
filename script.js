const display = document.getElementById("display");
let history = JSON.parse(localStorage.getItem("history")) || [];
let currentHistoryIndex = history.length - 1;
let clearPressed = false;
let displayedHistory = null;
let showingHistory = false;


function addNum(value) {

    if (
        display.value === "Error" ||
        display.value === "Not available" ||
        display.value === "Infinity" ||
        display.value === "-Infinity" ||
        display.value === "undefined"
    ) {
        display.value = "";
    }

    if (showingHistory) {

        display.value = displayedHistory.result + value;

        showingHistory = false;
        clearPressed = false;

        return;
    }
    clearPressed = false;

    display.value += value;
}


function clearDisplay() {

    if (!clearPressed) {

        display.value = "";
        clearPressed = true;
        console.log(clearPressed);
        return;
    }

    history = [];

    localStorage.removeItem("history");

    historyIndex = -1;

    display.value = "";

    clearPressed = false; console.log(clearPressed);
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

        history.push({
            expression: display.value,
            result: result
        });

        localStorage.setItem(
            "history",
            JSON.stringify(history)
        );

        display.value = result;

        currentHistoryIndex = history.length - 1;

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

    if (currentHistoryIndex >= 0) {

        displayedHistory = history[currentHistoryIndex];

        display.value =
            displayedHistory.expression +
            " = " +
            displayedHistory.result;

        showingHistory = true;

        currentHistoryIndex--;
    }
}


function forshowHistory() {

    if (history.length === 0) {
        display.value = "Not available";
        return;
    }

    if (currentHistoryIndex < history.length - 1) {

        currentHistoryIndex++;

        displayedHistory = history[currentHistoryIndex];

        display.value =
            displayedHistory.expression +
            " = " +
            displayedHistory.result;

        showingHistory = true;
    }
}