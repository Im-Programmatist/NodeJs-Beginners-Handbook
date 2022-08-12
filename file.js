// import the file system module
import { writeFile } from 'fs';
//create a new text filed called task and store the sthing "buy groceries" to it
writeFile('tasks.txt', 'buy groceries', (error) =>{
if (error) throw error;
console.log('The file has been saved.')
});