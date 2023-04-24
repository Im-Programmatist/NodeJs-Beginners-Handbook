export const controllerSample = (req, res, next)=>{
    console.log('entered in controller...');
    const body = {message: "controller sample"};
    console.log(body);
    res.local = body;
    next();
}