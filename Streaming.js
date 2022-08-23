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

const server = http.createServer();

server.on('request', (req, res)=>{
    //way 1 - simple file read ---
    fs.readFile("info.txt",(err,data) => {
        if(err) return console.log(err);
        res.end(data.toString());
    });    
});
server.on('request_stream_read', (req, res)=>{
    //way 2 - streaming ---
    const fsStream = fs.createReadStream("info.txt"); //read
    fsStream.on('data', (chunckData) =>{
        res.write(chunckData);//write
    }); 
    fsStream.on('end', () =>{
        res.end();
    }); 
    fsStream.on('error', (err) =>{
        console.log("error is : - ", err);
        res.end("File not found!");
    });  
});
server.on('request_pipe_stream', (req, res)=>{
    //way 3 - piping ---
    const fsStream = fs.createReadStream("info.txt");
    fsStream.pipe(res); //continuesly read and write - Duplex streaming
});
server.listen(5000,(err)=>{
    if(err) throw err;
    console.log("server start at..localhost:5000");
});

const stdin = process.stdin.on('data', msg => console.log('cli input - ', msg))
//const stdin = process.stdin
//const stdout = process.stdout.on('data',msg => process.stdout.write(msg.toString().toUpperCase()));
const stdout = process.stdout.write("crypto.randomBytes()")
//stdin.pipe(stdout);
