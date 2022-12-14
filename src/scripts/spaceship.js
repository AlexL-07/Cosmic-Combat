import Weapon1 from './weapon1';
import Weapon2 from './weapon2';
import Weapon3 from './weapon3';

class SpaceShip {
    constructor(username, xpos, ypos, ctx, ctxTerrain){
        this.username = username;
        this.x = xpos;
        this.y = ypos;
        this.ctx = ctx;
        this.ctxTerrain = ctxTerrain;
        this.width = 65;
        this.height = 40;
        this.maxHealth = 1000;
        this.health = 1000;
        this.currentWeapon = 1;
        this.power = 0;
        this.prevPower = 0;
        this.velX = 0;
        this.velY = 0;
        this.prevAngle = 0;
        this.maxAngle = 93;
        this.minAngle = 37;
        this.angle = Math.floor((this.maxAngle + this.minAngle)/2);
        this.delay = 0; 
        this.distance = 0;
        this.maxDistance = 80;
        this.radius = this.width/2;
        this.weapon3CD = 0;
        if(this.x < 500){
            this.face = "right";
        } else{
            this.face = "left";
        }
        // this.alive = true; 
        ctx.fillStyle = 'rgba(255,0,0,1)';
        this.weaponSpeed = 0.25;


        // sprites here
        this.spriteLeft = new Image();
        this.spriteLeft.src = './assets/spaceship2_left.png';
        this.spriteRight = new Image();
        this.spriteRight.src = './assets/spaceship2_right.png';

        // Binding prototype methods
        this.collisionCheck = this.collisionCheck.bind(this);
        this.render = this.render.bind(this);
        this.draw = this.draw.bind(this);
        this.shoot = this.shoot.bind(this);
        this.changeAngle = this.changeAngle.bind(this);
        this.switchWeapon1 = this.switchWeapon1.bind(this);
        this.switchWeapon2 = this.switchWeapon2.bind(this);
        this.switchWeapon3 = this.switchWeapon3.bind(this);
    }

    draw(){
        if ((Math.abs(this.x) > window.UI.canvas.width || Math.abs(this.y) > window.UI.canvas.height)) {
            this.turnOver = true;
          }

        window.UI.ctx.fillStyle = 'rgba(255,0,0,1)'; //healthbar
        window.UI.ctx.fillRect(this.x - 25, this.y+this.height+15, this.width+30, 4);
        window.UI.ctx.fillStyle = 'rgba(0,255,0,1)';
        window.UI.ctx.fillRect(this.x - 25, this.y+this.height+15, (this.width+30)*(this.health/this.maxHealth), 4);
  
        window.UI.ctx.font = "14px pixel-font"; //username
        window.UI.ctx.fillStyle = 'white';
        window.UI.ctx.fillText(this.username, this.x + 23, this.y+this.height+35);


        if (this.face == 'right') { 
            this.ctx.drawImage(this.spriteRight, this.x - 25, this.y-25);
     
      
            window.UI.ctx.beginPath(); //angle indicator right
            window.UI.ctx.arc(this.x + 60, this.y, 50, (-this.angle+20)*Math.PI/180, (-this.angle-20)*Math.PI/180, true);
            window.UI.ctx.strokeStyle = 'rgba(255,255,255,0.7)';
            window.UI.ctx.stroke();
            window.UI.ctx.closePath();
      
            window.UI.ctx.beginPath();
            window.UI.ctx.arc(this.x + 60, this.y, 50, (-this.angle+5)*Math.PI/180, (-this.angle-5)*Math.PI/180, true);
            window.UI.ctx.strokeStyle = 'rgba(255,0,0,0.7)';
            window.UI.ctx.stroke();
            window.UI.ctx.closePath();
      
            window.UI.ctx.beginPath();
            window.UI.ctx.arc(this.x + 60, this.y, 45, (-this.angle+2)*Math.PI/180, (-this.angle-2)*Math.PI/180, true);
            window.UI.ctx.strokeStyle = 'rgba(255,0,0,1)';
            window.UI.ctx.stroke();
            window.UI.ctx.closePath();

      
        } else if (this.face == 'left') {
                this.ctx.drawImage(this.spriteLeft, this.x-10, this.y - 25);
              
        
                window.UI.ctx.beginPath(); //angle indicator left
                window.UI.ctx.arc(this.x+5, this.y, 50, (this.angle+20+180)*Math.PI/180, (this.angle-20+180)*Math.PI/180, true);
                window.UI.ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                window.UI.ctx.stroke();
                window.UI.ctx.closePath();
        
                window.UI.ctx.beginPath();
                window.UI.ctx.arc(this.x+5, this.y, 50, (this.angle+5+180)*Math.PI/180, (this.angle-5+180)*Math.PI/180, true);
                window.UI.ctx.strokeStyle = 'rgba(255,0,0,0.7)';
                window.UI.ctx.stroke();
                window.UI.ctx.closePath();
        
                window.UI.ctx.beginPath();
                window.UI.ctx.arc(this.x+5, this.y, 45, (this.angle+2+180)*Math.PI/180, (this.angle-2+180)*Math.PI/180, true);
                window.UI.ctx.strokeStyle = 'rgba(255,0,0,1)';
                window.UI.ctx.stroke();
                window.UI.ctx.closePath();
      
        }
        this.ctx.restore();
    }

