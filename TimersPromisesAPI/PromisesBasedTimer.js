//https://www.stefanjudis.com/snippets/promises-based-timer-functions-are-supported-in-node-js-16/
//https://nodejs.org/docs/latest-v16.x/api/timers.html#timers_timers_promises_api

import { 
    setImmediate,
    setTimeout as setTimeoutPromise,
    //setInterval as setIntervalPromise
    //scheduler//experimental
} from 'timers-promises';

/*setImmediate*/
const resImmediate = await setImmediate('result');
console.log('Immediate - ',resImmediate);  // Prints 'result'

/*scheduler*/
//An experimental API defined by the Scheduling API
//await scheduler.wait(1000); // Wait one second before continuing

/*setInterval*/
const resInterval = await setImmediate('result');
console.log(`Interval - `, resInterval);
// const interval = 100;
// for await (const startTime of setIntervalPromise(interval, Date.now())) {
//   const now = Date.now();
//   console.log(now);
//   if ((now - startTime) > 1000)
//     break;
// }
// console.log(Date.now());

/*setTimeout*/
const callBack = (time) =>{
    return setTimeout(()=>{console.log(`timeout run after ${time}`);},time)
}
const sleep = (time) => {
return new Promise((resolve,reject) => {
    setTimeout(resolve, time);
});
}
const result = await sleep(5000);
//const result = await callBack(5000);
console.log('setTimeout');
console.log(result);
/**
 * @description avobe all code for settimeout can we written in one line using timer api
*/
const resSetTimeout = await setTimeoutPromise(100, 'result');
console.log(resSetTimeout);  // Prints 'result'

function myFunction(platform){
    console.log("Hi, Welcome to " + platform);
}

console.log("Before the setTimeout call");
let timerID = setTimeout(myFunction, 1000, "world");
console.log("After the setTimeout call");
