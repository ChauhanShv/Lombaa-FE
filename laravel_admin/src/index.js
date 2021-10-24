const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const loader = require('./server').loaders;
const express = require('./modules/express').instance;

const app = express();

async function startServer() {
    await loader.init({ app });
}

startServer();