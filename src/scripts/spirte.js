class Sprite {
    constructor({pos}, ctx, ctxTerrain){
        this.pos = pos;
        this.image = new Image();
        this.image.src = '';
        this.ctx = ctx;
        this.canvas = canvas;
        this.ctxTerrain;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.pos.x, this.pos.y)

    }
}