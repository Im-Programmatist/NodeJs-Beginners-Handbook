const  JobAndTaskQueueWorkingPracticle = () =>{
    for(let i=0; i<3; i++) {
        setTimeout(() => {
            console.log(`i - `, i);
        },0); //Goes in task queue and event loop execute after micro queue
        const prom = new Promise((resolve, reject) => {
            //if(i%2==0)
            //    resolve(`test resolve ${i}`);
            //else
                reject(`test reject ${i}`);
        });//Goes in job queue and event loop give preference to this first(promise, process.nexttick, async function)
        let t = '';
        prom.then((res) => { t = i+" then"; console.log(`1. then ${t}`, res, i); })
        //.catch((err) => { t = i+" catch"; console.log(`1. catch ${t}`, err, i); })
        .then((res) => { console.log(`2. then`, res, i, t); })
        .then((res) =>{ console.log(`3. then`, res, i, t); })
        .catch((err) => { t = i+" catch"; console.log(`1.1. catch ${t}`, err, i); })
        .then((res) =>{ console.log(`4. then`, res, i, t); })
        .catch((err) => { t = i+" catch"; console.log(`1.2. catch ${t}`, err, i); })
        .then((res) =>{ console.log(`5. then`, res, i, t); })
        .catch((err) =>{ console.log(`2. catch`, err, i, t); })
        console.log(`free in for loop i - `, i);
    }
};
JobAndTaskQueueWorkingPracticle();
// const prom = new Promise((resolve, reject) => {
//     resolve('test resolve');
// });//Goes in job queue and event loop give preference to this first(promise, process.nexttick, async function)
// let i = 0;
// prom.then((res) => {console.log(`out prom - then - `,i);})
// .catch((err) => {console.log(`out prom - catch - `,i);})
// .then(() => {console.log(`out prom - then - `,i);})
// .then(() =>{console.log(`out prom - then - `,i);})
// .catch((err) =>{console.log(`out prom - catch - `,i);})

/**
 * We can see visualization of above code from JS VISUALIZER App
 * https://www.jsv9000.app/
 * Paste below code there which must be in es5 
*/
/*
 * In ES 5 

function  JobAndTaskQueueWorkingPracticle(){
    for(let i=0; i<3; i++) {
        setTimeout(function st1(){
            console.log(`i - `, i);
        },0); //Goes in task queue and event loop execute after micro queue
        const prom = new Promise((resolve, reject){

                reject(`test reject ${i}`);
        });//Goes in job queue and event loop give preference to this first(promise, process.nexttick, async function)
        let t = '';
        prom
        .then(function tf1(res) { t = i+" then"; console.log(`1. then ${t}`, res, i); })
        .catch(function cf1(err) { t = i+" catch"; console.log(`1. catch ${t}`, err, i); })
        .then(function tf2(res) { console.log(`2. then`, res, i, t); })
        .then(function tf3(res) { console.log(`3. then`, res, i, t); })
        .catch(function cf2(err) { t = i+" catch"; console.log(`1.1. catch ${t}`, err, i); })
        .then(function tf4(res) { console.log(`4. then`, res, i, t); })
        .catch(function cf3(err) { t = i+" catch"; console.log(`1.2. catch ${t}`, err, i); })
        .then(function tf5(res) { console.log(`5. then`, res, i, t); })
        .catch(function cf4(err) { console.log(`2. catch`, err, i, t); })
        console.log(`free in for loop i - `, i);
    }
};
JobAndTaskQueueWorkingPracticle();
*/