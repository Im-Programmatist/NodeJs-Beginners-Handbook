//() - this is grouping operator 
/**
 * NodeJS does not run our code directly, it wraps the entire code inside a function before execution. 
 * This function is termed as Module Wrapper Function
  (function(exports, require, module, __filename, __dirname){

   })
*/

const name = "Chetan";
console.log(name);
export default name;

/*
above code is already wrapped in wrapper module in node js,
using this wrapped function we can easyily use the modules and keywords inside nodejs code
(function(exports, require, module, __filename, __dirname){
    const name = "vinod";
    console.log(name);
    export default name;
});
*/
/**
 * Every object and variable is private due to this wrapper function(IIFE - immediately invoking function expression)
 * We can not access any function or variable outside wrapper function
 * It helps to provide some global-looking variables that are actually specific to the module,
    means module, __fileanme, export looks like global scope variable but they are actually module specific
*/
(function(){
    const innerName = "Chetan Korde";
    console.log(innerName);
})
//console.log(innerName); //Error - ReferenceError: innerName is not defined
//console.log(arguments);