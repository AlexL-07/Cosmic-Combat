import Map from './map'
import SpaceShip from './spaceship'
import UI from './ui'



class Game {
    constructor(canvas, ctx, ctxTerrain, canTerrain, canText, ctxText, background, ctxBG){
        this.canvas = canvas;
        this.ctx = ctx;
        this.ctxTerrain = ctxTerrain;
        this.canTerrain = canTerrain;
        this.background = background;
        this.ctxBG = ctxBG;
        this.map = new Map(this.ctxTerrain, this.canTerrain);
        this.spaceship1 = new SpaceShip('Player 1', 80, -200, ctx, ctxTerrain);
        this.spaceship2 = new SpaceShip('Player 2', 380, -200, ctx, ctxTerrain);
        this.spaceship3 = new SpaceShip('Player 3', 750, -200, ctx, ctxTerrain);
        this.spaceship4 = new SpaceShip('Player 4', 1050, -200, ctx, ctxTerrain);
        this.currentPlayer = this.spaceship1;
        this.TIMEOUT = 30;
        this.time = 30;
        this.turnCounter = 1;
        this.roundCounter = 0;
        this.objects = [];
        this.UI = new UI(this);
        this.backgroundImg = new Image();
        this.backgroundImg.src = './assets/bg2.png'

        this.bindKeyDown = this.bindKeyDown.bind(this);
        this.bindKeyUp = this.bindKeyUp.bind(this);

        window.game = this;
        window.spaceShips = [this.spaceship1, this.spaceship2, this.spaceship3, this.spaceship4].sort(() => Math.random() - 0.5);
        window.canText = canText;
        window.ctxText = ctxText;

        window.keyDown = window.addEventListener('keydown', this.bindKeyDown);
        window.keyUp = window.addEventListener('keyup', this.bindKeyUp);

        this.startTurns = this.startTurns.bind(this);
        this.render = this.render.bind(this);


        this.theme = document.createElement('audio');
        this.theme.src = './assets/theme.mp3';
        this.theme.id = 'theme';
        this.theme.loop = true;
        this.theme.volume = 0.3;
        // this.theme.muted = true;

        this.turn = document.createElement('audio');
        this.turn.src = './assets/turn.mp3';
        this.turn.id = 'turn';
        this.turn.volume = 0.3;
        // this.turn.muted = true;

        this.win = document.createElement('audio');
        this.win.src = './assets/win.mp3';
        this.win.id = 'win';
        this.win.volume = 0.3;
        // this.win.muted = true;

        this.wind = document.createElement('audio');
        this.wind.src = './assets/wind.mp3';
        this.wind.id = 'wind';
        this.wind.volume = 0.3;
        // this.wind.muted = true;
    }

    bindKeyDown(event){
        const keyName = event.key;
        if (keyName == 'a') this.currentPlayer.move(-1.5, 'left'); 
        if (keyName == 'd') this.currentPlayer.move(1.5, 'right');
        if (keyName == 'w') this.currentPlayer.changeAngle(2);
        if (keyName == 's') this.currentPlayer.changeAngle(-2);
        if (keyName == ' ') {
            event.preventDefault();
            this.UI.startAdjustPower();
        }

    }

    bindKeyUp(event){
        const keyName = event.key;
        if (keyName == ' ') this.UI.stopAdjustPower(this.currentPlayer);
    }

    addObject(obj){
        if(obj instanceof Array){
            this.objects = this.objects.concat(obj);
        } else {
            this.objects.push(obj)
        }
    }

    removeObject(obj){
        this.objects.splice(
            this.objects.indexOf(obj), 1
          );
    }

