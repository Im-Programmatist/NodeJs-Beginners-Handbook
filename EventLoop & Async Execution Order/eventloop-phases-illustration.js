//This program explain the phases of event loop
/**
 * timers 
 * pending callbacks 
 * ideal, prepare - node js working phase
 * poll ---> continuously check incoming connection & network request, IO output/operations result
 * check---> it checks for setImmediate
 * close callbacks 
*/
import fs from 'fs';

process.nextTick(()=>{
   console.log('This is a process.next tick method callback - 1st'); 
});

setTimeout(() => {
    console.log('This is a setTimeout callback method - 1000 timer');
}, 1000);

setImmediate(() => {
    console.log('This is a setImmediate callback method - 5000 timer');
}, 5000);

setTimeout(() => {
    console.log('This is a setTimeout callback method with - 0 timer outer');
}, 0);

//I/o Operation
fs.readFile('hello.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Success');
        console.log('data is -', data);
        //here in this io callback even we mention settimeout with 0 timer, set immediate will run first as 
        //after polling it will check for immediate
        setTimeout(() => {
            console.log('this is settimeout with zero timer');
            console.trace();
        }, 0);
        setImmediate(() => {
            console.log('this is setImmediate with 500 msec timer');
        }, 500);
    }
});

process.nextTick(()=>{
    console.log('This is a process.next tick method callback-2nd'); 
});

//Promise.reject('Promise rejected!')
Promise.resolve('promise resolved!')
.then((res)=>{console.log('This is ', res);}) //for resolve, this will run 
.catch((err)=>{console.log('catch',err);}) //for Reject, this will run 
