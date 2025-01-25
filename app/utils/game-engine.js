import { Knight } from "./knight.js"
import { chessBoard } from "./board.js"
import { Timer , startButton } from "./addresses.js"

export class gameEngine {
    constructor() {
        this.board = new chessBoard()
        this.knight = new Knight(this.board)
        this.state = this.changeState("OFF")
    }

    changeState(state) {
        switch (state) {
            // State used when you first access the web. No game is launched yet
            case 'OFF':
                this.state = 'OFF'  
                console.log ("Game is OFF")
                Timer.innerHTML = "20"  // Timer is the ID of the timer in the HTML
                break

            // State of game used while the game is running
            case 'GAME':
                this.state = 'GAME'
                startButton.style.content = "PAUSE"
                console.log ("Game is ON")

                //create a new instance of Board    
                this.board = new chessBoard()
                this.board.createBoard()

                //create a new instance of player's knight
                this.knight = new Knight(this.board)
                Timer.innerHTML = 30
                break

            // State used when the Games ends
            case 'GAMEOVER':
                this.state = 'GAMEOVER'
                console.log ("Game is OVER")
                break
        }
    }
}