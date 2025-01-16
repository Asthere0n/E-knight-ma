export default class Square {
    // Each square stores it's own location as a vertex and 
    // every possible move from it as an edge
    constructor(x, y) {
        this.coordenates = [x, y];
        this.neightbours = [[x + 2, y + 1], [x + 2, y - 1], [x - 2, y + 1], [x - 2, y - 1], [x + 1, y + 2], [x + 1, y - 2], [x - 1, y + 2], [x - 1, y - 2]];
    }
    
}