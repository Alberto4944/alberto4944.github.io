// Grid Based Assignment
// Your Name
// Date
// Likely will be a kenken style game
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// 2d rectangular grid demo

const ADD_SQUARE = "ADD";
const MINUS_SQUARE = "MINUS";
const MULTIPLY_SQUARE = "MULTIPLY";
const DIVIDE_SQUARE = "DIVIDE";

const CELL_SIZE = 100;
let rows;
let cols;
let grid;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
  }
}


function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === ADD_SQUARE) {
        fill(244, 137, 137);
      }
      else if (grid[y][x] === MINUS_SQUARE) {
        fill("blue");
      }
      else if (grid[y][x] === MULTIPLY_SQUARE) {
        fill("orange");
      }
      else if (grid[y][x] === DIVIDE_SQUARE) {
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
      if (random(100) < 50) {
        newGrid[y].push(ADD_SQUARE);
      }
      else if (random(100) < 50) {
        newGrid[y].push(MINUS_SQUARE);
      }
      else if (random(100) < 50) {
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