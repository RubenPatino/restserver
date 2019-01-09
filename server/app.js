require('./config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Routes
app.use(require('./routes/index'));

// daba base mongo connection
require('./db/connect');

app.listen(GET_PORT, (err => {
    if (err) throw err;
    console.log(`Recibiendo peticiones del puerto : ${GET_PORT}`);
}));