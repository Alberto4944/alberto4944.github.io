// Arrays and Object Notation
// Albert Wu
// March 19, 2026
//
// Extra for Experts:
// I used the ML5 library to track the points on the hand. This is a side-project to my Research Methods 20 class where I am researching how we can use AI and ML in table tennis coaching/training. 

let handPose;
let video;
let hands = [];

let fingerIndicator = {
  color: "red",
  size: 10
};

let theNumber = 0;

const STRAIGHT_LINE_MARGIN = 0.25; // How close the slopes can be to be considered straight
const MINIMUM_DISTANCE_BETWEEN = 30; // This makes sure that bad detection coordinates do not get considered a line4
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 480;

const TEXT_SIZE = 65;

function preload() {
  handPose = ml5.handPose();
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(VIDEO_WIDTH, VIDEO_HEIGHT);
  video = createCapture(VIDEO, {flipped:true});
  video.hide();
  video.size(VIDEO_WIDTH,VIDEO_HEIGHT);
  noStroke();
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video,0,0, width, height);
  writeText();
  drawPoints();
}

function writeText() {
  // Writes the number on the screen
  fill("white");
  textSize(TEXT_SIZE);
  text(`${theNumber}`, width*0.9, height*0.95);
}

function isStraight(points) {
  // This function checks how "straight" a set of points are on each finger, by comparing the x-slope with a constant different
  let firstPoint = [points[0].x, points[0].y];
  let secondPoint = [points[1].x, points[1].y];
  let slope = abs((secondPoint[0] - firstPoint[0]) / (secondPoint[1] - firstPoint[1]));
  for (let i = 2; i < points.length; i++) { // For the rest of the points, compare the slopes to the first one
    newSlope = abs((points[i].x - firstPoint[0]) / (points[i].y - firstPoint[1]));
    if (abs(newSlope-slope) > STRAIGHT_LINE_MARGIN || dist(firstPoint[0], firstPoint[1], points[i].x, points[i].y) < MINIMUM_DISTANCE_BETWEEN) {
      return false; // The point is not in a straight line
    }
  }
  return true; // All points are in a straight line
}

function drawPoints() {
  if (hands.length > 0) {
    let hand = hands[0];
    fill(fingerIndicator.color);
  
    // These arrays make it easy to change what points should be shown and checked //
    let thumbPoints = [hand.thumb_cmc, hand.thumb_mcp, hand.thumb_ip, hand.thumb_tip];
    let indexPoints = [hand.index_finger_mcp, hand.index_finger_dip, hand.index_finger_pip, hand.index_finger_tip];
    let middlePoints = [hand.middle_finger_mcp, hand.middle_finger_pip, hand.middle_finger_dip, hand.middle_finger_tip];
    let ringPoints = [hand.ring_finger_mcp, hand.ring_finger_pip, hand.ring_finger_dip, hand.ring_finger_tip];
    let pinkyPoints = [hand.pinky_finger_mcp, hand.pinky_finger_pip, hand.pinky_finger_dip, hand.pinky_finger_tip];
    
    // Draws The Points on the Video //
    for (fingers of [thumbPoints, indexPoints, middlePoints, ringPoints, pinkyPoints]) { 
      for (finger of fingers) {
        circle(width - finger.x, finger.y, fingerIndicator.size);
      }
    }
    // Below sets each finger to a true/false regarding if they are straight or not //
    thumb = isStraight(thumbPoints);
    index = isStraight(indexPoints);
    middle = isStraight(middlePoints);
    ring = isStraight(ringPoints);
    pinky = isStraight(pinkyPoints);
    
    // Sets a variable to the number of fingers straight
    theNumber = numberOfFingersUp();
  }
}

function numberOfFingersUp() {
  // This funcion just checks how many true's there are in that array. //
  let theFingers = [thumb, index, middle, ring, pinky];
  fingersUp = 0;
  for (let i = 0; i < 5; i++) {
    if (theFingers[i] === true) {
      fingersUp++;
    }
  }
  return fingersUp;
}