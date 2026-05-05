// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  hit = collideRectCircle(200, 200, 100, 150, mouseX, mouseY, 100);
  console.log(hit);

  rect(200, 200, 100, 150);
  circle(mouseX, mouseY, 100);

}
