// Interactive Scene
// Albert Wu
// 2026/03/03
// Extra for Experts:
// In a 1/10 chance, you can use the mouse wheel to control the ship. Also, I used object values and arrays to manage the number of enemies.

// Set Default Values Including High Score
let hitDistance = 50;
let lastHit = -500;
let highScore = 0;
let spawnInterval = 15000;
let gameState = "start";

// Splits possible keys into left and right havles
let possibleLeftKeys = [81, 65, 90, 87, 83, 88, 69, 68, 67, 82, 70, 86, 84, 71];
let possibleRightKeys = [80, 76, 79, 75, 77, 73, 74, 78, 85, 72, 66, 89];

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  resetVariables();
  spawnEnemy();
  textFont("Courier New");
}

function draw() {
  if (gameState === "start") { // Start Menu
    startScreen();
  }
  else if (gameState === "game") { // Run Game
    background(221);
    drawText();
    moveShipX();
    if (millis() - lastSpawn > spawnInterval) { // Every X amount of seconds, it will spawn another enemy and increase the speed
      spawnEnemy();
      lastSpawn = millis();
      enemySpeed*=1.1;
    }
    moveEnemies();
  }
  else if (gameState === "end") {
    endScreen();
  }
}

function resetVariables() { // Reusable Function to Reset Variables
  shipX = width/2;
  shipY = height;
  enemies = []; // Empty Array for Enemies
  lives = 3;
  enemySpeed = width/175;
  shipSpeed = width/175;
  shipSize = width/20;
  enemySize = width/35;
  score = 0;
  lastSpawn = 0;
  mouseWheelLucky = false;
  randomLeft = 65; // Default Left Key = A
  randomRight = 68; // Default Right Key = D
}

function spawnEnemy() { // Spawns an Enemy with Object Values
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
  for (let i = 0; i<enemies.length; i++) { // For each enemy
    circle(enemies[i].enemyX, enemies[i].enemyY, enemySize); // Draws the enemies
    enemies[i].enemyY+=enemySpeed; // moves the enemies
    if (dist(shipX, shipY, enemies[i].enemyX, enemies[i].enemyY) <= enemySize/2 + shipSize/2 && millis() > lastHit + 500) {
      lives-=1;
      lastHit = millis(); // detects if the enemies collide with the ship
      selectRandomKeys();
    }
    if (enemies[i].enemyY > height) { // If it reaches the bottom, it teleports and adds one score
      enemies[i].enemyY = 10;
      enemies[i].enemyX = random(0+enemySize/2, width-enemySize/2);
      score+=1;
    }
  }
  if (lives === 0) { // IF run out of lives, go to end screen
    gameState = "end";
  }
}

function selectRandomKeys() { // When you lose a life, the input changes
  if (int(random(0,10))) {
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

// Moves the ship using the right and left keys
function moveShipX() {
  fill("black");
  circle(shipX, shipY, shipSize);
  if (keyIsDown(randomLeft) && shipX > shipSize/2 && !mouseWheelLucky) {
    shipX -= shipSpeed;
  }
  if (keyIsDown(randomRight) && shipX < width-shipSize/2 && !mouseWheelLucky) {
    shipX += shipSpeed;
  }
}

// Draws text while playing the game
function drawText() {
  leftKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[randomLeft- 65]; // Left Key
  rightKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[randomRight - 65]; // Right Key
  fill("black");
  textSize(width/5);
  if (mouseWheelLucky) {
    textSize(width/30);
    text("YOU GOT LUCKY, USE MOUSE WHEEL", width/2, height/3);
  }
  else {
    text(leftKey, width/8, height/2);
    text(rightKey, width*0.85, height/2);
  }
  textSize(width/20);
  textAlign(CENTER);
  text(`Score: ${score}
Lives: ${lives}`, width/2, height/2);
}

function mouseWheel(event) { // If the chance happens, you get to use the mouse wheel
  if (event.delta > 0 && mouseWheelLucky) {
    shipX-=shipSpeed*1.5;
  }
  else if (mouseWheelLucky) {
    shipX+=shipSpeed*1.5;
  }
}

function mouseClicked() {
  if (gameState === "start") {
    gameState = "game";
  }
  if (gameState === "end") {
    gameState = "game";
    resetVariables();
  }
}

// Start Screen
function startScreen() {
  textSize(width/40);
  background("white");
  fill("black");
  textAlign(CENTER);
  text(`Do You Know Your Keyboard Well Enough
  The Goal of This Game is to Avoid the Enemies
  BUT, whenever you lose a life, the keys change.
  So, the left key could be Z and the right could be P.
  HAVE FUN! PRESS LEFT MOUSE BUTTON TO BEGIN`, width/2, height/3);
}

// END SCREEN
function endScreen() {
  if (score > highScore) {
    highScore = score;
  }
  textSize(width/40);
  background("white");
  fill("black");
  textAlign(CENTER);
  text(`You Died!
  Your Score is ${score}
  Your High Score is ${highScore}
  Press Left Mouse Button to Restart`, width/2, height/3);
}