    render(){
        this.ctx.clearRect(0,0,canvas.width, canvas.height);
        
        window.UI.ctx.clearRect(0,0,window.UI.canvas.width, window.UI.canvas.height);
        this.ctxBG.drawImage(this.backgroundImg, 0, 0, this.canvas.width, this.canvas.height)
        

        window.map.render(this.ctxTerrain); //render terrain


        if (window.spaceShips.length > 1) {
            if(this.currentPlayer.face === "right"){
                window.UI.ctx.fillStyle = 'rgba(220,190,90,1)'; //turn indicator
                window.UI.ctx.fillRect(this.currentPlayer.x-15, this.currentPlayer.y-70, 30, 25);
                window.UI.ctx.strokeStyle = 'rgba(0,0,0,1)';
                window.UI.ctx.strokeRect(this.currentPlayer.x-15, this.currentPlayer.y-70, 30, 25);
                window.UI.ctx.font = "20px pixel-font"; //timer text for currentPlayer
                window.UI.ctx.fillStyle = 'black';
                window.UI.ctx.textAlign = "center";
                window.UI.ctx.fillText(this.time.toString(), this.currentPlayer.x, this.currentPlayer.y-51);

            } else if (this.currentPlayer.face === "left"){
                window.UI.ctx.fillStyle = 'rgba(220,190,90,1)'; //turn indicator
                window.UI.ctx.fillRect(this.currentPlayer.x+33, this.currentPlayer.y-70, 30, 25);
                window.UI.ctx.strokeStyle = 'rgba(0,0,0,1)';
                window.UI.ctx.strokeRect(this.currentPlayer.x+33, this.currentPlayer.y-70, 30, 25);
                window.UI.ctx.font = "20px pixel-font"; //timer text for currentPlayer
                window.UI.ctx.fillStyle = 'black';
                window.UI.ctx.textAlign = "center";
                window.UI.ctx.fillText(this.time.toString(), this.currentPlayer.x+48, this.currentPlayer.y-51);
            }
        }

        for (let i = 0; i < window.spaceShips.length; i++) {
            window.spaceShips[i].render(this.ctx, this.ctxTerrain);
            if (window.spaceShips[i] && (Math.abs(window.spaceShips[i].x) > this.canvas.width || Math.abs(window.spaceShips[i].y) > this.canvas.height)) {
                window.spaceShips.splice(i, 1);
                clearInterval(window.game.interval);
                clearTimeout(window.game.timeout);
                window.game.startTurns();
            }
        }
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].render(this.ctx);
            if (this.objects[i] && (Math.abs(this.objects[i].x) > 1800 || Math.abs(this.objects[i].y) > 1800)) {
                this.objects.splice(i, 1);

                document.getElementById('overlay').classList.add('hidden'); //ss shot overlay

                window.game.time = window.game.TIMEOUT;
                clearInterval(this.interval);
                clearTimeout(this.timeout);
                this.startTurns();
            }
        }

        document.getElementById('angle-display').innerHTML = this.currentPlayer.prevAngle;
    }

    

    startTurns () {
        this.turn.play(); 
        window.UI.disabled = false;
        window.removeEventListener('keypress', this.shotKeys);
        window.removeEventListener('keypress', this.shotKey3);
        window.spaceShips.sort((a,b) => a.delay - b.delay)
        if (this.currentPlayer === window.spaceShips[0] && window.spaceShips.length !== 2){
            window.spaceShips.push(window.spaceShips.shift())
        }
        this.currentPlayer = window.spaceShips[0]; 
        this.currentPlayer.delay = 0;
        this.currentPlayer.distance = 0;
        document.getElementById('prev-power').style.left = `${this.currentPlayer.prevPower}px`;

        const shotKey = (e) => { e.key;
            if (e.key == '1') this.currentPlayer.switchWeapon1(); 
            if (e.key == '2') this.currentPlayer.switchWeapon2(); 
        };

        const shotKey3 = (e) => {
            const keyPress = e.key;
            if (e.key == '3' && this.currentPlayer.weapon3CD <= 0) this.currentPlayer.switchWeapon3(); 
        };

        if (this.roundCounter !== 0 && this.roundCounter % 3 === 0 && this.turnCounter === 1) { 
            this.wind.play(); 
            this.map.changeWind();
        }


        document.getElementById('turn-queue').innerHTML = '';
        for (let i = 0; i < window.spaceShips.length; i++) { 
            let li = document.createElement('li');
            li.innerHTML = `${window.spaceShips[i].username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${window.spaceShips[i].delay}`;
            document.getElementById('turn-queue').appendChild(li);
        }

        window.addEventListener('keypress', shotKey);
        document.getElementById('weapon1').onclick = this.currentPlayer.switchWeapon1; 
        document.getElementById('weapon2').onclick = this.currentPlayer.switchWeapon2; 
        if (this.currentPlayer.weapon3CD <= 0) {
            window.addEventListener('keypress', shotKey3);
            document.getElementById('weapon3').onclick = this.currentPlayer.switchWeapon3; 
            document.getElementById('weapon3').style.background = 'rgb(246, 216, 89)'; 
        } else {
            document.getElementById('weapon3').style.background = 'rgb(60,60,60)'; 
        }

        this.currentPlayer.turnOver = false;

        window.spaceShips.push(window.spaceShips.shift()); 

        if (this.turnCounter % window.spaceShips.length === 0) { 
            this.roundCounter++;
            this.turnCounter = 1;

        } else { 
            this.turnCounter++;
        }


        this.interval = setInterval (() => {
        if (this.currentPlayer.turnOver) {
            clearInterval(this.interval);
            this.time = this.TIMEOUT;
            clearTimeout(this.timeout);
        } else {
            this.time--;
            document.getElementById('main-timer').innerHTML = this.time;
        }
        }, 1000);

        this.timeout = setTimeout (() => {
            this.time = this.TIMEOUT;
            clearInterval(this.interval);
            this.startTurns();
        }, this.TIMEOUT*1000);

        this.playerDecayInc();
    }

    playerDecayInc(){
        window.spaceShips.forEach(spaceship => {
            if(spaceship.delay > 100){
                spaceship.delay -= 100;
            }
        })
    }


    gameOver(spaceship){
        this.win.play();
        this.theme.pause();
        clearTimeout(this.timeout);
        clearInterval(this.interval);
        this.time = "";
        window.UI.ctx.font = "80px pixel-font";
        window.UI.ctx.fillStyle = 'red';
        window.UI.ctx.fillText(`${spaceship.username} Wins!`, this.canvas.width/2, this.canvas.height/2-50);
    }
}

export default Game