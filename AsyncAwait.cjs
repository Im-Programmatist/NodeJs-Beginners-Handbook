require('colors');
function request(url,from) {
    console.log(`Request url ${url} and it is from ${from}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(from === "requestWithRetryAsync")
                resolve(`Request resolved successfully for url - ${url}`);
            else
                reject(`Network error when trying to reach ${url}`);
        }, 500);
    });
}
//SPace added
//
function requestWithRetry(url, retryCount, currentTries = 1) 
{
    console.log(url, retryCount, currentTries);
    return new Promise((resolve, reject) => {
        if (currentTries <= retryCount) {
        const timeout = (Math.pow(2, currentTries) - 1) * 100;
        request(url, " requestWithRetry sync ")
            .then(resolve)
            .catch((error) => {
            setTimeout(() => {
                console.log('Error: ', error);
                console.log(`Waiting ${timeout} ms`);
                requestWithRetry(url, retryCount, currentTries + 1);
            }, timeout);
            });
        } else {
            console.log('No retries left, giving up.');
            reject('No retries left, giving up.');
        }
    });
}
  
requestWithRetry('http://localhost:3000',10)
.then((res) => {
    console.log(res)
})
.catch(err => {
    console.error(err)
});

//Above code - This would get the job done, but we can rewrite it with async/await and make it a lot more simple.

// The function chaining not required using async and wait. 
// The functions need not to be chained one after another, simply await the function that returns the Promise. 
// But the function async needs to be declared before awaiting a function returning a Promise.
function waitRequestAsync (timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    });
}
  
async function requestWithRetryAsync (url) {
    const MAX_RETRIES = 10;
    for (let i = 0; i <= MAX_RETRIES; i++) {
        try {
            return await request(url, "requestWithRetryAsync");
        } catch (err) {
            const timeout = Math.pow(2, i);
            console.log('Waiting', timeout, 'ms');
            await waitRequestAsync(timeout);
            console.log('Retrying', err.message, i);
        }
    }
}

requestWithRetryAsync('http://localhost:5000')
.then((res) => {
    console.log(res)
})
.catch(err => {
    console.error(err)
});