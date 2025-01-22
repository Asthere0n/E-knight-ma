import Knight from "./knight.js"
import { chessBoard } from "./board.js"

export default class gameEngine {
    constructor() {
        this.board = new chessBoard
        this.knight = new Knight
        this.State = this.changeState("OFF")
    }

    changeState(parameter) {
        switch (parameter) {
            // State used when you first access the web. No game is launched yet
            case parameter == 'OFF':
                console.log ("Game is OFF")
                Timer.in

                break

            // State of game used while the game is running
            case parameter == 'GAME':
                startButton.style = {}
                console.log ("Game is ON")
                //create a new instance of Board    
                const newBoard = new chessBoard
                newBoard.createBoard()
                //create a new instance of player's knight
                const Piece = new Knight(newBoard)
                Timer.innerHTML = 30

                break

            // State used when the Games ends
            case parameter == 'GAMEOVER':
                console.log ("Game is OVER")

                break
        }
    }
}