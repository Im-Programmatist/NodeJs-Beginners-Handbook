const express = require('express');
const swaggerUI = require('swagger-ui-express');
const yamljs = require("yamljs");
const resolveRefs = require("json-refs").resolveRefs;
const http = require("http");
const path = require("path");
const basicAuth = require('express-basic-auth')

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(basicAuth({
//     users: { 'dev.user': 'Password@123' },
//     challenge: true,
//     realm: 'Imb4T3st4pp',
// }));
// app.use(basicAuth({
//     authorizer: (username, password) => {
//       console.log(`1. username, password`, username, password);
//       const userMatches = basicAuth.safeCompare(username, 'admin')
//       const passwordMatches = basicAuth.safeCompare(password, 'supersecret')
//       console.log(`2. userMatches, passwordMatches`, userMatches, passwordMatches);
//       return userMatches & passwordMatches
//     },
//     challenge: true,
//     realm: 'Imb4T3st4pp',
//   }))
app.use(
    ['/apiDocs'],
    basicAuth({
        challenge: true,
        users: {
            'dev.user': 'Password@123'
        }
    })
);
app.get('/', (req, res) => {
    res.send({"message": "Welcome to swagger application for AWS API gateway!"});
});

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, x-api-key, Content-Length, X-Requested-With, Accept');
// });

// const swaggerDocument = require('./swagger.json');
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument,options));
const multiFileSwagger = (root) => {
    const options = {
        filter: ["relative", "remote"],
        loaderOptions: {
            processContent: function (res, callback) {
                callback(null, yamljs.parse(res.text));
            },
        },
    };

    return resolveRefs(root, options).then(
        function (results) {
            return results.resolved;
        },
        function (err) {
            console.log(err.stack);
        }
    );
};

const createServer = async () => {
    const swaggerDocument = await multiFileSwagger(
		yamljs.load(path.resolve(__dirname, "./swagger.yaml"))
    );
    app.use('/apiDocs', function(req, res, next){
        //swaggerDocument.servers[0].variables.host.default = `${req.protocol}://${req.get('host')}/api`;
        //swaggerDocument.servers[0].variables.schema.default = `${req.protocol}`;
        //swaggerDocument.servers[0].variables.host.default = `${req.get('host')}`;
        req.swaggerDoc = swaggerDocument;
        next();
    }, swaggerUI.serveFiles(swaggerDocument), swaggerUI.setup());
	const server = http.createServer(app);
    return server;
};
  
createServer()
.then((server) => {
    const port = 9092;
    server.listen(port);
    console.log(`[Deal-Calc-APP] App running on: ${port}`);
    console.log(`[SWAGGER-APP] Swagger UI available with path: http://localhost:${port}/apiDocs`);
    module.exports = app;
})
.catch((err) => {
    console.error(err.stack);
    process.exit(1);
});

