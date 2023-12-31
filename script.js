buttonColors = ["red", "blue", "green", "yellow"]

gamePattern = []

userClickedPattern = []
level = 0;

started = false;

$(document).keypress(function (event) {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }

})

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level   "+ level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

nextSequence();