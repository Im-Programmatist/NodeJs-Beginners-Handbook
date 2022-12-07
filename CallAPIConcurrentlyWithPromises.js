const axios = require('axios');

console.log(axios.isCancel('something'));

// Make a request for a user with a given ID
// axios.get('https://jsonplaceholder.typicode.com/todos/1')
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

const e = [];
const promises = [];

//async - for await
function abc()
{
    for(let i = 0; i < 3; i++) {
        console.log(i);
        //API call serial way
        //const r = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        //e.push(r.data);

        //api call parallel
        const p = axios.get('https://jsonplaceholder.typicode.com/todos/1');
        promises.push(p);
    }
    console.log("promises - ",promises);
}
abc();
Promise.all(promises)
.then((result)=>{
    for(let res of result){
        e.push(res.data);
    }
    console.log("e",e);
})
.catch(()=>{

});
