
function $(id) { return document.getElementById(id); }

const canvas = $("TheCanvas");
const ctx = canvas.getContext("2d");
const field_width = 1000;
const field_height = 800;
const field_depth = field_width;
ctx.canvas.width = field_width;
ctx.canvas.height = field_height;

console.log(field_width, field_height, field_depth);

var stars = new Array(400);
var speed = 10;

function setup() {

    for (let i = 0; i < stars.length; i++) {
        stars[i] = new Star(field_width, field_height, field_depth);
    }

    console.log("stars:", stars);
}

function draw() {
    ctx.fillStyle = '#000000';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        star.update();
        star.show(ctx);
    }

    requestAnimationFrame(draw);
}

window.addEventListener('load', (e) => {
    canvas.addEventListener('mousemove', (e) => {
        speed = e.offsetX / field_width * 50;
        console.log('mouse move: ', speed);
    }, false);
    setup();
    draw();
    console.log('loaded');
}, true);



