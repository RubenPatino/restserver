const express = require('express');
const pick = require('object.pick');
const bcrypt = require('bcrypt');

const app = express();

const Usuario = require('../models/userModel');

app.get('/usuario', function(req, res) {
    let desde = Number(req.query.desde || 0);
    let limite = Number(req.query.limite || 0);
    let condiccion = {
        estado: true
    };

    Usuario.find(condiccion, 'nombre email role estado img')
        .skip(desde)
        .limit(limite)
        .exec((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count(condiccion, (err, count) => {
                // if (err) {
                //     return res.status(400).json({
                //         ok: false,
                //         err
                //     });
                // }
                res.json({
                    ok: true,
                    count: count,
                    userDB
                });
            })

        });
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let user = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            userDB
        });

    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = pick(req.body, ['nombre', 'email', 'role', 'img', 'estado']);

    // delete body.password;
    // delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            userDB
        });
    });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //Cambio de estado.
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado.'
                }
            });
        }
        res.json({
            ok: true,
            userDB
        });
    });


    //Eliminacion total del usuario
    // Usuario.findByIdAndRemove(id, (err, userDB) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (!userDB) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado.'
    //             }
    //         });
    //     }
    //     res.json({
    //         ok: true,
    //         userDB
    //     });
    // });
});

module.exports = app;