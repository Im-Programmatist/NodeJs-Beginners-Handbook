/**
 * We can create our own event in node js using Events module
 * Server emits an event each time a peer connects to it, 
 * fs.readStream emits an event when the file is opened
*/
/**
 * 1. We can register event for only one time
 * 2. Create event instance and register for couple of callback
 * 3. Register for the event with callback function and param
*/

import EventEmitter from "events";
const event = new EventEmitter(); //Initialize constructor method and make new object of EventEmitter
//register our own event
event.on("MyEvent",()=>{
    console.log("Function 1 : this is event listener callback, perform any action through this event");
});
/**
 * we can call multiple callback functions in node (not possible in js) 
*/
event.on("MyEvent",()=>{
    console.log("Function 2");
});
event.on("MyEvent",()=>{
    console.log("Function 3: ");
});

//Emit the named event(MyEvent) - this emit causes the registered event call (execution)
//This emitter has 2 featuire
//emit event and register,unregister events
//always put after the registered event in code. 
event.emit("MyEvent");

/**
 * Check  request response status  
*/
event.on("checkStatus", (status_code,message)=>{
    console.log(`status code is ${status_code} and message is ${message}`);
});
event.emit("checkStatus", 200, "ok");


