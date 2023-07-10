const score = document.querySelector(".score");
const healthLine = document.querySelector(".healthLine");
const popUp = document.querySelector(".popUp");
const gameArea = document.querySelector(".gameArea");

console.log(gameArea);

popUp.addEventListener("click", start);

let player = { speed: 5, healthLine: 5, score: 0 };

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

// collision
function isColide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
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
  let linesOne = document.querySelectorAll(".linesOne");

  linesOne.forEach(function (item) {
    if (item.y >= 850) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function endGame() {
  player.start = false;
  popUp.classList.remove("hide");
  popUp.innerHTML =
    "Game Over <br> Your final Score is " +
    player.score +
    " <br>Press here to restart the Game.";
}

// moving Enemy
function moveEnemy(car) {
  let enemy = document.querySelectorAll(".enemy");

  enemy.forEach(function (item) {
    if (isColide(car, item)) {
      //calling funtion collide
      console.log("Boom Hit");
      endGame();
    }

    if (item.y >= 750) {
      item.y = -320;
      item.style.left = Math.floor(Math.random() * 350) + "px";
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

    moveEnemy(car);

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
    console.log(player.score++);

    player.score++;
    let ps = player.score - 1;
    score.innerText = "Score: " + ps;
    // console.log(player.healthLine--);
  }
}

function start() {
  gameArea.classList.remove("hide");
  popUp.classList.add("hide");

  player.start = true;
  player.healthLine = 3;
  player.score = 0;

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
    roadLineOne.y = x * 150;
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
    enemyCar.y = (x + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";

    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar);
  }
}
