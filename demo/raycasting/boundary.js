class Boundary {
    
    constructor(context2d, x1, y1, x2, y2) {
        this.gfx = context2d;
        this.a = new Vector(x1, y1);
        this.b = new Vector(x2, y2);
    }

    show(){
        
        this.gfx.lineWidth = 1;
        this.gfx.strokeStyle = '#FFFFFF';
        this.gfx.beginPath();
        this.gfx.moveTo(this.a.x, this.a.y);
        this.gfx.lineTo(this.b.x, this.b.y);
        this.gfx.stroke();

    }

}