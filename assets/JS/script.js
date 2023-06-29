// objects of possible selections
let selection = [
    {
        name: "rock",
        emoji: "✊",
        beats: "scissors"
    },

    {
        name: "paper",
        emoji: "✋",
        beats: "rock"
    },

    {
        name: "scissors",
        emoji: "✌️",
        beats: "paper"
    }
]


// array to contain user inputs deciding what type of game mode they want
let gameChoice = ""

// Start with opening the Modal pop-up
document.getElementById("choose-game").addEventListener("click", function () {
    let backdrop = document.getElementById("start-game-background")
    let modal = document.getElementById("modal-pop-up")
    backdrop.style.display = 'block'
    modal.style.display = 'block'
    gameMode()
})

// Allow user to click outside of the modal to close it
document.getElementById("start-game-background").addEventListener("click", function () {
    let backdrop = document.getElementById("start-game-background")
    let modal = document.getElementById("modal-pop-up")
    backdrop.style.display = 'none'
    modal.style.display = 'none'

})

/**
 * Allows user to choose what game and how long the game will be before starting game 
 */
function gameMode() {
    // listen to the users choices to decide how many rounds to go for
    let rounds = ""
    let roundSelect = document.getElementsByName("best-of")
    for (i = 0; i < roundSelect.length; i++)
        roundSelect[i].addEventListener("click", function () {
            rounds = this.getAttribute('value')
            console.log(rounds)
        })

    document.getElementById("start-game").addEventListener("click", function () {
        startGame(rounds)
    })
}



/**
 * Starts the game, firstly changes to the game screen and then the game begins 
 * @param {*} rounds 
 */
function startGame(rounds) {
    // remove the backdrop modal and instruction screens
    let backdrop = document.getElementById("start-game-background")
    let modal = document.getElementById("modal-pop-up")
    let startScreen = document.getElementById("instruction-section")
    backdrop.style.display = 'none'
    modal.style.display = 'none'
    startScreen.style.display = 'none'

    // Display the game screen
    let game = document.getElementById("game-section")
    game.style.display = 'block'

    // Depending on the arguments of the function choose the game type
    pvc()

    // get the number of rounds 
    let roundText = document.getElementById("nb-rounds")
    if (rounds === "best-of-3") {
        roundText.innerText = "Best of 3"
    } else if (rounds === "best-of-5") {
        roundText.innerText = "Best of 5"
    } else if (rounds === "best-of-7") {
        roundText.innerText = "Best of 7"
    } else {
        alert("Please choose a actual number of rounds")
    }


}


/**
 * Player vs Computer game mode 
 */
function pvc() {
    // listen for player choice & get computer choice run checkwinner functions to decide winner
    let selectionButton = document.getElementsByClassName("selection")
    for (i = 0; i < selectionButton.length; i++) {
        selectionButton[i].addEventListener("click", function () {
            let selectionChoice = this.getAttribute("data-selection")
            let pChoice = selection.find(selection => selection.name === selectionChoice)
            let cChoice = computerChoice()
            console.log(pChoice)
            console.log(cChoice)
            checkWinnerPlayer2(cChoice, pChoice)
            checkWinnerPlayer1(pChoice, cChoice)
            endGame()
        })

    }

}

/**
 * ends the game allowing user to restart the game or back to main screen
 */
function endGame() {
    // Get the results of Player & Computer and check who is winner and display end game modal 
    let pScore = document.getElementById("p-score").innerText
    console.log(pScore)
    let cScore = document.getElementById("c-score").innerText
    console.log(cScore)
    let winner = ""
    if (pScore === "2" || pScore === "3" || pScore === "4") {
        winner = "Player 1 is the Winner";
        endGameModal()
    } else if (cScore === "2" || cScore === "3" || cScore === "4") {
        winner = "Computer is the Winner";
        endGameModal()
    }
    console.log(winner)
    
}

function endGameModal(){
    document.getElementById("end-game").style.display = "block"
    document.getElementById("end-game-backdrop").style.display = "block"
}

/**
 * Randomly generate computers choice
 */
function computerChoice() {
    let randomNb = Math.floor(Math.random() * 3)
    let cChoice = selection[randomNb]
    return cChoice
}

/**
 * Check if player 1 won 
 * @param {player 1 choice object} pChoice 
 * @param {*player 2 or computer choice object} cChoice 
 */
function checkWinnerPlayer1(pChoice, cChoice) {
    if (cChoice.name === pChoice.beats) {
        // means player 1 won emoji and insert into location add 1 to score
        let finalDiv = document.getElementById("pScore")
        let scoreDiv = document.createElement("div")
        scoreDiv.innerText = pChoice.emoji
        scoreDiv.style.fontSize = '4rem'
        scoreDiv.classList.add("player-score-display")
        finalDiv.after(scoreDiv)

        // get p-score and add 1
        let score = document.getElementById('p-score')
        let scoreNb = score.innerHTML
        console.log(scoreNb)
        score.innerHTML = ++scoreNb
    } else if (cChoice.name === pChoice.name) {
        // means its a draw just add emoji into location 
        let finalDiv = document.getElementById("pScore")
        let scoreDiv = document.createElement("div")
        scoreDiv.innerText = pChoice.emoji
        scoreDiv.classList.add("player-score-display")
        finalDiv.after(scoreDiv)

    } else {
        // means player1 lost get emoji and insert into location 
        let finalDiv = document.getElementById("pScore")
        let scoreDiv = document.createElement("div")
        scoreDiv.innerText = pChoice.emoji
        scoreDiv.classList.add("player-score-display")
        finalDiv.after(scoreDiv)
    }

}

function checkWinnerPlayer2(cChoice, pChoice) {
    if (pChoice.name === cChoice.beats) {
        // means player 2 won emoji and insert into location add 1 to score
        let finalDiv = document.getElementById("cScore")
        let scoreDiv = document.createElement("div")
        scoreDiv.innerText = cChoice.emoji
        scoreDiv.style.fontSize = '4rem'
        scoreDiv.classList.add("player-score-display")
        finalDiv.after(scoreDiv)

        // get c-score and add 1
        let score = document.getElementById('c-score')
        let scoreNb = score.innerHTML
        score.innerHTML = ++scoreNb

    } else if (cChoice.name === pChoice.name) {
        // means its a draw just add emoji into location 
        let finalDiv = document.getElementById("cScore")
        let scoreDiv = document.createElement("div")
        scoreDiv.innerText = cChoice.emoji
        scoreDiv.classList.add("player-score-display")
        finalDiv.after(scoreDiv)
    } else {
        // means player2 lost get emoji and insert into location 
        let finalDiv = document.getElementById("cScore")
        let scoreDiv = document.createElement("div")
        scoreDiv.innerText = cChoice.emoji
        scoreDiv.classList.add("player-score-display")
        finalDiv.after(scoreDiv)
    }

}

