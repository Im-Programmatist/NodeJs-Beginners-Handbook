import cluster from 'cluster';
import http from 'http';
import numCPUs from 'os';
import fork from 'child_process';
import path  from 'path';

const program = path.resolve('program.js');
const parameters = [];
const options = {
    stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
};

const child = fork(program, parameters, options);
console.log("child - ", child);
//Number of cpu - 
console.log(numCPUs.cpus().length);

if (cluster.isMaster) {
    // Fork workers.
    // init cluster
    numCPUs.cpus().forEach(() => {
        cluster.fork();
    });
    /* for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }*/

    // add eventlisteners
    Object.values(cluster.workers).forEach(worker => {
        worker.on('message', message => {
            console.log("message : ",message);
        });
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} 
else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(8000);
}