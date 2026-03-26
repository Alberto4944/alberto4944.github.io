// Grid Based Assignment
// Your Name
// Date
// Likely will be a kenken style game
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// 2d rectangular operationGrid demo

const ADD_SQUARE = "ADD";
const MINUS_SQUARE = "MINUS";
const MULTIPLY_SQUARE = "MULTIPLY";
const DIVIDE_SQUARE = "DIVIDE";

const CELL_SIZE = 100;
let rows = 5;
let cols = 5;
let operationGrid;
let numberGrid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // rows = Math.floor(height/CELL_SIZE);
  // cols = Math.floor(width/CELL_SIZE);
  operationGrid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  displayGrid();
  // operationGrid[1][1] = ADD_SQUARE;
}

function keyPressed() {
  if (key === "r") {
    operationGrid = generateRandomGrid(cols, rows);
    // findOthers(1,1);
  }
  else if (key === "e") {
    operationGrid = generateEmptyGrid(cols, rows);
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
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
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
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

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(ADD_SQUARE);
    }
  }
  return newGrid;
}

function findOthers(x,y) {
  // Choose direction for the math to go
  if (x > 0 && x < cols && y > 0 && y < rows) {
    let direction = Math.floor(random(0,5)); // 0 = North, 1 = East, 2 = South, 3 = West, 4 = Solo
    console.log(direction);
  }

  // if (direction === 2) {

  // }
  // else if (x === 0 && direction === 3 || x === cols && direction === 1 || y === 0 && direction === 0 || y === rows && direction)
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);
  console.log(x);
  //self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the operationGrid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
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