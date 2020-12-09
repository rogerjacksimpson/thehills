// variables for game (integer numbers)
var kills = 0;
var lastSoldierShot = 0;
var curentSoldier = 0;
var screenWidth = 0;
var screenHeight = 0;
var playerIsDead = false;
var waitTime = 0;
var difficultyIncrease = 0;

// wait and then display then enemy solider
function displaySoldierAfterWait() {
    var waitTime = getSoldierDisplayWaitTime();
    setTimeout(displaySoldier, waitTime);
}

// display enemy soldier immediately
function displaySoldier() {
    moveSolider();
    $("#soldier1").show("slow");

    $("#soldier1").click(shootSoldier);
    curentSoldier++;

    var soldierFireWaitTime = getSoldierFireWaitTime();
    setTimeout(soldierFire, soldierFireWaitTime);
}

// Move the enemy soldier to a new random position
function moveSolider() {
    var x = getSoldierX();
    var y = getSoldierY();
    $("#soldier1").css({top: y, left: x, position:'absolute'});
}

// Get time to wait before displaying enemy soldier (in milliseconds) 
function getSoldierDisplayWaitTime() {
    var randomNumber = Math.floor(Math.random() * 1000);     // returns a random integer from 0 to 1000
    return randomNumber + waitTime + 1000; 
}

// Get time to wait before ememy solider fires (in milliseconds)
function getSoldierFireWaitTime() {
    var randomNumber = Math.floor(Math.random() * 1000);     // returns a random integer from 0 to 1000
    return randomNumber + waitTime + 500; 
}

// Update the score displayed
function setScore() {
    var score = kills * 100;
    $("#score").text(score);
}

// Get the X location of the enemy solider
function getSoldierX () {
    var randomNumber = Math.floor(Math.random() * screenWidth);
    if (randomNumber > screenWidth - 100)
    {
        randomNumber = randomNumber - 100;
    }

    return randomNumber;
}

// Get the Y location of the enemy solider
function getSoldierY () {
    var randomNumber = Math.floor(Math.random() * screenHeight);

    if (randomNumber < 100)
    {
        randomNumber = randomNumber + 100;
    }
    else if (randomNumber > screenHeight - 100)
    {
        randomNumber = randomNumber - 100;
    }

    return randomNumber;
}


// the enemy soldier fires at player (if he is not dead)
function soldierFire() {
    if (curentSoldier > kills)
    {
        die();
    }
}

// check if have shot enemy solider
function haveShotCurrentSoldier() {
    if (kills === curentSoldier)
        return true;
    else
        return false;
}

function die() {
    $("#youDead").show();
    playerIsDead = true;
    $("#playDiv").show();
    //runWhenClickPlay();
}

// shoot the enemy
function shootSoldier() {
    if (playerIsDead)
        return;
        
    if (curentSoldier > kills)  {
        $("#soldier1").hide();
        kills++;
        lastSoldierShot++;
        
        updateWaitTime();
        setScore();

        displaySoldierAfterWait();
    }
}

function updateWaitTime() {
    difficultyIncrease = difficultyIncrease - 5;

    if (difficultyIncrease < 0)
    {
        difficultyIncrease = 0;
    }

    waitTime = waitTime - difficultyIncrease;

    if (waitTime < 500)
    {
        waitTime = 500;
    }
}

// initialise the game
function initGame() {
    $("#soldier1").hide();
    $("#playDiv").hide();
    $("#youDead").hide();

    kills = 0;
    lastSoldierShot = 0;
    curentSoldier = 0;
    screenWidth = 0;
    screenHeight = 0;
    playerIsDead = false;
    waitTime = 2000;
    difficultyIncrease = 100;
    setScore();

    screenHeight = $(window).height();
    screenWidth = $(window).width();
}

// run game
function runGame() {
    initGame();
    displaySoldierAfterWait();
}

function runWhenClickPlay() {
    $("#playImage").click(runGame);
}

// start
$( document ).ready(function() {
    runWhenClickPlay();
});