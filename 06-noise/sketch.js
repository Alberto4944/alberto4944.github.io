// Perlin Noise Demo
// Albert Wu
// March 17/2026

let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fill("black");
  let x = width*noise(time);
  let y = height*noise(time+1000); 
  circle(x, y, 75);

  time+=0.0025;
}
