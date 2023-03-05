var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
gamePattern = [];
var level = 0;
var started = false;
$(document).keypress(function() {
    if (!(started)) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }

});

$("#start").click(function() {
    if (!(started)) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});

$(".btn").click(function() {
    var color = this.id;
    var sound = new Audio('sounds/' + color + '.mp3');
    sound.play();
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
    audio.play();
}

$(".btn").click(handler);

function handler() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrong = new Audio('wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() { $("body").removeClass("game-over"); }, 200);
        $("#level-title").text("Game Over, Press Any Key Or Start to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}