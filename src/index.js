import Game from './scripts/game';

console.log("hello")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const terrain = document.getElementById("terrain-canvas")
const ctxTerrain = terrain.getContext("2d")
const ui = document.getElementById("ui-canvas")
const ctxUI = ui.getContext("2d")
const canText = document.getElementById('text-canvas')
const ctxText = canText.getContext("2d")


document.addEventListener('DOMContentLoaded', () => {


    let game = new Game(canvas, ctx, ctxTerrain, terrain, canText, ctxText);
    window.map = game.map;
    let timer = document.createElement('div');
    timer.id = 'main-timer';
    document.getElementsByClassName('main')[0].insertBefore(timer, ui);
    // game.theme.play(); //turn this back on later
    game.startTurns();
  
    document.getElementById('vol-container').onclick = () =>
    {
      if (game.theme.volume === 0) {
        game.theme.volume = 0.0; //set back to 0.7 later 
        game.turn.volume = 0.0;
        game.win.volume = 0.0;
        game.wind.volume = 0.0;
        document.getElementById('high-volume').classList.remove('hidden');
        document.getElementById('mute').classList.add('hidden');
      } else {
        game.theme.volume = 0;
        game.turn.volume = 0;
        game.win.volume = 0;
        game.wind.volume = 0;
        document.getElementById('high-volume').classList.add('hidden');
        document.getElementById('mute').classList.remove('hidden');
      }
    };
  
  
    const gameLoop = () => {
      game.render();
      if (window.spaceShips.length === 1) {
        game.render();
        game.over(window.spaceShips[0]);
      } else {
        window.requestAnimationFrame(gameLoop);
      }
  
    };
  
  
    window.requestAnimationFrame(gameLoop);
  });
