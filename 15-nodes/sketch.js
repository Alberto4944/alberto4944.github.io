// Connected nodes demo

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  //draw lines first
  for (let node of nodes) {
    node.update();
    node.connectTo(nodes);
  }

  //draw the circles after
  for (let node of nodes) {
    node.display();
  }
}

function mousePressed() {
  somePoint = new MovingPoint(mouseX, mouseY);
  nodes.push(somePoint);
}

class MovingPoint {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.color = color(random(255), random(255), random(255));
    this.speed = 25;
    this.deltaTime = 0.02;
    this.reach = 150;
    this.minRadius = 15;
    this.maxRadius = 30;
  }

  display() {
    noStroke();
    fill(this.color)
    circle(this.x, this.y, this.radius*2);
  }

  update() {
    this.move();
    this.wrapAroundScreen();
    this.mouseSizeAdjustment();
  }

  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += dx;
    this.y += dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen() {
    if (this.x - this.radius < 0) {
      this.x = width - this.radius;
    }
    else if (this.x + this.radius > width) {
      this.x = this.radius;
    }
    else if (this.y - this.radius < 0) {
      this.y = height - this.radius;
    }
    else if (this.y + this.radius < 0) {
      this.y = this.radius;
    }
  }

  connectTo(nodesArray) {
    for (let otherNode of nodesArray) {
      if (this !== otherNode) {
        let distanceAway = dist(this.x, this.y, otherNode.x, otherNode.y);
        if (distanceAway < this.reach) {
          stroke(this.color);
          line(this.x, this.y, otherNode.x, otherNode.y);
        }
      }
    }
  }
  mouseSizeAdjustment() {
    let mouseDistance = dist(mouseX, mouseY, this.x, this.y);
    if (mouseDistance < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else {
      this.radius = this.minRadius;
    }
  }
}