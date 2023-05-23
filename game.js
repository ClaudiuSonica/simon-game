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
  checkAnswer(userColorPattern.length - 1);
});

function nextSequence() {

  userColorPattern = [];

  level++;
  $("#level-title").text(`Level ${level}`);


  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);



  console.log(randomChosenColor);
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
    setTimeout(nextSequence, 1000)
    started = true;
  }
});

function checkAnswer(currentLevel) {

  let wrong = new Audio("sounds/wrong.mp3");

  if (gamePattern[currentLevel] === userColorPattern[currentLevel]) {
    console.log("success");

    if (userColorPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over! Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
