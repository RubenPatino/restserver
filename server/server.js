require('./config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

//Routes
app.use(require('./routes/index'));

// daba base mongo connection
require('./db/connect');

app.listen(process.env.PORT, (err => {
    if (err) throw err;
    console.log(`Recibiendo peticiones del puerto : ${process.env.PORT}`);
}));