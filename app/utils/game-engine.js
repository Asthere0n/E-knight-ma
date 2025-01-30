import { Knight } from "./knight.js"
import { chessBoard } from "./board.js"
import { Moves, Timer, startButton, popup } from "./addresses.js"

export class gameEngine {
    constructor() {
        this.board = new chessBoard()
        this.state = this.changeState("OFF")
    }

    changeState(state) {
        switch (state) {
            // State used when you first access the web. No game is launched yet
            case 'OFF':
                popup.style.display = "none"
                this.state = 'OFF'
                startButton.innerHTML = "Start"
                startButton.style.backgroundColor = "Green"
                console.log("Game is OFF")
                Timer.innerHTML = "0"  // Timer is the ID of the timer in the HTML
                break

            // State used when the Games ends
            case 'GAMEOVER':
                while (document.getElementsByClassName('possible').length > 0) {
                    document.getElementsByClassName('possible')[0].classList.remove('possible')
                }
                while (document.getElementsByClassName('target').length > 0) {
                    document.getElementsByClassName('target')[0].classList.remove('target')
                }
                startButton.innerHTML = "Start"
                startButton.style.backgroundColor = "Green"
                popup.style.display = "flex"

                this.state = 'GAMEOVER'
                console.log("Game is OVER")
                break

            // State of game used while the game is running
            case 'GAME':
                this.state = 'GAME'
                startButton.innerHTML = "QUIT"
                startButton.style.backgroundColor = "red"
                console.log("Game is ON")

                //create a new instance of Board 
                this.board.createBoard()
                this.knight = new Knight(this.board, this.board.getRandomPosition())
                let Target = this.knight.selectNewTarget()
                console.log("New target is: ", Target)
                Moves.innerHTML = this.knight.findTarget(Target)
                this.board.getHTML(Target).classList.add('target')
                Timer.innerHTML = 30

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

                            // If the knight runs out of moves, the game is over
                            if (Moves.innerHTML <= 0 && !(this.knight.position[0] == Target[0] && this.knight.position[1] == Target[1])) {
                                this.changeState('GAMEOVER')
                            }

                            // If the knight reaches the target, select a new target
                            if (this.knight.position[0] === Target[0] && this.knight.position[1] === Target[1]) {
                                // Select a new target
                                const newTarget = this.knight.selectNewTarget()
                                console.log("New target is: ", newTarget)
                                Target = newTarget
                                
                                // Remove the target class from the previous target
                                document.getElementsByClassName('target')[0].classList.remove('target')
                                
                                // Find how many moves are needed to reach the new target
                                Moves.innerHTML = this.knight.findTarget(newTarget)

                                // Display the new target in the board
                                this.board.getHTML(newTarget).classList.add('target')
                            }
                        }
                    })
                })
                break
        }
    }
}