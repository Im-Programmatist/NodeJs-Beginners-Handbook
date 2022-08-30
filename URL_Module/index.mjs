/**
 * The URL module of Node.js provides various utilities for URL resolution and parsing. 
 * It is a built-in module that helps in splitting up the web address into a readable format:
 * var url = require('url');
*/
import url from 'url';
var adrs = 'http://localhost:5000/test.htm?year=2019&month=august';
var q = url.parse(adrs, true);
console.log(q.host); //returns 'localhost:5000'
console.log(q.pathname); //returns '/test.htm'
console.log(q.search); //returns '?year=2019&amp;amp;month=august'
var qdata = q.query; 
console.log(qdata); //returns an object: { year: 2019, month: 'august' }
console.log(qdata.month); //returns 'august'
