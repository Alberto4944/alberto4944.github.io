// Walker OOP Demo

class Walker {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.diameter = 5;
    this.speed = 10;
    this.color = "red";
  }

  display() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      this.x += this.speed;

    }
    else if (choice < 50) {
      this.x -= this.speed;
    }
    else if (choice < 75) {
      this.y += this.speed;
    }
    else {
      this.y -= this.speed;
    }
  }

}

let firstWalker;
let secondWalker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  firstWalker = new Walker(width/2, height/2);
  secondWalker = new Walker(300, 500);
  secondWalker.color = "blue";
}

function draw() {
  secondWalker.move();
  firstWalker.move();

  firstWalker.display();
  secondWalker.display();
}
