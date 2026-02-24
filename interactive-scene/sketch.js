// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerOneX = 100;
let playerOneY = 100;
let playerOneSize = 20;
let playerOneSpeed=2;

let playerTwoX = 300;
let playerTwoY = 300;
let playerTwoSize = 20;
let playerTwoSpeed=2;

function setup() {
  noStroke();
  createCanvas(400, 400);


}

function draw() {
  background("white");
  movePlayerOne();
  movePlayerTwo();
}

function movePlayerOne() {
  fill("red");
  circle(playerOneX, playerOneY, playerOneSize);
  if (keyIsDown(87)) {
    playerOneY -= playerOneSpeed;
  }
  if (keyIsDown(83)) {
    playerOneY += playerOneSpeed;
  }
  if (keyIsDown(65)) {
    playerOneX -= playerOneSpeed;
  }
  if (keyIsDown(68)) {
    playerOneX += playerOneSpeed;
  }
}

function movePlayerTwo() {
  fill("blue");
  circle(playerTwoX, playerTwoY, playerTwoSize);
  if (keyIsDown(38)) {
    playerTwoY -= playerTwoSpeed;
  }
  if (keyIsDown(40)) {
    playerTwoY += playerTwoSpeed;
  }
  if (keyIsDown(37)) {
    playerTwoX -= playerTwoSpeed;
  }
  if (keyIsDown(39)) {
    playerTwoX += playerTwoSpeed;
  }
}