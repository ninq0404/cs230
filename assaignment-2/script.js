//task 1: welcome message.
const output = document.getElementById("output");
output.textContent = "Welcome, Nina";


//task 2: study counter.
let count = 0;
const addSession = document.getElementById("addSession");
const resetSession = document.getElementById("resetSession");
const counter = document.getElementById("counter");

addSession.addEventListener ("click", () =>{
    count++;
    counter.textContent = `Study Sessions: ${count}`;}) // only these weird italic quotations make it work

resetSession.addEventListener("click", () => {
    count =0; //if count != 0 then it remembers the last add state i.e 22
    counter.textContent = `Study Sessions: 0`; });


//task 3: goals list.
const goals = document.getElementById("goals");
const emptyList = document.getElementById("emptyList");
const printConsole = document.getElementById("printConsole");

const tasksDef = ["Finish cs230 assignment",
    "Complete post lecture notes",
    "Read through textbook",
    "Submit wireframes and research report for cs280"];
let items = [...tasksDef];
for (let i = 0; i < items.length; i++){
    console.log(items[i]); }

printConsole.addEventListener("click", (e) => {
  printToConsole(items); });

function printToConsole(){
    let template = tasksDef.map(tasksDef => `<li>${tasksDef}</li>`).join('');
    document.querySelector('#goals').innerHTML = template;
    document.getElementById("emptyList").style.visibility = "visible"; }


//task 4: hours studied.
const hoursStudied = 3;
if( hoursStudied >= 3) console.log("Good progress!");
else console.log("You should study more :(!");

