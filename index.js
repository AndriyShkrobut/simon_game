let buttonColour = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text(`Level ${level}`);
  let randomChosenColour = buttonColour[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

$("div[type='button']").on("click", handleClick);

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    console.log("failure");
  }
}

$(document).on("keydown", start);
$(document).on("touchend", start);
$("body").on("click", ".mask", start);

function start(e) {
  if (!started) {
    $(".mask").remove();
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
}

function playSound(colour) {
  new Audio(`sounds/${colour}.mp3`).play();
}

function handleClick() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
}

function animatePress(clickedBtn) {
  $(`#${clickedBtn}`).addClass("pressed");
  setTimeout(function() {
    $(`#${clickedBtn}`).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 250);

  new Audio("sounds/wrong.mp3").play();
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").prepend('<div class="mask"></div>');

  startOver();
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
