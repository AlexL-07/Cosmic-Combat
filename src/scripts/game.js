import Map from './map'
import SpaceShip from './spaceship'
import UI from './ui'



class Game {
    // keybinding go here for movement 
    constructor(canvas, ctx, ctxTerrain, canTerrain, canText, ctxText){
        this.canvas = canvas;
        this.ctx = ctx;
        this.ctxTerrain = ctxTerrain;
        this.canTerrain = canTerrain;
        this.map = new Map(this.ctxTerrain, this.canTerrain);
        this.spaceship1 = new SpaceShip('player 1', 100, -200, ctx, ctxTerrain);
        this.spaceship2 = new SpaceShip('player 2', 400, -200, ctx, ctxTerrain);
        this.spaceship3 = new SpaceShip('player 3', 750, -200, ctx, ctxTerrain);
        this.spaceship4 = new SpaceShip('player 4', 1050, -200, ctx, ctxTerrain);
        // this.players = []; // this is to allow users to set how many users they want to play with, can just set 4 players if this gets hard
        this.currentPlayer = this.spaceship1;
        this.TIMEOUT = 30;
        this.time = 30;
        this.turnCounter = 1;
        this.roundCounter = 0;
        this.objects = [];
        this.UI = new UI(this);

        this.bindKeyDown = this.bindKeyDown.bind(this);
        this.bindKeyUp = this.bindKeyUp.bind(this);

        window.game = this;
        window.spaceShips = [this.spaceship1, this.spaceship2, this.spaceship3, this.spaceship4];
        window.canText = canText;
        window.ctxText = ctxText;

        window.keyDown = window.addEventListener('keydown', this.bindKeyDown);
        window.keyUp = window.addEventListener('keyup', this.bindKeyUp);

        // this.startGame = this.startGame.bind(this);
        this.startTurns = this.startTurns.bind(this);
        this.render = this.render.bind(this);
        // this.addPlayers = this.addPlayers.bind(this);

        // Need to add these assets

        this.theme = document.createElement('audio');
        this.theme.src = './assets/theme.mp3';
        this.theme.id = 'theme';
        this.theme.loop = true;
        this.theme.volume = 0.7;

        this.turn = document.createElement('audio');
        this.turn.src = './assets/turn.mp3';
        this.turn.id = 'turn';
        this.turn.volume = 0.7;

        this.win = document.createElement('audio');
        this.win.src = './assets/win.mp3';
        this.win.id = 'win';
        this.win.volume = 0.7;

        this.wind = document.createElement('audio');
        this.wind.src = './assets/wind.mp3';
        this.wind.id = 'wind';
        this.wind.volume = 0.7;
    }

    bindKeyDown(event){
        const keyName = event.key;
        if (keyName == 'a') this.currentPlayer.move(-1.5, 'left'); //1.5
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
        this.objects.push(obj);
    }

    removeObject(obj){
        this.objects.splice(
            this.objects.indexOf(obj), 1
          );
    }

