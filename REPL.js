/*
Read − Reads user's input, parses the input into JavaScript data-structure, and stores in memory.

Eval − Takes and evaluates the data structure.

Print − Prints the result.

Loop − Loops the above command until the user presses ctrl-c twice.

Uses - Tio experiment node js code and debuge js code, 
- it is like node js cmd(windows), you put command in it it read's it evaluate it and print result. 
- It is same as console in browser inspect where we can put js code and run it and test it.


The Node.js Read-Eval-Print-Loop (REPL) is an interactive shell that processes Node.js expressions. 
The shell reads JavaScript code the user enters, 
evaluates the result of interpreting the line of code, 
prints the result to the user, 
and loops until the user signals to quit.

The REPL is bundled with every Node.js installation and allows you to quickly test and explore JavaScript 
code within the Node environment without having to store it in a file.
*/
/**
 * just write node and enter i n terminal - we will enter in REPL environment
 * .help - provide commands
 * We can run -
 * 1. js expression - 3+3 =6 ,a = 10 console.log(a);//10
 * 2. Multiline Code - we want to put do-while loop for that initial cond  var x = 0;
 * we enter do and press enter then repl automatically allow you to write other mutiple lines 
 * 3. _ underscore gives the last result value. suppose first 6 entered then - _+10 =16 
*/
/**
 * .break: When in the process of inputting a multi-line expression, enter the .break command (or press Ctrl+C) to abort further input or processing of that expression.
 * .clear: Resets the REPL context to an empty object and clears any multi-line expression being input.
 * .exit: Close the I/O stream, causing the REPL to exit.
 * .help: Show this list of special commands.
 * .save: Save the current REPL session to a file: > .save ./file/to/save.js
 * .load: Load a file into the current REPL session. > .load ./file/to/load.js
 * .editor: Enter editor mode (Ctrl+D to finish, Ctrl+C to cancel).
 */
