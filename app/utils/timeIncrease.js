import { Moves, Points } from "./addresses.js";

export function timeIncrease(timer){
    if (parseInt(Points.innerText) < 5){
        timer += parseInt(Moves.innerText)*2
    } else if (parseInt(Points.innerText) < 10){
        timer += parseInt(Moves.innerText)
    }
}