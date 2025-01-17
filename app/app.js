import chessBoard from "./utils/board.js";
import Knight from "./utils/knight.js";

// Start the game
const newGame = new chessBoard
newGame.createBoard()
const Piece = new Knight (newGame, [1,2])

console.log(Piece.position)

