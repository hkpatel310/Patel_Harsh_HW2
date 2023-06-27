//variables
const theButtons = document.querySelectorAll("#buttonHolder img"),
    puzzleBoard = document.querySelector(".puzzle-board"),
    puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    dropZones = document.querySelectorAll(".drop-zone")
    puzzleDiv = document.querySelector(".puzzle-pieces"); // make new const for reset puzzle pie
    resetButton = document.getElementById("resetBut");

 
//store the dragged piece in a global variable
//we will need it in the handleDrop function    
let draggedPiece;

function changeBGImage() {
  
    puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`
    dropZones.forEach((zone) => {
        if (zone.firstChild) {
          const piece = zone.firstChild;
          puzzleDiv.appendChild(piece);
          piece.classList.remove("dropped");
    }
    });
}

function handleStartDrag() {
    //console.log("Started dragging this piece:", this)
    draggedPiece = this;
}

function handleDragOver(e) {
    e.preventDefault();
    //this will prevent the default dragover behaviour
    //e is short for event, could be e, evt a well
    console.log("dragged over me");
}

function handleDrop(e) {
    e.preventDefault();
    console.log("dropped something on me");

    // Check if the drop zone already contains a puzzle piece
    if (this.firstChild) {
        return; // Return early if a piece already exists in the drop zone
    }

    // Remove any existing puzzle piece from the drop zone
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }

    // Append the dragged puzzle piece to the drop zone
    this.appendChild(draggedPiece);
}
function reset() {
    // Reset puzzle by reparenting the puzzle pieces to the puzzleDiv
    puzzlePieces.forEach((piece) => {
      piece.classList.remove("dropped");
      piece.parentNode.removeChild(piece);
      puzzleDiv.appendChild(piece);
   });
}

//event Listeners
theButtons.forEach(button => button.addEventListener("click", changeBGImage)); 

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

resetButton.addEventListener("click", reset);  // Add an event listener to the reset button's click event