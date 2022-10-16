import process from 'node:process';

/**
 * The process object is an instance of EventEmitter.
 * The 'beforeExit' event is emitted when Node.js empties its event loop and has no additional work to schedule.
 * If the Node.js process is spawned with an IPC channel, the 'disconnect' event will be emitted when the IPC channel is closed.
 * The 'exit' event is emitted when the Node.js process is about to exit as a result of either:
    The process.exit() method being called explicitly;
    The Node.js event loop no longer having any additional work to perform.
 * the 'message' event is emitted whenever a message sent by a parent process or child process.
 * The 'multipleResolves' event is emitted whenever a Promise has been either:
    Resolved more than once.
    Rejected more than once.
    Rejected after resolve.
    Resolved after reject.
*/
/**
 * Key Point ---->
 * What ever inside process module will run after all the code which is outside it.
 * process code run once event loop and call stack get empty
*/

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');

process.on('multipleResolves', (type, promise, reason) => {
    console.error("\n multipleResolves ---> ",type, promise, reason);
    setImmediate(() => process.exit(1));
});

async function main() {
    try {
        return await new Promise((resolve, reject) => {
            resolve('Second resolve');
            resolve('First call');
            reject(new Error('Third call failed and reject'));
        });
    } catch {
        throw new Error('Failed');
    }
}

main().then(console.log);

/**
 * By default, Node.js will print process warnings to stderr. 
 * The --no-warnings command-line option can be used to suppress the default console output 
 * but the 'warning' event will still be emitted by the process object.
*/
process.on('warning', (warning) => {
    console.warn(warning.name);    // Print the warning name
    console.warn(warning.message); // Print the warning message
    console.warn(warning.stack);   // Print the stack trace
});