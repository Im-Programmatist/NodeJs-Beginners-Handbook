import cp, { spawn, execFile, exec } from "child_process";

/*
The exec function buffers the output and passes it to the callback function (the second argument to exec) 
as the stdout argument there. This stdout argument is the command’s output that we want to print out.
*/

exec('find . -type f | wc -l', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
  
    console.log(`Number of files ${stdout}`);
});