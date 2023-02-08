import Game from './scripts/game';
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const terrain = document.getElementById("terrain-canvas")
const ctxTerrain = terrain.getContext("2d")
const ui = document.getElementById("ui-canvas")
const ctxUI = ui.getContext("2d")
const canText = document.getElementById('text-canvas')
const ctxText = canText.getContext("2d")
const background = document.getElementById("background")
const ctxBG = background.getContext("2d")
const startGameButton = document.getElementById("start-button")
const instructionsButton = document.getElementById("instructions-button")
const instructionsBack = document.getElementById("instructions-back")

let game = new Game(canvas, ctx, ctxTerrain, terrain, canText, ctxText, background, ctxBG);

// game.theme.play()

const muteButton = document.getElementById("muteButton");
const unmuteButton = document.getElementById("unmuteButton");
unmuteButton.classList.add("hidden");
muteButton.addEventListener("click", () => {
  // game.theme.muted = true;
  // game.turn.muted = true;
  // game.win.muted = true;
  // game.wind.muted = true;
  game.theme.volume = 0;
  game.turn.volume = 0;
  game.win.volume = 0;
  game.wind.volume = 0;
  unmuteButton.classList.remove("hidden");
  muteButton.classList.add("hidden");
});
unmuteButton.addEventListener("click", () => {
  // game.theme.muted = false;
  // game.turn.muted = false;
  // game.win.muted = false;
  // game.wind.muted = false;
  game.theme.volume = 0.3;
  game.turn.volume = 0.3;
  game.win.volume = 0.3;
  game.wind.volume = 0.3;
  muteButton.classList.remove("hidden");
  unmuteButton.classList.add("hidden");
});


instructionsBack.addEventListener('click', instructionsBackMain);

function instructionsBackMain(){
  let instructions = document.getElementById("instructions");
  instructions.setAttribute("style", "display:none");
  let mainMenuDisplay = document.getElementById("main-menu");
  mainMenuDisplay.removeAttribute("style");
  let game = document.getElementById("game");
  game.setAttribute("style", "display:none");
}

instructionsButton.addEventListener('click', openInstructions);

function openInstructions(){
  let instructions = document.getElementById("instructions");
  instructions.removeAttribute("style");
  let mainMenuDisplay = document.getElementById("main-menu");
  mainMenuDisplay.setAttribute("style", "display:none");
}

startGameButton.addEventListener('click', startGame)

function startGame(){
  let gameDisplay = document.getElementById("game");
  gameDisplay.removeAttribute("style");
  let mainMenuDisplay = document.getElementById("main-menu");
  mainMenuDisplay.setAttribute("style", "display:none");
  
  // new game was here
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
  window.map = game.map;
  let timer = document.createElement('div');
  timer.id = 'main-timer';
  document.getElementsByClassName('main')[0].insertBefore(timer, ui);
  game.theme.play();  
  game.startTurns();

  const gameLoop = () => {
    game.render();
    if (window.spaceShips.length === 1) {
      game.render();
      game.gameOver(window.spaceShips[0]);
    } else {
      window.requestAnimationFrame(gameLoop);
    }
  };
  window.requestAnimationFrame(gameLoop);
}

