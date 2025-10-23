"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-01

      Project to create a timer object
      Author: Aisha Keller
      Date:   10/23/2025

      Filename: project08-01.js
*/

/*--------------- Object Code --------------------*/

// Constructor for the timer object
function timer(min, sec) {
  this.minutes = min;
  this.seconds = sec;
  this.timeID = null;
}

// Add runPause method to the timer prototype
timer.prototype.runPause = function(timer, minBox, secBox) {
// If a timer is running, stop it
  if (timer.timeID) {
    window.clearInterval(timer.timeID);
    timer.timeID = null;
  } else {
    // Start the timer and store the interval id
    timer.timeID = window.setInterval(countdown, 1000);
  }

  // Update the timer each second
  function countdown() {
    if (timer.seconds > 0) {
      timer.seconds--;
    } else if (timer.minutes > 0) {
      timer.minutes--;
      timer.seconds = 59;
    } else {
      // Reached 0:0 - stop the timer
      window.clearInterval(timer.timeID);
      timer.timeID = null;
    }

    // Write values to the interface
    minBox.value = timer.minutes;
    secBox.value = timer.seconds;
  }
};







/*---------------Interface Code -----------------*/

/* Interface Objects */
let minBox = document.getElementById("minutesBox");
let secBox = document.getElementById("secondsBox");
let runPauseTimer = document.getElementById("runPauseButton");

// Instantiate the timer use current values from the interface
let myTimer = new timer(Number(minBox.value), Number(secBox.value));

// Update timer values when the input boxes change
minBox.onchange = function() {
  myTimer.minutes = Number(minBox.value);
};

secBox.onchange = function() {
  myTimer.seconds = Number(secBox.value);
};

runPauseTimer.onclick = function() {
  myTimer.runPause(myTimer, minBox, secBox);
};

