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

let straightLineSize = 0.25;

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

    let thumbPoints = [hand.thumb_mcp, hand.thumb_ip, hand.thumb_tip];
    let indexPoints = [hand.index_finger_dip, hand.index_finger_pip, hand.index_finger_tip];
    let middlePoints = [hand.middle_finger_pip, hand.middle_finger_dip, hand.middle_finger_tip];
    let ringPoints = [hand.ring_finger_pip, hand.ring_finger_dip, hand.ring_finger_tip];
    let pinkyPoints = [hand.pinky_finger_pip, hand.pinky_finger_dip, hand.pinky_finger_tip];

    let thumb = isStraight(thumbPoints);
    let index = isStraight(indexPoints);
    let middle = isStraight(middlePoints);
    let ring = isStraight(ringPoints);
    let pinky = isStraight(pinkyPoints);

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
    
    if (!thumb && index && !middle && !ring && !pinky) {
      console.log("1");
    }
    else if (!thumb && index && middle && !ring && !pinky) {
      console.log("2");
    }
    else if (!thumb && index && middle && ring && !pinky) {
      console.log("3");
    }
    else if (!thumb && index && middle && ring && pinky) {
      console.log("4");
    }
    else if (thumb && index && middle && ring && pinky) {
      console.log("5");
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
  let slope = abs((secondPoint[0] - firstPoint[0]) / (secondPoint[1] - firstPoint[1]));
  for (let i = 2; i < points.length; i++) {
    newSlope = (points[i].x - firstPoint[0]) / (points[i].y - firstPoint[1]);
    if (abs(newSlope-slope) > straightLineSize) {
      return false;
    }
  }
  return true;
}