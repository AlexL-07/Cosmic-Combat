import Game from './game'

class UI {
    constructor(game){
        this.game = game;
        this.canvas = document.getElementById('ui-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px sans-serif';
        window.UI = this;
        this.disabled = false;
    }

    startAdjustPower(){
        if (!this.disabled) {
            const power = document.getElementById('power-fill');
            let width = parseInt(power.style.width.slice(0,-2));
      
            if (!this.interval) { 
              this.interval = setInterval(
                () => {
                  width = parseInt(power.style.width.slice(0,-2));
                  if (width < 1000) power.style.width = (width + 5) + 'px';
                }
                , 6);
            }
        }
      
    }

    stopAdjustPower(spaceship){
        if (!this.disabled) {
            window.UI.disabled = true;
            clearInterval(this.interval);
            this.interval = null;
            const bar = document.getElementById('power-fill');
            const fullBar = document.getElementById('power-container');
            let power = 100 * (parseInt(bar.style.width.slice(0,-2)) / parseInt(fullBar.style.width.slice(0,-2)));
            spaceship.prevPower = power/100 * 1000;
            setTimeout(() => {
              bar.style.width = '5px';
              this.game.addObject(spaceship.shoot(power));
            }, 100);
        }
    }


}

export default UI