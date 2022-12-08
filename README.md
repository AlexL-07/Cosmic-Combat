# Cosmic Combat
## Background 
Cosmic Combat is a 4 player turn-based game, that allows each player to take control of a spaceship. The goal of this game is to defeat all of your opponents by 
using your spaceship's arsenal of weapons to depelete their health bars before they deplete yours. The mechanics of using your spaceship's weapons will be similar 
to older popular games like "Gunbound" and "Tank Wars", where you would have to set the proper launch angle and power to accurately hit your opponents over the terrain. 
There will be periodically changing winds that will affect your weapon's flight path and you would have to take this into account when determining the angle and power 
to launch your weapon. The game ends once there is only one player left standing on the map. 

## Functionality
In Cosmic Combat, users will be able to: 
* Move their spaceships across a 2D terrain to find better angles to use their weapons
* Determine the proper launch angle and power to fire their spaceship's weapon to hit their opponents
* Use any of the 3 different weapons of a spaceship's arsenal to defeat their opponents 
* Destroy the terrain using their weapons 

In addition, this project will include:
* Periodically changing wind that will affect a player's shot
* Background music and SFX when playing the game 

## Layouts
### Landing Page

![Screen Shot 2022-12-08 at 11 53 18 AM](https://user-images.githubusercontent.com/103486289/206557387-544480c3-6f49-43c0-82d8-5e83f41430b4.png)

### Instructions Page

![Screen Shot 2022-12-08 at 11 53 37 AM](https://user-images.githubusercontent.com/103486289/206557542-41e64445-5eba-4b9b-8882-ef855a6d37ea.png)

### Game 

![Screen Shot 2022-12-08 at 11 59 52 AM](https://user-images.githubusercontent.com/103486289/206557690-b1c578df-e850-4c49-83d0-38128119e7bf.png)

## How to Play
* Play locally with 4 players
* The goal is to be the last spaceship standing.
* You can defeat your opponents by depleting their healthbars or by dropping them off of the map
* Move your spaceship on the terrain using 'A' or 'D' on your keyboard
* There is a limit to how far you can move per turn
* Adjust the angle of your shot using 'W' or 'S' on your keyboard
* Select the weapon you would like to use by clicking the '1', '2', or '3' buttons located on the bottom left
* Hold down the 'space' bar to determine the power of your shot, release the 'space' bar to fire your shot
* Watch out for gravity and wind changes

## Implementation Details 

### Projectile Collision Detection
The projectile checks if it has collided with a spaceship, terrain, or nothing. 
```javascript
collisionCheck(x, y, width, height){
        for (let i = 0; i < window.spaceShips.length; i++) {  
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
``` 

### Projectile Trajectory
Depending on what the projectile hits, the terrain can be damaged by the projectile's explosion radius or a player can be damged if the projectile hits its hit box. 
```javascript 
render(){
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
          ctx.beginPath(); 
          ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
          ctx.drawImage(this.sprite, this.x, this.y)
          ctx.closePath();
          this.time += 0.5;
        }
    }
```
### Terrain Destruction
Terrain destruction was implemented by using the globalCompositeOperation on the ctx of the canvas, by applying "destination-out" any terrain that overlaps where the projectile hits will be left empty. 
```javascript
render(ctx){
        if (this.data) this.ctx.putImageData(this.data, 0 , 0);
        this.canvas.getContext('2d').drawImage(this.buffer, 0, 0);
        if (this.weapon) {
          this.ctx.globalCompositeOperation = 'destination-out';

          this.ctx.strokeStyle = "#000";
          this.ctx.beginPath();
          this.ctx.arc(this.weapon.x, this.weapon.y, this.weapon.explosionRadius, 0, Math.PI*2);
          this.ctx.fill();
          this.weapon = null;
          this.data = this.ctx.getImageData(0,0,this.img.width, this.img.height);
          this.ctx.globalCompositeOperation = 'source-over';
        }

        document.getElementById('wind-text').innerHTML = `${this.windSpeed}`; //wind speed text

        window.UI.ctx.beginPath(); // wind angle display 
        window.UI.ctx.arc(this.canvas.width/2, 45, 40, (-this.windAngle+10)*Math.PI/180, (-this.windAngle-10)*Math.PI/180, true);
        window.UI.ctx.strokeStyle = 'rgba(255,0,0,255)';
        window.UI.ctx.lineWidth = 10;
        window.UI.ctx.stroke();
        window.UI.ctx.closePath();
        window.UI.ctx.lineWidth = 2;
    }
```


## Technologies Used
* For the core game logic - DOM manipulation using Vanilla JavaScript
* For the rendering - HTML, CSS and the Canvas API
* For bundling and transpiling of the source JavaScript code - Webpack and Babel
* For the sound - Web Audio API
* For collisions, wind and gravity - applied physics and mathematics 

## Future Features
* Add moving sprites
* Add more spaceships 
* Allow for users to select number of players 




