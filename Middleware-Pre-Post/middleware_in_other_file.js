export const middlewareSample = (req, res, next) =>{
    console.log('This is middleware in other file before request processing...');
    next();
}