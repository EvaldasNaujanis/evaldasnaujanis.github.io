class Ray{
    constructor(context2d, pos, angle) {
        this.ctx = context2d;
        this.pos = pos; //new Vector(x1, y1);
        //this.dir = new Vector(1, 0);
        this.dir = new Vector().fromAngle(angle);
    }

    lookAt(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    show() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.moveTo(this.pos.x, this.pos.y);
        this.ctx.lineTo(this.pos.x + this.dir.x * 10, this.pos.y + this.dir.y * 10);
        this.ctx.stroke();
    }

    cast(wall) {
        // Wikipedia: line-to-line intersection
        // t : 0 < t < 1
        // u : u > 0
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denominator == 0) {
            return null;
        }
        
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

        if (t > 0 && t < 1 && u > 0) {
            const pt = new Vector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        }
        else {
            return null;
        }

    }
}