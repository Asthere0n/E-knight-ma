import { Knight } from "./knight.js"
import { chessBoard } from "./board.js"
import { Moves, Timer, startButton, popup, Points, PointsPopUp } from "./addresses.js"
import { ManageLogs } from "./log.js"
import { timeIncrease } from "./timeIncrease.js"

export class gameEngine {
    constructor() {
        this.board = new chessBoard()
        this.state = this.changeState("OFF")
        this.Target
        this.time = 0
    }

    clock(callback) {
        Timer.innerHTML = this.time

        if (this.state == 'GAMEOVER' || this.state == 'OFF') {
            this.time = 0
            return
        }

        if (this.time > 0) {
            setTimeout(() => {
                if (this.state == 'GAMEOVER' || this.state == 'OFF') {
                    this.time = 0
                    return
                }
                this.time = this.time - 1
                Timer.innerHTML = this.time
                this.clock(callback)
            }, 1000)
        } else {
            callback()
        }
    }

    changeState(state) {
        switch (state) {
            // State used when you first access the web. No game is launched yet
            case 'OFF':
                this.state = 'OFF'
                startButton.innerHTML = "Start"
                startButton.style.backgroundColor = "Green"
                console.log("Game is OFF")
                Timer.innerHTML = "0"
                this.Target = []
                break

            // State used when the Games ends
            case 'GAMEOVER':
                this.state = 'GAMEOVER'
                while (document.getElementsByClassName('possible').length > 0) {
                    document.getElementsByClassName('possible')[0].classList.remove('possible')
                }
                while (document.getElementsByClassName('target').length > 0) {
                    document.getElementsByClassName('target')[0].classList.remove('target')
                }
                Moves.innerHTML = 0
                Timer.innerHTML = 0
                PointsPopUp.innerHTML = Points.innerHTML
                Points.innerHTML = 0
                ManageLogs.resetMoves()
                this.Target = []
                startButton.innerHTML = "Start"
                startButton.style.backgroundColor = "Green"
                popup.style.display = "flex"
                ManageLogs.write("Game Over")
                console.log("Game is OVER")
                break

            // State of game used while the game is running
            case 'GAME':
                popup.style.display = "none"
                this.state = 'GAME'
                startButton.innerHTML = "QUIT"
                startButton.style.backgroundColor = "red"
                ManageLogs.resetMoves()
                ManageLogs.write("New Game Started")
                console.log("Game is ON")

                //create a new instance of Board 
                this.board.createBoard()
                this.knight = new Knight(this.board, this.board.getRandomPosition())
                this.Target = this.knight.selectNewTarget()
                console.log("New target is: ", this.Target)

                // Set the Moves and Timer displays work
                Moves.innerHTML = this.knight.findTarget(this.Target)
                this.board.getHTML(this.Target).classList.add('target')
                this.time = 10
                this.clock(() => { this.changeState('GAMEOVER') })

                // Execute the move method of the knight only if the square is possible
                const squaresInHTML = document.getElementsByClassName('square')
                Array.from(squaresInHTML).forEach((square) => {
                    square.addEventListener('click', (event) => {
                        if (event.target.classList.contains('possible')) {
                            let X = parseInt(event.target.id[1]) - 1;
                            let Y = event.target.id[0];
                            const LetterCoordinate = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
                            Y = parseInt(LetterCoordinate.indexOf(Y));
                            this.knight.move([X, Y])
                            Moves.innerHTML -= 1
                            ManageLogs.add(event.target.id)

                            // If the knight reaches the target, select a new target
                            if (this.knight.Xcoord === this.Target[0] && this.knight.Ycoord === this.Target[1]) {
                                // Select a new target
                                const newTarget = this.knight.selectNewTarget()
                                this.Target = newTarget
                                console.log(`New target is: ${newTarget} and time is: ${this.time} seconds`)
                                
                                // Remove the target class from the previous target
                                document.getElementsByClassName('target')[0].classList.remove('target')
                                
                                // Find how many moves are needed to reach the new target
                                Moves.innerHTML = this.knight.findTarget(newTarget)
                                this.time += timeIncrease()
                                Points.innerHTML = parseInt(Points.innerHTML) + 1

                                // Display the new target in the board
                                this.board.getHTML(newTarget).classList.add('target')
                            }

                            // If the knight runs out of moves, the game is over
                            if (Moves.innerHTML <= 0 && !(this.knight.position[0] == this.Target[0] && this.knight.position[1] == this.Target[1])) {
                                this.changeState('GAMEOVER')
                            }
                        }
                    })
                })
                break
        }
    }
}