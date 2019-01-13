const express = require('express');
const pick = require('object.pick');

const { validarToken, validarRol } = require('../middlewares/authentication');

const app = express();
const Categoria = require('../models/categoria');
const User = require('../models/user');

app.post('/categoria', [validarToken, validarRol], (req, res) => {
    let body = pick(req.body, 'nombre');
    let userID = userLogin._id;
    let nombre = body.nombre;
    let categoria = new Categoria({
        nombre: nombre,
        usuario: userID
    });
    categoria.save((err, dataDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        };
        res.json({
            status: true,
            categoria: dataDB
        });
    });
});

app.get('/categoria', [validarToken, validarRol], (req, res) => {

    Categoria.find({})
        .sort('nombre') //organiza los elementos desc
        .populate('usuario', 'nombre email') //carga datos del usuario admin de otra tabla
        .exec((err, dataDB) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                });
            };
            if (!dataDB) {
                return res.status(400).json({
                    status: false,
                    err: {
                        message: 'Nada para mostrar'
                    }
                });
            };
            res.json({
                status: true,
                message: 'ok',
                Categorias: dataDB
            });
        });
});

app.get('/categoria/:id', [validarToken, validarRol], (req, res) => {
    let id = req.params.id;
    Categoria.find({ usuario: id }, 'nombre').exec((err, datos) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        };
        res.json({
            status: true,
            categorias: datos
        });

    });
});

app.put('/categoria/:id', [validarToken, validarRol], (req, res) => {

    let idCategoria = req.params.id;
    let nombreCategoria = req.body.nombre;

    let id = { _id: idCategoria };
    let update = { nombre: nombreCategoria };
    let options = { new: true, runValidators: true };

    Categoria.findOneAndUpdate(id, update, options, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        };
        if (!categoriaDB) {
            return res.status(400).json({
                status: false,
                message: 'Datos incorrectos.'
            });
        };
        res.json({
            status: true,
            categoria: categoriaDB
        });
    });
});
app.delete('/categoria/:id', [validarToken, validarRol], (req, res) => {
    let idCategoria = req.params.id;
    let conditions = { _id: idCategoria };
    Categoria.findOneAndDelete(conditions, (err, resDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        };
        if (!resDB) {
            return res.status(400).json({
                status: false,
                message: 'No se encontro nada.'
            });
        };
        res.json({
            status: true,
            message: `Categoria ${resDB.nombre} borrada.`
        });
    });
});

module.exports = app;