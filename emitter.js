`use strict`;
import EventEmitter from 'node:events';

// const mainObserver = new EventEmitter();

// const definedEvents = ["readable", "data", "ready", "pause", "resume", "error", "open", "close", "end"];
// let num = 1;

// mainObserver
// .addListener("readable", ()=> console.log(`the execution event ${num++} readable`))
// .addListener("data", ()=> console.log(`the execution event ${num++} data`))
// .addListener("ready", ()=> console.log(`the execution event ${num++} ready`))
// .addListener("pause", ()=> console.log(`the execution event ${num++} pause`))
// .addListener("resume", ()=> console.log(`the execution event ${num++} resume`))
// .addListener("error", error=> console.log(`the execution event ${num++} error`))
// .addListener("open", ()=> console.log(`the execution event ${num++} open`))
// .addListener("close", ()=> console.log(`the execution event ${num++} close`))
// .addListener("end", ()=> console.log(`the execution event ${num} end`));

// for (let value of definedEvents)
//     mainObserver.emit(value);

class EventClock extends EventEmitter {}

const eventClock = new EventClock();

// Solo se ejecutará una sola vez.
eventClock.on("readable", ()=> console.log("El mas fuerte es Hulk"));

console.log(EventEmitter);

