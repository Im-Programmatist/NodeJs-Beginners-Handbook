/**
 * In Synchronous way - one request handle at a time once that complete to process then only next request get handle
 * 
 * In Asynchronous way - WEB API's like setTimeout we pass it to event loop and main thread is ready to handle other coming request
 * all the request handle at a same time, 
 * 
 * if one request take one 5 sec then 5 request takes 25 sec to execute in series(synchronously) 
 * but in parallel(Asynchronous) we pass each request at at time with small difference in time, to settimeout it will take 5 sec to execute for each 
*/

const placeRequest = (reqNumber) =>{
    console.log(`Request come to process is - ${reqNumber}`);
    
    callAndProcessRequest(function (callWay='Async'){
        console.time(`process-request-time`);
        console.timeLog(`process-request-time`);
        for(let i=0; i<1e9; i++){
            
        }
        console.log(`${callWay} :  Request Processed, REQ No is - , ${reqNumber}`);
        console.timeEnd(`process-request-time`);
    })
}

const callAndProcessRequest = (callback) =>{

    //Asynchronous call and concurrently handle all requests
    setTimeout(callback,0);
    //Synchronous call and all requests being processed one by one
    //callback('Sync');
}
console.time('start-request-time');
console.timeLog('start-request-time');
placeRequest(1);
placeRequest(2);
placeRequest(3);
placeRequest(4);
placeRequest(5);
console.timeEnd('start-request-time');
