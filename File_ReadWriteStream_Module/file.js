// import the file system module
import fs, { openSync, promises } from 'fs';
import ok from "okay";
// imports a promise-based version of the readFile method
//const { readFile } = require(fs).promises
const { readFile, writeFile } = promises;

//Read and Write file using 
writeFile("./GFG_Test.txt","adcblje lknvlwenv avwe")
.then(function(result) {
  console.log(""+result);
})
.catch(function(error) {
   console.log(error);
})
readFile("GFG_Test.txt")
.then(function(result) {
  console.log(""+result);
})
.catch(function(error) {
   console.log(error);
})

const dir = './file_module';
if(!fs.existsSync(dir)) 
    fs.mkdirSync(dir);

//create a new text filed called task and store the sthing "buy groceries" to it
fs.writeFile(dir+'/tasks.txt', 'hello world!', (error) =>{
    if (error) throw error;
    console.log('The file has been saved.')
});

if(fs.existsSync(dir+'/test.txt')) 
    console.log("File test.txt exists");
else
    console.log("File test.txt not exists");

fs.writeFileSync(dir+'/test.txt', "Testing write file sync method of fs module");

fs.appendFileSync(dir+'/test.txt',", 3 here we have Appended data 2");

const buffere_data = fs.readFileSync(dir+'/test.txt'); //buffer data received frim thisreadsync method
/*use "utf-8"* to get string data - fs.readFileSync(dir+'/test.txt', 'utf-8') */
console.log(buffere_data);
const original_data = buffere_data.toString();
console.log(original_data);

// Include the fs module
// Open file demo.txt in read mode
fs.open(dir+'/test.txt', 'r', function (err, f) {
    console.log("Saved! Open file!");
});

// To open file in write and read mode,
// create file if doesn't exists.
fs.open(dir+'/test.txt', 'w+', function (err, f) {
   if (err) {
      return console.error(err);
   }
   console.log(f);
   console.log("File opened!!");    
});

fs.readFile(dir+'/tasks.txt', 'utf8', ok(function(contents) {
    console.log("with ok model - ",contents);
}));

if(fs.existsSync(dir+'/test.txt')) 
    fs.unlinkSync(dir+'/test.txt', (err) => {
        console.log("file test.txt deleted");
    });
if(fs.existsSync(dir+'/tasks.txt')) 
    fs.unlinkSync(dir+'/tasks.txt', (err) => {
        console.log("file tasks.txt deleted");
    });
