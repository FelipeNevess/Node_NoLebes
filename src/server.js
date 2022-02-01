require('dotenv').config();

const express = require('express');
const body_parser = require('body-parser');

const router = require('./router/index');

const app = express();

const port = process.env.PORT;

app.use(body_parser.json());

app.use(router);

app.listen(port, console.log('Service Started 🚀'));
