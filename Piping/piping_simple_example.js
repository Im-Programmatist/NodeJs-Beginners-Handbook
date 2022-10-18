import fs from 'fs';

// Create a readable stream
const readerStream = fs.createReadStream('./testPipe.txt','utf8');

// Create a writable stream
const writerStream = fs.createWriteStream('piping_output.txt');

// Pipe the read and write operations
// read input.txt and write data to output.txt
readerStream.pipe(writerStream);

console.log("Program Ended");