import { Knight } from "./knight.js"
import { chessBoard } from "./board.js"
import { Moves, Timer, startButton } from "./addresses.js"

export class gameEngine {
    constructor() {
        this.board = new chessBoard()
        this.state = this.changeState("OFF")
    }

    changeState(state) {
        switch (state) {
            // State used when you first access the web. No game is launched yet
            case 'OFF':
                this.state = 'OFF'
                startButton.innerHTML = "Start"
                startButton.style.backgroundColor = "Green"
                while (document.getElementsByClassName('possible').length > 0) {
                    document.getElementsByClassName('possible')[0].classList.remove('possible')    
                }
                while (document.getElementsByClassName('target').length > 0) {
                    document.getElementsByClassName('target')[0].classList.remove('target')
                }
                console.log("Game is OFF")
                Timer.innerHTML = "0"  // Timer is the ID of the timer in the HTML
                break

            // State used when the Games ends
            case 'GAMEOVER':
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
                const Target = this.knight.selectNewTarget()
                console.log("New target is: ", Target)
                Moves.innerHTML = this.knight.findTarget(Target)
                this.board.getHTML(Target).classList.add('target')
                Timer.innerHTML = 30

                // Execute the move method of the knight only if the square is possible
                const squaresInHTML = document.getElementsByClassName('square')
                Array.from(squaresInHTML).forEach((square) => {
                    square.addEventListener('click', (event) => {
                        if (event.target.classList.contains('possible')) {
                            let X = parseInt(event.target.id[1])-1;
                            let Y = event.target.id[0];
                            const LetterCoordinate = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] 
                            Y = parseInt(LetterCoordinate.indexOf(Y));
                            console.log(`Clicked on ${X}${Y}`)
                            this.knight.move([X, Y])
                            Moves.innerHTML -= 1 
                        }
                    })
                })
                break
        }
    }
}