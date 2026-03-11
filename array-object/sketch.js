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

function preLoad() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handPose.detectStart(video, gotHands);
}

function draw() {
  background(220);
  image(video,0,0,width,height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hands.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0,255,0);
      noStroke;
      circle(keypoint.x, keypoint.y, 10);
    }
  }

}

function gotHands(results) {
  hands = results;
} 