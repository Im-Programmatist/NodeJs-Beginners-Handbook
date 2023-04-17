/**
 * esm module so Node.js versions lower than v14 can run this example
 * esm module to provide backwards compatibility for Node versions that do not have native support for experimental module exports
 * this esm module is already used by uuid internally
*/
//require = require('esm')(module);
/**
 * We will use the uuid package to generate a unique ID for each incoming request.
 * v4 function, which we shall use later to generate version 4 UUIDs
 * */ 
import {v4} from 'uuid';
//const { v4 } = require('uuid');
import asyncHooks from 'async_hooks';

const store = new Map();

const asyncHook = asyncHooks.createHook({
    init: (asyncId, _, triggerAsyncId) => {
        if (store.has(triggerAsyncId)) {
            store.set(asyncId, store.get(triggerAsyncId))
        }
    },
    destroy: (asyncId) => {
        if (store.has(asyncId)) {
            store.delete(asyncId);
        }
    }
});

asyncHook.enable();

export const createRequestContext = (data, requestId = v4()) => {
    const requestInfo = { requestId, data };
    store.set(asyncHooks.executionAsyncId(), requestInfo);
    console.log(store);
    return requestInfo;
};

export const getRequestContext = () => {
    return store.get(asyncHooks.executionAsyncId());
};

//module.exports = { createRequestContext, getRequestContext };
