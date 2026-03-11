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

function preload() {
  handPose = ml5.handPose();
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video,0,0,width,height);

  if (hands.length > 0) {
    let hand = hands[0];
    let pointsArray = [hand.index_finger_tip, hand.index_finger_dip, hand.index_finger_pip, hand.index_finger_mcp];
    noStroke();
    fill(255,0,0);
    for (point of pointsArray) {
      circle(point.x, point.y, 16);
      
    }
    writeText(calculateAverage(pointsArray));
  }
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
  let isOne = false;
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