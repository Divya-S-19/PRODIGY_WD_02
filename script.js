class Stopwatch {
    constructor() {
        this.running = false;
        this.startTime = 0;
        this.currentTime = 0;
        this.laps = [];
        this.lapIndex = 0;
        this.interval = null;
        
        this.elements = {
            display: document.getElementById('display'),
            milliseconds: document.getElementById('milliseconds'),
            startPause: document.getElementById('startPause'),
            reset: document.getElementById('reset'),
            lap: document.getElementById('lap'),
            lapsList: document.getElementById('lapsList')
        };
        
        this.init();
    }
    
    init() {
        this.elements.startPause.addEventListener('click', () => this.toggle());
        this.elements.reset.addEventListener('click', () => this.reset());
        this.elements.lap.addEventListener('click', () => this.addLap());
        this.updateDisplay();
    }
    
    toggle() {
        if (this.running) {
            this.pause();
        } else {
            this.start();
        }
    }
    
    start() {
        this.running = true;
        this.startTime = this.startTime || Date.now() - this.currentTime;
        this.elements.startPause.textContent = 'Pause';
        this.elements.lap.disabled = false;
        this.elements.startPause.classList.remove('start');
        this.elements.startPause.classList.add('pause');
        
        this.interval = setInterval(() => {
            this.update();
        }, 10);
    }
    
    pause() {
        this.running = false;
        clearInterval(this.interval);
        this.elements.startPause.textContent = 'Start';
        this.elements.startPause.classList.remove('pause');
        this.elements.startPause.classList.add('start');
    }
    
    reset() {
        this.running = false;
        clearInterval(this.interval);
        this.currentTime = 0;
        this.startTime = 0;
        this.laps = [];
        this.lapIndex = 0;
        
        this.elements.startPause.textContent = 'Start';
        this.elements.startPause.classList.remove('pause');
        this.elements.startPause.classList.add('start');
        this.elements.lap.disabled = true;
        this.elements.display.textContent = '00:00:00';
        this.elements.milliseconds.textContent = '00';
        this.elements.lapsList.innerHTML = '';
    }
    
    update() {
        this.currentTime = Date.now() - this.startTime;
        this.updateDisplay();
    }
    
    updateDisplay() {
        const time = new Date(this.currentTime);
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = time.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        
        this.elements.display.textContent = `${minutes}:${seconds}`;
        this.elements.milliseconds.textContent = milliseconds;
    }
    
    addLap() {
        const lapTime = this.formatTime(this.currentTime);
        this.laps.push({
            index: ++this.lapIndex,
            time: lapTime
        });
        
        const li = document.createElement('li');
        li.textContent = `Lap ${this.lapIndex}: ${lapTime}`;
        this.elements.lapsList.insertBefore(li, this.elements.lapsList.firstChild);
    }
    
    formatTime(ms) {
        const time = new Date(ms);
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = time.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        return `${minutes}:${seconds}.${milliseconds}`;
    }
}

// Initialize the stopwatch when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});
