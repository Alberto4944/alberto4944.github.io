// Project Title
// Your Name
// Date
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// RANDOM KEY INPUTS AFTER

let shipX = 250;
let shipY = 500;
let shipSpeed = 5;
let shipSize = 50;

let enemySpeed = 2;
let enemySize = 25;
let enemies = [];

let hitDistance = 50;
let lives = 3;
let lastHit = -500;

let randomLeft = 65;
let randomRight = 68;

function setup() {
  noStroke();
  createCanvas(500, 500);
  spawnEnemy();
  spawnEnemy();
}

function draw() {
  background(221);
  moveShipX();
  moveEnemies();
  console.log(lives);
}

function spawnEnemy() {
  fill("red");
  enemy = {
    enemyX: random(10, width-10),
    enemyY: 10,
    enemySpeed: 5
  };
  enemies.push(enemy);
}

function moveEnemies() {
  fill("red");
  for (let i = 0; i<enemies.length; i++) {
    circle(enemies[i].enemyX, enemies[i].enemyY, enemySize); // Draws the enemies
    enemies[i].enemyY+=enemySpeed; // moves the enemies
    if (dist(shipX, shipY, enemies[i].enemyX, enemies[i].enemyY) <= enemySize/2 + shipSize/2 && millis() > lastHit + 500) {
      lives-=1;
      lastHit = millis(); // detects if the enemies collide with the ship
      selectRandomKeys();
    }
    if (enemies[i].enemyY > height) {
      enemies[i].enemyY = 10;
      enemies[i].enemyX = random(0+enemySize/2, width-enemySize/2);
    }
  }
}

function selectRandomKeys() {
  randomLeft = int(random(65,90));
  randomRight = int(random(65,90));
  while (randomLeft === randomRight) {
    randomRight = int(random(65,90));
  }
  console.log("abcdefghijklmnopqrstuvwxyz"[randomLeft- 65] + randomLeft);
  console.log("abcdefghijklmnopqrstuvwxyz"[randomRight - 65] + randomRight);

}

function moveShipX() {
  fill("black");
  circle(shipX, shipY, shipSize);
  if (keyIsDown(randomLeft)) {
    shipX -= shipSpeed;
  }
  if (keyIsDown(randomRight)) {
    shipX += shipSpeed;
  }
}