const startTimer = document.getElementById("startTimer");
const pauseTimer = document.getElementById("pauseTimer");
const stopTimer = document.getElementById("stopTimer");

let time = 60.0; // 60 seconds = 1 min timer
let myTimer = null;
let pausedTime = false;

let count = 0; //counts clicks

startTimer.disabled = false; //at first pause and stop disabled strt enabled
pauseTimer.disabled = true;
stopTimer.disabled = true;

startTimer.addEventListener ("click", () => { //start timer
    start();
    startTimer.disabled = true; //when start is clicked, its disabled and pause and stop are enabled
    pauseTimer.disabled = false;
    stopTimer.disabled = false;})

pauseTimer.addEventListener ("click", () => { //pause timer
    count++;
    for(let i = 0; i <= count; i++){
    if (pauseTimer.innerHTML == "Resume"){
            pauseTimer.addEventListener ("click", () =>{
            resume(); }) }
    else if (pauseTimer.innerHTML == "Pause"){
                pauseTimer.addEventListener ("click", () =>{
                pause(); })}
    } })

stopTimer.addEventListener ("click", () => { //stop timer
    stop();
    startTimer.disabled = false; //at stop return to initial state
    pauseTimer.disabled = true;
    stopTimer.disabled = true;})

function display(){
    document.getElementById("timer").textContent = time; }

function pause(){
    clearInterval(myTimer);
    myTimer = null;
    pausedTime = true;
    pauseTimer.innerHTML = "Resume";}

function stop(){
    pause();
    time = 0;
    display();
     timer.style.color = 'white';
     timer.style.backgroundColor = 'transparent';}

function start(){
    time = 20.0;
    if (myTimer === null && time != 0){
        myTimer = setInterval( () =>{
            time--;
            display();

            if (time <=15){
            timer.style.color = 'red';
            timer.style.backgroundColor = 'white';
            timer.style.borderRadius = "5px";
            }

            if (time == 0){
                alert("Break Time :)");
                stop(); }
            }, 1000) // 1 min
        }
    }

function resume(){
    pausedTime = false;
    let paused = time;
    time = paused;
    if (myTimer === null && time != 0){
        myTimer = setInterval( () =>{
            time--;
            display();
            if (time <=15){ timer.style.color = 'red';}
            if (time == 0){ stop(); } }, 1000) // 1 min
        pauseTimer.innerHTML = "Pause"; }
    }
