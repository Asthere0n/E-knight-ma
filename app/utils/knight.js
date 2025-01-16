export default class Knight {
    constructor(currentBoard, location) {
        this.Xcoord = location[0]
        this.Ycoord = location[1]
        this.initialLocation = currentBoard.get[this.Xcoord][this.Ycoord];
        this.movesQueue = []
    }

    findTarget(targetlocation) {
        let currentLocation = this.initialLocation

        this.movesQueue.forEach(node => {

            if (currentBoard.isMovePosible(node)) {
                currentLocation = node
            
                if (currentLocation == targetlocation) {
                    return currentLocation.coordenates
                } else {
                    this.movesQueue.concat(currentLocation.neightbours)
                }
            }

            currentLocation = this.movesQueue.shift()
        });

    }


}
