export default class Square {
    // Each square stores it's own location as a vertex and 
    // every possible move from it as an edge
    constructor(Xcoord, Ycoord) {
        this.coordenates = [Xcoord, Ycoord];
        this.adyacent = [
            [Xcoord + 2, Ycoord + 1], 
            [Xcoord + 2, Ycoord - 1], 
            [Xcoord - 2, Ycoord + 1], 
            [Xcoord - 2, Ycoord - 1], 
            [Xcoord + 1, Ycoord + 2], 
            [Xcoord + 1, Ycoord - 2], 
            [Xcoord - 1, Ycoord + 2], 
            [Xcoord - 1, Ycoord - 2]
        ];
    }
    
}