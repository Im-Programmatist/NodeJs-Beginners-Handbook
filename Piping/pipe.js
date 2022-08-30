
import file from "fs";
import zlib from "node:zlib";
import http from "http";
import crypto from "crypto";
import cp, { spawn, execFile, exec } from "child_process";
import path from 'path';
import { fileURLToPath } from 'url';
import readLine from 'readline';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
/**
 * Pipe -
 * a pipe is a connection between two processes,in a way that standard output from one process 
   will becomes the standard input of the other process. 
 * Pipe is one-way communication only i.e pipe used such that One process write to the pipe, 
   and the other process reads from the pipe. 
 * It opens a pipe, which is an area of main memory that is treated as a “virtual file”.
*/
/**
 * stream.pipe() - method used to take readable stream and connect it to a writable stream.
*/

//print this file data in stream - all content in this file will print
//file.createReadStream(__filename).pipe(process.stdout);
 var args = [ 'pipeTest.js'];
 var childPipe = spawn('node', args, {shell: true, stdio: 'pipe'});
//  childPipe.stdout.on("data", (message)=>{
//      console.log("childPipe stdout: " + message);
//  });
childPipe.stdout.on("data", (message)=>{
    console.log("message childPipe -->",message.toString());
    const wStream = file.createWriteStream("pipeWriteStreamFile.txt", {flags: 'w', encoding: 'utf-8'});
    wStream.on('error', function(e) { console.error(e); });
	wStream.write(message);
    wStream.end();
});
childPipe.on('exit', function () { 
	console.log("childPipe ends....");
});

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

var inp = file.createReadStream('info.txt');
var out = file.createWriteStream("pipeWStream" + '.gz');
var gzip = zlib.createGzip();
var zipStream = inp.pipe(gzip).pipe(out);
zipStream.on('finish', function () { 
	console.log("zip ends....");
});

const server = http.createServer();
server.on('/test', (req, res)=>{
   res.send({name:"chetan", message:"request success"});
});
server.on('pipe_stream', (req, res)=>{
    //way 3 - piping ---
    const fsStream = file.createReadStream("./info.txt");
    fsStream.pipe(res); //continuesly read and write - Duplex streaming
	fsStream.on('finish', function () {
        console.log("pipe_stream ends....");
    });
});
server.listen(2021,(err)=>{
    if(err) throw err;
    console.log("server start at..localhost:2021");
});

const stdin = process.stdin.on('data', msg => console.log('cli input - ', msg))
//const stdin = process.stdin
//const stdout = process.stdout.on('data',msg => process.stdout.write(msg.toString().toUpperCase()));
// const stdout = process.stdout.write(crypto.randomBytes());
// stdin.pipe(stdout);

var myREPL = cp.spawn('cmd.exe',['args'],{shell:true});
process.stdin.resume();
process.stdin.pipe(process.stdout,{end:false});
myREPL.stdin.on('data',msg => process.stdin.write('REPL stream end'));
myREPL.on('data',code => process.exit(code));

myREPL.stderr.on('data',err => console.log(err));
myREPL.stdout.on('data',(data) =>{
    console.log("STDOUT ---");
    console.log("*********************");
    console.log(" "+data); //prints initial content of cmd which come usually open cmd
    console.log('===========================');
});

myREPL.on("exit",  (code, signal)=>console.log(`myrepl end and code ${code} and signal is ${signal}`));
myREPL.on("close",  (code, signal)=>console.log(`myrepl end and code %s and signal is %s `,code,signal));
console.log("\n myREPL Process PID - ", myREPL.pid);
console.log("\n myREPL Process Channel - ", myREPL.channel);
console.log("\n myREPL Process Connected - ", myREPL.connected);