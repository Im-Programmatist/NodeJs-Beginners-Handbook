function longComputeTaskByFork() {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }
    return sum;
}

process.on('message',(message)=>{
    console.log(message, (message == "start_process"));
    if(message == "start_process"){
        const sum = longComputeTaskByFork();
        process.send(sum); //communicate with child and mater process by sending message
    }
})