    render(ctx){
        switch (this.currentWeapon) { 
            case 1:
              document.getElementById('light1').style.background = 'rgb(0,255,0)';
              document.getElementById('light2').style.background = 'rgb(60,60,60)';
              document.getElementById('light3').style.background = 'rgb(60,60,60)';
              break;
            case 2:
              document.getElementById('light2').style.background = 'rgb(0,255,0)';
              document.getElementById('light1').style.background = 'rgb(60,60,60)';
              document.getElementById('light3').style.background = 'rgb(60,60,60)';
              break;
            case 3:
              document.getElementById('light3').style.background = 'rgb(255,0,0)';
              document.getElementById('light1').style.background = 'rgb(60,60,60)';
              document.getElementById('light2').style.background = 'rgb(60,60,60)';
              break;
          }
          this.move();
          this.draw();

    }

    collisionCheck(x, y, width, height){
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
                return true;
            }
        }
        return false;

    }

    move(velX = 0, dir){
        if (dir) { 
            this.distance++;
            if (dir == 'left' && !this.collisionCheck(this.x-1, this.y, 1, this.height/1.5)) {
              this.face = 'left';
              if (this.distance < this.maxDistance) {
                this.x += velX;
                if (this.collisionCheck(this.x, this.y+this.height-1, this.width, 1)) {
                  this.y -= 1;
      
                }
              }
            }
            if (dir == 'right' && !this.collisionCheck(this.x+this.width+1, this.y, 1, this.height/1.5)) {
              this.face = 'right';
              if (this.distance < this.maxDistance) {
                this.x += velX;
                if (this.collisionCheck(this.x, this.y+this.height-1, this.width, 1)) {
                  this.y -= 1;
                }
              }
            }
      
      
          } else { 
                this.x = this.x;
                if (!this.collisionCheck(this.x, this.y+this.height+1, this.width, 1)) {
                this.y += 6;
                } else {
                while (this.collisionCheck(this.x, this.y+this.height-1, this.width, 1)) {
                    this.y -= 1;
                }
                }
          }
        
    }

    shoot(power){
        this.turnOver = true;
        if (this.currentWeapon === 1) {
            this.delay += 100;
        } else if (this.currentWeapon === 2) {
            this.delay += 300;
        } else if (this.currentWeapon === 3) {
            this.delay += 1000;
            this.weapon3CD = 3;
            document.getElementById('overlay').classList.remove('hidden');
        }
        if (this.weapon3CD > 0){
            this.weapon3CD--;
        } 
        if (this.face === 'right') {
            if (this.currentWeapon === 1) {
                const weapon = new Weapon1(
                this.x + this.width, 
                this.y-20, 
                power*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),
                -power*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),
                this.ctx,
                this.ctxTerrain
                );
                return weapon;
            } else if (this.currentWeapon === 2) {
                const weapon = new Weapon2(
                this.x+this.width,
                this.y-20,
                power*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),
                -power*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),
                this.ctx,
                this.ctxTerrain
                );
                return weapon;
            } else {
                this.currentWeapon = 1;  
                let counter = 0;
                let arr = [];
                while(counter < 5){
                    const weapon = new Weapon3(
                        this.x + this.width + Math.floor(Math.random() * (100 - 1) + 1),
                        this.y - this.height - 20,
                        power*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),
                        -power*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),
                        this.ctx,
                        this.ctxTerrain
                        );
                    arr.push(weapon);
                    counter++;
                }
                return arr;
            }
        } else if (this.face === 'left') {
            if (this.currentWeapon === 1) {
                const weapon = new Weapon1(
                this.x - this.width, 
                this.y-20,
                -power*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),
                -power*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),
                this.ctx,
                this.ctxTerrain
                );
                return weapon;
            } else if (this.currentWeapon === 2) {
                const weapon = new Weapon2(
                this.x - this.width,
                this.y-20,
                -power*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),
                -power*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),
                this.ctx,
                this.ctxTerrain
                );
                return weapon;
            } else {
                this.currentWeapon = 1;
                let counter = 0;
                let arr = [];
                while(counter < 5){
                    const weapon = new Weapon3(
                        this.x + this.width + Math.floor(Math.random() * (-1 - -100) + -100),
                        this.y - this.height - 20,
                        -power*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),
                        -power*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),
                        this.ctx,
                        this.ctxTerrain
                        );
                    arr.push(weapon);
                    counter++;
                }
                return arr;
            }
        }
    }

    changeAngle(inc){
        if (inc > 0){
            if ((this.angle + inc) <= this.maxAngle){
                this.prevAngle = this.angle;
                this.angle += inc;
            }
        } else if (inc < 0){
            if ((this.angle + inc) >= this.minAngle){
                this.prevAngle = this.angle;
                this.angle += inc;
            }
        }
    }

    switchWeapon1(e){
        this.currentWeapon = 1;
    }

    switchWeapon2(e){
        this.currentWeapon = 2;
    }

    switchWeapon3(e){
        this.currentWeapon = 3; 
    }
}

export default SpaceShip