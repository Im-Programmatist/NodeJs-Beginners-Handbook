function longCompute() {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }
    return sum;
}

process.on('message',(message)=>{
    const sum = longCompute();
    process.send(sum); //communicate with child and mater process by sending message
})