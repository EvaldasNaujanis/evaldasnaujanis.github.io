class Particle {
    constructor(context2d, pos) {
        this.ctx = context2d;
        //this.pos = new Vector(x, y);
        this.pos = pos;
        this.rays = [];
        for (let a = 0; a < 360; a += 1) {
            this.rays.push(new Ray(context2d, this.pos, a));
            console.log(a, x, this.pos.y);
        }
    }

    drawCircle(x, y, radius){
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI*2);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fill();
        this.ctx.closePath();
    }

    updateLocation(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    lightOnObject(wall) {
        for (let ray of this.rays){
            const pt = ray.cast(wall);
            if (pt) {
                this.ctx.strokeStyle = '#FFFFFF';
                this.ctx.beginPath();
                this.ctx.moveTo(this.pos.x, this.pos.y);
                this.ctx.lineTo(pt.x, pt.y);
                this.ctx.stroke();
            }
        }
    }

    calcDistance(pt1, pt2) {
        return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
    }

    lightOnObjects(walls) {
        for (let ray of this.rays){
            let closestPoint = null;
            let minDistance = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const distance = this.calcDistance(this.pos, pt);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestPoint = pt;
                    }
                }
            }
            if (closestPoint) {
                // this.ctx.strokeStyle = '#FFFFFF';
                this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                this.ctx.beginPath();
                this.ctx.moveTo(this.pos.x, this.pos.y);
                this.ctx.lineTo(closestPoint.x, closestPoint.y);
                this.ctx.stroke();
            }
        }
    }

    show() {
        this.ctx.fillStyle = '#FFFFFF';
        this.drawCircle(this.pos.x, this.pos.y, 6);
        for (let ray of this.rays) {
            ray.show();
        }
    }

}