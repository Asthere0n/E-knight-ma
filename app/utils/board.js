import Square from "./square";

class chessBoard {
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

  get(X, Y) {
    return this.board[Y][X]
  }

  isMovePosible(newLocation) {
    if (newLocation[0] < 0 || newLocation[1] < 0 ||
      newLocation[0] > this.currentBoard.board[0].lenght ||
      newLocation[1] > this.currentBoard.board.lenght) {
      return false
    }
    return true
  }

}