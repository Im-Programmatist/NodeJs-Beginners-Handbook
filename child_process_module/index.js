/**
 * Child_process - Multi Threading
 * Node.js works with single-threaded, non-blocking performance 
 * but working on single thread in a CPU(octa core or quad core) cannot handle increasing workload 
 * hence the child_process module can be used to create new child process from main process.
 * The child processes communicate with each other using a built-in messaging system.
 * This module also help in large computing process and 
 * Using this module we can get optimum use of CPU and get fast execution of task.
 * We must use child process for long computation task
 * This module also works to get system command like cmd/terminal
 * We can use different language module with node js like let result = cp.exec("php test.php"); 
 * we can run command in terminal/cmd using child process exec process
 */ 

/**
 * four different ways to create a child process in Node.js:
 * spawn() method - 
    Spwan run on same V8 engine on main thread/process is running but on separate process
    Spawn is made for huge data it streams the data not depend on buffer memory for printing/show data 
    Syntax - child_process.spawn(command[, args][, options])
    
 * fork() method - 
    special instance of spawn method, it create separate instance of V8 engine and run on separate thread of CPU
    Child processes are independent of the parent except the IPC communication channel established between them.
    Each process has its own memory, therefore invoking a large number of child processes can affect the performance of the application.
    The shell option is not supported by child_process.fork().
    Syntax - child_process.fork(modulePath[, args][, options])

 * exec() method - 
    This method creates a shell first and then executes the command.
    it uses buffer data to print data
    Syntax - child_process.exec(command[, options][, callback])

 * execFile() method - 
    child_process.execFile() function is does not spawn a shell by default. 
    It is slightly more efficient than exec() as the specified executable file is spawned directly as a new process.
    buffere memory used, we can set bigger buffer if buffer memory exceeded
    Syntax - child_process.execFile(file[, args][, options][, callback])

 * This process are useful for asyncronous processes/task so there is no meaning to use sync methods like - 
 * execSync
 * execFileSync
 * spawnSync
 
 * The ChildProcess instance implements EventEmitterAPI which enables us to register handlers 
 * for events on child object directly. Some events that can be registered for handling
 * with the ChildProcess are exit, disconnect, error, close and message.
*/

import cp, { spawn, execFile, exec } from "child_process";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

console.log(__dirname);
const a = cp.execSync("node ./abc.js");
console.log(a.toString());

/**
 * exec -
 */
exec('ls');//ubuntu
cp.exec('dir');//windows
exec('echo "the \\$HOME variable is $HOME"');
//cp.exec("start cmd");
exec('start cmd');
// Counts the number of directory in 
// current working directory
exec('dir | find /c /v ""', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: No. of directories = ${stdout}`);
    if (stderr!= "")
        console.error(`stderr: ${stderr}`);
});

// Executes the exec.js file
const childExeFile = execFile('node', ['exeFile.js'], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});
/*
cp.execFile("node ./test.js", {cwd: __dirname}, function(error,stdout,stderr){
    console.log(error,stdout,stderr);
});
*/ 

/**
 * Spawn
*/
const child = spawn('dir', ['G:\GitHub\NodeJs-Beginners-Handbook\child_process_module\test'], {shell: true});
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
  
child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
  
child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

/**
 * Fork 
*/
var childFork = cp.fork(__dirname + '/subFile_for_fork_inter_communication.js');
  
childFork.on('message', function(m) {
    console.log('Parent process received:', m);
});
  
childFork.send({ hello: 'from parent process' });
  
childFork.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

