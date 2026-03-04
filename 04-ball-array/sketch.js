// Ball Object Notation Array

let ballArray = [];
let playerRadius = 25;

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill("black");
  circle(width/2, height/2, playerRadius*2);
  for(let ball of ballArray) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    fill(ball.r, ball.g, ball.b);
    circle(ball.x, ball.y, ball.radius * 2);

    if (ball.y > height + ball.radius*2) {
      ball.y = 0;
    }
    else if (ball.y < 0 - ball.radius*2) {
      ball.y = height;
    }
    else if (ball.x > width + ball.radius*2) {
      ball.x = 0;
    }
    else if (ball.x < 0 - ball.radius*2) {
      ball.x = width;
    }
    if (keyIsDown(87)){
      ball.y+=5;
    }
    if (keyIsDown(83)){
      ball.y-=5;
    }
    if (keyIsDown(65)){
      ball.x+=5;
    }
    if (keyIsDown(68)){
      ball.x-=5;
    }
    if (dist(width/2, height/2,ball.x,ball.y) < ball.radius+playerRadius && playerRadius > ball.radius) {
      playerRadius+=(playerRadius-ball.radius)/2;
      ballArray.splice(ballArray.indexOf(ball), 1);
    }
  }
    
}

function spawnBall() {
  let ball = {
    x: mouseX,
    y: mouseY,
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 40),
    r: random(255),
    g: random(255),
    b: random(255)
  };
  ballArray.push(ball);
}

function mouseClicked() {
  spawnBall();
}
