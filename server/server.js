require('./config/config');
const bodyParser = require('body-parser');
const express = require('express');
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

app.listen(GET_PORT);