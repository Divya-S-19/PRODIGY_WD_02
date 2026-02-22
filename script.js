let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;
let lapCount = 1;

/* DISPLAY UPDATE */
function updateDisplay() {

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("display").innerText =
        `${h}:${m}:${s}`;
}

/* START */
function start() {

    if (timer !== null) return;

    timer = setInterval(() => {

        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();

    }, 1000);
}

/* PAUSE */
function pause() {
    clearInterval(timer);
    timer = null;
}

/* RESET */
function reset() {

    pause();

    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 1;

    updateDisplay();
    document.getElementById("laps").innerHTML = "";
}

/* LAP */
function lap() {

    if (timer === null) return;

    let lapTime =
        document.getElementById("display").innerText;

    let li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${lapTime}`;

    document.getElementById("laps").appendChild(li);

    lapCount++;
}

/* DARK / LIGHT MODE */
function toggleMode() {
    document.body.classList.toggle("dark");
}