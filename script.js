const score = document.querySelector(".score");
const healthLine = document.querySelector(".healthLine");
const popUp = document.querySelector(".popUp");
const gameArea = document.querySelector(".gameArea");

console.log(gameArea);

popUp.addEventListener("click", start);

let player = { speed: 5 };

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
  let car = document.querySelector(".car");
  if (player.start) {
    if (keys.ArrowUp) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight) {
      player.x += player.speed;
    }
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
  }
}
function start() {
  gameArea.classList.remove("hide");
  popUp.classList.add("hide");
  player.start = true;
  window.requestAnimationFrame(gamePlay);

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  //   car.innerText = "Car";
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  console.log("top position" + car.offsetTop);
  console.log("left position" + car.offsetLeft);
}
