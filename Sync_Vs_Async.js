import file, { readFileSync, readFile } from 'fs';
   
const filepath = 'hello.txt';
  
/**
 * Blocking: It refers to the blocking of further operation until the current operation finishes. 
 * Blocking methods are executed synchronously. Synchronously means that the program is executed line by line. 
 * The program waits until the called function or the operation returns.
*/
// Reads a file in a synchronous and blocking way 
const data = readFileSync(filepath, {encoding: 'utf8'});
// Prints the content of file
console.log(data);

/**
 * Non-Blocking: It refers to the program that does not block the execution of further operations. 
 * Non-Blocking methods are executed asynchronously. 
 * Asynchronously means that the program may not necessarily execute line by line. 
 * The program calls the function and move to the next operation and does not wait for it to return.
*/
// Reads a file in a asynchronous and non-blocking way 
readFile(filepath, {encoding: 'utf8'}, (err, data) => {
    // Prints the content of file
    console.log(data);
});

// This section calculates the sum of numbers from 1 to 10
let sum = 0;
for(let i=1; i<=10; i++){
    sum = sum + i;
} 
// Prints the sum after the sync method and before the async method of file read
console.log('Sum: ', sum);

//use utf8 read file in human readable format not in buffer
const fsStream = file.createReadStream("hello.txt", 'utf8'); 
fsStream.on('data', (chunckData) =>{
    console.log(`File read by create read stream - ${chunckData}`);//write
}); 