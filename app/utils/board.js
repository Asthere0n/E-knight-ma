import Square from "./square";

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
        row.push(new Square(j, this.board.length));
      }
      this.board.push(row);
    }
    return this.board;
  }


  // This method will return the node located in the X, Y position of the board
  get(X, Y) {
    return this.board[Y][X]
  }

  // This method will check if a move is possible before attempting it
  isMovePosible(target) {
    if (target[0] < 0 || target[1] < 0 ||
      target[0] > this.currentBoard.board[0].lenght ||
      target[1] > this.currentBoard.board.lenght) {
      return false
    }
    return true
  }

  getRandomPosition(){
    return this.get(
      Math.random * this.board[0].lenght,
      Math.random * this.board.length
    )
  }

}