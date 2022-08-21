import util from "util";
// Importing http module
import http from "http";

/**
 * Util module provides functions to print formatted strings or numbers 
 * Some functions that are helpful for debugging purposes
*/
/**
 * The util.format() is used to create formatted string or number from one or more arguments.
 * d for num,bers and floats, s for string , % for single return, j for json data
 */
let age = 5;
let name = "Chetan"
var sub = { subj1: 'English', subj2: 'Math.'}; 
var format1 = util.format('My name is %s ',name);
var format2 = util.format('I read in class %d,',age);
var format3 = util.format('My favorite subjects are %j',sub);
console.log(format1);
console.log(format2);
console.log(format3);

var demoTxt = 'Congratulate %s on his %dth birthday!';
var result = util.format(demoTxt, 'Chetan', 29);
console.log(result);
/**
 * The util.inspect() method is an inbuilt application programming interface of the util module 
 * which is intended for debugging and returns a string representation of the object.
*/

// Inspecting http module
console.log("1. http >", util.inspect(http, {
    showHidden: false,
    depth: 0, showProxy: false
}));
  
// Inspecting console module
console.log("2.Console ->", util.inspect(
    console, 
    {
        showHidden: false,
        depth: 0, 
        color:true,
        showProxy: true        
    })
);
console.trace(util.inspect(
    console, 
    {
        showHidden: false,
        depth: 0, 
        color:true,
        showProxy: true        
    }));
console.log(" inspecting all properties of the util object : ",util.inspect(util, { showHidden: true, depth: null }));

// Creating array filled with default value 1
const inspectArray = Array(109).fill(1);
  
// Prints the truncated array
console.log("3.>", inspectArray);
util.inspect.defaultOptions.maxArrayLength = null;
  
// Prints the full array
console.log("4.>", inspectArray);


/**
 * util.debug(string)
 * used to block the process and output string immediately to stderr.
*/
var testString = "Test Test";
util.debug(testString); // "Test Test";
 
var test = {};
util.debug(test); // "[object Object]";
util.debug(JSON.stringify(test)); // "{}"

/**
 * util.error([...])
 * function accepts multiple arguments and writes them out to stderr.
*/
//util.error("Error-1","Error-2","Error-3");

/**
 * util.puts([...])
 * The function accepts multiple arguments and writes them out to stderr with newlines after each argument.
*/
//util.puts("A", "B","C");

/**
 * util.print([...])
 * The function accepts multiple arguments, converts each one to a string and then writes them out to stdout 
 * without adding a new line after each argument.
*/
//util.print(1, 2, '3');

/** 
 * util.log(string)
 * The function is used to write the string out to stdout, with timestamp.
*/
util.log('Timestamped message.');

util.types.isDate(new Date());

const map = new Map();
util.types.isMapIterator(map.keys());  // Returns true
util.types.isMapIterator(map.values());  // Returns true
util.types.isMapIterator(map.entries());  // Returns true
util.types.isMapIterator(map[Symbol.iterator]());  // Returns true

util.types.isInt16Array(new ArrayBuffer());  // Returns false
util.types.isInt16Array(new Int16Array());  // Returns true
util.types.isInt16Array(new Float64Array());  // Returns false