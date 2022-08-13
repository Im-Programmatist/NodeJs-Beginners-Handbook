import dotenv from 'dotenv';
dotenv.config({path: '.env'});
import express from 'express';
import path  from 'path';
import { fileURLToPath } from 'url';
import {users } from './httpRequest.js';


//port set to listen
const port = 5000;
const port_default = process.env.APP_PORT || port;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * It's something like you are creating an object of a class. 
 * Where "express()" is just like class and app is it's newly created object.
 */
let app = express();

// Set EJS as templating engine
const template_path = path.join(__dirname,'templates')
app.set('view engine', 'ejs');
app.set('views', template_path); 
//Or simply we can set view folder path - app.set('views', './templates');

/*Instead use below code*/
//We do not need this express.json() parser for GET AND DELETE request,
//we need to use it to get data from POST/PUt request to get in json format
//THis is call middleware in express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
	var data = {name:'Chetan',
    hobbies:['Reading books', 'Playing Ckicket', 'Watching Movie']}
	res.render('home', {data:data});
	//res.send('<h1>Welcome to Node.js </h1>')
});

app.get('/user-http',function(req,res){
	//console.log("users",users);
	//res.end(JSON.stringify(users));
	res.json(users);
});
app.get('/user-http/:id',function(req,res){
	const found = Array.from(users).some(user => user.id === parseInt(req.params.id));
	if(found){
		/*Filter user with param id passed*/
		res.json(Array.from(users).filter(user => user.id === parseInt(req.params.id)));
		/*make array of username with id*/
		//res.json(Array.from(users).map(user => user.username = `${user.id}-${user.username}`));
		/*User with same username - count*/
		// res.json(Array.from(users).reduce(function(result, item){ 
		// 	console.log("result",result);
		// 	console.log("item",item.id);
		// 	if (!result[item.username]) {
		// 		result[item.username] = 1;
		// 	} else{
		// 		result[item.username]++;
		// 	}
		// 	return result; 	
		// },{}));

	}else{
		res.json(users);
	}
});
//Run app at port localhost on server  
app.listen(port_default, '0.0.0.0', () => {
	console.log(`Node App Listening At http://localhost:${port_default}`)
});


