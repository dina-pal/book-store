const http = require('http');
require('dotenv').config();
const app = require('./app/app');

// eslint-disable-next-line no-undef
const port = process.env.PORT || 8000;

const server = http.createServer(app);


server.listen(port, console.log(`server is running on port ${port}`))