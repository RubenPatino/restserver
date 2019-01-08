require('./config/config');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/usuario', function(req, res) {
    res.send('GET');
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre del usuario es requerido'
        });


    } else {
        res.json(body);
    }
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id: id
    });
});

app.delete('/usuario', function(req, res) {
    res.send('DELETE Local');
});

mongoose.connect('mongodb://localhost:27017/cafe', (err) => {});

app.listen(GET_PORT);