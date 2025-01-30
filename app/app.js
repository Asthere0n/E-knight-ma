import {gameEngine} from "./utils/game-engine.js" 
import {startButton, YesButton} from "./utils/addresses.js"

document.addEventListener('DOMContentLoaded', ()=>{
    
    // Load the game
    const Game = new gameEngine()
    
    // Start Button
    startButton.addEventListener('click', ()=>{
        if (Game.state === "GAME"){
            Game.changeState("GAMEOVER")
        } else {
            Game.changeState("GAME")
        }
    })
    
    // Yes button
    if(YesButton){
    YesButton.addEventListener('click', ()=>{
        console.log("Play Again")
        Game.changeState("OFF")
    })}
    
})
