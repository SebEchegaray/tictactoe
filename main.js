// This grab all the boxes so we can treat them sort of as an array
let options = document.querySelectorAll('.box')

// General variables set
let playerTurnIndex = 0
var win = false  //  Check variable for winning case
let lineItems = 0  //  Index for row/column check
let rowsCount = 3   //  Index to jump to the start of each row - Horizontal win
let columnCount = 1   //  Index to jump to the start of each column - Vertical win
const entryDetails = document.querySelector('.names_input-container')
const overlay = document.querySelector('#ghost_overlay')
const startGame = document.querySelector('.start_game')
const resetGame = document.querySelector('#reset')
let firstPlInput = document.querySelector('#first_player-name')
let secondPlInput = document.querySelector('#second_player-name')
let firstPlDisplay = document.querySelector('#first_pl')
let secondPlDisplay = document.querySelector('#second_pl')
const xPlayer = document.querySelector('.x_player')
const oPlayer = document.querySelector('.o_player')

// PROGRAM STARTS

// This function shows who the winner is
function whoWins(winnerName) {
  overlay.style.visibility= "visible"
  document.querySelector('#pop_up').style.top = "50%"
  document.querySelector('#pop_up-msg').textContent = winnerName + " WINS!!!"
}

// This function checks if there is a winner
function winningCheck(lineCount, box) {
  for (var j = 0; j < options.length; j += box) {
    var position = j + lineCount
    if (options[j].textContent !== '') {
      if (options[j].textContent == options[position].textContent && options[j].textContent == options[position + lineCount].textContent) {
        win = true
        break
      }
    }
  }
  return win
}

// Diagonal winning
function winnerDiagonal(diagItems) {
  for (var i = 0; i < 1; i += diagItems) {
    if (options[i].textContent !== '') {
      if (options[i].textContent == options[diagItems+1].textContent && options[i].textContent == options[(options.length)-1].textContent) {
        win = true
        break
      }
    }
  }
  // Checking second diagonal
  if (!win) {
    for (var i = diagItems - 1; i < diagItems; i += diagItems) {
      if (options[i].textContent !== '') {
        if (options[i].textContent == options[diagItems+1].textContent && options[i].textContent == options[(options.length)-diagItems].textContent) {
          win = true
          break
        }
      }
    }
  }
  return win
}

// Vertical winning
function winnerVertical(colItems) {
  colItems = 3
  return winningCheck(colItems, columnCount)
}

// Horizontal winning
function winnerHorizontal(rowItems) {
  rowItems = 1
  return winningCheck(rowItems, rowsCount)
}

// This function check who's turn it is
function playerTurn(event) {
  const targetPosition = event.target
  for (var j = 0; j < options.length; j++) {
    if (playerTurnIndex % 2 == 0) {
      if (targetPosition.textContent === '') {
        targetPosition.textContent = 'X'
        playerTurnIndex++
        if (!winnerHorizontal(lineItems)) {
          if (!winnerDiagonal(rowsCount)) {
            if (!winnerVertical(lineItems)) {
              break
            } else {
              whoWins(firstPlDisplay.textContent)
              break
            }
          } else {
            whoWins(firstPlDisplay.textContent)
            break
          }
        } else {
          whoWins(firstPlDisplay.textContent)
          break
        }
      } else {
        alert("You need to pick an empty block")
        break
      }
    } else {
      if (targetPosition.textContent === '') {
        targetPosition.textContent = 'O'
        playerTurnIndex++
        if (!winnerHorizontal(lineItems)) {
          if (!winnerDiagonal(rowsCount)) {
            if (!winnerVertical(lineItems)) {
              break
            } else {
              whoWins(secondPlDisplay.textContent)
              break
            }
          } else {
            whoWins(secondPlDisplay.textContent)
            break
          }
        } else {
          whoWins(secondPlDisplay.textContent)
          break
        }
      } else {
        alert("You need to pick an empty block")
        break
      }
    }

  }
}

// Entry details window function
startGame.addEventListener('click', start)

function start(event) {
  event.preventDefault()

  entryDetails.style.top = "-50%"
  overlay.style.visibility = "hidden"
  resetGame.style.visibility = "visible"
  firstPlDisplay.textContent = firstPlInput.value
  secondPlDisplay.textContent = secondPlInput.value
  setTimeout(function(){
    xPlayer.style.visibility = "visible"
  }, 500)
  setTimeout(function(){
    oPlayer.style.visibility = "visible"
  }, 500)
}

for (var i = 0; i < options.length; i++) {
  const playerChoice = options[i]
  playerChoice.addEventListener('click', playerTurn)
}

// Refresh page in middle of game
resetGame.addEventListener('click', function() {
  for (var i = 0; i < options.length; i++) {
    options[i].textContent = ''
  }
})

// Buttons definition and function for the pop up window
const newGame = document.querySelector('.new_game')
const refreshGame = document.querySelector('.refresh')
const quitGame = document.querySelector('.quit')

newGame.addEventListener('click', action)
refreshGame.addEventListener('click', action)
quitGame.addEventListener('click', action)

function action(event) {
  let targetAction = event.target

  if (targetAction.className == 'new_game') {
    location.reload()
  } else if (targetAction.className == 'refresh') {
    document.querySelector('#pop_up').style.top = "-50%"
    overlay.style.visibility = "hidden"
    for (var i = 0; i < options.length; i++) {
      options[i].textContent = ''
    }
    win = false
  } else if (targetAction.className == 'quit') {
    window.close()
  }
}