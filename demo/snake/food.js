class Food {
    constructor(snake, field, scale) {
        this.snake = snake;
        this.fieldWidth = field.width;
        this.fieldHeight = field.height;
        this.scale = scale;
        this.x = 0;
        this.y = 0;
    }

    spawn() {
        let picked = false;
        let newX = 0, newY = 0;
        let cols = Math.floor(this.fieldWidth / this.scale);
        let rows = Math.floor(this.fieldHeight / this.scale);
        if (cols * rows - this.snake.tail.length -1 <= 0) {
            console.info("Game field is filled with snake. Game Over!");
            return;
        }

        while (!picked) {
            newX = random(cols) * this.scale;
            newY = random(rows) * this.scale;
            
            let dist = distance(snake.x, snake.y, newX, newY);
            if (dist < 1)
                continue;

            let takenTile = this.snake.tail.find(tile => distance(tile[0], tile[1], newX, newY) < 1);
            if (takenTile)
                continue;
            
            this.x = newX;
            this.y = newY;
            picked = true;
        }
    }

    show(ctx) {
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#FF6666';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.scale, this.scale);
        ctx.fill();
        ctx.stroke();
    }
    
}