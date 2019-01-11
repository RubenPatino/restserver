require('../config/config');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pick = require('object.pick');

const app = express();

const Usuario = require('../models/user');

app.post('/login', (req, res) => {
    let body = pick(req.body, ['email', 'password']);

    let email = body.email;
    let pass = body.password;

    if (!email || !pass) {
        return res.json({
            status: false,
            message: 'Completa todos los campos.'
        });
    }

    let condiccion = {
        email: email
    };

    Usuario.findOne(condiccion, (err, userDB) => {

        if (!userDB) {
            return res.status(400).json({
                status: false,
                message: 'Usuario no esta registrado.'
            });
        }
        if (!userDB.estado) {
            return res.status(400).json({
                status: false,
                message: 'El usuario esta desactivado.'
            });
        }

        if (!bcrypt.compareSync(pass, userDB.password)) {
            return res.status(400).json({
                status: false,
                message: 'Correo o contraseña incorrectos!!!'
            });
        }

        let token = jwt.sign({ userDB }, process.env.KEY, { expiresIn: process.env.EXPIRE });

        res.json({
            status: true,
            userDB,
            token
        });

    });
});

module.exports = app;