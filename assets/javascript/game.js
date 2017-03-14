// Global Functions
// ***************************************

var crystalNumber = 0;
var targetNumber = 0;
var playerWins = 0;
var playerLoses = 0;
var userCounter = 0;
var targetMin = 19;
var targetMax = 120;
var globalDebug = false;  //to turn on the console.log, make variable true; otherwise set to false; so that there is no cheating :)
var hasUserFinished = false;

// associate array containing the random vaules of the individual skulls
var skulls = {
    "skull1": 0,
    "skull2": 0,
    "skull3": 0,
    "skull4": 0,
}

// FUNCTIONS
// ***************************************

function startGame() {
    /**
    This function will initialize the targetNumber with the value some combination of skulls will "weigh"
    **/
    targetNumber = getRandomArbitrary(targetMin, targetMax);
    // publishes the targetNumber to the console when var set to true
    debugPrint("TargetNumber was: " + targetNumber);
    // pulishes the objective number to the document
    $("span#targetScore").text(targetNumber);
    //In case of restart make sure the winorlose window sections are hidden
    // $("div#setWinOrLose").hide();
    // 
    $("div#winOrLose").hide();

    hasUserFinished=false;
    userCounter=0;
    


    // This function will assign individual skulls unique numerical value
    for (var skull in skulls) { //iterate the skulls
        var foundUniqueNumber = false; //setup initial unique logical value
        while (foundUniqueNumber == false) { //run until we find unique
            foundUniqueNumber = true; //set unique unless unset later
            var newUniqueNumber = getRandomArbitrary(1, 12); //get new unique number
            for (var skullCheck in skulls) { //check to see if anything already has it
                if (skulls[skullCheck] == newUniqueNumber) { //if something has it set to rerun unique number assignment
                    foundUniqueNumber = false;
                }
            }
            if (foundUniqueNumber == true) { //if it was unique then assign to skull array
                skulls[skull] = newUniqueNumber;
            }

        }

    }
    for (var skull in skulls) {
        debugPrint("skull name " + skull + " value " + skulls[skull]);
    }


    // Reset Counter for new game
    counter = 0;
}

// 
function incrementAndTest(incomingKey) {
    debugPrint(incomingKey);
    debugPrint(skulls[incomingKey]);
    userCounter += skulls[incomingKey];
}

/**
 * getRandomArbitrary modified from stackoverflow example:
 * http://stackoverflow.com/questions/38178225/random-numbers-javascript
 */
function getRandomArbitrary(min, max) {
    var r = Math.floor(Math.random() * (max - min + 1) + min);
    return r;
}

/**
 * debugPrint only prints when var globaDebug * is set to true. Useful for printing 
 * backend logic information when debugging.
 * @param {string} the message you wish to 
 * print
 */
function debugPrint(msg) {
    if (globalDebug == true) {
        console.log(msg)
    }
}

//Set the target number to display to the #targetScore ID


function setWinOrLose() {
    //check to see if the user already won or lost
    if (!hasUserFinished) {
        //stop all future attempts at changing totals for win/loss
        hasUserFinished = true;
        if (userCounter > targetNumber) {
            playerLoses += 1;
            $("div#iwon").hide();
            $("div#ilost").show();
            $("div#ilost").text("Oh NOES... you lost " + playerLoses);
            $("div#playerLoses").text(playerLoses);
        } else {
            playerWins += 1;
            $("div#iwon").show();
            $("div#ilost").hide();
            $("div#iwon").text("Ooh yeahs, you are almost losing less than you	won... NOT");
            $("div#playerWins").text(playerWins);
        }
        $("div#winOrLose").show();
    }
}

// Change HTML to reflect round conditions
//$('playerWins')


// MAIN PROCESS
// ***************************************
startGame();

 
$("img.skull").click(function() {
    incrementAndTest($(this).parent().attr('id'));
    if (userCounter >= targetNumber) {
        setWinOrLose();

    }
    //alert(userCounter);
    $("span#playerGuessTotal").text(userCounter);




});

$("div#restartGame").click(function() {	
	startGame();
});
