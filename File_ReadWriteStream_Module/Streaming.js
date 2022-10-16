/**
 * used in broadcasting to streaming the match, video and movies on streaming platform
 * chunck by chunck data streaming 
 * Readable, writable, duplex(both read and write), transform - type of duplex where output compute based on input
 * Each type of stream is an EventEmiter instance and throw several event at different instance of times.
 * Streaming events -
 * 1. data - event fired when data is available to read.
 * 2. end - event fired when there is no more data to read 
 * 3. error - when error received this event get fire.
 * 4. finish - all data in i=underlying system has been flushed. then this get fire.
*/

import fs from "fs";
import http from "http";
import crypto from "crypto";
import path  from 'path';
import { fileURLToPath } from 'url';

// The Transform abstract class is missing in node version less than 0.10 .
import stream from 'stream';//works for greater version 0.10
/**
 * Polyfill implementation : -
 * Lesser version of node uses the Transform code block using  readable-streams polyfill 
 * If the Node.js version is > 0.10 the program uses the abstract class, and if not, it uses the polyfill - import ('readable-stream').Transform.
 */
const Transform = stream.Transform || import ('readable-stream').Transform;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer();

// server.on('request', (req, res)=>{
//     //way 1 - simple file read ---
//     fs.readFile("info.txt",(err,data) => {
//         if(err) return console.log(err);
//         res.end(data.toString());
//     });    
// });
// server.on('request_stream_read', (req, res)=>{
//     //way 2 - streaming ---
//     const fsStream = fs.createReadStream("info.txt"); //read
//     fsStream.on('data', (chunckData) =>{
//         res.write(chunckData);//write
//     }); 
//     fsStream.on('end', () =>{
//         res.end();
//     }); 
//     fsStream.on('error', (err) =>{
//         console.log("error is : - ", err);
//         res.end("File not found!");
//     });  
// });
// server.on('request_pipe_stream', (req, res)=>{
//     //way 3 - piping ---
//     const fsStream = fs.createReadStream("info.txt");
//     fsStream.pipe(res); //continuesly read and write - Duplex streaming
// });
// server.listen(5000,(err)=>{
//     if(err) throw err;
//     console.log("server start at..localhost:5000");
// });

const stdin = process.stdin.on('data', msg => console.log('cli input - ', msg))
//const stdin = process.stdin
//const stdout = process.stdout.on('data',msg => process.stdout.write(msg.toString().toUpperCase()));
const stdout = process.stdout.write("crypto.randomBytes()")
//stdin.pipe(stdout);


//Read from one file and write in other- make copy of reading file
const readableStream = fs.createReadStream('./File_ReadWriteStream_Module/hello.txt', 'utf8');
const writableStream = fs.createWriteStream('./File_ReadWriteStream_Module/hello-copy.txt');
readableStream.on('data', (chunk) => {
    writableStream.write(chunk);
    writableStream.end();
});

//Reversing the File content using transform
//./File_ReadWriteStream_Module/hello.txt
const filePath =  path.join(__dirname, './hello.txt');
console.log("FIle Path is ",filePath);
const readStream = fs.createReadStream(filePath);
const reversedDataFilePath = filePath.split('.')[0] + '-reversed.'+ filePath.split('.')[1];
const writeStream = fs.createWriteStream(reversedDataFilePath);

const reverseStream = new Transform({
    transform (data, encoding, callback) {
        const reversedData = data.toString().split("").reverse().join("");
        this.push(reversedData);
        callback();
    }
});

readStream.pipe(reverseStream).pipe(writeStream).on('finish', () => {
    console.log(`Finished reversing the contents of ${filePath} and saving the output to ${reversedDataFilePath}.`);
});
writeStream.on("exit", () => {
    console.log("write stream finished");
    writableStream.end()
});