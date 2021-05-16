class Snake {
    constructor(scale, disableWalls=false) {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.scale = scale;
        this.isEating = false;
        this.total = 0;
        this.tail = [];
        this.wallsOff = disableWalls;
        // for (let i = 10; i > 0; i--) {
        //     this.tail.push([0, i * this.scale]);
        //     this.total++;
        // }
    }

    dir(x, y) {
        if (-x == this.xSpeed) return;
        if (-y == this.ySpeed) return;
        this.xSpeed = x;
        this.ySpeed = y;
    }

    dist(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    eat(food) {
        let dist = distance(this.x, this.y, food.x, food.y);
        if (dist <= 1) {
            this.total++;
            this.isEating = true;
            return true;
        }
        return false;
    }

    handleDeath(field) {
        let dead = false;
        if (!this.canMove(field)) {
            dead = true;
        }
        else {
            for (let i = 0; i < this.tail.length; i++) {
                let pos = this.tail[i];
                let d = this.dist(this.x, this.y, pos[0], pos[1]);
                if (d < 1) {
                    dead = true;
                    break;
                }
            }
        }

        if (dead) {
            this.total = 0;
            this.tail = [];
            this.x = 0;
            this.y = 0;
            this.xSpeed = 1;
            this.ySpeed = 0;
        }
        return !dead;
    }

    canMove(field) {
        if (this.wallsOff)
            return true;

        let toX = this.x + this.xSpeed * this.scale;
        let toY = this.y + this.ySpeed * this.scale;

        if (toX < 0) return false;
        if (toX + 1 > field.width) return false;
        if (toY < 0) return false;
        if (toY + 1 > field.height) return false;

        return true;
    }

    update(field) {
        if (! this.canMove(field)) {
            return;
        }
        
        if (this.total === this.tail.length) {
            for (let i = 0; i < this.tail.length-1; i++) {
                this.tail[i] = this.tail[i+1];
            }
        }
        if (this.total > 0)
            this.tail[this.total - 1] = [this.x, this.y];

        this.x += this.xSpeed * this.scale;
        this.y += this.ySpeed * this.scale;

        if (this.wallsOff) {
            if (this.x < 0) this.x = field.width - this.scale;
            if (this.x + 1 > field.width) this.x = 0;
            if (this.y < 0) this.y = field.height - this.scale;
            if (this.y + 1 > field.height) this.y = 0;
        }
    }

    show(ctx) {
        // let logStr = `(${this.x}, ${this.y})  tail:`;
        // for (let p of this.tail) {
        //     logStr += `\n ${p[0]}, ${p[1]}`;
        // }
        // console.log(`LOG snake: ${logStr}`);

        
        ctx.strokeStyle = '#000000';
        if (this.total > 0) {
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            // snake body-tail
            for (let i = 0; i < this.tail.length; i++) {
                
                ctx.rect(this.tail[i][0], this.tail[i][1], this.scale, this.scale);
            }
            ctx.fill();
            ctx.stroke();
        }
        
        // snake head
        if (this.isEating) {
            ctx.fillStyle = '#FFC0C0';
            ctx.strokeStyle = '#FF0000';
            this.isEating = false;
        }
        else {
            ctx.fillStyle = '#CCCCCC';
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.scale, this.scale);
        ctx.fill();
        ctx.stroke();
    }
}
