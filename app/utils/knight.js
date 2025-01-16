export default class Knight {
    constructor(currentBoard, location) {
        this.Xcoord = location[0]
        this.Ycoord = location[1]
        this.initialLocation = currentBoard.get[this.Xcoord][this.Ycoord];
        this.movesQueue = []
    }


    // This method finds if there's a path to the target location using the
    // knight
    findTarget(targetlocation) {
        let currentLocation = this.initialLocation

        this.movesQueue.forEach(node => {

            if (currentBoard.isMovePosible(node)) {
                currentLocation = node
            
        // If the location is found will return the target node
                if (currentLocation == targetlocation) {
                    return currentLocation.coordenates
        // If isn't found yet will add the next posible moves to the movesQueue
                } else {
                    this.movesQueue.concat(currentLocation.neightbours)
                }
            }
            currentLocation = this.movesQueue.shift()
        });

        // If no path is found will return null
        return null
    }

    // This method will restart the stat of the knight into a random position
    // within the board limits
    startRandomPosition(){
        this.movesQueue = []
        this.initialLocation = currentBoard.getRandomPosition()
        this.Xcoord = this.initialLocation.coordenates[0]
        this.Ycoord = this.initialLocation.coordenates[1]
    }
}
