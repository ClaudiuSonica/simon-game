let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userColorPattern = [];
let started = false;
let level = 0;

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userColorPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
  level++;
  $("#level-title").text(`Level ${level}`);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).on("keypress", () => {
  
  if (started === false) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});
