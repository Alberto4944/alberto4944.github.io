// Grid Based Assignment
// Your Name
// Date
// Likely will be a kenken style game
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// 2d rectangular operationGrid demo

const ADD_SQUARE = "ADD"; // Pink
const MINUS_SQUARE = "MINUS"; // BLue
const MULTIPLY_SQUARE = "MULTIPLY"; // orange
const DIVIDE_SQUARE = "DIVIDE"; // Green

const CELL_SIZE = 100;
let sides = 5;
let operationGrid;
let numberGrid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // sides = Math.floor(height/CELL_SIZE);
  // sides = Math.floor(width/CELL_SIZE);
  operationGrid = generateRandomGrid(sides);
  numberGrid = generateEmptyGrid(sides, 0);
}

function draw() {
  background(220);
  displayGrid();
  // operationGrid[1][1] = ADD_SQUARE;
}

function keyPressed() {
  if (key === "r") {
    operationGrid = generateRandomGrid(sides, sides);
    // findOthers(1,1);
  }
  else if (key === "e") {
    operationGrid = generateEmptyGrid(sides, sides, ADD_SQUARE);
  }
}

function displayGrid() {
  for (let y = 0; y < sides; y++) {
    for (let x = 0; x < sides; x++) {
      if (operationGrid[y][x] === ADD_SQUARE) {
        fill(244, 137, 137);
      }
      else if (operationGrid[y][x] === MINUS_SQUARE) {
        fill("blue");
      }
      else if (operationGrid[y][x] === MULTIPLY_SQUARE) {
        fill("orange");
      }
      else if (operationGrid[y][x] === DIVIDE_SQUARE) {
        fill("green");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      fill('black');
      textSize(50);
      text(`${numberGrid[y][x]}`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
    }
  }
}

function generateRandomGrid(sides) {
  let newGrid = [];
  for (let y = 0; y < sides; y++) {
    newGrid.push([]);
    for (let x = 0; x < sides; x++) {
      let randomNumber = random(100);
      if (randomNumber > 75) {
        newGrid[y].push(ADD_SQUARE);
      }
      else if (randomNumber > 50) {
        newGrid[y].push(MINUS_SQUARE);
      }
      else if (randomNumber > 25) {
        newGrid[y].push(MULTIPLY_SQUARE);
      }
      else {
        newGrid[y].push(DIVIDE_SQUARE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(sides, emptySpace) {
  let newGrid = [];
  for (let y = 0; y < sides; y++) {
    newGrid.push([]);
    for (let x = 0; x < sides; x++) {
      newGrid[y].push(emptySpace);
    }
  }
  return newGrid;
}

function findOthers(x,y) {
  // Choose direction for the math to go
  if (x > 0 && x < sides && y > 0 && y < sides) {
    let direction = Math.floor(random(0,5)); // 0 = North, 1 = East, 2 = South, 3 = West, 4 = Solo
    console.log(direction);
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);
  console.log(x);
  //self
  // toggleCell(x, y);
  changeNumber(x,y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the operationGrid
  if (x >= 0 && x < sides && y >= 0 && y < sides) {
    if (operationGrid[y][x] === ADD_SQUARE) {
      operationGrid[y][x] = MINUS_SQUARE;
    }
    else if (operationGrid[y][x] === MINUS_SQUARE) {
      operationGrid[y][x] = MULTIPLY_SQUARE;
    }
    else if (operationGrid[y][x] === MULTIPLY_SQUARE) {
      operationGrid[y][x] = DIVIDE_SQUARE;
    }
    else {
      operationGrid[y][x] = ADD_SQUARE;
    }
  }
}

function changeNumber(x,y) {
  if (x >= 0 && x < sides && y >= 0 && y < sides) {
    if (numberGrid[y][x] === sides) {
      numberGrid[y][x] = 0;
    }
    else {
      numberGrid[y][x]++;
    }
  }
}