/**
 * The util.promisify() method defines in utilities module of Node.js standard library. 
 * It is basically used to convert a method that returns responses using a callback function to return responses in a promise object. 
 * Usually, it helps to get rid off callback hells. 
*/

// Importing Utilities module
import { promisify } from 'util'
//importing File System module
import fs from 'fs'
  
// Use promisify to convert 
// callback based methods to 
// promise based methods
const readdir = promisify(fs.readdir)
const lstat = promisify(fs.lstat)
const readFiles = async (path) => {
    console.log("path",path);
    const files = await readdir(path)
    for (let file of files) {
        const stats = await lstat(file)
        if (stats.isFile()) {
            console.log(`${file} -----> File`)
        } else {
            console.log(`${file} -----> Folder`)
        }
    }
}
  
readFiles(process.cwd()).catch(err => {
    console.log(err)
})