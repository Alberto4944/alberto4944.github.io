// Project Title
// Your Name
// Date
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let enemies = [];

let hitDistance = 50;
let lives = 5;
let lastHit = -500;

let randomLeft = 65; // Default Left Key = A
let randomRight = 68; // Default Right Key = D

let score = 0;

let spawnInterval = 15000;
let lastSpawn = 0;

let mouseWheelLucky = false;

// Splits possible keys into left and right havles
let possibleLeftKeys = [81, 65, 90, 87, 83, 88, 69, 68, 67, 82, 70, 86, 84, 71];
let possibleRightKeys = [80, 76, 79, 75, 77, 73, 74, 78, 85, 72, 66, 89];

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  spawnEnemy();
  shipX = width/2;
  shipY = height;
  enemySpeed = width/175;
  shipSpeed = width/175;
  shipSize = width/20;
  enemySize = width/35;


}


function draw() {
  background(221);
  drawText();
  moveShipX();
  if (millis() - lastSpawn > spawnInterval) {
    spawnEnemy();
    lastSpawn = millis();
    enemySpeed*=1.1;
  }
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
      score+=1;
      console.log(`Score = ${score}`);
    }
  }
}

function selectRandomKeys() {
  choice = int(random(0,5));
  if (choice === 0) {
    mouseWheelLucky = true;
  }
  else if (mouseWheelLucky) {
    mouseWheelLucky = !mouseWheelLucky;
  }
  else {
    randomLeft = random(possibleLeftKeys);
    randomRight = random(possibleRightKeys);
  }
}

function moveShipX() {
  fill("black");
  circle(shipX, shipY, shipSize);
  if (keyIsDown(randomLeft) && shipX > shipSize/2) {
    shipX -= shipSpeed;
  }
  if (keyIsDown(randomRight) && shipX < width-shipSize/2) {
    shipX += shipSpeed;
  }
}

function drawText() {
  leftKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[randomLeft- 65];
  rightKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[randomRight - 65];
  fill("black");
  fontSize = width/5;
  textSize(fontSize);
  if (mouseWheelLucky) {
    textSize(width/100);
    text("YOU GOT LUCKY, USE MOUSE WHEEL", width/2, height/2);
  }
  else {
    text(leftKey, width/8, height/2);
    text(rightKey, width*7/8-fontSize, height/2);
  }
}

function mouseWheel(event) {
  if (event.delta > 0 && mouseWheelLucky) {
    shipX-=shipSpeed;
  }
  else if (mouseWheelLucky) {
    shipX+=shipSpeed;
  }
}