/**
 * The URL module of Node.js provides various utilities for URL resolution and parsing. 
 * It is a built-in module that helps in splitting up the web address into a readable format:
 * var url = require('url');
*/
import url from 'url';
var adrs = 'http://localhost:5000/test.htm?year=2019&month=august#aboutpage';
var q = url.parse(adrs, true);
console.log(q.host); //returns 'localhost:5000'
console.log(q.pathname); //returns '/test.htm'
console.log(q.search); //returns '?year=2019&amp;amp;month=august'
console.log(q.hash);
var qdata = q.query; 
console.log(qdata); //returns an object: { year: 2019, month: 'august' }
console.log(qdata.month); //returns 'august'

const pathname = '/a/b/c';
const search = '?d=e';
const hash = '#fgh';
const myURL = new URL(`https://example.org${pathname}${search}${hash}`);

console.log(`URL Object Prints as - ${myURL}`);
/*
ABove console prints the URL Object -
URL {
  href: 'https://example.org/a/b/c?d=e#fgh',
  origin: 'https://example.org',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'example.org',
  hostname: 'example.org',
  port: '',
  pathname: '/a/b/c',
  search: '?d=e',
  searchParams: URLSearchParams { 'd' => 'e' },
  hash: '#fgh'
}
*/

console.log(`redirectional clickable link - ${myURL.href}`);
/*THis will print the url with redirectional link*/