import express from 'express';
let app = express();

//below json is deprecated -> body-parser deprecated bodyParser: use individual json/urlencode
//import json from 'body-parser';
//app.use(json());
/*Instead use below code*/
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
	res.send('<h1>Welcome to Node.js project setup</h1>')
})

app.listen(3000, function(){
	console.log("Server started on port: 3000")
})