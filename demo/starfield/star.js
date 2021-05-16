class Star {
    constructor(field_width, field_height, field_depth) {
        this.width = field_width;
        this.height = field_height;
        this.depth = field_depth;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.randomize();
        this.pz = this.z; // previous Z
    }

    randomize() {
        this.x = Math.floor(Math.random() * this.width) + 1 - this.width / 2;
        this.y = Math.floor(Math.random() * this.height) + 1 - this.height / 2;
        this.z = Math.floor(Math.random() * this.depth) + 1;
    }

    update() {
        this.z -= speed;
        if (this.z < 1) {
            this.randomize();
            this.z = this.depth;
            this.pz = this.z;
        }
    }

    show(ctx) {
        // console.log(this.x, this.y, this.z);
        let sx = this.x / this.z * this.width;
        let sy = this.y / this.z * this.height;
        let radius = 3.0 - this.z / this.depth * 3;
        
        let px = this.x / this.pz * this.width;
        let py = this.y / this.pz * this.height;
        this.pz = this.z;

        // translate
        sx += this.width / 2;
        sy += this.height / 2;
        px += this.width / 2;
        py += this.height / 2;

        // display star
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        // display star path
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
    }
}
