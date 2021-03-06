const express = require('express');
const pick = require('object.pick'); // solo tomar algunos datos del body
const bcrypt = require('bcrypt'); //encriptar el password
const app = express();
const { validarToken, validarRol } = require('../middlewares/authentication');
const Usuario = require('../models/user'); //Squema de usuario.

app.get('/usuario', [validarToken, validarRol], (req, res) => {

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
                return res.status(500).json({
                    status: false,
                    err
                });
            }

            Usuario.collection.countDocuments(condiccion, (err, count) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    status: true,
                    count: count,
                    userDB
                });
            })

        });
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let user = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        }
        res.json({
            ok: true,
            userDB
        });

    });
});

app.put('/usuario/:id', validarToken, (req, res) => {
    let id = req.params.id;
    let body = pick(req.body, ['nombre', 'email', 'role', 'img', 'estado']);

    // delete body.password;
    // delete body.google;

    //new:true (devuelve el userdb modificado)
    //runValidators (valida el esquema)
    Usuario.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        }
        if (!userDB) {
            return res.status(400).json({
                status: false,
                err: 'No existe el usuario'
            });
        }
        res.json({
            ok: true,
            userDB
        });
    });
});

app.delete('/usuario/:id', validarToken, (req, res) => {
    let id = req.params.id;
    //Cambio de estado.
    Usuario.findOneAndDelete(id, { estado: false }, { new: true }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        }
        if (!userDB) {
            return res.status(500).json({
                status: false,
                err: {
                    message: 'Usuario no encontrado.'
                }
            });
        }
        res.json({
            status: true,
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