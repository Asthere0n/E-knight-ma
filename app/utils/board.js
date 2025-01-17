import Square from "./square.js";

export default class chessBoard {
  constructor(height = 8, width = 8) {
    this.board = [];
    this.height = height
    this.width = width
  }
  // Create a board with the given height and width
  // The board should be an array of arrays
  createBoard() {
    for (let i = 0; i < this.height; i++) {
      let row = [];
      for (let j = 0; j < this.width; j++) {
        const newSquare = new Square(j, this.board.length)
        row.push(newSquare);
      }
      this.board.push(row);
      // console.log(this.board)
    }
    return this.board;
  }


  // This method will return the node located in the X, Y position of the board
  get(position) {
    const Ycoord = position[1]
    const Xcoord =  position[0]
    return this.board[Ycoord][Xcoord]
  }

  // This method will check if a move is possible before attempting it
  isMovePossible(target) {
    console.log(`Is posible to move to ${target}?`)
    if (target[0] < 0 || target[1] < 0 ||
      target[0] > this.board[0].length ||
      target[1] > this.board.length) {
        return false
      }
    return true
  }

  // This method will return a random valid position within the board
  getRandomPosition(){
    // Generate a random position within the board
    const randomPosition = [Math.floor(Math.random() * this.board[0].length),
    Math.floor(Math.random() * this.board.length)]
    // console.log(randomPosition)
    return this.get(randomPosition)
  }

}