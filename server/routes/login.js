require('../config/config');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pick = require('object.pick');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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


// validacion por google


async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();
    return ({
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    });
}


app.post('/google', async(req, res) => {
    //se optiene el token.
    let token = req.body.idtoken;

    if (!token) {
        return res.status(403).json({
            status: false,
            message: 'Documento sin cabezera.'
        });
    };



    //console.log(token);
    // se valida el token.
    let userGoogle = await verify(token).catch(err => {
        return res.status(403).json({
            status: false,
            err: `${err}`
        });
    });

    res.json({
        token: token,
        user: userGoogle
    });
    /*
        if (userGoogle.email) {
            //console.log(token);
            //se verifica si el email esta registrado.
            Usuario.findOne({ email: userGoogle.email }, (err, userDB) => {
                // retorna un error al procesar la peticion.
                if (err) {
                    return res.status(500).json({
                        status: false,
                        err
                    });
                }
                // si el email esta registrado. 
                if (userDB) {

                    // si el usuario antes habia iniciado sesion desde google.
                    if (userDB.google) {

                        // se verifica que el usuario este activado.
                        if (!userDB.estado) {
                            return res.status(400).json({
                                status: false,
                                message: 'El usuario esta desactivado.'
                            });

                            // si esta activado se le concede el token.
                        } else {
                            let token = jwt.sign({ userDB }, process.env.KEY, { expiresIn: process.env.EXPIRE });
                            res.json({
                                status: true,
                                userDB,
                                token
                            });
                        }

                        //si esta registrado pero nunca ha iniado sesion con google.
                    } else {
                        return res.status(400).json({
                            status: false,
                            message: 'Debe iniciar sesion normalmente.'
                        });
                    }

                    //Si el email no esta registrado.
                } else {

                    // se instancia un nuevo esquema
                    let user = new Usuario({
                        nombre: userGoogle.name,
                        email: userGoogle.email,
                        password: ':P',
                        img: userGoogle.img,
                        google: userGoogle.google
                    });

                    //se guarda en la base de datos.

                    user.save((err, userDB) => {
                        if (err) {
                            return res.status(500).json({
                                status: false,
                                err
                            });
                        }
                        // se le concede un token
                        let token = jwt.sign({ userDB }, process.env.KEY, { expiresIn: process.env.EXPIRE });

                        //se imprime en pantalla.
                        res.json({
                            ok: true,
                            userDB,
                            token
                        });
                    });
                };
            });
        }*/
});

module.exports = app;