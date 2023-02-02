
import fs from 'fs';

// fs.readFile('./info.txt', 'utf8', (err, data)=>{
//     console.log('data1- ', data);
// });

new Promise(function prom(resolve,reject) {
    setTimeout(function settimeCallback_1(){
        resolve("resolved");
        console.log(`settimeout inside promise then`);
    },100);
    
}).then((res) => {
    console.log(`promise result - `, res);
    // fs.readFile('./info.txt', 'utf8', (err, data)=>{
    //     console.log('data2- ', data);
    // });
    // setImmediate(()=>{
    //     console.log(`setImmediate inside promise then`);
    // });
    setTimeout(function settimeCallback_2(){
        resolve("resolved");
        console.log(`settimeout inside promise then`);
    },0);
}).catch((err) => console.log(`err`, err));
