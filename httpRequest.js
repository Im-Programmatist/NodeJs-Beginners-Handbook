import { request } from 'https';
import { get } from 'https';
import http from 'http';

export let users={};

http.createServer(function(req, res){
    res.write("Hello world! at 8080");
    res.end();
}).listen(8080);

http.createServer(function(req, res){
    res.write("Hello world! at 8081");
    res.end();
}).listen(8081);

export const getHttpExample = get('https://jsonplaceholder.typicode.com/users', res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.on('data', chunk => {
        data.push(chunk);
    });
    res.on('end', () => {
        console.log('Response ended: ');
        users = JSON.parse(Buffer.concat(data).toString());
        // let resString = "";
        // console.log(users);
        // for(const user of users) {
        //     console.log(`Got user with id: ${user.id}, name: ${user.name}`);
        //     resString += `Got user with id: ${user.id}, name: ${user.name} `;
        // }
        //return res.end(resString);
        //return res.end({users:users});
    });
});

getHttpExample.on('error', error => {
    console.error(error);
});

getHttpExample.end();

const options = {
    hostname: 'example.com',
    port: 443,
    path: '/todos',
    method: 'GET',
};

// const req = request(options, res => {
//     console.log(`statusCode: ${res.statusCode}`);

//     res.on('data', d => {
//         process.stdout.write(d);
//     });
// });

// req.on('error', error => {
//     console.error(error);
// });

// req.end();
