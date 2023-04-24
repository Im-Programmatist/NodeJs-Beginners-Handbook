import express from 'express';
import { middlewareSample } from './middleware_in_other_file.js';

const app = express();
app.use(middlewareSample);

const beforeMiddleware = function(req, res, next) {
  console.log('Before middleware triggered');
  next();
}

const responseHandler = function(req, res, next) {
    console.log('Response Action implementation triggered with response instead of send');
    res.status(200).send({"response":"fine-as-normal"});
}

app.get('/implement', beforeMiddleware, responseHandler);

app.listen(9001, '127.0.0.1', function() {
    console.log('Server started at port ' + 'localhost' + ':' + 9001);
});