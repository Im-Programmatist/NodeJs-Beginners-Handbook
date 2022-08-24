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
/**
 * Child Process Handler can emit events -
 * Disconnect - event is emitted when the parent process manually calls the child.disconnect function.
 * Error event - is emitted if the process could not be spawned or killed.
 * Close event - is emitted when the stdio streams of a child process get closed.
 * Message event - is the most important one. It’s emitted when the child process uses the process.send() function to send messages. 
   This is how parent/child processes can communicate with each other. We’ll see an example of this below.
*/
/**
 * Every child process also gets the three standard stdio streams, 
 * which we can access using child.stdin, child.stdout, and child.stderr.
 */

/**
 * Difference in close and exit event --
 * We know every child process use stdio stream and when those streams get closed, 
 * the child process that was using them will emit the close event. 
 * This means 'close' event closes complete io stream.
 * Where as, multiple child processes may share same stdio streams and 
 * so one child process exiting does not mean that the streams got closed
 * Means, 'exit' is for single child process. 
 */

/**
 * Pipe -
 * a pipe is a connection between two processes,in a way that standard output from one process 
   will becomes the standard input of the other process. 
 * Pipe is one-way communication only i.e pipe used such that One process write to the pipe, 
   and the other process reads from the pipe. 
 * It opens a pipe, which is an area of main memory that is treated as a “virtual file”.
*/

import cp, { spawn, execFile, exec } from "child_process";
import file from "fs"; 
import readLine from 'readline';
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
const execChild = cp.exec('dir');//windows // exec('ls');//ubuntu
const execChild2 = exec('echo "the \\$HOME variable is $HOME"');
//cp.exec("start cmd");
exec('start cmd');
execChild.stdout.pipe(process.stdout)
// Counts the number of directory in 
// current working directory
exec('dir | find /c /v ""', (error, stdout, stderr) => {
    if (error) {
        console.error(`\n Exec error: ${error}`);
        return;
    }
    console.log(`\n Exec stdout: No. of directories = ${stdout}`);
    if (stderr!= "")
        console.error(`\n Exec stderr: ${stderr}`);
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
//find command on the current directory with a -type f argument (to list files only)
const childSpawn = spawn('find', ['.', '-type', 'f']);
childSpawn.stderr.on('data', (data) => {
    console.error(`\n Spawn stderr: ${data}`);
});
childSpawn.stdout.on('data', (data) => {
    console.error(`\n Spawn stdout: ${data}`);
});

const childSpawn1 = spawn('pwd',{shell: true});
childSpawn1.stdout.on('data', (data) => {
    console.error(`\n childSpawn1 Spawn stdout: ${data}`);
});

const childSpawn2 = spawn('dir', ['G:\GitHub\NodeJs-Beginners-Handbook\child_process_module\test'], {shell: true});
childSpawn2.stdout.on('data', (data) => {
  console.log(`\n childSpawn2 Spawn stdout: ${data}`);
});
  
childSpawn2.stderr.on('data', (data) => {
  console.error(`\n childSpawn2 Spawn stderr: ${data}`);
});
  
childSpawn2.on('close', (code, signal) => {
    //This signal variable is null when the child process exits normally.
    console.log('\n childSpawn2 Spawn child process exited with ' + `code ${code} and signal ${signal}`);
});

const testSpawn = spawn("node", ['test.js']);
testSpawn.stdout.pipe(process.stdout);

/**
 * Fork 
*/
var childFork = cp.fork(__dirname + '/subFile_for_fork_inter_communication.js');

childFork.on('message', function(m) {
    console.log('\n Parent process received:', m);
});
  
childFork.send({ hello: 'from parent process' });
  
childFork.on('close', (code) => {
    console.log(`\n Fork child process exited with code ${code}`);
});

childFork.on('exit', (code) => {
    console.log(`\n Fork child process exited with code ${code}`);
});

console.log("\n Fork Child Process PID - ", childFork.pid);
console.log("\n Fork Child Process Channel - ", childFork.channel);
console.log("\n Fork Child Process Connected - ", childFork.connected);
//console.log("Fork Child Process Kill - ", childFork.kill());

