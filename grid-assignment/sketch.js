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
let objectGrid;

const BORDER = 5;

function preload() {
  pregenerated = loadJSON("objectGrid.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  objectGrid = generateObjects();
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  if (key === "e") {
    console.log("PRESSED E");
    objectGrid = generateObjects();
  }
  else if (key === "g") {
    objectGrid = pregenerated; 
  }
}

function displayGrid() {
  for (let y = 0; y < sides; y++) {
    for (let x = 0; x < sides; x++) {      
      textSize(25);
      if (objectGrid[y][x].operation === ADD_SQUARE) {
        fill(244, 137, 137);
        strokeWeight(0);
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        text(`${objectGrid[y][x].number}+`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }
      else if (objectGrid[y][x].operation === MINUS_SQUARE) {
        //fill("blue");
        fill("teal");
        strokeWeight(0);
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        text(`${objectGrid[y][x].number}-`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }
      else if (objectGrid[y][x].operation === MULTIPLY_SQUARE) {
        fill("orange");
        strokeWeight(0);
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        text(`${objectGrid[y][x].number}x`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }
      else if (objectGrid[y][x].operation === DIVIDE_SQUARE) {
        fill("green");
        strokeWeight(0);
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        text(`${objectGrid[y][x].number}÷`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }
      else if (objectGrid[y][x].operation === SOLO_SQUARE) {
        fill("white");
        strokeWeight(0);
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        fill('black');
        text(`${objectGrid[y][x].number}`, x * CELL_SIZE, y * CELL_SIZE + CELL_SIZE);
      }

      // Line for right side
      if (x < sides-1 && (objectGrid[y][x].number !== objectGrid[y][x+1].number || objectGrid[y][x].operation !== objectGrid[y][x+1].operation)) {
        strokeWeight(BORDER);
        line((x+1)*CELL_SIZE, y*CELL_SIZE, (x+1)*CELL_SIZE, (y+1)*CELL_SIZE);
      }

      // Line for below
      if (y < sides-1 && (objectGrid[y][x].number !== objectGrid[y+1][x].number || objectGrid[y][x].operation !== objectGrid[y+1][x].operation)) {
        strokeWeight(BORDER);
        line((x+1)*CELL_SIZE, (y+1)*CELL_SIZE, x*CELL_SIZE, (y+1)*CELL_SIZE);
      }

      // Line for left side
      if (x > 0 && (objectGrid[y][x].number !== objectGrid[y][x-1].number || objectGrid[y][x].operation !== objectGrid[y][x-1].operation)) {
        strokeWeight(BORDER);
        line(x*CELL_SIZE, (y+1)*CELL_SIZE, x*CELL_SIZE, y*CELL_SIZE);
      }

      // // Line for above
      if (y > 0 && (objectGrid[y][x].number !== objectGrid[y-1][x].number || objectGrid[y][x].operation !== objectGrid[y-1][x].operation)) {
        strokeWeight(BORDER);
        line((x+1)*CELL_SIZE, y*CELL_SIZE, x*CELL_SIZE, y*CELL_SIZE);
      }
    }
  }
}


function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);
  //self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the objectGrid
  if (x >= 0 && x < sides && y >= 0 && y < sides) {
    if (objectGrid[y][x].operation === SOLO_SQUARE) {
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
        operation: "SOLO",
        number: 0,
      });
    }
  }
  return newArray;
}

function mouseWheel(event) {
  changeNumber(event.delta);
}