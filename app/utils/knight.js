import { Knightpiece } from "./addresses.js"

export class Knight {
    constructor(currentBoard, location) {
        this.currentBoard = currentBoard

        this.Xcoord = location[0]
        this.Ycoord = location[1]

        this.position = [this.Xcoord, this.Ycoord]
        console.log(`Knight created at ${this.Xcoord}, ${this.Ycoord}`)
    }

    move(newPosition) {
        if (!this.currentBoard.isMovePossible(newPosition)){
            console.warn(`Move to ${newPosition} is not possible`)
            return
        }

        // We change the knight's position in the board
        [this.Xcoord, this.Ycoord] = newPosition
        console.log(`Knight moved to ${this.Xcoord}, ${this.Ycoord}`)

        // We update the knight's position in the board
        const knight = Knightpiece
        if (knight && knight.parentNode) {
            knight.parentNode.removeChild(knight)
        }

        this.currentBoard.get(newPosition).appendChild(knight)
    }

    // This method finds if there's a path to the target location using the
    // knight
    findTarget(targetlocation) {

        let currentLocation = [this.Xcoord, this.Ycoord]
        let queue = [[currentLocation, 0]]
        let visited = new Set()
        visited.add(currentLocation.toString())

        while (queue.length > 0) {
            let [currentPosition, distance] = queue.shift()
            let [currentX, currentY] = currentPosition
            console.log(`Now trying: ${currentX}, ${currentY}`)

            // Check if the current position is the target location
            if (currentX === targetlocation[0] && currentY === targetlocation[1]) {
                console.log(`Success! ${currentX}, ${currentY} found in ${distance} moves`)
                return distance
            }

            // Get the current square
            let currentSquare = this.currentBoard.get(currentPosition);

            // Enquere the adyacent squares
            for (let adj of currentSquare.adyacent) {
                if (this.currentBoard.isMovePossible(adj) && !visited.has(adj.toString())) {
                    //console.log(`Adding to queue: ${adj}`)
                    queue.push([adj, distance + 1]);
                    visited.add(adj.toString());
                }
            }
        }

        // If no path is found will return -1
        return -1
    }

    selectNewTarget() {
        let newTarget = this.currentBoard.getRandomPosition()
        if (newTarget === this.position) {
            this.selectNewTarget()
        }
        return newTarget
    }
}