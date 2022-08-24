process.on("message", (userData)=>{
    console.log("Data from Parent to child is - ", userData);
    process.send({ack:"data received", time: new Date().getSeconds()});
});
