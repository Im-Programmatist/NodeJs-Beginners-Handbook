/*Node.js has a built-in module called HTTP, 
which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP). 
The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.*/

// Import the Node.js http module
import { createServer } from 'http'; 

  
// req is the request object which is
// coming from the client side
// res is the response object which is going
// to client as response from the server

//The function passed in the http.
//createServer() will be executed when the client goes to the url http://localhost:8081.

// Create a server object
createServer(function (req, res) {
  
// 200 is the status code which means
// All OK and the second argument is
// the object of response header.
res.writeHead(200, {'Content-Type': 'text/html'}); 
  
    // Write a response to the client
    res.write('Congrats you have a created a web server');
  
    // End the response
    res.end();
  
}).listen(8081); // Server object listens on port 8081

createServer(function (req, res) {  
      
    // Check the URL of the current request
    if (req.url == '/') {
            
        // Set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // Set response content    
        res.write(
        `<html><body style="text-align:center;">
            <h1 style="color:green;">GeeksforGeeks Home Page</h1>
            <p>A computer science portal</p>
            </body></html>`);
        res.end();//end the response
    
    }
    else if (req.url == "/webtech") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
        <html><body style="text-align:center;">
            <h1 style="color:green;">Welcome to GeeksforGeeks</h1>
            <a href="https://www.geeksforgeeks.org/web-technology/">
            Read Web Technology content
            </a>
        </body></html>`);
        res.end();//end the response
    
    }
    else if (req.url == "/DS") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<html><body style="text-align:center;">
        <h1 style="color:green;">GeeksforGeeks</h1>
        <a href="https://www.geeksforgeeks.org/data-structures/">
            Read Data Structures Content
        </a>
        </body></html>`);
        res.end(); //end the response
    
    }
    else if (req.url == "/algo") {
        
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<html><body style="text-align:center;">
        <h1 style="color:green;">GeeksforGeeks</h1>
        <a href="https://www.geeksforgeeks.org/fundamentals-of-algorithms/">
        Read Algorithm analysis and Design Content
        </a>
    </body></html>`);
    res.end(); //end the response
    
    }
    else
        res.end('Invalid Request!'); //end the response

    // Server object listens on port 8081
}).listen(3000, ()=>console.log('Server running on port 3000'));
  
console.log('Node.js web server at port 8081 is running..')
