import { Timer } from "./addresses.js";

function clock(callback){
    let time = parseInt(Timer.innerHTML)

    if (isNaN(time)) {
        console.error("Timer value is not a valid number");
        return;
    }

    if (time > 0) {
        setTimeout(()=>{
            Timer.innerHTML = time - 1
            clock(callback)
        }, 1000)
    } else {
        callback()
    }
}

export {clock}