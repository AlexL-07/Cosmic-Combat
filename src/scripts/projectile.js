import Game from './game';
import UI from './ui';
import Map from './map';

class Projectile {
    constructor(xPos, yPos, xVel, yVel, ctx, ctxTerrain){
        this.x = xPos;
        this.y = yPos + 10;
        this.xVel = xVel;
        this.yVel = yVel;
        this.time = 0;
        this.radius = 10;
        this.ctx = ctx;
        this.weight = 0.055;
        this.damage = 130;
        this.hitObject = null;
        this.explosionRadius = 50;
        this.ctxTerrain = ctxTerrain;
        // this.color = 'rgb(0,255,0)' // change this to use a sprite
        this.sprite = new Image();
        this.sprite.src = './assets/small_blue_fireball.png'
        this.windAngle = window.map.windAngle;
        this.windSpeed = window.map.windSpeed;

        this.collisionCheck = this.collisionCheck.bind(this);
    }

    render(ctx){
    //spaceship collision
        if (this.collisionCheck(this.x, this.y, this.radius*2, this.radius*2) === 'spaceship') {
            window.game.removeObject(this);
            window.map.weapon = this;
            window.ctxText.font = "20px sans-serif";
            window.ctxText.fillStyle = "red";
            window.ctxText.fillText('-'+this.damage.toString(), this.x, this.y-20); //damage text
    
            if (this.hitObject.health > 0) {
                this.hitObject.health -= this.damage; //do damage
    
                if (this.hitObject.health <= 0) { //player death
                    window.spaceShips.splice( //destroy spaceship obj
                    window.spaceShips.indexOf(this.hitObject), 1
                    );
                    window.game.turnCounter--;
                }
                document.getElementById('overlay').classList.add('hidden'); 
        
                window.game.time = window.game.TIMEOUT;
                clearInterval(window.game.interval);
                clearTimeout(window.game.timeout);
                window.game.startTurns();
            }
    
            window.setTimeout(() => { //damage text clearing
            window.ctxText.clearRect(0, 0, window.canText.width, window.canText.height);
            this.hitObject = null;
            }, 1250);
    
        //terrain collision
        } else if (this.collisionCheck(this.x, this.y, this.radius*2, this.radius*2) === 'terrain') {
                window.game.removeObject(this);
                window.map.weapon = this;
        
                document.getElementById('overlay').classList.add('hidden'); 
        
                window.game.time = window.game.TIMEOUT;
                clearInterval(window.game.interval);
                clearTimeout(window.game.timeout);
                window.game.startTurns();
    
        //no collision
        } else {
    
    
            this.x += this.xVel + 0.02*this.windSpeed*Math.cos(this.windAngle*Math.PI/180)*this.time; //x coordinate
            this.y += this.yVel + 0.5*this.weight*this.time*this.time - 0.02*this.windSpeed*Math.sin(this.windAngle*Math.PI/180)*this.time; //y-coordinate

            
            ctx.beginPath(); //render weapon
            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            ctx.drawImage(this.sprite, this.x, this.y)
            // // ctx.fillStyle = this.color;
            // ctx.fill();
            ctx.closePath();
            this.time += 0.5;
        }

    }

    collisionCheck(x, y, width, height){
        for (let i = 0; i < window.spaceShips.length; i++) {  //spaceShips array on window
            if (this.isCollidedWith(window.spaceShips[i])) {
              this.hitObject = window.spaceShips[i];
              return 'spaceship';
            }
          }
      
      
          let array = [];
          for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
              array.push([x+i, y+j]);
            }
          }
      
          for(let i = 0; i < array.length; i++) {
            if (
              this.ctxTerrain.getImageData(array[i][0],array[i][1],1,1).data[0] != 0 ||
              this.ctxTerrain.getImageData(array[i][0],array[i][1],1,1).data[1] != 0 ||
              this.ctxTerrain.getImageData(array[i][0],array[i][1],1,1).data[2] != 0 ||
              this.ctxTerrain.getImageData(array[i][0],array[i][1],1,1).data[3] != 0
            ) {
              return 'terrain';
            }
          }
          return false;

    }

    isCollidedWith(otherObject){
        const x1 = this.x+this.radius;
        const y1 = this.y+this.radius;
        const x2 = otherObject.x+otherObject.width/2;
        const y2 = otherObject.y+otherObject.height/2;

        const r1 = this.radius;
        const r2 = otherObject.radius;

        if ((r1+r2) > Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) ) {
          return true;
        }

        return false;

    }



}

export default Projectile