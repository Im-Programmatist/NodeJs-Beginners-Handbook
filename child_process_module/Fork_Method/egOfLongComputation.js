import express, { json } from "express";
import {fork} from "child_process";

const app = express();;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/**
 * Install loadtest module to test this express app in terminal 
 * so that we can check no. request process handles and time taken to response
 * test concurrency - testing is multi-user visits,
*/
app.get("/",(req, res) => {
    res.send("This is demo for logncoputation using fok method");
});

app.get("/one",(req, res) => {
    const sum = longComputation();
    res.send({"sum normal syncronous method " : sum});
});//this process of request get 13.25 sec nearly

app.get("/two", async(req, res) => {
    const sum = await longComputePromise();
    res.send({"sum using asynchronous method " : sum});    
});//this process of request get 13.16 sec nearly

//above both method not enough to process fast request task 
//so we use fork child process and communicate with main process and child process

app.get("/three",(req, res) => {
    const child = fork("./longComputeTask.js");   
    child.send("start_process"); 
    child.on("message", (data) => {
        console.log("data by child is - ",data);
        const sum = data;
        res.send({"sum by fork method : ":  sum});
    });
});

function longComputation() {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }
    return sum;
}

function longComputePromise() {
    return new Promise((resolve, reject) => {
        let sum = 0;
        for (let i = 0; i < 1e9; i++) {
            sum += i;
        }
        resolve(sum);
    });
}

app.listen('2022', (err, res)=>{
    if (err) throw err;
    console.log('Listening on port at 2022');
})
