import dotenv from 'dotenv';
dotenv.config({path: '.env'});
import express from 'express';
import path  from 'path';
import { fileURLToPath } from 'url';
import {users } from './httpRequest.js';
import hbs from 'hbs';
import mysql from "mysql";

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
let app_ejs = express();
let app_jade = express();
let app_pug = express();
let app_hbs = express();

//Run app at port localhost on server  
app.listen(port_default, '0.0.0.0', () => {
	console.log(`Node App Listening At http://localhost:${port_default}`)
});

//Run app EJS
app_ejs.listen(5001, '0.0.0.0', () => {
	console.log(`Node App With EJS Template Listening At http://localhost:5001`)
});

//Run app Jade
app_jade.listen(5002, '0.0.0.0', () => {
	console.log(`Node App With Jade Template Listening At http://localhost:5002`)
});

//Run app Pug  
app_pug.listen(5003, '0.0.0.0', () => {
	console.log(`Node App With Pug Template Listening At http://localhost:5003`)
});

//Run app Handlebars  
app_hbs.listen(5004, '0.0.0.0', () => {
	console.log(`Node App With Handlebars Template Listening At http://localhost:5004`)
});

// Set EJS as templating engine
const template_path_ejs = path.join(__dirname,'/TemplateEngines/EJS/Templates')
app_ejs.set('view engine', 'ejs');
app_ejs.set('views', template_path_ejs); 
//Or simply we can set view folder path - app.set('views', './templates');

const template_path_jade = path.join(__dirname,'/TemplateEngines/Jade/Templates')
app_jade.set('view engine', 'jade');
app_jade.set('views', template_path_jade); 

const template_path_pug = path.join(__dirname,'/TemplateEngines/Pug/Templates')
app_pug.set('view engine', 'pug');
app_pug.set('views', template_path_pug); 

const template_path_hbs = path.join(__dirname,'/TemplateEngines/Handlebars/Templates')
const partial_path_hbs = path.join(__dirname, '/TemplateEngines/Handlebars/Partials');  
app_hbs.set('view engine', 'hbs');
app_hbs.set('views', template_path_hbs); 
hbs.registerPartials(partial_path_hbs);

/*Instead use below code*/
//We do not need this express.json() parser for GET AND DELETE request,
//we need to use it to get data from POST/PUt request to get in json format
//THis is call middleware in express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//*****************************START EJS Template Engine ********************************/
// index page
app_ejs.get('/', function(req, res) {
	var users = [
		{ name: 'Chetan', company: "Google", age: 25},
		{ name: 'Patil', company: "Amazon", age: 30},
		{ name: 'Korde', company: "Microsoft", age: 35}
	];
	var line = "EJS is likely same as hbs template engine ";

	res.render('index', {
		users,
		line
	});
});
app_ejs.get('/home', function(req, res) {
	var data = {name:'Chetan',
    hobbies:['Reading books', 'Playing Ckicket', 'Watching Movie']}
	res.render('home', {data:data});
	//res.send('<h1>Welcome to Node.js </h1>')
});
// use res.render to load up an ejs view file
// about page
app_ejs.get('/about', function(req, res) {
	res.render('about');
});

//***************************** END EJS Template Engine ********************************/

//***************************** START Jade Template Engine ********************************/
app_jade.get('/', function(req, res) {
	/*Always remember if you are creating head, header index and footer files then remove all intentetion in files*/
	const studentList = ["Chetan", "Korde", "Patil"];
	res.render('index', { studentList, title: 'Express', engineType:'jade' });
	// var con = mysql.createConnection({
	// 	host: "localhost",
	// 	user: "root",
	// 	password: "",
    //     database: 'showStudent' 
	// });

	// con.connect(function(err) {
	// 	if (err) throw err;
	// 	console.log("Connected!");

	// 	con.query("SELECT * FROM student", function (err, result, fields) {
	// 		if (err) throw err;
	// 		console.log(result);
	// 		res.render('index', { studentList: result });
	// 	});
	// });

	// con.end(function(err) {
	// 	if (err) {
	// 	  return console.log('error:' + err.message);
	// 	}
	// 	console.log('Close the database connection.');
	// });

	// con.destroy();
});

//***************************** END Jade Template Engine ********************************/

//***************************** START Pug Template Engine ********************************/
app_pug.get('/',function(req,res){
	res.render('index', {
		subject: 'Pug template engine',
		name: 'index',
		link: 'https://google.com'
	});
});
//***************************** END Pug Template Engine ********************************/

//***************************** START Handlebars Template Engine ********************************/

app_hbs.get('/', (req, res) => {
	res.render('index', {
		subject: 'hbs template engine',
		name: 'our template',
		link: 'https://google.com'
	});
});

//***************************** END Handlebars Template Engine ********************************/

//***************************** START APP Template Engine ********************************/

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

