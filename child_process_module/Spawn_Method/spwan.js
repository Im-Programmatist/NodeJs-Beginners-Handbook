import cp, { spawn, execFile, exec } from "child_process";
import path from 'path';
import { fileURLToPath } from 'url';
import file from "fs"; 
import readLine from 'readline';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

/*
By default, the spawn function does not create a shell to execute the command we pass into it. 
This makes it slightly more efficient than the exec function, which does create a shell. 
*/
/*
The spawn function is a much better choice when the size of the data expected from the command is large, 
because that data will be streamed with the standard IO objects.(not use buffer)
*/
/*
spawned child process inherit the standard IO objects of its parents if we want to
we can make the spawn function use the shell syntax as well
Shell - boolean value , if true run command inside shell
uid - user identity of process
gid- group identity of process
detached - boolean , make child process independent of it's parent
stdio- child stdio configuration ,pipe,ignore or inherit(all about stream getting for output, inherit means from pararent)
stdio:['ignore',outputFile, err] - we can set array value for stdio and  first element for stdin, second for stdout, third for stderr
env - environement key-value paire
cwd - current working directory of child process
*/

/**
 * 
*/
const child1 = spawn('dir', {
    stdio: 'inherit', //once we set standard input output as inherit from parent then we can not stream/stdout data in child process 
    shell: true, //run command in shell
    cwd: __dirname//setting current working directiory for child process
});
//as stdio inherits from paraent , data can be stream out on parent stream not child
//child1.stdout.on("data", (data)=> console.log(data)); //this will give an error 

/**
 * stdout will also give error if we set stdio to ignore mode, we c=are not interested in listening data 
 * so by placing stdout in code it will leads to error
*/

/**
 * If the unref function is called on the detached process, the parent process can exit independently of the child. 
 * This can be useful if the child is executing a long-running process, 
 * but to keep it running in the background the child’s stdio configurations also have to be independent of the parent.
 */
let out_file_detach = __dirname+"/out_detach.txt";
console.log(out_file_detach);
let outputFileDetach = file.openSync(out_file_detach, "a");
let err_file_detach = __dirname+"/error_log_detach.txt";
console.log(err_file_detach);
let errdetach = file.openSync(err_file_detach, "a");
var arg = __dirname+'/detachTest.js';
console.log("arg - ",arg);
process.stdout;
const child2 = spawn('node',[arg], {
    detached: true,//detached child process from parent no stream communication with parent
    shell:true,
    //stdio: 'ignore',
    stdio: 'pipe' //this is default value for stdio of child process, 
    //but inherit and pipe can not in use  in detached mode
    //stdio:["ignore",outputFileDetach,errdetach]
});
//here we can not listen data as child is detached so to check wheather the child is run and execute or not
//put stdio stdout and stderr in file

child2.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

child2.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

child2.stderr.on('error', (data) => {
    console.error(`error: ${data}`);
});

child2.on('close', (code) => {
    console.log(`child2 process exited with code ${code}`);
});

/**
 * By default, the parent will wait for the detached child to exit. 
 * To avoid parent from waiting for a given child process which is detached,
 * we must use unref() method
 * By doing so, will cause the parent's event loop to not include the child in its reference count, 
 * allowing the parent to exit independently of the child, 
 * unless there is an established IPC channel between the child and parent.
*/
child2.unref();

const child3 = cp.spawn('./dir.sh',[],{cwd:__dirname,shell:true, });
child3.stdout.on('data', (data) =>  console.log(data)); 

let program = 'dir';
let err_file_path = __dirname+"/error_log.txt";
let err = file.openSync(__dirname+"/error_log.txt", "a");
//asc file not found error
let child4 = cp.spawn(program, ["-a","asc"],{shell:true, stdio:['ignore','inherit', err]}); 
//store output in file
let out_file_path = __dirname+"/out.txt";
let outputFile = file.openSync(out_file_path, "a");
let child5 = cp.spawn(program, ["/"],{shell:true, stdio:['ignore',outputFile, err]}); 
// child4.stdin.on('data', (data) => console.log("data -"+data)); //error as stdin is ignore
// child4.stdout.on('data', (data) => console.log("data -"+data)); //error as stdout is inherit
// for stderr we will make error_log file
