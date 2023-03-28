/**
 * https://www.knowledgehut.com/blog/web-development/http-requests-with-axios-npm
*/

import  axios from 'axios'; 
async function doPostRequest() { 
let payload = { name: 'John Doe', occupation: 'gardener' }; 
let res = await axios.post('http://httpbin.org/post', payload); 
let data = res.data; 
console.log(data); 
} 
doPostRequest();

axios.get('http://webcode.me').then(resp => console.log(resp.data)); 

/*
Methods for Axios HTTP Requests
Additionally, Axios offers several other request methods which are listed below: 

axios.request(config) 
axios.get(url[, config]) 
axios.delete(url[, config]) 
axios.head(url[, config]) 
axios.options(url[, config]) 
axios.post(url[, data[, config]]) 
axios.put(url[, data[, config]]) 
axios.patch(url[, data[, config]]) 
*/

// Response and Concurrent Request Handling

const loadUsers = async () => { 
    try { 
        const [res1, res2] = await axios.all([ 
        axios.get('https://reqres.in/api/users/1'), 
        axios.get('https://reqres.in/api/users/2') 
        ]); 
        console.log(res1.data); 
        console.log(res2.data); 
    } catch (err) { 
        console.error(err); 
        if (err.response) { 
            console.log(err.response.data); 
            console.log(err.response.status); 
            console.log(err.response.headers); 
        } else if (err.request) { 
            console.log(err.request); 
        } else { 
            console.error('Error:', err.message);
        }
    } 
}; 
loadUsers();

//Make sure the Content-Type header is specified if you wish to use axios.post() 
//to deliver a pre-serialized JSON string as JSON. 
// Axios automatically serializes `{ answer: 42 }` into JSON. 
const axios = require('axios'); 
const checkSerialize = async () => { 
const res = await axios.post('https://httpbin.org/post', { answer: 42 });  
const data = res.data.data; 
const ct = 
res.data.headers['Content-Type']; 
 
console.log("Data: ", data) 
console.log("Content-Type: ", ct) 
}; 
checkSerialize(); 

