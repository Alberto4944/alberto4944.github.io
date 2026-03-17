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
let theNumber = 0;

let straightLineSize = 0.3;
let minimumDistance = 25;

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
  writeText();
  if (hands.length > 0) {
    let hand = hands[0];

    let thumbPoints = [hand.thumb_cmc, hand.thumb_mcp, hand.thumb_ip, hand.thumb_tip];
    let indexPoints = [hand.index_finger_mcp, hand.index_finger_dip, hand.index_finger_pip, hand.index_finger_tip];
    let middlePoints = [hand.middle_finger_mcp, hand.middle_finger_pip, hand.middle_finger_dip, hand.middle_finger_tip];
    let ringPoints = [hand.ring_finger_mcp, hand.ring_finger_pip, hand.ring_finger_dip, hand.ring_finger_tip];
    let pinkyPoints = [hand.pinky_finger_pip, hand.pinky_finger_dip, hand.pinky_finger_tip];

    

    noStroke();
    fill(255,0,0);
    for (point of thumbPoints) {
      circle(point.x, point.y, 16);
    }
    for (point of indexPoints) {
      circle(point.x, point.y, 16);
    }
    for (point of middlePoints) {
      circle(point.x, point.y, 16);
    }
    for (point of ringPoints) {
      circle(point.x, point.y, 16);
    }
    for (point of pinkyPoints) {
      circle(point.x, point.y, 16);
    }
    
    // if (index && !middle && !ring) {
    //   theNumber = 1;
    // }
    // else if (index && middle && !ring) {
    //   theNumber = 2;
    // }
    // else if(index && middle && ring) {
    //   theNumber = 3;
    // }
    // else {
    //   theNumber = 0;
    // }
    thumb = isStraight(thumbPoints);
    index = isStraight(indexPoints);
    middle = isStraight(middlePoints);
    ring = isStraight(ringPoints);
    pinky = isStraight(pinkyPoints);

    if (thumb && index && middle && ring && pinky) {
      theNumber = 5;
    }
    else if (index && middle && ring && pinky) {
      theNumber = 4;
    }
    else if (index && middle && ring) {
      theNumber = 3;
    }
    else if (index && middle) {
      theNumber = 2;
    }
    else if (index) {
      theNumber = 1;
    }
    // if (!thumb && index && !middle && !ring && !pinky) {
    //   theNumber = 1;
    // }
    // else if (!thumb && index && middle && !ring && !pinky) {
    //   theNumber = 2;
    // }
    // else if (!thumb && index && middle && ring && !pinky) {
    //   theNumber = 3;
    // }
    // else if (!thumb && index && middle && ring && pinky) {
    //   theNumber = 4;
    // }
    // else if (thumb && index && middle && ring && pinky) {
    //   theNumber = 5;
    // }
    else {
      theNumber = 0;
    }

  }
}

function writeText() {
  fill("black");
  textSize(50);
  text(`${theNumber}`, width*0.8, height*0.95);
}

function isStraight(points) {
  let firstPoint = [points[0].x, points[0].y];
  let secondPoint = [points[1].x, points[1].y];
  let slope = abs((secondPoint[0] - firstPoint[0]) / (secondPoint[1] - firstPoint[1]));
  // console.log(`Slope: ${slope}`);
  for (let i = 2; i < points.length; i++) {
    newSlope = abs((points[i].x - firstPoint[0]) / (points[i].y - firstPoint[1]));
    // console.log(`Difference: ${abs(newSlope-slope)}`);
    if (abs(newSlope-slope) > straightLineSize || dist(firstPoint[0], firstPoint[1], points[i].x, points[i].y) < minimumDistance) {
      return false;
    }
  }
  return true;
}