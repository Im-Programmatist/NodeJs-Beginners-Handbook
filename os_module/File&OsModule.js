import { appendFile } from "fs";
import { platform, userInfo } from "os";
const system = platform();
const user = userInfo().username;
appendFile("hello.txt", `Hello ${user} on ${system}`, (err) => {
    if (err) throw err;
    console.log("The data was appended to file!");
});

