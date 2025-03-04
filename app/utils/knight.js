import { Knightpiece } from "./addresses.js"

export class Knight {
    constructor(currentBoard, location) {
        this.currentBoard = currentBoard

        this.Xcoord = location[0]
        this.Ycoord = location[1]

        this.position = [this.Xcoord, this.Ycoord]

        this.previousLocations = []
        this.move(location)
    }
    
    move(newPosition) {
        if (!this.currentBoard.isMovePossible(newPosition)) {
            console.warn(`Move to ${newPosition} is not possible`)
            return
        }
        
        // We change the knight's position in the board
        [this.Xcoord, this.Ycoord] = newPosition
        
        // We update the knight's position in the board
        const knight = Knightpiece
        if (knight && knight.parentNode) {
            this.previousLocations.push(this.position)
            this.Xcoord = newPosition[0]
            this.Ycoord = newPosition[1]
            this.position = [this.Xcoord, this.Ycoord]
            
            // We update the board displayed in the browser
            const newKnight = knight.parentNode.removeChild(knight)
            this.currentBoard.getHTML(this.position).appendChild(newKnight)
        }
        
        // We update the adyacents
        this.updateAdyacents(this.position)
    }
    
    updateAdyacents(square) {
        // We clear the previous adyacents
        const oldAdyacent = document.getElementsByClassName('possible')
        while (oldAdyacent.length > 0) {
            oldAdyacent[0].classList.remove('possible')
        }
        
        // We calculate the new adyacents
        let X = square[0]
        let Y = square[1]
        
        let adyacents = [
            [X + 2, Y + 1],
            [X + 2, Y - 1],
            [X - 2, Y + 1],
            [X - 2, Y - 1],
            [X + 1, Y + 2],
            [X + 1, Y - 2],
            [X - 1, Y + 2],
            [X - 1, Y - 2]
        ]
        
        // We filter the adyacents to only include the valid ones
        let validAdyacents = adyacents.filter((adj) => this.currentBoard.isMovePossible(adj))
        
        // We update the adyacents in the board
        validAdyacents.forEach((adj) => {
            this.currentBoard.getHTML(adj).classList.add('possible')
        })
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
            // console.log(`Now trying: ${currentX}, ${currentY}`)

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
        if (newTarget[0] == this.Xcoord && newTarget[1] == this.Ycoord) {
            return this.selectNewTarget()
        }
        return newTarget
    }
}