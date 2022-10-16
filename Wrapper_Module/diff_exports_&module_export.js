/**
 * The module is a plain JavaScript Object representing the current module. 
 * It is local to each module and also it is private. 
 * It has exports property which is a plain JavaScript variable, set to module.exports
 * 
 * When we want to export a single class/variable/function from one module to another module, we use module.exports.
 * 
 * When we want to export multiple variables/functions from one module to another, we use exports.
*/

//We can change name of export 
import Calculators from './module-export.cjs';
//name of export must be same
import  {addition, subtract, multiply, divide}  from './exports.cjs'; 

import bothExp from './bothExportInSameFile.cjs';
console.log(bothExp);
//console.log(bothExp.p);
console.log(bothExp.print());

const op = new Calculators(100,50);
 
console.log(`Addition -> ${op.add()}`);
console.log(`subtraction -> ${op.sub ()}`);
console.log(`Multiplication -> ${op.mul()}`);
console.log(`Division -> ${op.div()}`);

console.log(`Addition -> ${addition(200,40)}`);
console.log(`subtraction -> ${subtract(200,40)}`);
console.log(`Multiplication -> ${multiply(200,40)}`);
console.log(`Division -> ${divide(200,40)}`);