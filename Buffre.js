/**
 * Buffer Data Type
 */
 let b = new Buffer(10000);
 let str = "----------";
 
 b.write(str); 
 console.log( str.length ); // 10
 console.log( b.length ); // 10000

 console.log(exports, __filename, __dirname);