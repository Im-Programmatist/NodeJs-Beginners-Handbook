/*
Async Hooks are a core module in Node.js that provides an API to track the lifetime of asynchronous resources in a Node application. 
An asynchronous resource can be thought of as an object that has an associated callback.
*/

/**
 * This module also track the resources created by FS and Net module in node js application.
 * During the lifetime of an async resource, there are 4 events which fire and we can track, with Async Hooks. These include:
    1. init - Called during the construction of the async resource
    2. before - Called before the callback of the resource is called
    3. after - Called after the callback of the resource has been invoked
    4. destroy - Called after the async resource is destroyed
    5. promiseResolve - Called when the resolve() function of a Promise is invoked.
*/
import express from 'express';
import {createRequestContext, getRequestContext} from './hooks.js';
const app = express();
const port = 3000;

app.use((request, response, next) => {
    const data = { headers: request.headers, datetime:  new Date().toISOString() };
    createRequestContext(data);
    next();
});

const requestHandler = (request, response, next) => {
    const reqContext = getRequestContext();
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }
    response.json({...reqContext, datetime:  new Date().toISOString() });
    next()
};

app.get('/', requestHandler);
app.get('/test', requestHandler);

app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`server is listening on ${port}`);
});
