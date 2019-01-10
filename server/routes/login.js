require('../config/config');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const Usuario = require('../models/user');

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        };
        if (!userDB) {
            return res.status(400).json({
                status: false,
                message: '(Correo) o contraseña incorrectos!!!'
            });
        }
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                status: false,
                message: 'Correo o (contraseña) incorrectos!!!'
            });
        }

        let token = jwt.sign({ userDB }, SEED, { expiresIn: EXPIRE });

        res.json({
            status: true,
            userDB,
            token
        });

    });
});

module.exports = app;