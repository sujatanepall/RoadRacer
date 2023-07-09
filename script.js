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
// moving line
function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 850) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
  let lineOne = document.querySelectorAll(".lineOne");
  lineOne.forEach(function (item) {
    if (item.y >= 850) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function gamePlay() {
  console.log("Game clicked");
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  console.log(road);

  if (player.start) {
    moveLines();

    if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 70) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
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

  for (x = 0; x < 7; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }
  for (x = 0; x < 7; x++) {
    let roadLineOne = document.createElement("div");
    roadLineOne.setAttribute("class", "linesOne");
    roadLineOne.style.top = x * 150 + "px";
    gameArea.appendChild(roadLineOne);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  //   car.innerText = "Car";
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  console.log("top position" + car.offsetTop);
  console.log("left position" + car.offsetLeft);

  // console.log("top position" + enemy.offsetTop);
  // console.log("left position" + enemy.offsetLeft);

  // EnemyCar
  for (x = 0; x < 3; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = x * 150;
    enemyCar.style.top = enemyCar.y + "px";
    gameArea.appendChild(enemyCar);
  }
}
