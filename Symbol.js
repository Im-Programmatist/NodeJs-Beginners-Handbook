/**
 * Symbol Data Type
 */
 const NAME = Symbol()
 const person = {
   [NAME]: 'Chetan Patil'
 }
 
 console.log(person[NAME]); // 'Chetan Patil'