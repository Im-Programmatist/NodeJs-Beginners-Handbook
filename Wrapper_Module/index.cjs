//import Module from 'module';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

//Prints all path from this file to root directory in which this file is present 
// console.log("Require  - ", require); //can accessible as it is global 
// console.log("Module - ", module); //can accessible as it is global 
// console.log(exports, __filename, __dirname); //can accessible as it is global 
//here export is {} as nothing export now and filename and directory name  will display

let Module = require('module');
//Prints all builtinModules
console.log("Module - ", Module); //can accessible as it is global 

/**
 * Wrapper function used to make functions or features developed private and not visible outside
*/
//() - this is grouping operator 
/**
 * NodeJS does not run our code directly, it wraps the entire code inside a function before execution. 
 * This function is termed as Module Wrapper Function
 * Before a module’s code is executed, NodeJS wraps it with a function wrapper that has the following structure:
  (function(exports, require, module, __filename, __dirname){

   })
*/

/**
 * The top-level variables declared with var, const, or let are scoped to the module 
  rather than to the global object.
 * So by default variable scope is local in node js 
*/
const name = "Chetan";
console.log("name from index.cjs -",name);
//below export variable does not export the name , we can not access name in other file using below method
exports=name; //exports is available in global scope
//to export using simple keyword export use  ---> export['name'] = name or exports.name = name; 
console.log(exports); //now it will show the {name:'chetan'}

console.log(module.exports);//empty
module.exports['name'] = name; //or module.exports.name = name; or module.exports = {name: name}
console.log(module.exports);//now it will show the {name:'chetan'}
/*
above code is already wrapped in wrapper module in node js,
using this wrapped function we can easyily use the modules and keywords inside nodejs code
(function(exports, require, module, __filename, __dirname){
    const name = "vinod";
    console.log(name);
    export default name;
});
*/
console.log( __filename, __dirname);//can print without declaration because it is globally accessible
/**
 * Every object and variable is private due to this wrapper function(IIFE - immediately invoking function expression)
 * We can not access any function or variable outside wrapper function
 * It helps to provide some global-looking variables that are actually specific to the module,
    means module, __fileanme, export looks like global scope variable but they are actually module specific
*/
(function(args){
    console.log("argument for wrapper func - ",args);
    console.log(arguments);
    const innerName = "Patil";
    console.log(innerName);
})("firstArgument");//when we pass this backets to wrapper function it get invoked and print content in it else without it never get call 
//& console.log(innerName); //Error - ReferenceError: innerName is not defined

/*
Modifying Module Wrapper Function: Consider that we have two files, main.js and module.js. 
In main.js we overwrite the Module.wrap function in order to console.log(‘modifedMWF’); 
every time a module is required. 
Now if we require module.js, it contains a message to confirm whether our modifications are successful or not.
*/
require('./module.cjs');
(function (moduleWrapCopy) {
    console.log("Module.wrap -",moduleWrapCopy);
    Module.wrap = function (script) {
        script = "console.log('modifiedMWF');" + script;
        return moduleWrapCopy(script);
    };
})(Module.wrap);

//Or
// Module.wrap = (function (exports, require, module, __filename, __dirname) {
       // What you want the new wrapper to be.
//     return Module.wrapper[0] + exports + 'console.log("This is the wrapper.");' + Module.wrapper[1];
// });


require('./module2.cjs');