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
         // might want logic to get players to face left if they are on the right half of map
        this.alive = true; // might want to use this for respawns IDK
        ctx.fillStyle = 'rgba(255,0,0,1)';
        this.weaponSpeed = 0.25;


        // sprites here
        this.spriteLeft = new Image();
        this.spriteLeft.src = './assets/spaceship2_left.png';
        // this.spriteLeft.set_size(0.5);
        this.spriteRight = new Image();
        this.spriteRight.src = './assets/spaceship2_right.png';
        // this.spriteRight.set_size(0.5);

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

        // if (this.face === "right"){
        //     window.UI.ctx.fillStyle = 'rgba(255,0,0,1)'; //healthbar
        //     window.UI.ctx.fillRect(this.x-43, this.y+this.height+15, this.width+30, 4);
        //     window.UI.ctx.fillStyle = 'rgba(0,255,0,1)';
        //     window.UI.ctx.fillRect(this.x-43, this.y+this.height+15, (this.width+30)*(this.health/this.maxHealth), 4);
            
        //     window.UI.ctx.font = "14px sans-serif"; //username
        //     window.UI.ctx.fillStyle = 'white';
        //     window.UI.ctx.fillText(this.username, this.x, this.y+this.height+35);
        // } else if (this.face === "left"){
        //     window.UI.ctx.fillStyle = 'rgba(255,0,0,1)'; //healthbar
        //     window.UI.ctx.fillRect(this.x, this.y+this.height+15, this.width+30, 4);
        //     window.UI.ctx.fillStyle = 'rgba(0,255,0,1)';
        //     window.UI.ctx.fillRect(this.x, this.y+this.height+15, (this.width+30)*(this.health/this.maxHealth), 4);
      
        //     window.UI.ctx.font = "14px sans-serif"; //username
        //     window.UI.ctx.fillStyle = 'white';
        //     window.UI.ctx.fillText(this.username, this.x+40, this.y+this.height+35);
        // }

        window.UI.ctx.fillStyle = 'rgba(255,0,0,1)'; //healthbar
        window.UI.ctx.fillRect(this.x - 25, this.y+this.height+15, this.width+30, 4);
        window.UI.ctx.fillStyle = 'rgba(0,255,0,1)';
        window.UI.ctx.fillRect(this.x - 25, this.y+this.height+15, (this.width+30)*(this.health/this.maxHealth), 4);
  
        window.UI.ctx.font = "14px sans-serif"; //username
        window.UI.ctx.fillStyle = 'white';
        window.UI.ctx.fillText(this.username, this.x + 23, this.y+this.height+35);
      
        // if (this.rotation) {
      
        //     this.ctx.save();
        //     // console.log(this.x+window.UI.canvas.width/2)
        //     this.ctx.translate(this.x+this.width/2, this.y+this.height/2);
        //     this.ctx.rotate(this.rotation * Math.PI / 180);
        //     this.ctx.translate(-(this.x+this.width/2), -(this.y+this.height/2));
        // }
      
      
      
        if (this.face == 'right') { 
            this.ctx.drawImage(this.spriteRight, this.x - 25, this.y-25);
            // this.ctx.drawImage(this.spriteRight, this.x-this.width, this.y-this.height+3);
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
      
            window.UI.ctx.beginPath(); //angle indicator right
            window.UI.ctx.arc(this.x + 20, this.y, 50, (-this.angle+20)*Math.PI/180, (-this.angle-20)*Math.PI/180, true);
            window.UI.ctx.strokeStyle = 'rgba(255,255,255,0.7)';
            window.UI.ctx.stroke();
            window.UI.ctx.closePath();
      
            window.UI.ctx.beginPath();
            window.UI.ctx.arc(this.x + 20, this.y, 50, (-this.angle+5)*Math.PI/180, (-this.angle-5)*Math.PI/180, true);
            window.UI.ctx.strokeStyle = 'rgba(255,0,0,0.7)';
            window.UI.ctx.stroke();
            window.UI.ctx.closePath();
      
            window.UI.ctx.beginPath();
            window.UI.ctx.arc(this.x + 20, this.y, 45, (-this.angle+2)*Math.PI/180, (-this.angle-2)*Math.PI/180, true);
            window.UI.ctx.strokeStyle = 'rgba(255,0,0,1)';
            window.UI.ctx.stroke();
            window.UI.ctx.closePath();
            // this.ctx.fillStyle = 'rgba(255,0,0,1)';
            // this.ctx.fillRect(this.x, this.y, this.width, this.height);
            // this.ctx.fillStyle = 'rgba(255,255,255,1)';
            // this.ctx.fillRect(this.x+this.width - 5, this.y + 5, 2, 2);
      
        } else if (this.face == 'left') {
                this.ctx.fillStyle = "blue";
                this.ctx.fillRect(this.x, this.y, this.width, this.height)
                this.ctx.drawImage(this.spriteLeft, this.x-10, this.y - 25);
                // this.ctx.drawImage(this.spriteLeft, this.x-10, this.y-this.height+3);
        
                window.UI.ctx.beginPath(); //angle indicator left
                window.UI.ctx.arc(this.x+20, this.y, 50, (this.angle+20+180)*Math.PI/180, (this.angle-20+180)*Math.PI/180, true);
                window.UI.ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                window.UI.ctx.stroke();
                window.UI.ctx.closePath();
        
                window.UI.ctx.beginPath();
                window.UI.ctx.arc(this.x+20, this.y, 50, (this.angle+5+180)*Math.PI/180, (this.angle-5+180)*Math.PI/180, true);
                window.UI.ctx.strokeStyle = 'rgba(255,0,0,0.7)';
                window.UI.ctx.stroke();
                window.UI.ctx.closePath();
        
                window.UI.ctx.beginPath();
                window.UI.ctx.arc(this.x+20, this.y, 45, (this.angle+2+180)*Math.PI/180, (this.angle-2+180)*Math.PI/180, true);
                window.UI.ctx.strokeStyle = 'rgba(255,0,0,1)';
                window.UI.ctx.stroke();
                window.UI.ctx.closePath();
                // this.ctx.fillStyle = 'rgba(255,0,0,1)';
                // this.ctx.fillRect(this.x, this.y, this.width, this.height);
                // this.ctx.fillStyle = 'rgba(255,255,255,1)';
                // this.ctx.fillRect(this.x + 5, this.y + 5, 2, 2);
      
        }
        this.ctx.restore();
    }

    render(ctx){
        switch (this.currentWeapon) { 
            case 1:
              document.getElementById('light1').style.background = 'rgb(0,255,0)';
              document.getElementById('light2').style.background = 'rgb(60,60,60)';
              document.getElementById('lightss').style.background = 'rgb(60,60,60)';
              break;
            case 2:
              document.getElementById('light2').style.background = 'rgb(0,255,0)';
              document.getElementById('light1').style.background = 'rgb(60,60,60)';
              document.getElementById('lightss').style.background = 'rgb(60,60,60)';
              break;
            case 3:
              document.getElementById('lightss').style.background = 'rgb(255,0,0)';
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
        if (dir) { //moving
            this.distance++;
            if (dir == 'left' && !this.collisionCheck(this.x-1, this.y, 1, this.height/1.5)) {
              // this.rotate(45);
              this.face = 'left';
              if (this.distance < this.maxDistance) {
                this.x += velX;
                if (this.collisionCheck(this.x, this.y+this.height-1, this.width, 1)) {
                  this.y -= 1;
      
                }
              }
              // if (this.collisionCheck(this.x, this.y+this.height-1, 4,4)) {
              //   console.log('rotate');
              // }
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
      
      
          } else { //not moving
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
            
        } else if (this.currentWeapon === 2) {
            this.delay += 900;
        } else if (this.currentWeapon === 3) {
            this.delay += 1300;
            this.weapon3CD = 3;
            document.getElementById('overlay').classList.remove('hidden');
        }

        this.weapon3CD--;
        if (this.face === 'right') {
            if (this.currentWeapon === 1) {
                const weapon = new Weapon1(
                this.x + this.width, //was + this.width
                this.y-30, //was -15
                power*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),
                -power*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),
                this.ctx,
                this.ctxTerrain
                );
                return weapon;
            } else if (this.currentWeapon === 2) {
                const weapon = new Weapon2(
                this.x+this.width,
                this.y-15,
                power*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),
                -power*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),
                this.ctx,
                this.ctxTerrain
                );
                return weapon;
            } else {
                this.currentWeapon = 1;  //reset selector after ss shot
                let counter = 0;
                // if(counter < 5){
                //     setInterval()
                // }
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
                // this.currentWeapon = 1; //reset selector after ss shot
                // const weapon = new Weapon3(
                // this.x+this.width+2,
                // this.y-15,
                // power*this.weaponSpeed*Math.cos(this.angle*Math.PI/180),
                // -power*this.weaponSpeed*Math.sin(this.angle*Math.PI/180),
                // this.ctx,
                // this.ctxTerrain
                // );
                // return weapon;
            }
        } else if (this.face === 'left') {
            if (this.currentWeapon === 1) {
                const weapon = new Weapon1(
                this.x - this.width, // was -16
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
                this.currentWeapon = 1;  //reset selector after ss shot
                let counter = 0;
                // if(counter < 5){
                //     setInterval()
                // }
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