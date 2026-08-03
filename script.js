const display = document.getElementById("display");
// const historyDiv = document.getElementById("history");
let history = JSON.parse(localStorage.getItem("history"));



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
        

        // Insert * between a number and an opening parenthesis
        expression = expression.replace(/(\d)\(/g, "$1*(");

        let result = eval(expression);
        

        history = result;

        localStorage.setItem("history", JSON.stringify(history));



        display.value = result;

    } catch {
        display.value = "Error";
    }

}

function showHistory() {
    display.value = history;

    // history.forEach(item => {

    //     const div = document.createElement("div");
    //     div.className = "history-item";
    //     div.innerText = item;

    //     historyDiv.appendChild(div);

    // });

}