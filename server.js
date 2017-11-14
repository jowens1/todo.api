const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// configure the body-parser to accept urlencoded bodies to json data
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

// register all routers all routes are prefixed with /api
app.use('/api', require('./routes/task'));

app.use(cors());
require('./routes/task')(app);
// set the port
const port = parseInt(process.env.PORT, 10) || 8000;

// start the server
const server = app.listen(port, () => {
	console.log(`App is running at: localhost:${server.address().port}`);
});

// database connections
require('./configs/database');
