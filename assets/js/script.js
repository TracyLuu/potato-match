var gameCards = document.getElementById("game-cards");
gameCards.addEventListener("click", handleClick);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;

var modal = document.getElementById("modal");

var maxMatches = 9;
var matches = 0;

var attempts = 0;
var gamesPlayed = 0;

var cardArray = ["coding-potato", "couch-potato", "girl-potato", "happy-potato",
    "nerdy-potato", "old-potato", "party-potato", "sassy-potato", "uhh-potato",
    "coding-potato", "couch-potato", "girl-potato", "happy-potato",
    "nerdy-potato", "old-potato", "party-potato", "sassy-potato", "uhh-potato"];

shuffleCards();
newCards();

function handleClick(event) {
    if (event.target.className.indexOf("card-back") === -1) {
        return;
    }
    event.target.classList.add("hidden");

    if (!firstCardClicked) {
        firstCardClicked = event.target;
        var firstCardFront = firstCardClicked.previousElementSibling;
        firstCardClasses = firstCardFront.className;

    } else {
        secondCardClicked = event.target;
        var secondCardFront = secondCardClicked.previousElementSibling;
        secondCardClasses = secondCardFront.className;
        attempts++;

        if (firstCardClasses === secondCardClasses) {
            firstCardClicked = null;
            secondCardClicked = null;
            gameCards.addEventListener("click", handleClick);
            matches++;
            displayStats();
            if (matches === maxMatches) {
                modal.classList.remove("hidden");
                gamesPlayed++;
                displayStats();
            }

        } else {
            gameCards.removeEventListener("click", handleClick);
            setTimeout(goodbye, 1500);
            function goodbye() {
                firstCardClicked.classList.remove("hidden");
                secondCardClicked.classList.remove("hidden");
                firstCardClicked = null;
                secondCardClicked = null;
                gameCards.addEventListener("click", handleClick);
            }
            displayStats();
        }
    }
}

function shuffleCards() {
    for (var i = 0; i < cardArray.length; i++) {
        var randomPosition = Math.floor(Math.random() * cardArray.length);
        var placeholder = cardArray[i];
        cardArray[i] = cardArray[randomPosition];
        cardArray[randomPosition] = placeholder;
    }
}

function displayStats() {
    document.getElementById("games-played").textContent = gamesPlayed;
    document.getElementById("attempts").textContent = attempts;
    accuracy = document.getElementById("accuracy");
    accuracy.textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
    if (attempts === 0) {
        return "0.0%"
    }
    return ((matches / attempts) * 100).toFixed(1) + "%";
}

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);

function resetGame() {
    maxMatches = 9;
    matches = 0;
    attempts = 0;
    displayStats();
    destroyChildren();
    shuffleCards();
    newCards();
    modal.classList.add("hidden");
}



function newCards() {
    for (var i = 0; i < cardArray.length; i++) {
        var gameCards = document.querySelector("#game-cards");
        var cardDiv = document.createElement('div');
        cardDiv.classList.add("card-container");
        var frontCardDiv = document.createElement('div');
        frontCardDiv.classList.add("card-front");
        frontCardDiv.classList.add(cardArray[i]);
        var backCardDiv = document.createElement('div');
        backCardDiv.classList.add("card-back");

        cardDiv.appendChild(frontCardDiv);
        cardDiv.appendChild(backCardDiv);
        gameCards.appendChild(cardDiv);
    }
}

var element = document.querySelector("#game-cards");

function destroyChildren() {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
