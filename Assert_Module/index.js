import assert, { strict } from 'assert';

/**
 * The assert module provides a way of testing expressions. 
 * If the expression evaluates to 0, or false, an assertion failure is being caused, and the program is terminated.
 * If the condition is true it will output nothing else an assertion error is given by the console
*/
//assert(5 > 7);

//strict.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);

assert.equal(50, 50); //OK
assert.equal(50, "50"); //OK
assert.equal(50, 70, "My message goes here"); //assert error

assert.ok(50 > 70, "My message goes here");
//The assert.ok() method also throws an error if the expression evaluates to 0
assert.ok(50 - 50);

let x = 4;
let y = 5;
try {
    // Checking condition
    assert(x == y);
}
catch {
    // Error output
    console.log(`${x} is not equal to ${y}`);
}

function expression (a, b, c) {  
    return (a + b) - c;  
  } 
// Calling the function
var output = expression (1,2,1);  
assert( output === 3, '(1 + 2) - 1 = 2');//assert error occurred as assert condition false