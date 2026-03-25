// 2d rectangular grid demo

const CELL_SIZE = 20;
let rows;
let cols;
let grid;
let SOLID = 1;
let OPEN_TILE = 0;
let PLAYER = 9;

let thePlayer = {
  x: 0,
  y: 0
};

let pavementImg;
let grassImg;

function preload() {
  pavementImg = loadImage("pavement.jpg");
  grassImg = loadImage("grass.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === "s") {
    movePlayer(thePlayer.x, thePlayer.y+1);
  }
  else if (key === "w") {
    movePlayer(thePlayer.x, thePlayer.y-1);
  }
  else if (key === "a") {
    movePlayer(thePlayer.x-1, thePlayer.y);
  }
  else if (key === "d") {
    movePlayer(thePlayer.x+1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE) {
    //keep track of where the player was
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;

    //moving the player
    thePlayer.x = x;
    thePlayer.y = y;
  
    //putting the player in grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;

    //reset the old player spot to be an open tile
    grid[oldY][oldX] = OPEN_TILE;
  }
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {
      grid[y][x] = SOLID;
    }
    else if (grid[y][x] === SOLID) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        // fill("white");
        image(pavementImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === SOLID) {
        // fill("black")
        image(grassImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if(grid[y][x] === PLAYER) {
        fill("red");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(SOLID);
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
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}