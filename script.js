let timeLeft;
let workTime = 25;
let breakTime = 5;
let isRunning = false;
let timer;
let isWorkMode = true;

function startTimer() {
    if (!isRunning) {
        if (isWorkMode && !document.getElementById('focusMessage').textContent) {
            document.getElementById('focusModal').style.display = 'flex';
            return;
        }
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    timeLeft = workTime * 60;
    document.getElementById('focusMessage').textContent = '';
    document.getElementById('focusInput').style.display = 'none';
    document.getElementById('focusTaskInput').value = '';
    updateDisplay();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        alert("Time's up!");
        pauseTimer();
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update timer display
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Update tab title
    document.title = `${timeString} - Pomodoro Timer`;
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    const modeButton = document.getElementById('modeToggle');
    const modeMessage = document.getElementById('modeMessage');
    const focusMessage = document.getElementById('focusMessage');
    const timer = document.querySelector('.timer');
    
    if (isWorkMode) {
        modeButton.querySelector('.material-icons').textContent = 'coffee';
        modeButton.classList.remove('break-mode');
        modeButton.classList.add('work-mode');
        timer.classList.remove('break-mode');
        timer.classList.add('work-mode');
        modeMessage.textContent = 'Time to focus!';
    } else {
        modeButton.querySelector('.material-icons').textContent = 'work';
        modeButton.classList.remove('work-mode');
        modeButton.classList.add('break-mode');
        timer.classList.remove('work-mode');
        timer.classList.add('break-mode');
        modeMessage.textContent = 'Take a break!';
    }
    
    if (!isWorkMode) {
        focusMessage.textContent = '';
    }
    
    pauseTimer();
    timeLeft = isWorkMode ? workTime * 60 : breakTime * 60;
    updateDisplay();
}

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 5 minutes (300 seconds)
    updateDisplay();
}

function submitFocusTask() {
    const focusTask = document.getElementById('focusTaskInput').value.trim();
    if (focusTask) {
        document.getElementById('focusMessage').textContent = `Focusing on: ${focusTask}`;
        document.getElementById('focusInput').style.display = 'none';
        document.getElementById('focusTaskInput').value = '';
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function submitModalFocus() {
    const focusTask = document.getElementById('modalFocusInput').value.trim();
    if (focusTask) {
        document.getElementById('focusMessage').textContent = `Focusing on: ${focusTask}`;
        document.getElementById('focusModal').style.display = 'none';
        document.getElementById('modalFocusInput').value = '';
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

// Initialize the timer
resetTimer(); 