import { Moves, Points } from "./addresses.js";

export function timeIncrease(){
    let addedTime = 0
    if (parseInt(Points.innerText) < 5){
        addedTime = parseInt(Moves.innerText)*3
    } else if (parseInt(Points.innerText) < 10){
        addedTime = parseInt(Moves.innerText)*2
    } else if (parseInt(Points.innerText) < 15){
        addedTime = parseInt(Moves.innerText)
    } else if (parseInt(Points.innerText) < 20){
        addedTime = parseInt(Moves.innerText)/2
    } else {
        addedTime = parseInt(Moves.innerText)/3
    console.log("Time increased by ", addedTime)}

    return addedTime
}