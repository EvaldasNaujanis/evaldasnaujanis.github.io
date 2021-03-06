function $(id) { return document.getElementById(id); }

const canvas = $("TheCanvas");
const ctx = canvas.getContext("2d");
const field = { width: 1000, height: 800 };
ctx.canvas.width = field.width;
ctx.canvas.height = field.height;
var snake = null;
var scale = 40;
var food;
var score = 0;
var highscore = 0;
var isSoundEnabled = false;

const FPS = 5;
var lastTimestamp = null;

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function random(max) {
    return Math.floor(Math.random() * max);
}

function updateScore() {
    $('txtScore').innerHTML = `${score}`;
}

function updateHighscore() {
    if (score > highscore)
        highscore = score;
    $('txtHighscore').innerHTML = `${highscore}`;
}


function setup(disableWalls) {
    snake = new Snake(scale, disableWalls);
    food = new Food(snake, field, scale);
    food.spawn();
}

function draw(timestamp) {
    requestAnimationFrame(draw);
    if (timestamp - lastTimestamp < 1000 / FPS) return;
    lastTimestamp = timestamp;
    console.log(timestamp);
    console.log(snake);

    ctx.fillStyle = '#FF0000';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (!snake.handleDeath(field)) {
        updateHighscore();
        score = 0;
        updateScore();
    }
    snake.update(field);
    if (snake.eat(food)) {
        if (isSoundEnabled)
            playSound();
        score++;
        updateScore();
        food.spawn(); 
    }
    snake.show(ctx);

    food.show(ctx);
}

function onKeyDown(e) {
    switch (e.code) {
        case 'ArrowUp':
            snake.dir(0, -1);
            break;
        case 'ArrowDown':
            snake.dir(0, 1);
            break;
        case 'ArrowLeft':
            snake.dir(-1, 0);
            break;
        case 'ArrowRight':
            snake.dir(1, 0);
            break;
        // for debugging
        // case 'KeyE':
        //     snake.total++;
        //     break;
    }
}

function onWallsModeChanged(e) {
    const disableWalls = !e.target.checked;
    snake = new Snake(scale, disableWalls);
    score = 0;
}

function onSoundToggle(e) {
    isSoundEnabled = e.target.checked;
}

window.addEventListener('load', (e) => {

    $('cbActivateWalls').addEventListener('change', onWallsModeChanged, false);
    $('cbEnableSound').addEventListener('change', onSoundToggle, false);
    isSoundEnabled = $('cbEnableSound').checked;
    document.addEventListener('keydown', onKeyDown, false);
    $('divScore').style.width = `${field.width}px`;
    updateHighscore();
    setup(true);
    draw();
}, true);
