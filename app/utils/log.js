import { logs } from "./addresses.js";

export let ManageLogs = {
    previousMoves: [],
    draw: function() {
        logs.innerHTML = ""
        this.previousMoves.forEach((move, index) => {
            const moveElement = document.createElement('div')
            moveElement.classList.add('previousMove')
            moveElement.textContent = `${index + 1}. ${move}`
            logs.appendChild(moveElement)
        })
    },
    add: function(move) {
        this.previousMoves.push(move)
        this.draw()
    },
    resetMoves: function() {
        this.previousMoves = []
        this.draw()
    },
    write: function(string) {
        const message = document.createElement('div')
        message.textContent = string
        logs.appendChild(message)
    }
}