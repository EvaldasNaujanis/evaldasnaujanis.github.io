// The Coding Train: Coding challenge #145: 2D Raycasting @ https://www.youtube.com/watch?v=TOEi6T2mtHo

function $(id) { return document.getElementById(id); }

const canvas = $("TheCanvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = 1000;
ctx.canvas.height = 800;

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;

let dx = 2;
let dy = -2;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var mouseX = 99;
var mouseY = 99;

    
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

function mouseMoveHandler(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
    // if (relativeX > 0 && relativeX < canvas.width) {
    //     paddleX = relativeX - paddleWidth/2;
    // }
}

function drawBall(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    // ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function random(from, to) {
    let r = Math.floor(Math.random() * (to - from));
    return r + from;
}

// var wall = new Boundary(ctx, 100, 100, 200, 300);
var ray = new Ray(ctx, 100, 200);
var light = new Particle(ctx, new Vector(ctx.canvas.width/2, ctx.canvas.height/2));
var walls = [];

for (let i = 0; i < 5; i++) {
    let x1 = random(1, ctx.canvas.width);
    let y1 = random(1, ctx.canvas.height);
    let x2 = random(1, ctx.canvas.width);
    let y2 = random(1, ctx.canvas.height);
    walls[i] = new Boundary(ctx, x1, y1,x2, y2);
}

walls.push(new Boundary(ctx, 0, 0, ctx.canvas.width, 0));
walls.push(new Boundary(ctx, ctx.canvas.width, 0, ctx.canvas.width, ctx.canvas.height));
walls.push(new Boundary(ctx, 0, ctx.canvas.height, ctx.canvas.width, ctx.canvas.height));
walls.push(new Boundary(ctx, 0, 0, 0, ctx.canvas.height));

function draw() {
    ctx.fillStyle = '#000000';
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // ctx.rect(10, 10, 100, 100);
    // ctx.fillStyle = '#FF0000';
    // ctx.fill();

    // wall.show();
    for (let wall of walls) {
        wall.show();
    }

    light.show();
    //light.lightOnObject(wall);
    light.lightOnObjects(walls);
    light.updateLocation(mouseX, mouseY);
    // ray.show();
    // ray.lookAt(mouseX, mouseY)

    // let pt = ray.cast(wall);
    // if (pt) {
    //     ctx.fillStyle = '#FFFFFF';
    //     drawBall(pt.x, pt.y, 5);
    //     console.log(pt);
    // }
    
    // drawBall();

    if(rightPressed) {
        x += 7;
        if (x + ballRadius > ctx.canvas.width){
            x = ctx.canvas.width - ballRadius;
        }
    }
    else if(leftPressed) {
        x -= 7;
        if (x - 10 * ballRadius < 0){
            x = ballRadius;
        }
    }
    else if (upPressed) {
        y -= 7;
        if (y - 10 * ballRadius < 0){
            y = ballRadius;
        }
    }
    else if (downPressed) {
        y += 7;
        if (y + ballRadius > ctx.canvas.height){
            y = ctx.canvas.height - ballRadius;
        }
    }


    requestAnimationFrame(draw);
}

draw();



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);