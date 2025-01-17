export default class Knight {
    constructor(currentBoard, location) {
        this.currentBoard = currentBoard

        this.Xcoord = location[0]
        this.Ycoord = location[1]

        this.movesQueue = []
        this.position = [this.Xcoord, this.Ycoord]
    }


    // This method finds if there's a path to the target location using the
    // knight
    findTarget(targetlocation) {

        let currentLocation = [this.Xcoord, this.Ycoord]
        this.movesQueue.push(currentLocation)

        while(this.movesQueue.length>0){
            let newPosition = this.currentBoard.get(this.movesQueue[0])
            console.log(`Now trying: ${newPosition.coordenates}`)
            if (this.currentBoard.isMovePossible(newPosition.coordenates)) {
                console.log(`Is ${newPosition.coordenates} equal to ${targetlocation}?`)
                // If the location is found will return the target node
                if (newPosition.coordenates[0] === targetlocation[0] && newPosition.coordenates[1] === targetlocation[1]) {
                    console.log('Success!')
                    return newPosition
                    // If isn't found yet will add the next posible moves to the movesQueue
                } else {
                    console.log("No")
                    newPosition.adyacent.forEach(adyacentLocation => {
                        this.movesQueue.push(adyacentLocation)
                    });
                }
    
                newPosition = this.movesQueue.shift()
            }
        }

        // If no path is found will return null
        throw new Error("Path not found")
    }
}
