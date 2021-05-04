class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    normalize() {
        let len = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        this.x = this.x / len;
        this.y = this.y / len;
    }

    fromAngle(angle) {
        let degToRad = Math.PI/180*angle;
        this.x = Math.cos(degToRad);
        this.y = Math.sin(degToRad);
        return this;
    }
}