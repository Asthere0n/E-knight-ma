export default class Knight {
    constructor(currentBoard, location) {
        this.currentBoard = currentBoard
        console.log(`New Game created in ${location}`)

        this.Xcoord = location[0]
        this.Ycoord = location[1]

        this.movesQueue = []
        this.position = [this.Xcoord, this.Ycoord]
    }


    // This method finds if there's a path to the target location using the
    // knight
    findTarget(targetlocation) {
        let currentLocation = [this.Xcoord, this.Ycoord]

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
        throw new Error ("Path not found")
    }  
}
