// Grid Based Assignment
// Your Name
// Date
// Likely will be a kenken style game
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// 2d rectangular operationGrid demo

const CELL_SIZE = 100;
let sides = 5;
let objectGrid;
let operationLocked = true;
let canInputNumber = true;

let selectedCell = {
  x: -1,
  y: -1
};

const BORDER = 5;

function preload() {
  first5x5 = loadJSON("5x5_1.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  objectGrid = generateObjects();
}

function draw() {
  background(220);
  displayGrid();
  drawSelectedTile();
  checkIfWon();
}

function keyPressed() {
  if (key === "e") {
    console.log("PRESSED E");
    objectGrid = generateObjects();
    selectedCell = {
      x: -1,
      y: -1
    };
  }
  else if (key === "g") {
    objectGrid = structuredClone(first5x5); 
    for (let i = 0; i < sides; i++) {
      for (let j = 0; j < sides; j++) {
        objectGrid[i][j].guessedNumber = "Blank";
      }
    
    }
  }
  else if (key === "l") {
    operationLock = !operationLock;
  }
  else if ("123456789".includes(key) && canInputNumber && selectedCell.x !== -1 && key <= sides) {
    objectGrid[selectedCell.y][selectedCell.x].guessedNumber = Number(key);
  }
  else if (keyCode === DELETE) {
    objectGrid[selectedCell.y][selectedCell.x].guessedNumber = "Blank";
  }
}

function displayGrid() {
  let totalGridSize = sides * CELL_SIZE;
  let offsetX = (width - totalGridSize) / 2;
  let offsetY = (height - totalGridSize) / 2;
  push();
  translate(offsetX, offsetY);

  for (let y = 0; y < sides; y++) {
    for (let x = 0; x < sides; x++) {   
      
      let currentOperation = objectGrid[y][x].operation;
      let currentNumber = objectGrid[y][x].number;  
      let currentGuess = objectGrid[y][x].guessedNumber;

      strokeWeight(0);
      if (currentOperation === "ADD") {
        fill(244,137,137);
      }
      else if (currentOperation === "MINUS") {
        fill("teal");
      }
      else if (currentOperation === "MULTIPLY") {
        fill("orange");
      }
      else if (currentOperation === "DIVIDE") {
        fill("green");
      }
      else {
        fill("white");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      fill("black");
      textSize(25);

      let isFirstInGroup = true;
      if (y > 0 && currentNumber === objectGrid[y-1][x].number && currentOperation === objectGrid[y-1][x].operation) {
        isFirstInGroup = false;
      }
      else if (x > 0 && currentNumber === objectGrid[y][x-1].number && currentOperation === objectGrid[y][x-1].operation) {
        isFirstInGroup = false;
      }
      
      if (isFirstInGroup) {
        let symbol = "";
        if (currentOperation === "ADD") {
          symbol = "+";
        }
        else if (currentOperation === "MINUS") {
          symbol = "-";
        }
        else if (currentOperation === "MULTIPLY") {
          symbol = "x";
        }
        else if (currentOperation === "DIVIDE") {
          symbol = "÷";
        }
        text(`${currentNumber}${symbol}`, 10 + x * CELL_SIZE, 30 + y * CELL_SIZE);
      }

      drawBorderOfTile(x,y,currentNumber, currentOperation);
      if (currentGuess !== "Blank") {
        strokeWeight(1);
        textSize(40);
        textAlign(CENTER);
        text(`${currentGuess}`,  x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2 + 20);
        textAlign(LEFT);
      }
      else if (currentGuess === "Blank") {

      }
    }
  }
}

function mousePressed() {
  let totalGridSize = sides * CELL_SIZE;
  let offsetX = (width - totalGridSize) / 2;
  let offsetY = (height - totalGridSize) / 2;

  let x = Math.floor((mouseX - offsetX)/CELL_SIZE);
  let y = Math.floor((mouseY - offsetY)/CELL_SIZE);

  if (x >= 0 && x < sides && y >= 0 && y < sides) {
    selectedCell.x = x;
    selectedCell.y = y;
  }
  else {
    selectedCell.x = -1;
    selectedCell.y = -1;
  }

  if (!operationLocked) {
    toggleCell(x, y);
  }
  
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the objectGrid
  if (x >= 0 && x < sides && y >= 0 && y < sides) {
    if (objectGrid[y][x].operation === "SOLO") {
      objectGrid[y][x].operation = "MINUS";
    }
    else if (objectGrid[y][x].operation === "MINUS") {
      objectGrid[y][x].operation = "MULTIPLY";
    }
    else if (objectGrid[y][x].operation === "MULTIPLY") {
      objectGrid[y][x].operation = "DIVIDE";
    }
    else if (objectGrid[y][x].operation === "DIVIDE") {
      objectGrid[y][x].operation = "ADD";
    }
    else if (objectGrid[y][x].operation === "ADD") {
      objectGrid[y][x].operation = "SOLO";
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
        guessedNumber: "Blank"
      });
    }
  }
  return newArray;
}

function drawBorderOfTile(x,y,currentNumber, currentOperation) {
  strokeWeight(BORDER);
  // Line for right side
  if (x < sides-1 && (currentNumber !== objectGrid[y][x+1].number || currentOperation !== objectGrid[y][x+1].operation)) {
    line((x+1)*CELL_SIZE, y*CELL_SIZE, (x+1)*CELL_SIZE, (y+1)*CELL_SIZE);
  }

  // Line for below
  if (y < sides-1 && (currentNumber !== objectGrid[y+1][x].number || currentOperation !== objectGrid[y+1][x].operation)) {
    line((x+1)*CELL_SIZE, (y+1)*CELL_SIZE, x*CELL_SIZE, (y+1)*CELL_SIZE);
  }

  // Line for left side
  if (x > 0 && (currentNumber !== objectGrid[y][x-1].number || currentOperation !== objectGrid[y][x-1].operation)) {
    line(x*CELL_SIZE, (y+1)*CELL_SIZE, x*CELL_SIZE, y*CELL_SIZE);
  }

  // // Line for above
  if (y > 0 && (currentNumber !== objectGrid[y-1][x].number || currentOperation !== objectGrid[y-1][x].operation)) {
    line((x+1)*CELL_SIZE, y*CELL_SIZE, x*CELL_SIZE, y*CELL_SIZE);
  }
}

function drawSelectedTile() {
  if (selectedCell.x !== -1 && selectedCell.y !== -1) {
    stroke("red");        
    strokeWeight(5);  
    noFill();         
    
    square(selectedCell.x * CELL_SIZE, selectedCell.y * CELL_SIZE, CELL_SIZE);
    stroke("black");
  }
  pop();
}

function checkIfWon() {
  if (compareArrays()) {
    textSize(100);
    textAlign(CENTER);
    text("YOU WON!", width/2, 100);
    textAlign(LEFT);
  }
}

function compareArrays() {
  for (let i = 0; i < sides; i++) {
    for (let j = 0; j < sides; j++) {
      if (objectGrid[i][j].guessedNumber !== first5x5[i][j].guessedNumber) {
        return false;
      }
    }
  }
  return true;
}