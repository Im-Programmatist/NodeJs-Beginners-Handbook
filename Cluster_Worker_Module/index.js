/**
 * Clusters used to distribute workloads among their application threads
 * Clusters of Node.js processes can be used to run multiple instances of Node.js 
 * to distribute workloads among their application threads. 
 * When process isolation is not needed, use the worker_threads module
 * which allows running multiple application threads within a single Node.js instance.
 * 
 * The Node. js Cluster module enables the creation of child processes (workers) 
 * that run simultaneously and share the same server port. 
 * Each spawned(fork) child has its own event loop, memory, and V8 instance. 
 * The child processes use IPC (Inter-process communication) to communicate with the parent Node.
 * 
 * NODE VS CLUSTER
 * Node is a single system which is responsible to store and process data. 
 * Whereas Cluster is a collection of multiple nodes which communicates with each other to perform set of operation
 * 
 * Cluster is use for SCALING NODE SERVER - SCALABILITY Achieve by using clustering
*/

import express from "express";
import cluster from "cluster";
import os from "os";

const noOfCPU = os.cpus().length;

const app = express();
app.get('/', (req,res)=>{
    for(let i=0; i<1e8; i++) {  }
    res.send({noOfCPUs:noOfCPU, name:"chetan", pid:process.pid});
    cluster.worker.kill(); //kill worker after every request then on exit event create new one
});

if(cluster.isMaster){
    for(let i=0; i<noOfCPU; i++) {
        cluster.fork();
    }
    //listen event on cluster
    cluster.on('exit', function(worker, code, signal) {
        console.log("worker die with pid: %s, code: %s and signal: %s ",  worker.process.pid,code,signal);
        cluster.fork(); //create new worker if previous worker died
    });
}else{
    //all child process use same for, this is the advantage of cluster instances
    //cluster module use round robin method to handle the request  among all processes on cpu
    app.listen("4000",(err)=>console.log(`Server run at localhost://4000 & child process id is PID - ${process.pid}`));
}
/*Using above fork method and clustering we can ahndle request fast in minimum time - else we will get more time*/
//above code will give result in 32 sec in loadtest

//if we run single process normaly then we will get more time as compaire to 1000 request  --(using intensive work - for loop of 10 power 8 )
//below single app runnig will give 48 sec --(using intensive work - for loop of 10 power 8 )
//app.listen("3000",(err)=>console.log(`Server run at localhost:3000`));
