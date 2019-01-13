const express = require('express');
const app = express();
const { validarToken } = require('../middlewares/authentication');
const Producto = require('../models/productos');

app.get('/producto', validarToken, (req, res) => {
    Producto.find({})
        // .populate('usuario', 'nombre email')
        .populate([{ path: 'usuario' }, { path: 'categoria' }])
        .exec((err, dataDB) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    err
                });
            };
            if (dataDB.length <= 0) {
                return res.status(400).json({
                    status: false,
                    err: {
                        message: 'Nada para mostrar'
                    }
                });
            }
            res.json({
                status: true,
                Productos: dataDB
            });
        });
});
app.get('/producto/buscar/:termino', validarToken, (req, res) => {
    let termino = req.params.termino;
    let regTermino = new RegExp(termino, 'i'); //buscar por cualquier termino, 'i' minusculas o mayusculas

    Producto.find({ nombre: regTermino, estado: true }).exec((err, dataDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        };
        if (dataDB.length <= 0) {
            return res.status(400).json({
                status: false,
                err: {
                    message: 'Nada para mostrar.'
                }
            });
        };
        res.json({
            status: true,
            producto: dataDB
        });
    });


});
app.post('/producto', validarToken, (req, res) => {
    let body = req.body;
    let nombre = body.nombre;
    let precio = body.precio;
    let idCategoria = body.categoria;
    let idUsuario = userLogin._id;

    let producto = new Producto({
        nombre: nombre,
        precio: precio,
        categoria: idCategoria,
        usuario: idUsuario
    });

    producto.save((err, dataDB) => {
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
                    message: 'No se pudo guardar.'
                }
            });
        };
        res.json({ status: true, dataDB });
    });


});

module.exports = app;