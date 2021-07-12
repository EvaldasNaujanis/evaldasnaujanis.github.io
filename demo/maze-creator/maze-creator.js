function $(id) { return document.getElementById(id); }

const canvas = document.getElementById('TheCanvas');
const ctx = canvas.getContext("2d");
const field = { width: 800, height: 600 };
const CLEAR_COLOR = '#000000';
canvas.style.backgroundColor = CLEAR_COLOR;
ctx.canvas.width = field.width;
ctx.canvas.height = field.height;
var scale = 20;

function showMaze(size, grid) {

    ctx.canvas.width = size.width * scale;
    ctx.canvas.height = size.height * scale;

    ctx.fillStyle = CLEAR_COLOR;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < grid.length; i++) {
        grid[i].show(ctx, scale);
    }
    
}

function generateMaze({ width = 10, height = 10 } = {}) {
    console.log(`Generating maze [ ${width} x ${height} ]`);

    let maze = new Maze(width, height);
    let grid = maze.generate();

    showMaze({width: width, height: height}, grid);

    console.log(`Maze generated`);
}

function generateClicked(e) {
    let width = Number($('txtWidth').value);
    let height = Number($('txtHeight').value);
    const maxWidth = Math.floor(window.innerWidth / scale) - 2;
    const maxHeight = Math.floor(window.innerHeight / scale) - 2;


    if (isNaN(width) || width < 10) {
        width = 10;
    }
    else if (width > maxWidth) {
        width = maxWidth;
    }
    if (isNaN(height) || height < 10) {
        height = 10;
    } else if (height > maxHeight) {
        height = maxHeight;
    }

    $('txtWidth').value = width;
    $('txtHeight').value = height;

    const field = { width: width, height: height };
    generateMaze(field);

}

window.addEventListener('load', (e) => {
    $('txtWidth').value = (field.width/scale).toString();
    $('txtHeight').value = (field.height/scale).toString();
    document.getElementById('btnGenerate').addEventListener('click', generateClicked, false);
}, false);
