class Cell {
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.walls = [true, true, true, true];
        this._isVisited = false;
        this.wallSize = 4;
    }


    get isVisited() { return this._isVisited; }
    // set visited(isVisited) { this._isVisited = isVisited; }

    markVisited() {
        this._isVisited = true;
    }

    show(ctx, scale) {
        let x = this.col * scale;
        let y = this.row * scale;

        if (this.isVisited) {
            ctx.fillStyle = '#CCCCCC';
        }
        else {
            ctx.fillStyle = '#000000';
            // ctx.strokeStyle = '#000000';
        }
        ctx.fillRect(x, y, scale, scale);

        if (this.walls.some(w => w === true)) {
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = this.wallSize;
            ctx.beginPath();

            ctx.moveTo(x, y);

            if (this.walls[0]) ctx.lineTo(x + scale, y);
            else ctx.moveTo(x + scale, y);

            if (this.walls[1]) ctx.lineTo(x + scale, y + scale);
            else ctx.moveTo(x + scale, y + scale);

            if (this.walls[2]) ctx.lineTo(x, y + scale);
            else ctx.moveTo(x, y + scale);
            
            if (this.walls[3]) ctx.lineTo(x, y);

            ctx.stroke();
        }
    }

}
