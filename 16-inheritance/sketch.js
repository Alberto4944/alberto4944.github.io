// Inheritance OOP Demo

let myCar;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // myCar = new Vehicle('car, Honda');
  myCar = new Car("honda");
  console.log(myCar.getType());
  console.log(myCar.getName());

}

function draw() {
  background(220);
}

class Vehicle {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }
}

class Car extends Vehicle {
  constructor(name) {
    super("car", name);
  }

  getName() {
    return "This is a car called " + super.getName;
  }
}