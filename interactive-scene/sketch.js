// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// COMPLETE CHANGE OF PLANS, make it a space avoider thing like my python final but have it switch inputs every so often



function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
}

let shipX = width/2;
let shipY = 400;
let shipSpeed = 5;

function moveShipX() {
  fill("black");
  circle(shipX, shipY, 100);
  if (keyIsDown(37)) {
    shipX -= shipSpeed;
  }
  if (keyIsDown(39)) {
    shipX += shipSpeed;
  }
}

function draw() {
  background("white");
  moveShipX();
}
