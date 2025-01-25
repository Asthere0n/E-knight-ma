import {gameEngine} from "./utils/game-engine.js" 
import {startButton} from "./utils/addresses.js"

// Load the game
const Game = new gameEngine()

//Start Button
startButton.addEventListener('click', ()=>{
    if (Game.state === "GAME"){
        Game.changeState("OFF")
    } else {
        Game.changeState("GAME")
    }
})