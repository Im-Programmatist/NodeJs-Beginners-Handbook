import cp, { spawn, execFile, exec, fork } from "child_process";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const child = fork("forkChild.js", {cwd:__dirname});
child.on("exit", ()=>{
    console.log("fork child process terminated with exit method by parent");
});

var interval = setInterval(()=>{
    child.send({name:"chetan",age: 25,city:"Amravati", time: new Date().getSeconds()})
}, 1000);

child.on("message", (child_data)=>{
    console.log("data from child to parent is - ", child_data);
})

setTimeout(()=>{
    clearInterval(interval);
    child.kill(); //if we not kill process it still exists in terminal and listen to child, not terminate
},5000);