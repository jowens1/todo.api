'use strict';

// dependencies
const express = require('express');
const bodyParser = require('body-parser');

// create the express app
const app = express();

// configure the body-parser to accept urlencoded bodies to json data
app.use(bodyParser.urlencoded({ extended : true })).use(bodyParser.json());

// get an instance of the express router
const router = express.Router();

// register all routers all routes are prefixed with /api
app.use('/api', require('./routes/task'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// set the port
const port = parseInt(process.env.PORT, 10) || 8000;

// start the server
const server = app.listen(port, () => {
    console.log(`App is running at: localhost:${server.address().port}`);
});

// database connections
require('./configs/database');