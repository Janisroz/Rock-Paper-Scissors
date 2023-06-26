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
        pvp()
        console.log("pvp")
    } else if (mode === "pvc") {
        pvc()
        console.log("pvc")
    } else {
        alert(" please choose a game mode")
        return startGame(mode, rounds)
    }

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
}

/**
 * Player vs Player game mode
 */
 function pvp() {
    let playerPlaceholder = document.getElementById("current-player")
        playerPlaceholder.innerText = "Player 1 make a selection"
     // listen for player choice & get player 2 choice run checkwinner functions to decide winner
    let selectionButton = document.getElementsByClassName("selection")
    for (i= 0; i < selectionButton.length; i++){
        selectionButton[i].addEventListener("click", function cChoice(){
            let selectionChoice = this.getAttribute("data-selection")
            let pChoice = selection.find(selection =>selection.name === selectionChoice )

            // change top text to Player 2
        playerPlaceholder.innerText = "Player 2 make a selection"

            for (i= 0; i < selectionButton.length; i++){
                selectionButton[i].addEventListener("click", function cChoice(){
                    let selectionChoice = this.getAttribute("data-selection")
                    let cChoice = selection.find(selection =>selection.name === selectionChoice )
                    console.log(pChoice)
                    console.log(cChoice)
                    checkWinnerPlayer2(cChoice, pChoice)
                    checkWinnerPlayer1(pChoice, cChoice)
                    pvp()
                    }
                )}
            }
        )}
    }
    

/**
 * Gets player 2 choice and returns it 
 */
function player2Choice() {
    // change top text to Player 2
    let player2Placeholder = document.getElementById("current-player")
    player2Placeholder.innerText = "Player 2 make a selection"

    let selectionButton = document.getElementsByClassName("selection")
    for (i= 0; i < selectionButton.length; i++){
        selectionButton[i].addEventListener("click", function(){
            let selectionChoice = this.getAttribute("data-selection")
            let cChoice = selection.find(selection =>selection.name === selectionChoice)
            return cChoice

    })}
    console.log
}


/**
 * Player vs Computer game mode 
 */
function pvc() {
    // listen for player choice & get computer choice run checkwinner functions to decide winner
    let selectionButton = document.getElementsByClassName("selection")
    for (i= 0; i < selectionButton.length; i++){
        selectionButton[i].addEventListener("click", function(){
            let selectionChoice = this.getAttribute("data-selection")
            let pChoice = selection.find(selection =>selection.name === selectionChoice )
            let cChoice = computerChoice()
            console.log(pChoice)
            console.log(cChoice)
            checkWinnerPlayer2(cChoice, pChoice)
            checkWinnerPlayer1(pChoice, cChoice)
            
        })

    }
}

/**
 * Randomly generate computers choice
 */
function computerChoice() {
    let randomNb = Math.floor(Math.random() *3)
    let cChoice = selection[randomNb]
    return cChoice
}

/**
 * Check if player 1 won 
 * @param {player 1 choice object} pChoice 
 * @param {*player 2 or computer choice object} cChoice 
 */
function checkWinnerPlayer1(pChoice, cChoice){
    if (cChoice.name === pChoice.beats){
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

    }else{
        // means player1 lost get emoji and insert into location 
        let finalDiv = document.getElementById("pScore")
        let scoreDiv = document.createElement("div")
        scoreDiv.innerText = pChoice.emoji
        scoreDiv.classList.add("player-score-display")
        finalDiv.after(scoreDiv)
    }

}

function checkWinnerPlayer2(cChoice, pChoice) {
    if (pChoice.name === cChoice.beats){
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
        console.log(scoreNb)
        score.innerHTML = ++scoreNb

    } else if (cChoice.name === pChoice.name) {
        // means its a draw just add emoji into location 
        let finalDiv = document.getElementById("cScore")
        let scoreDiv = document.createElement("div")
        scoreDiv.innerText = cChoice.emoji
        scoreDiv.classList.add("player-score-display")
        finalDiv.after(scoreDiv)
    }else{
        // means player2 lost get emoji and insert into location 
        let finalDiv = document.getElementById("cScore")
        let scoreDiv = document.createElement("div")
        scoreDiv.innerText = cChoice.emoji
        scoreDiv.classList.add("player-score-display")
        finalDiv.after(scoreDiv)
    }

}