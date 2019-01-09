const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

const Usuario = require('../models/user');

app.post('/login', (req, res) => {
    res.json({
        ok: true
    });

});

module.exports = app;