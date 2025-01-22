import {gameEngine} from "./utils/game-engine.js" 

// Load the game
const Game = new gameEngine

//Start Button
startButton.addEventListener('click', ()=>{
    if (Game.State === "GAME"){
        Game.State = "OFF"
    } else {
        Game.State = "GAME"
    }
})