// Ball Object Notation Array

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(width/2, height/2, 50);

  for(let ball of ballArray) {
    ball.x += ball.dx;
    ball.y += ball.dy;

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
  }
}

function spawnBall() {
  let ball = {
    x: mouseX,
    y: mouseY,
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 40)
  };
  ballArray.push(ball);
}

function mouseClicked() {
  spawnBall();
}
