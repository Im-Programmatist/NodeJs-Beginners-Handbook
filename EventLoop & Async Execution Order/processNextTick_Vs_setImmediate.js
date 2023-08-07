/**
 * https://medium.com/dkatalis/eventloop-in-nodejs-settimeout-setimmediate-vs-process-nexttick-37c852c67acb
 * https://jinoantony.com/blog/setimmediate-vs-process-nexttick-in-nodejs
 * 
 *  process.nextTick() - 
 *  new event queue of operations is initialized we can think of it as a new tick.
 *  So, process.nextTick() method adds the callback function to the start of the next event queue
 *  But when process.nextTick() method is called for the first time before the event loop is processed.
 *  Syntax - process.nextTick(callback);
 *  process.nextTick() is not technically part of the event loop. because it is not natively provided by the libuv, but implemented in Node.
 *  Instead, the nextTickQueue will be processed after the current operation is completed, 
 *  regardless of the current phase of the event loop
*/ 
/**
 *  Promises that may resolve or reject executes before all timer and process.nextTick,
 *  process next tick goes in to the nextTickQueue rather than micro queue(it is attached to micro queue but other functions like promises have preference over it) where promises laid. 
 *  micro queue has more preference than nextTickQueue. () 
/**
 * setImmediate() method: 
 * Whenever we call setImmediate() method, it’s callback function is placed in the check phase of the next event queue. 
 * Note:- that setImmediate() method is called in the poll phase(fetching code to execution from top to down manner in js) 
 * and it’s callback functions are invoked in the check phase.
 * check phase : checks the setImmediate() callbacks are called here.
 * This function involved just after the last line of code execute in execution phase. 
 * Means after execution and initializing event loop callback queue this setImmediate method call
 * Syntax - setImmediate(callback);
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
 * -->event loop initialization --->process.nextTick ---> setImmediate --->setTimeout/setInterval(based on the timer)
*/

/**
 * Interesting fact about settimeout
 * This is because of the interesting fact that NodeJS caps the minimum timeout to 1ms in order to align 
 * with Chrome’s timers cap. Due to this cap, even if you set a timer to 0ms delay, 
 * the delay is actually overridden and set to 1ms.
 * 
 * https://blog.insiderattack.net/timers-immediates-and-process-nexttick-nodejs-event-loop-part-2-2c53fd511bb3
*/


/**
 * Here, precedence of execution 
 * 1. promise 
 * 2. process next tick 
 * 3. immediate 
 * 4. timeout 
 * 5. call back getting data before settimeout timer
 * 6. set interval 
 * 7. settimeout allowed by set interval if timer ends up in between interval timer
*/
import fs from 'fs';

// const readFile = fs.readFile('./test.txt', 'utf8', (err, data)=>{
//     if(err) throw err;
//     console.log(`file callback run and data -`, data);
// }); //THis call back run after all set timeout and before interval
// console.warn(`readfile \n`, readFile, '- as callback not yet come in call stack from event loop');// use async-await

///*
setImmediate(function B() {
    for(let i = 0; i < 10e5; i++) {}
    console.log("1st immediate");
});

process.nextTick(function C() {
    console.log("1st process next tick");
});

setTimeout(function F() {
    console.log("1st timeout with 5000");
},5000);

setTimeout(function E() {
    console.log("2nd timeout with 0");
},0);

setTimeout(function G() {
    //doing I/O operations
    let sum = 0;
    while (sum < 10e2) {
        sum = sum + 100;
    }
    console.log("4th timeout with 0, long computation");
},0);

for(let i = 0; i < 10e6; i++) {}
setImmediate(function B() {
    
    console.log("2nd immediate");
});

//First event queue ends here
console.log("program started");

//Promise.reject('Promise rejected!')
Promise.resolve('Promise resolved!')
.then((res)=>{console.log('then Promise', res);}) //for resolve, this will run 
.catch((err)=>{console.log('catch',err);}) //for Reject, this will run 

setInterval(() =>{
    console.log(`1st Interval`);
},1000);

console.log(`outside call`); 

//*/

/*
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

*/
/**
 * Every recursive call of process.nextTick() will prevent event loop i/o operation and there will be starvation for i/o
 * To avoid starvation in execution of event loop we must use timeout and immediate 
 * 
*/
/*example of processTick block execution of event loop*/
// let count = 0;
// const cp = () =>{
//     console.log(`Processing nextTick cb ${++count}`); //this will continuously run not allow to run immediate and timeout at all.
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
//     console.log(`SetImmediate calling cb - ${++count2}`); //this will continuously run not allow to run immediate and timeout at all.
//     setImmediate(cpImm);
// }
// setImmediate(cpImm);
// setTimeout(()=>{
//     console.log(`Set Timeout is called ` );
// },0);

/*

const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');
const start = () => {
  console.log('start');
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve('bar');
  }).then((resolve) => {
    console.log(resolve);
    process.nextTick(zoo);
  });
  process.nextTick(foo);
};
start();

const startTime = process.hrtime();
setTimeout(() => {
    const end = process.hrtime(startTime);
    console.log(`end`, end);
    console.log(`timeout callback executed after ${end[0]}s and ${end[1]/Math.pow(10,9)}ms`);
}, 1000);

*/
/*
setImmediate(() => console.log('this is set immediate 1'));
setImmediate(() => console.log('this is set immediate 2'));
setImmediate(() => console.log('this is set immediate 3'));

setTimeout(() => console.log('this is set timeout 1'), 0);
setTimeout(() => {
    console.log('this is set timeout 2');
    process.nextTick(() => console.log('this is process.nextTick added inside setTimeout'));
}, 0);
setTimeout(() => console.log('this is set timeout 3'), 0);
setTimeout(() => console.log('this is set timeout 4'), 0);
setTimeout(() => console.log('this is set timeout 5'), 0);

process.nextTick(() => console.log('this is process.nextTick 1'));
process.nextTick(() => {
    process.nextTick(console.log.bind(console, 'this is the inner next tick inside next tick'));
});
process.nextTick(() => console.log('this is process.nextTick 2'));
process.nextTick(() => console.log('this is process.nextTick 3'));
process.nextTick(() => console.log('this is process.nextTick 4'));
*/