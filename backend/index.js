'use strict';

require('dotenv').config();

const PORT = process.env.PORT;
let server = require('./src/server.js');
server.start(PORT);