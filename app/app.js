import chessBoard from "./utils/board.js";
import Knight from "./utils/knight.js";

// Start the game
const newGame = new chessBoard
newGame.createBoard()
const Piece = new Knight (newGame, [4,4])

console.log(Piece.position)
console.log(Piece.findTarget([5,2]))

