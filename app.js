import dotenv from 'dotenv';
dotenv.config({path: '.env'});
import express from 'express';
//port set to listen
const port = 5000;
const port_default = process.env.APP_PORT || port;
/**
 * It's something like you are creating an object of a class. 
 * Where "express()" is just like class and app is it's newly created object.
 */
let app = express();

/*Instead use below code*/
//We do not need this express.json() parser for GET AND DELETE request,
//we need to use it to get data from POST/PUt request to get in json format
//THis is call middleware in express
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/', function(req, res) {
	res.send('<h1>Welcome to Node.js project setup</h1>')
})
//Run app at port localhost on server  
app.listen(port_default, '0.0.0.0', () => {
	console.log(`Node App Listening At http://localhost:${port_default}`)
});


