require('./config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/userRouter'));
//require('./db/mongo');

mongoose.connect(URI, { useNewUrlParser: true }).then(() => {
    console.log(`Conectado a mongo, url : ${URI}`);
}).catch((err) => {
    throw err;
});

app.listen(GET_PORT, (err => {
    if (err) throw err;
    console.log(`Recibiendo peticiones del puerto : ${GET_PORT}`);
}));