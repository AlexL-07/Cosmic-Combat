import Projectile from './projectile';
import Game from './game';
import UI from './ui';
import Map from './map'

class Weapon3 extends Projectile {
    constructor(xPos, yPos, xVel, yVel, ctx, ctxTerrain){
        super(xPos, yPos, xVel, yVel, ctx, ctxTerrain);
        this.sprite.src = "./assets/small_pink_fireball.png"
        // this.x = xPos;
        // this.y = yPos + 10;
        // this.xVel = xVel;
        // this.yVel = yVel;
        // this.time = 0;
        this.radius = 10;
        // this.ctx = ctx;
        // this.weight = 0.055;
        this.damage = 70;
        // this.hitObject = null;
        this.explosionRadius = 50;
        // this.ctxTerrain = ctxTerrain;
        // // this.color = 'rgb(0,255,0)' // change this to use a sprite
        // this.windAngle = window.map.windAngle;
        // this.windSpeed = window.map.windSpeed;
    }

}

export default Weapon3