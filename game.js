var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var keyboardPressed = false;

jQuery(document).ready(function() {
    console.log("document game ready");
    // listen to keyboard entries once and runs nextSequence
    $(document).keypress(function() {
        if(!keyboardPressed) {
            // reinitialize pattern and level
            startOver();
            nextSequence();
            keyboardPressed = true;
        }
    })
    $(".btn").click(function() {
        if(keyboardPressed) {
            var userChosenColour = $(this).attr("id"); // store the id of the clicked button
        // store
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        // check if pattern correct
        checkAnwser(userClickedPattern.length);
        } 
    });
});

function nextSequence() {
        var randomNumber = Math.floor(Math.random() * 4);  // pseudo random between 0-3
        var randomColor = buttonColors[randomNumber];
        gamePattern.push(randomColor);
        animateButton(randomColor);
        playSound(randomColor);
        // change the title to the level number
        $("#level-title").text(`Level ${level}`)
        level++;
}
function checkAnwser(currentLevel) {
    if (currentLevel == level) {
        // checks if users pattern similar to game pattern
        for(var i=0; i<gamePattern.length; i++) {
            if(gamePattern[i] !== userClickedPattern[i]) {
                //console.log("FAILURE");
                gameOver();
                return;
            }
        }
        console.log("SUCCESS");
        // move to next level and update pattern
        setTimeout(function() {
            nextSequence();
            userClickedPattern = [];
        },1000);
    }else if(currentLevel > gamePattern.length){
        gameOver();
    } 
    }
    
function animatePress(currentColour) {
    // adds then removes class after 100ms
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function animateButton(color) {
    // make button flash
    $(`#${color}`).fadeOut(250).fadeIn(250);
}
function playSound(song) {
    var audio = new Audio(`./sounds/${song}.mp3`);
    audio.play();
}

function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    keyboardPressed = false;
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);
    
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}