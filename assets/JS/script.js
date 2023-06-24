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
let gameChoice = Array()

// Start with opening the Modal pop-up
document.getElementById("choose-game").addEventListener("click", function() {
    let backdrop = document.getElementById("backdrop")
    let modal = document.getElementById("modal-pop-up")
    backdrop.style.display = 'block'
    modal.style.display = 'block'
    gameMode()
})

// Allow user to click outside of the modal to close it
document.getElementById("backdrop").addEventListener("click", function() {
    let backdrop = document.getElementById("backdrop")
    let modal = document.getElementById("modal-pop-up")
    backdrop.style.display = 'none'
    modal.style.display = 'none'
    
})

/**
 * Allows user to choose what game and how long the game will be before starting game 
 */
function gameMode(){
    // listen to the users choices to decide what game to start 
    let gameSelect = document.getElementsByClassName("game-select")
    for (i = 0 ; i< gameSelect.length ; i++) {
        gameSelect[i].addEventListener("click", function(){
            for (i = 0 ; i< gameSelect.length ; i++) {
                // Remove border around non chosen game type 
                for (j = 0 ; j < gameSelect.length ; j++){
                    gameSelect[j].style.border = "none"
                }
            //  Add chosen game type to game Choice array
            let gameType = this.getAttribute('data-game-type')
            this.style.border = "thick solid #0000FF"
            gameChoice.splice(0,1, gameType)
            }
        
        }
        )}

    // listen to the users choices to decide how many rounds to go for

    let roundSelect = document.getElementsByName("best-of")
    for (i = 0 ; i< roundSelect.length; i++)
    roundSelect[i].addEventListener("click", function(){
        let rounds = this.getAttribute('value')
        gameChoice.splice(1,1, rounds)
        console.log(gameChoice)
    })

    document.getElementById("start-game").addEventListener("click", function () { 
        startGame(gameChoice[0], gameChoice[1])
    })
}



/**
 * Starts the game, firstly changes to the game screen and then the game begins 
 * @param {*} mode 
 * @param {*} rounds 
 */
function startGame(mode, rounds){
    // remove the backdrop modal and instruction screens
    let backdrop = document.getElementById("backdrop")
    let modal = document.getElementById("modal-pop-up")
    let startScreen = document.getElementById("instruction-section")
    backdrop.style.display = 'none'
    modal.style.display = 'none'
    startScreen.style.display = 'none'

    // Display the game screen
    let game = document.getElementById("game-section")
    game.style.display = 'block'

    // Depending on the arguments of the function choose the game type

    if ( mode === "pvp"){
        pvp(rounds)
        console.log("pvp")
    } else if (mode === "pvc") {
        pvc(rounds)
        console.log("pvc")
    } else {
        alert(" please choose a game mode")
        return startGame(mode, rounds)
    }
}

/**
 * Player vs Player game mode
 * @param {*} rounds 
 */
function pvp(rounds) {
    // get the number of rounds 
    let roundText = document.getElementById("nb-rounds")
    console.log(roundText.innerText)
    if (rounds === "best-of-3") {
        roundText.innerText = "Best of 3"
    }else if (rounds === "best-of-5") {
        roundText.innerText = "Best of 5"
    }else if (rounds === "best-of-7") {
        roundText.innerText = "Best of 7"
    }else {
        alert("Please choose a actual number of rounds")
    }

    // get the selection of players

}

/**
 * Player vs Computer game mode 
 * @param {} rounds 
 */
function pvc(rounds) {
    // get the number of rounds 
    let roundText = document.getElementById("nb-rounds")
    console.log(roundText.innerText)
    if (rounds === "best-of-3") {
        roundText.innerText = "Best of 3"
    }else if (rounds === "best-of-5") {
        roundText.innerText = "Best of 5"
    }else if (rounds === "best-of-7") {
        roundText.innerText = "Best of 7"
    }else {
        alert("Please choose a actual number of rounds")
    }

    // listen for player choice and run playerChoice function to display and update score
    let selectionButton = document.getElementsByClassName("selection")
    for (i= 0; i < selectionButton.length; i++){
        selectionButton[i].addEventListener("click", function(){
            let selectionChoice = this.getAttribute("data-selection")
            let pChoice = selection.find(selection =>selection.name === selectionChoice )
            // console.log(pchoice)
            playerChoice(pChoice)
        })

    }
}

/**
 * Get players choce and display on screen then get computer choice and run function to get winner 
 * @param {*} pChoice 
 */
function playerChoice(pChoice){
    let playerChoice = pChoice.emoji 
    console.log(playerChoice)
    // let displayPchoice = document.getElementById("player1-score")
    let cChoice = computerChoice()
    console.log(cChoice)
}

/**
 * Randomley get computers choice
 */
function computerChoice() {
    let randomNb = Math.floor(Math.random() *3)
    let cChoice = selection[randomNb]
    return cChoice
}

// let finalDiv = document.getElementById("cScore")
//     let scoreDiv = document.createElement("div")
//     scoreDiv.innerText = pChoice
//     scoreDiv.classList.add("player-score-display")
//     finalDiv.after(scoreDiv)