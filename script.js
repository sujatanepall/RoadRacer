const score = document.querySelector(".score");
const healthLine = document.querySelector(".healthLine");
const popUp = document.querySelector(".popUp");
const gameArea = document.querySelector(".gameArea");

// console.log(gameArea);
popUp.addEventListener("click", start);
let player = {};

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  //   console.log(e.key);
  console.log(keys);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  //   console.log(e.key);
  console.log(keys);
}

function gamePlay() {
  console.log("Game clicked");
  if (player.start) {
    window.requestAnimationFrame(gamePlay);
  }
}
function start() {
  gameArea.classList.remove("hide");
  player.start = true;
  window.requestAnimationFrame(gamePlay);
}
