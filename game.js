var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;






function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentdiv){
    $("#" + currentdiv).addClass("pressed");

    setTimeout(() => {
        $("#" + currentdiv).removeClass("pressed");
    }, 100);
}

$(document).on("keypress", function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

// checking answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("sucess");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        } 
    }
    else{
        console.log("wrong")
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, press any key to restart");


        
        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}




