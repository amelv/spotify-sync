require('dotenv').config();
const Server = require('./server/index');
const server = new Server();

server.listen();