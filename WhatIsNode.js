
/*It's important to understand that Node.js isn't a programming language, but a run time environment 
of a programming language. Node.js is a server-side,
packaged software that contains predefined processes to accomplish specific tasks. */

/*
Node.js is built on the V8 JavaScript engine, which is used to compile and execute JavaScript source code. So when you execute a JS script using Node.js, that code is initially passed to the V8 JavaScript engine. The V8 JavaScript engine then compiles the script and passes the result of the compilation back to Node.js where it can be used in the application.

Node.js employs a non-blocking I/O module. This critical feature is one of the reasons for the technology’s popularity. Node.js being non-blocking means that while an I/O operation is being executed, access is still granted to other aspects of the application currently carrying out this I/O operation. consider the example of using a database with a web application. If a user wanted to retrieve extensive data from this database (a process that's going to take some time) every other feature on this application (like clicking a random button) would be disabled until the I/O operation is completed if Node.js wasn't using a non-blocking I/O module.

Non-blocking I/o: Non-blocking i/o  means working with multiple requests without blocking the thread for a single request. I/O basically interacts with external systems such as files, databases. Node.js is not used for CPU-intensive work means for calculations, video processing because a single thread cannot handle the CPU works.

Asynchronous: Asynchronous is executing a callback function. The moment we get the response from the other server or database it will execute a callback function. Callback functions are called as soon as some work is finished and this is because the node.js uses an event-driven architecture.
*/

/*
TO learn Node js In depth must have to learn JavaScript first.
Node is written in JavaScript, so you should start by learning JavaScript. 
Recommend you to have a good grasp of the main JavaScript concepts before diving into Node.js:

Lexical Structure
Expressions
Types
Classes
Module patterns 
Variables
Functions
this
Arrow Functions
Loops
Scopes
Arrays
Objects
Sets
Map
Template Literals
Semicolons
Strict Mode
ECMAScript 6, 2016, 2017
callbacks
Asynchronous programming and callbacks
Timers
Promises
Async and Await
Closures
The Event Loop

*/
