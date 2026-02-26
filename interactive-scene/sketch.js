// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// COMPLETE CHANGE OF PLANS, make it a space avoider thing like my python final but have it switch inputs every so often


let shipX = 250;
let shipY = 500;
let shipSpeed = 5;

function setup() {
  
  
  noStroke();
  createCanvas(500, 500);
}


function moveShipX() {
  fill("black");
  circle(shipX, shipY, 50);
  if (keyIsDown(65)) {
    shipX -= shipSpeed;
  }
  if (keyIsDown(68)) {
    shipX += shipSpeed;
  }
}

function draw() {
  background("white");
  moveShipX();
}
