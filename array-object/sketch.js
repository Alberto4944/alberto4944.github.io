// Arrays and Object Notation
// Albert Wu
// March 5, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Plan: Use ML5 to make a math game, where you have to put up a certain number of fingers to different questions (webcam)
// This below is the default ml5 code, just to get a feeling of what it will feel like. In the end though, it will have hand detection (numbers from 1-10) and other stuff to make it a cool game.
let handPose;
let video;
let hands = [];

let straightLineSize = 0.05;

function preload() {
  handPose = ml5.handPose();
}

function gotHands(results) {
  hands = results;
}

let thePoints = [
  {
    x: 20,
    y: 40
  },
  {
    x: 20,
    y: 40
  },
  {
    x: 20,
    y: 40
  }
];

function setup() {
  // createCanvas(640, 480);
  // video = createCapture(VIDEO);
  // video.size(640, 480);
  // video.hide();

  // handPose.detectStart(video, gotHands);
  console.log(isStraight(thePoints));
}


function draw() {
  // image(video,0,0,width,height);

  // if (hands.length > 0) {
  //   let hand = hands[0];
  //   let pointsArray = [hand.index_finger_tip, hand.index_finger_dip, hand.index_finger_pip, hand.index_finger_mcp];
  //   noStroke();
  //   fill(255,0,0);
  //   for (point of pointsArray) {
  //     circle(point.x, point.y, 16);
      
  //   }
  //   writeText(calculateAverage(pointsArray));
  // }
}



function calculateAverage(pointsArray) {
  let average = 0;
  for (point of pointsArray) {
    average += point.x;
  }
  average = average/pointsArray.length;
  return checkOne(average, pointsArray);
}

function checkOne(average, pointsArray) {
  for (point of pointsArray) {
    if (point.x < average + 5 && point.x > average - 5) {
      return "ONE";
    }
    else {
      return "";
    }
  }
}

function writeText(state) {
  fill("black");
  textSize(40);
  text(`${state}`, width*0.8, height*0.95);
}

function isStraight(points) {
  let firstPoint = [points[0].x, points[0].y];
  let secondPoint = [points[1].x, points[1].y];
  let slope = (secondPoint[1] - firstPoint[1]) / (secondPoint[0] - firstPoint[0]);
  for (let i = 2; i < points.length; i++) {
    newSlope = (points[i].y - firstPoint[1]) / (points[i].x - firstPoint[0]);
    if (abs(newSlope-slope) > straightLineSize) {
      return false;
    }
  }
  return true;
}