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

    document.getElementById("start-game").addEventListener("click", startGame(gameChoice[0], gameChoice[1]))
}


/**
 * Starts the game, firstly changes to the game screen and then the game begins 
 */



