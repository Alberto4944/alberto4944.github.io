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
const SOLO_SQUARE = "SOLO";

const CELL_SIZE = 100;
let sides = 5;
let operationGrid;
let numberGrid;
let objectGrid;

function preload() {
  firstFive = loadJSON("5x5_1.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // sides = Math.floor(height/CELL_SIZE);
  // sides = Math.floor(width/CELL_SIZE);
  operationGrid = generateRandomGrid(sides);
  numberGrid = generateEmptyGrid(sides, 0);
  objectGrid = generateObjects();
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
  else if (key === "g") {
    operationGrid = firstFive;
  }
}

function displayGrid() {
  for (let y = 0; y < sides; y++) {
    for (let x = 0; x < sides; x++) {
      if (objectGrid[y][x].operation === ADD_SQUARE) {
        fill(244, 137, 137);
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        textSize(50);
        text(`${objectGrid[y][x].number}+`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }
      else if (objectGrid[y][x].operation === MINUS_SQUARE) {
        fill("blue");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        textSize(50);
        text(`${objectGrid[y][x].number}-`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }
      else if (objectGrid[y][x].operation === MULTIPLY_SQUARE) {
        fill("orange");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        textSize(50);
        text(`${objectGrid[y][x].number}x`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }
      else if (objectGrid[y][x].operation === DIVIDE_SQUARE) {
        fill("green");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        textSize(50);
        text(`${objectGrid[y][x].number}÷`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }
      else if (objectGrid[y][x].operation === SOLO_SQUARE) {
        fill("white");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        textSize(50);
        text(`${objectGrid[y][x].number}`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }
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
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the objectGrid
  if (x >= 0 && x < sides && y >= 0 && y < sides) {
    if (operationGrid[y][x] === SOLO_SQUARE) {
      objectGrid[y][x].operation = MINUS_SQUARE;
    }
    else if (objectGrid[y][x].operation === MINUS_SQUARE) {
      objectGrid[y][x].operation = MULTIPLY_SQUARE;
    }
    else if (objectGrid[y][x].operation === MULTIPLY_SQUARE) {
      objectGrid[y][x].operation = DIVIDE_SQUARE;
    }
    else if (objectGrid[y][x].operation === DIVIDE_SQUARE) {
      objectGrid[y][x].operation = ADD_SQUARE;
    }
    else if (objectGrid[y][x].operation === ADD_SQUARE) {
      objectGrid[y][x].operation = SOLO_SQUARE;
    }
  }
}

function changeNumber(delta) {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);
  if (x >= 0 && x < sides && y >= 0 && y < sides) {
    if (delta > 0) {
      objectGrid[y][x].number+=1;
      if (objectGrid[y][x].number > 9) {
        objectGrid[y][x].number = 0;
      }
    }
  }
}

function generateObjects() {
  let newArray = [];
  for (let y = 0; y < sides; y++) {
    newArray.push([]);
    for (let x = 0; x < sides; x++) {
      newArray[y].push({
        operation: "",
        number: 0,
        neighbours: ""
      });
    }
  }
  return newArray;
}

function mouseWheel(event) {
  changeNumber(event.delta);
}