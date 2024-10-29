let score = 0;
let lives = 3;
let timeElapsed = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let highScoreTime = localStorage.getItem('highScoreTime') ? parseInt(localStorage.getItem('highScoreTime')) : 0;
let timerInterval;
let balloonInterval;

document.getElementById('high-score').innerText = `High Score: ${highScore} (Time: ${highScoreTime})`;

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = `${Math.random() * 100}%`;

    if (lives < 3 && Math.random() < 0.1) {
        balloon.classList.add('healing-balloon');
    }

    balloon.addEventListener('click', popBalloon);
    document.getElementById('game-container').appendChild(balloon);

    setTimeout(() => {
        if (balloon.parentElement) {
            balloon.remove();
            loseLife();
        }
    }, 5000);
}

function popBalloon(event) {
    const balloon = event.target;
    balloon.remove();

    if (balloon.classList.contains('healing-balloon')) {
        if (lives < 3) {
            lives++;
            document.getElementById('lives').innerText = `Lives: ${lives}`;
        }
    } else {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        updateHighScoreLive();
    }
}

function loseLife() {
    lives--;
    document.getElementById('lives').innerText = `Lives: ${lives}`;
    if (lives === 0) {
        alert('Game Over!');
        resetGame();
    }
}

function updateHighScoreLive() {
    if (score > highScore) {
        highScore = score;
        highScoreTime = timeElapsed;
        document.getElementById('high-score').innerText = `High Score: ${highScore} (Time: ${highScoreTime})`;
        localStorage.setItem('highScore', highScore);
        localStorage.setItem('highScoreTime', highScoreTime);
    }
}

function resetGame() {
    score = 0;
    lives = 3;
    timeElapsed = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('lives').innerText = `Lives: ${lives}`;
    document.getElementById('timer').innerText = `Time: ${timeElapsed}`;
    document.querySelectorAll('.balloon').forEach(balloon => balloon.remove());
    clearInterval(timerInterval);
    clearInterval(balloonInterval);
    startGame();
}

function startGame() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById('timer').innerText = `Time: ${timeElapsed}`;
    }, 1000);
    balloonInterval = setInterval(createBalloon, 1000);
}

startGame();