// Grid Based Assignment
// Albert Wu
// 2026/04/15
// Kenken

// Controls:
// Click - Select Square
// Type number - Guess
// L - Toggle Operation Select for Level Creation
// N - Toggle Small Goal Number Select for Level Creation
// Enter - Used periodically throughout the game

// Extra For Experts and Content Beyond Class:
// - Made the kenken render in the center of the screen using translate and offset values calculated by the width and height
// - Multiple levels and and are selected with a slider
//

// Declare Variables
let TILE_SIZE;
let boardSize;
let grid;
let operationLocked = true;
let numberLocked = false;
let boardSizeSlider;
let numberWantedToEnter = "";

// For the Preloaded Levels
let three_1;
let four_1;
let five_1;
let six_1;
let seven_1;
let eight_1;

// Default Game State, You Must Refresh Page to Select Different Level
let gameState = "levelSelect";

// Declare Constants
const ADD_COLOR = [244,137,137];
const SUBTRACT_COLOR = "teal";
const MULTIPLY_COLOR = "orange";
const DIVIDE_COLOR = "green";
const EQUALS_COLOR = "white";
const BORDER = 5;

let selectedCell = {
  x: -1,
  y: -1
};

// Preload levels
function preload() {
  three_1 = loadJSON("levels/three_1.json");
  four_1 = loadJSON("levels/four_1.json");
  five_1 = loadJSON("levels/five_1.json");
  six_1 = loadJSON("levels/six_1.json");
  seven_1 = loadJSON("levels/seven_1.json");
  eight_1 = loadJSON("levels/eight_1.json");
  levelList = [three_1, four_1, five_1, six_1, seven_1, eight_1]; // Can be expanded in the future, but this is enough for now
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createBoardSizeSlider();
}

// Draw loop
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
    TILE_SIZE = height/boardSize*0.85;
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

  // This is for making levels, where if you click l you can change operations
  else if (key === "l") {
    operationLocked = !operationLocked;
  }

  // This is for making levels, where if you click n you can type in the numbers
  else if (key === "n") {
    numberLocked = !numberLocked;
  }

  // Input number for guess
  else if ("123456789".includes(key) && !numberLocked && selectedCell.x !== -1 && selectedCell.y !== -1 && key <= boardSize) {
    grid[selectedCell.y][selectedCell.x].guessedNumber = Number(key);
  }

  // For making levels, is for making the small number goals
  else if ("0123456789".includes(key) && numberLocked && selectedCell.x !== -1 && selectedCell.y !== -1) {
    grid[selectedCell.y][selectedCell.x].number = Number(String(grid[selectedCell.y][selectedCell.x].number)+key);
  }

  // Finalizes the number for that square in level creation
  else if (keyCode === ENTER && numberLocked) {
    grid[selectedCell.y][selectedCell.x].number = Number(numberWantedToEnter);
    numberWantedToEnter = "";
  }

  // When guessing, press delete for removal of number
  else if (keyCode === DELETE && !numberLocked) {
    grid[selectedCell.y][selectedCell.x].guessedNumber = "BLANK";
  }

  // Removal of number in level creation
  else if (keyCode === DELETE && numberLocked) {
    grid[selectedCell.y][selectedCell.x].number = 0;
  }

  // Press Enter to Start Game
  else if (keyCode === ENTER && gameState === "levelSelect") {
    gameState = "game";
    grid = structuredClone(levelList[boardSize-3]); 
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        grid[i][j].guessedNumber = "BLANK";
      }
    }
  }
}

// Displays grid
function displayGrid() {
  let totalGridSize = boardSize * TILE_SIZE;
  let offsetX = (width - totalGridSize) / 2;
  let offsetY = (height - totalGridSize) / 2;
  push();
  translate(offsetX, offsetY); // Makes it so the the board is centered

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {   
      let currentOperation = grid[y][x].operation;
      let currentNumber = grid[y][x].number;  
      let currentGuess = grid[y][x].guessedNumber;

      // Makes the squares and colors
      strokeWeight(0);
      if (currentOperation === "ADD") { 
        fill(ADD_COLOR);
      }
      else if (currentOperation === "MINUS") {
        fill(SUBTRACT_COLOR);
      }
      else if (currentOperation === "MULTIPLY") {
        fill(MULTIPLY_COLOR);
      }
      else if (currentOperation === "DIVIDE") {
        fill(DIVIDE_COLOR);
      }
      else {
        fill(EQUALS_COLOR);
      }
      square(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
      fill("black");
      textSize(TILE_SIZE/4);
      textAlign(LEFT);

      // This is to calculate where to put the goal number in a group
      let isFirstInGroup = true;
      if (y > 0 && currentNumber === grid[y-1][x].number && currentOperation === grid[y-1][x].operation) {
        isFirstInGroup = false;
      }
      else if (x > 0 && currentNumber === grid[y][x-1].number && currentOperation === grid[y][x-1].operation) {
        isFirstInGroup = false;
      }
      
      // Shows the operation before the goal number for those selected cells
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
        // Writes the small goal number
        text(`${currentNumber}${symbol}`, TILE_SIZE/10 + x * TILE_SIZE, TILE_SIZE*0.3 + y * TILE_SIZE);
      }

      // Draws borders
      drawBorderOfTile(x,y,currentNumber, currentOperation);

      // Shows the guess number
      if (currentGuess !== "BLANK") {
        textAlign(CENTER);
        strokeWeight(1);
        textSize(TILE_SIZE*0.4);
        text(`${currentGuess}`,  x * TILE_SIZE + TILE_SIZE/2, y * TILE_SIZE + TILE_SIZE/2 + TILE_SIZE/4);
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

    // Selects a cell
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

// Reset board to all empty
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

// Draws the borders of the tiles
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

// Red border around selected tile
function drawSelectedTile() {
  if (selectedCell.x !== -1 && selectedCell.y !== -1) {
    stroke("red");        
    strokeWeight(5);  
    noFill();         
    
    square(selectedCell.x * TILE_SIZE, selectedCell.y * TILE_SIZE, TILE_SIZE);
    stroke("black");
  }
}

// Checks if won by comparing the arrays
function checkIfWon() {
  if (compareArrays()) {
    textSize(100);
    textAlign(CENTER);
    fill("white");
    text("YOU WON!", width/2, 100);
    textAlign(LEFT);
    fill("black");
  }
}

// Compares arrays and returns false or true
function compareArrays() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (grid[i][j].guessedNumber !== levelList[boardSize-3][i][j].guessedNumber) {
        return false;
      }
    }
  }
  return true;
}

// Board size slider for level select screen
function createBoardSizeSlider() {
  let sliderLength = width/4;
  boardSizeSlider = createSlider(3,8,5);
  boardSizeSlider.position(width/2-sliderLength/2, height/2+20);
  boardSizeSlider.size(sliderLength);
}

// Level select screen
function levelSelectScreen() {
  boardSizeSlider.show();
  fill("white");
  textAlign(CENTER);
  textSize(boardSize/2);
  text(`Solve some Kenkens and have fun! Select
     a board size and press enter to begin`, width/2, height/2-125);
  textSize(35);
  text(`Board Size: ${boardSizeSlider.value()}`, width/2, height/2);
  boardSize = boardSizeSlider.value();
}