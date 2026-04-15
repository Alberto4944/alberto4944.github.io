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

let TILE_SIZE;
let boardSize;
let grid;
let operationLocked = true;
let numberLocked = false;
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
  five_1 = loadJSON("levels/five_1.json");
}

// let levelList {
//   3: 
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  createBoardSizeSlider();
  TILE_SIZE = width/10;
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
    levelSelectScreen();
    
  }
}

let numberWantedToEnter = "";

function keyPressed() {
  // Generates an empty grid with all blanks
  if (key === "e") { 
    grid = resetBoard();
    selectedCell = {
      x: -1,
      y: -1
    };
  }
  else if (key === "g" && boardSize === 5) {
    grid = structuredClone(five_1); 
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        grid[i][j].guessedNumber = "BLANK";
      }
    
    }
  }
  else if (key === "l") {
    operationLocked = !operationLocked;
  }
  else if (key === "n") {
    numberLocked = !numberLocked;
  }
  else if ("123456789".includes(key) && !numberLocked && selectedCell.x !== -1 && selectedCell.y !== -1 && key <= boardSize) {
    grid[selectedCell.y][selectedCell.x].guessedNumber = Number(key);
  }

  else if ("0123456789".includes(key) && numberLocked && selectedCell.x !== -1 && selectedCell.y !== -1) {
    grid[selectedCell.y][selectedCell.x].number = Number(String(grid[selectedCell.y][selectedCell.x].number)+key);
  }

  else if (keyCode === ENTER && numberLocked) {
    grid[selectedCell.y][selectedCell.x].number = Number(numberWantedToEnter);
    numberWantedToEnter = "";
  }

  else if (keyCode === DELETE && !numberLocked) {
    grid[selectedCell.y][selectedCell.x].guessedNumber = "BLANK";
  }

  else if (keyCode === DELETE && numberLocked) {
    grid[selectedCell.y][selectedCell.x].number = 0;
  }

  else if (keyCode === ENTER && gameState === "levelSelect") {
    gameState = "game";
    grid = resetBoard();
    if (boardSize === 5) {
      grid = structuredClone(five_1); 
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          grid[i][j].guessedNumber = "BLANK";
        }
      }
    }
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
      textAlign(LEFT);
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
        textAlign(CENTER);
        strokeWeight(1);
        textSize(40);
        text(`${currentGuess}`,  x * TILE_SIZE + TILE_SIZE/2, y * TILE_SIZE + TILE_SIZE/2 + 20);
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
    if (!operationLocked) {
      toggleCell(x, y);
    }
  }
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  let operationList = ["EQUALS", "MINUS", "MULTIPLY", "DIVIDE", "ADD"];

  if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && !operationLocked) {
    if (operationList.indexOf(grid[y][x].operation) !== 4) {
      grid[y][x].operation = operationList[operationList.indexOf(grid[y][x].operation)+1];
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
      if (grid[i][j].guessedNumber !== five_1[i][j].guessedNumber) {
        return false;
      }
    }
  }
  return true;
}

function createBoardSizeSlider(length, start, end, x, y) {
  let sliderLength = width/4;
  boardSizeSlider = createSlider(3,9);
  boardSizeSlider.position(width/2-sliderLength/2, height/2+20);
  boardSizeSlider.size(sliderLength);
}

function levelSelectScreen() {
  boardSizeSlider.show();
  fill("white");
  textAlign(CENTER);
  textSize(50);
  text(`Solve some Kenkens and have fun! Select
     a board size and press enter to begin`, width/2, height/2-125);
  textSize(35);
  text(`Board Size: ${boardSizeSlider.value()}`, width/2, height/2);
  boardSize = boardSizeSlider.value();
}