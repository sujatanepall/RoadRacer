const score = document.querySelector(".score");
const healthLine = document.querySelector(".healthLine");
const livesLine = document.querySelector(".livesLine");
const popUp = document.querySelector(".popUp");
const gameArea = document.querySelector(".gameArea");
const instructions = document.querySelector(".instructions");

popUp.addEventListener("click", start);

let healthBar = 100;
let lives = 3;
let player = { speed: 5, score: 0 };
let projectiles = [];

const fire = new Audio("./audio/fire.wav");
const crash = new Audio("./audio/crash.mp3");
const over = new Audio("./audio/gameover.mp3");

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
  if (e.key === "Escape") {
    exit();
  }
  if (e.keyCode === 32) {
    shootProjectile();
  }
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

// collision
function isColide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

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

// function to end game

function endGame() {
  player.start = false;
  popUp.classList.remove("hide");
  popUp.innerHTML =
    "Game Over <br> Your final Score is " +
    player.score +
    " <br>Press here to restart the Game.";
  over.play();
}

let canCollide = true;
// Function for moving Enemy
function moveEnemy(car) {
  let enemy = document.querySelectorAll(".enemy");

  enemy.forEach(function (item) {
    if (isColide(car, item) && canCollide) {
      //calling function collide
      crash.play();
      console.log("Boom Hit");

      healthBar -= 50; //Decreases health when collided with an enemy
      player.y = gameArea.offsetHeight - car.offsetHeight - 10;
      car.style.top = player.y + "px";

      canCollide = false;
      setTimeout(() => {
        canCollide = true;
      }, 1000);
      if (healthBar <= 0) {
        healthBar = 100;
        lives--; //Decreases lives if health reaches zero
      }
      if (lives === 0) {
        endGame();
      }
    }

    if (item.y >= 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function generateEnemyCar() {
  for (x = 0; x < 3; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (x + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";

    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar);
  }
}

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  let enemies = document.querySelectorAll(".enemy");

  projectiles.forEach(function (projectile) {
    let currentTop = parseInt(projectile.style.top);
    projectile.style.top = currentTop - 5 + "px";

    enemies.forEach(function (enemy) {
      if (isColide(projectile, enemy)) {
        enemy.remove();
        projectile.remove();
        player.score += 1000;
        score.innerText = "Score: " + player.score;
        crash.play();
      }
    });
    if (projectile.y < 0) {
      projectile.remove();
    }
  });

  if (enemies.length < 3) {
    generateEnemyCar();
  }

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

    player.score++;
    let ps = player.score - 1;
    score.innerText = "Score: " + ps;

    healthLine.innerText = " Health:" + healthBar;
    livesLine.innerText = " Lives: " + lives;

    // console.log(player.healthLine--);
  }
}

// function to shoot projectiles
function shootProjectile() {
  let projectile = document.createElement("div");
  projectile.className = "projectile";
  projectile.style.position = "absolute";
  projectile.style.left = player.x + "px";
  projectile.style.top = player.y + "px";
  gameArea.appendChild(projectile);
  projectiles.push(projectile);
  fire.play();
}

// Start Function
function start() {
  gameArea.classList.remove("hide");
  popUp.classList.add("hide");

  player.start = true;
  healthBar = 100;
  lives = 3;
  player.score = 0;

  window.requestAnimationFrame(gamePlay);
  popUp.addEventListener("click", restart);

  for (let x = 0; x < 7; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }
  for (let x = 0; x < 7; x++) {
    let roadLineOne = document.createElement("div");
    roadLineOne.setAttribute("class", "linesOne");
    roadLineOne.y = x * 150;
    roadLineOne.style.top = x * 150 + "px";
    gameArea.appendChild(roadLineOne);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;
}

function restart() {
  // Reset game elements and variables
  gameArea.innerHTML = "";
  healthBar = 100;
  lives = 3;
  player.score = 0;
  popUp.classList.add("hide");

  // Start the game again
  start();
}

function exit() {
  window.location = "/";
}
