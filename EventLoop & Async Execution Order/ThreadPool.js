import  crypto  from 'crypto';
import os from 'os';
/**
 * Wehn we make max count above 4 then console in loop takes nearly double time to execute and crate hash 
 * this means thread pool has only 4 thread  
 * we can set thread pool thread number  using process.env.UV_THREADPOOL_SIZE
 * Increasing thread pool can help us with performance but limited by no of cpu cores available
*/
const maxCount = 16;
process.env.UV_THREADPOOL_SIZE = 16;
const start = Date.now();
for (let i = 0; i < maxCount; i++) {
    crypto.pbkdf2("password", "salt", 10000, 512, "sha512", () =>{
        console.log(`Hash - ${i+1}, ${Date.now()-start} `);
    })
}

const systemCpuCores = os.cpus();
console.log("system has -",systemCpuCores.length, " cores available ");
