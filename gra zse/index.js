$(document).ready(function () {

    const colors = ["green", "red", "yellow", "blue"];
    let gameSequence = [];
    let userSequence = [];
    let level = 0;
    let started = false;

   
    function startGame() {
        level = 0; 
        gameSequence = []; 
        userSequence = []; 
        started = true;
        nextSequence();
        $("#hl").text(level); 
    }

   
    function nextSequence() {
        userSequence = []; 
        level++; 
        $("#hl").text(level); 

        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        gameSequence.push(randomColor);

        
        $("#" + randomColor).fadeOut(100).fadeIn(100);
        playSound(randomColor);
        animatePress(randomColor); 
    }

    
    function playSound(color) {
        const audio = new Audio("/dzwiek/" + color + ".mp3");

        $(audio).on("error", function () {
            console.error("Nie znaleziono pliku dźwiękowego: " + color + ".mp3");
        });

        audio.play();
    }

 
    function animatePress(color) {
        $("#" + color).addClass("pressed");

        setTimeout(() => {
            $("#" + color).removeClass("pressed");
        }, 100);
    }

    
    function checkAnswer(currentLevel) {
        if (userSequence[currentLevel] === gameSequence[currentLevel]) {
            if (userSequence.length === gameSequence.length) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("game-over");
            $("body").addClass("game-over");

            $("#hl").text("Przegrałeś... Zacznij od nowa!");
            startOver();
        }
    }

    
    function startOver() {
        started = false;
        $("#hl").text("Naciśnij Start, aby rozpocząć grę");
    }

    $(".zse-kwadrat").click(function () {
        if (!started) return; 

        const userChosenColor = $(this).attr("id");
        userSequence.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

       
        checkAnswer(userSequence.length - 1);
    });

    
    $(".zse-container").click(function () {
        if (!started) {
            startGame();
        }
    });

});
