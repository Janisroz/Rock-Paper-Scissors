
// Start with opening the Modal pop-up
document.getElementById("choose-game").addEventListener("click", function() {
    let backdrop = document.getElementById("backdrop")
    let modal = document.getElementById("modal-pop-up")
    backdrop.style.display = 'block'
    modal.style.display = 'block'
})

// Allow user to click outside of the modal to close it
document.getElementById("backdrop").addEventListener("click", function() {
    let backdrop = document.getElementById("backdrop")
    let modal = document.getElementById("modal-pop-up")
    backdrop.style.display = 'none'
    modal.style.display = 'none'
})