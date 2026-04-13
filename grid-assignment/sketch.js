// Grid Based Assignment
// Albert Wu
// Date
// Likely will be a kenken style game
// Extra for Experts:
// - describe what you did to take this project "above and beyond"\

// Planning for Level Selection Screen:
// - Title and Description
// - Grid size (3x3 to maybe 8x8 or 9x9)
// - Level Difficulty (easy, medium, hard)
// - Optional Color Change for different tile types
// - Custom Level Editor (try to make simple checker to check groups and rows and cols)

const TILE_SIZE = 100;
let boardSize = 5;
let grid;
let operationLocked = true;
let canInputNumber = true;
let boardSizeSlider;

let gameState = "levelSelect";

const addColor = [244,137,137];
const subtractColor = "teal";
const multiplyColor = "orange";
const divideColor = "green";
const equalsColor = "white";

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
  grid = resetBoard();
  createBoardSizeSlider();
}

function draw() {
  background("#101211");
  if (gameState === "game") {
    boardSizeSlider.hide();
    displayGrid();
    drawSelectedTile();
    checkIfWon();
  }
  else if (gameState === "levelSelect") {
    boardSizeSlider.show();
    let val = boardSizeSlider.value();
    fill("white");
    textSize(50);
    textAlign(CENTER);
    text(`Board Size: ${val}`, width/2, height/2+100);
    textAlign(LEFT);
  }
}

function keyPressed() {
  // Generates an empty grid with all blanks
  if (key === "e") { 
    grid = resetBoard();
    selectedCell = {
      x: -1,
      y: -1
    };
  }
  else if (key === "g") {
    grid = structuredClone(first5x5); 
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        grid[i][j].guessedNumber = "BLANK";
      }
    
    }
  }
  else if (key === "l") {
    operationLocked = !operationLocked;
  }
  else if ("123456789".includes(key) && canInputNumber && selectedCell.x !== -1 && key <= boardSize) {
    grid[selectedCell.y][selectedCell.x].guessedNumber = Number(key);
  }
  else if (keyCode === DELETE) {
    grid[selectedCell.y][selectedCell.x].guessedNumber = "BLANK";
  }
}

function displayGrid() {
  let totalGridSize = boardSize * TILE_SIZE;
  let offsetX = (width - totalGridSize) / 2;
  let offsetY = (height - totalGridSize) / 2;
  push();
  translate(offsetX, offsetY);

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {   
      let currentOperation = grid[y][x].operation;
      let currentNumber = grid[y][x].number;  
      let currentGuess = grid[y][x].guessedNumber;

      strokeWeight(0);
      if (currentOperation === "ADD") {
        fill(addColor);
      }
      else if (currentOperation === "MINUS") {
        fill(subtractColor);
      }
      else if (currentOperation === "MULTIPLY") {
        fill(multiplyColor);
      }
      else if (currentOperation === "DIVIDE") {
        fill(divideColor);
      }
      else {
        fill(equalsColor);
      }
      square(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
      fill("black");
      textSize(25);

      let isFirstInGroup = true;
      if (y > 0 && currentNumber === grid[y-1][x].number && currentOperation === grid[y-1][x].operation) {
        isFirstInGroup = false;
      }
      else if (x > 0 && currentNumber === grid[y][x-1].number && currentOperation === grid[y][x-1].operation) {
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
        text(`${currentNumber}${symbol}`, 10 + x * TILE_SIZE, 30 + y * TILE_SIZE);
      }

      drawBorderOfTile(x,y,currentNumber, currentOperation);
      if (currentGuess !== "BLANK") {
        strokeWeight(1);
        textSize(40);
        textAlign(CENTER);
        text(`${currentGuess}`,  x * TILE_SIZE + TILE_SIZE/2, y * TILE_SIZE + TILE_SIZE/2 + 20);
        textAlign(LEFT);
      }
    }
  }
}

function mousePressed() {
  if (gameState === "game") {
    let totalGridSize = boardSize * TILE_SIZE;
    let offsetX = (width - totalGridSize) / 2;
    let offsetY = (height - totalGridSize) / 2;

    let x = Math.floor((mouseX - offsetX)/TILE_SIZE);
    let y = Math.floor((mouseY - offsetY)/TILE_SIZE);

    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
      selectedCell.x = x;
      selectedCell.y = y;
    }
    else {
      selectedCell.x, selectedCell.y = -1;
    }
    toggleCell(x, y);
  }
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  let operationList = ["EQUALS", "MINUS", "MULTIPLY", "DIVIDE", "ADD"];
  let currentIndex = operationList.indexOf(grid[y][x].operation);

  if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && !operationLocked) {
    if (currentIndex !== 4) {
      grid[y][x].operation = operationList[currentIndex+1];
    }
    else {
      grid[y][x].operation = "EQUALS";
    }
  }
}

function resetBoard() {
  let newArray = [];
  for (let y = 0; y < boardSize; y++) {
    newArray.push([]);
    for (let x = 0; x < boardSize; x++) {
      newArray[y].push({
        operation: "EQUALS",
        number: 0,
        guessedNumber: "BLANK"
      });
    }
  }
  return newArray;
}

function drawBorderOfTile(x,y,currentNumber, currentOperation) {
  strokeWeight(BORDER);
  // Line for right side
  if (x < boardSize-1 && (currentNumber !== grid[y][x+1].number || currentOperation !== grid[y][x+1].operation)) {
    line((x+1)*TILE_SIZE, y*TILE_SIZE, (x+1)*TILE_SIZE, (y+1)*TILE_SIZE);
  }

  // Line for below
  if (y < boardSize-1 && (currentNumber !== grid[y+1][x].number || currentOperation !== grid[y+1][x].operation)) {
    line((x+1)*TILE_SIZE, (y+1)*TILE_SIZE, x*TILE_SIZE, (y+1)*TILE_SIZE);
  }

  // Line for left side
  if (x > 0 && (currentNumber !== grid[y][x-1].number || currentOperation !== grid[y][x-1].operation)) {
    line(x*TILE_SIZE, (y+1)*TILE_SIZE, x*TILE_SIZE, y*TILE_SIZE);
  }

  // // Line for above
  if (y > 0 && (currentNumber !== grid[y-1][x].number || currentOperation !== grid[y-1][x].operation)) {
    line((x+1)*TILE_SIZE, y*TILE_SIZE, x*TILE_SIZE, y*TILE_SIZE);
  }
}

function drawSelectedTile() {
  if (selectedCell.x !== -1 && selectedCell.y !== -1) {
    stroke("red");        
    strokeWeight(5);  
    noFill();         
    
    square(selectedCell.x * TILE_SIZE, selectedCell.y * TILE_SIZE, TILE_SIZE);
    stroke("black");
  }
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
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (grid[i][j].guessedNumber !== first5x5[i][j].guessedNumber) {
        return false;
      }
    }
  }
  return true;
}

function createBoardSizeSlider() {
  let sliderLength = width/4;
  boardSizeSlider = createSlider(3,9);
  boardSizeSlider.position(width/2-sliderLength/2, height/2);
  boardSizeSlider.size(sliderLength);
}