    render(){
    
        this.ctx.clearRect(0,0,canvas.width, canvas.height);
        window.UI.ctx.clearRect(0,0,window.UI.canvas.width, window.UI.canvas.height);

        window.map.render(this.ctxTerrain); //render terrain


        if (window.spaceShips.length > 1) {
            if(this.currentPlayer.face === "right"){
                window.UI.ctx.fillStyle = 'rgba(220,190,90,1)'; //turn indicator
                window.UI.ctx.fillRect(this.currentPlayer.x-15, this.currentPlayer.y-70, 30, 25);
                window.UI.ctx.strokeStyle = 'rgba(0,0,0,1)';
                window.UI.ctx.strokeRect(this.currentPlayer.x-15, this.currentPlayer.y-70, 30, 25);
                window.UI.ctx.font = "20px sans-serif"; //timer text for currentPlayer
                window.UI.ctx.fillStyle = 'white';
                window.UI.ctx.textAlign = "center";
                window.UI.ctx.fillText(this.time.toString(), this.currentPlayer.x, this.currentPlayer.y-51);

            } else if (this.currentPlayer.face === "left"){
                window.UI.ctx.fillStyle = 'rgba(220,190,90,1)'; //turn indicator
                window.UI.ctx.fillRect(this.currentPlayer.x+33, this.currentPlayer.y-70, 30, 25);
                window.UI.ctx.strokeStyle = 'rgba(0,0,0,1)';
                window.UI.ctx.strokeRect(this.currentPlayer.x+33, this.currentPlayer.y-70, 30, 25);
                
                window.UI.ctx.font = "20px sans-serif"; //timer text for currentPlayer
                window.UI.ctx.fillStyle = 'white';
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

    // startGame(){

    // }

    // addPlayers(num){
    //     let i = 1;
    //     while(i <= num){
    //         let xPos = Math.floor(Math.random() * (1100 - 100) + 100); //change 1100 - 100 to fit your max min of your terrain later 
    //         let yPos = -200;
    //         let player = new SpaceShip(`Player ${i}`, xPos, yPos, ctx, ctxTerrain);
    //         this.players.push(player);
    //         i++;
    //     }
    // }

    startTurns () {
        this.turn.play();
        window.UI.disabled = false;
        window.removeEventListener('keypress', this.shotKeys);
        window.removeEventListener('keypress', this.shotKeyss);
        if (this.turnCounter === 1) window.spaceShips = window.spaceShips.sort((a,b) => a.delay - b.delay);

        this.currentPlayer = window.spaceShips[0]; //change turn
        this.currentPlayer.delay = 0;
        this.currentPlayer.distance = 0;
        document.getElementById('prev-power').style.left = `${this.currentPlayer.prevPower}px`;

        const shotKey = (e) => { e.key;
            if (e.key == '1') this.currentPlayer.switchShot1(); //switch shot event listener
            if (e.key == '2') this.currentPlayer.switchShot2(); //switch shot event listener
        };

        const shotKeyss = (e) => {
            const keyPress = e.key;
            if (e.key == '3' && this.currentPlayer.ssCooldown <= 0) this.currentPlayer.switchShotss(); //switch shot event listener
        };

        if (this.roundCounter !== 0 && this.roundCounter % 3 === 0 && this.turnCounter === 1) { //change wind every 3 rounds
            this.wind.play();
            this.map.changeWind();
        }


        document.getElementById('turn-queue').innerHTML = '';
        for (let i = 1; i < window.spaceShips.length+1; i++) { //print queue
            let li = document.createElement('li');
            li.innerHTML = `${window.spaceShips[i-1].username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${window.spaceShips[i-1].delay}`;
            document.getElementById('turn-queue').appendChild(li);
        }

        window.addEventListener('keypress', shotKey);
        document.getElementById('shot1').onclick = this.currentPlayer.switchShot1; //switch shot event listener
        document.getElementById('shot2').onclick = this.currentPlayer.switchShot2; //switch shot event listener
        if (this.currentPlayer.ssCooldown <= 0) {
            window.addEventListener('keypress', shotKeyss);
            document.getElementById('ss').onclick = this.currentPlayer.switchShotss; //switch shot event listener
            document.getElementById('ss').style.background = 'rgb(246, 216, 89)'; //switch shot event listener
        } else {
            document.getElementById('ss').style.background = 'rgb(60,60,60)'; //switch shot event listener
        }

        this.currentPlayer.turnOver = false;

        window.spaceShips.push(window.spaceShips.shift()); //queue next turn

        if (this.turnCounter % window.spaceShips.length === 0) { //if last turn inc round and reset turns
            this.roundCounter++;
            this.turnCounter = 1;

        } else { //otherwise inc turns
            this.turnCounter++;
        }


        this.interval = setInterval (() => {
        if (this.currentPlayer.turnOver) {
            clearInterval(this.interval);
            this.time = this.TIMEOUT;
            clearTimeout(this.timeout);
        } else {
            this.currentPlayer.delay += 10;
            this.time--;
            document.getElementById('main-timer').innerHTML = this.time;
        }
        }, 1000);

        this.timeout = setTimeout (() => {
            this.time = this.TIMEOUT;
            clearInterval(this.interval);
            this.startTurns();
        }, this.TIMEOUT*1000);

    }

    // switchTurn(){
    //     let prevPlayer = this.players.shift();
    //     this.players.push(prevPlayer);
    // }

    gameOver(spaceship){
        this.win.play();
        this.theme.pause();
        clearTimeout(this.timeout);
        clearInterval(this.interval);
        this.time = "";
        window.UI.ctx.font = "80px sans-serif";
        window.UI.ctx.fillStyle = 'red';
        window.UI.ctx.fillText(`${spaceship.username} Wins!`, this.can.width/2, this.can.height/2-50);
    }

}

export default Game