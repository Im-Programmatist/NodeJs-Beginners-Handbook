/**
 *  process.nextTick() - 
 *  new event queue of operations is initialized we can think of it as a new tick.
 *  So,  process.nextTick() method adds the callback function to the start of the next event queue
 *  But when proccess.nextTick() method is called for the first time before the event loop is processed.
 *  Syntaxt - process.nextTick(callback);
*/ 
/**
 * setImmdeiate() method: 
 * Whenever we call setImmediate() method, it’s callback function is placed in the check phase of the next event queue. 
 * Note:- that setImmediate() method is called in the poll phase(fetching code to execution from top to down manner in js) 
 * and it’s callback functions are invoked in the check phase.
 * check phase : checks the setImmediate() callbacks are called here.
 * This function involked just after the last line of code execute in execution phace. 
 * Means after execution and initializing event loop callback queue this setImmediate method call
 * Syntaxt - setImmediate(callback);
*/

/**
 * setImmediate() is designed to execute a script once the current poll phase completes. 
 * setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.
 * setTimeout with 0 timers also run after the setImmediate
 * 
 * nextTick() is used to schedule a callback function to be invoked in the next iteration of the Event Loop. 
 * setImmediate() method is used to execute a function right after the current event loop finishes.
*/
/**
 * Execution pattern of setImmediate, process.nextTick and setTimeout and setInterval as follows  --->
 * polling phase (fetching/taking code top to bottom)--->check Phase -->execution phase 
 * -->event loop initialization --->proccess.nextTick ---> setImmediate --->setTimeout/setInterval(based on the timer)
*/
setTimeout(function E() {
    console.log("1st zro timeout");
},0);

setImmediate(function A() {
    console.log("1st immediate");
});
  
setImmediate(function B() {
    console.log("2nd immediate");
});
  
process.nextTick(function C() {
    console.log("1st process");
});
  
process.nextTick(function D() {
    console.log("2nd process");
});

setTimeout(function F() {
    console.log("2st timeout");
},100);
  
setTimeout(function G() {
    //doing I/O operations
    let sum = 0;
    while (sum < 10e3) {
        sum = sum + 100;
    }
    console.log("3st zro timeout");
},0);

// First event queue ends here
console.log("program started");
