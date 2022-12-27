/**
 *  process.nextTick() - 
 *  new event queue of operations is initialized we can think of it as a new tick.
 *  So,  process.nextTick() method adds the callback function to the start of the next event queue
 *  But when proccess.nextTick() method is called for the first time before the event loop is processed.
 *  Syntaxt - process.nextTick(callback);
 *  process.nextTick() is not technically part of the event loop. 
 *  Instead, the nextTickQueue will be processed after the current operation is completed, 
 *  regardless of the current phase of the event loop
*/ 
/**
 *  Promises that may resolve or reject executes before all timer and process.nextTick,
 *  process next tick goes in to the nextTickQueue rather than micro queue(it is attached to micro queue but other functions like promises have preference over it) where promises laid. 
 *  micro queue has more preference than nextTickQueue. () 
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
import fs from 'fs';
/*Promise run before process next tick and  all timers*/
//Promise.reject('Promise rejected!')
// Promise.resolve('Promise resolved!')
// .then((res)=>{console.log('then Promise', res);}) //for resolve, this will run 
// .catch((err)=>{console.log('catch',err);}) //for Reject, this will run 

// setTimeout(function E() {
//     console.log("1st zro timeout");
// },0);

// setImmediate(function A() {
//     console.log("1st immediate");
// });
  
// setImmediate(function B() {
//     console.log("2nd immediate");
// });
  
// process.nextTick(function C() {
//     console.log("1st process");
// });
  
// process.nextTick(function D() {
//     console.log("2nd process");
// });

// setTimeout(function F() {
//     console.log("2st timeout");
// },7000);
  
// setTimeout(function G() {
//     //doing I/O operations
//     let sum = 0;
//     while (sum < 10e3) {
//         sum = sum + 100;
//     }
//     console.log("3st zro timeout");
// },0);

// setInterval(()=>{
//     console.log("1st Interval with 10sec time");
// },10000)
// // First event queue ends here
// console.log("program started");


// process.nextTick(() => {
//     console.log(`next Tick`);
// });

// setImmediate(() => {
//     console.log(`Set Immediate`);
// });

// setTimeout(() => {
//     const readFile = fs.readFile('./testPipe.txt', 'utf8', (err, data)=>{
//         if(err) throw err;
//         console.log(`file data -`, data);
//     }); 
//     console.log(`readfile \n`, readFile,'\n');
//     console.log(`set Timeout`);
// }, 0);


// //Promise.reject('Promise rejected!')
// Promise.resolve('Promise resolved!')
// .then((res)=>{console.log('then Promise', res);}) //for resolve, this will run 
// .catch((err)=>{console.log('catch',err);}) //for Reject, this will run 

// setInterval(() =>{
//     console.log(`set Interval`);
// },1000);

// console.log(`outside call`);

/**
 * Every recursive call of process.nextTick() will prevent event loop i/o operation and there will be starvation for i/o
 * TO avaoid starvation in execution of event loop we must use timeout and immediate 
 * 
*/
/*example of processTick block execution of event loop*/
// let count = 0;
// const cp = () =>{
//     console.log(`Processing nextTick cb ${++count}`); //this will continouesly run not allow to run immediate and timeout at all.
//     process.nextTick(cp);
// }
// setImmediate(()=>{
//     console.log(`Set Immediate is called ` );
// });
// setTimeout(()=>{
//     console.log(`Set Timeout is called ` );
// },1000);
// process.nextTick(cp);
// console.log(`Start Of testing process nexttick performance....`);

//Example of SetImmediate - this will allow settimeout to call even in recursive calling.
// let count2 = 0;
// const cpImm = () =>{
//     console.log(`SetImmediate calling cb - ${++count2}`); //this will continouesly run not allow to run immediate and timeout at all.
//     setImmediate(cpImm);
// }
// setImmediate(cpImm);
// setTimeout(()=>{
//     console.log(`Set Timeout is called ` );
// },5000);


function abc(){

    process.nextTick(() => console.log(1));
    //Promise.resolve().then(() => console.log(2));
    const test = new Promise((resolve, reject) =>{
        resolve('test');
    });
    test.then(() => console.log(2))
    .catch(err => console.log(err));

    Promise.resolve().then(() => {
        console.log(3);
        setTimeout(() => console.log('8'),0);
        setImmediate(() => console.log('7'));
        process.nextTick(() => console.log(4));
        Promise.resolve().then(() => console.log(5));
    }).then(() => {
        console.log(6);
    })

    setTimeout(() => console.log('9'),0);
}
abc(); //2,3,5,6,1,4,7,9,8