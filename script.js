const display = document.getElementById("display");
const historyDiv = document.getElementById("history");

let history = JSON.parse(localStorage.getItem("history")) ;

showHistory();

function addNum(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function backspace(){
    display.value = display.value.slice(0,-1);
}

function calculate(){

    if(display.value==="") return;

    try{

        let expression = display.value;
        let result = eval(expression);

        history.unshift(`${expression} = ${result}`);

        localStorage.setItem("history",JSON.stringify(history));

        // showHistory();

        display.value = result;

    }catch{
        display.value = "Error";
    }

}

function showHistory(){
    // history.innerHTML=display.value

    historyDiv.innerHTML="";

    history.forEach(item=>{

        const div=document.createElement("div");
        div.className="history-item";
        div.innerText=item;

        historyDiv.appendChild(div);

    });

}