// Image Demo

let luigiimg;

function preload() {
  luigiimg = loadImage("eclipse-shader.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(luigiimg, mouseX, mouseY, mouseX, mouseY);
}
