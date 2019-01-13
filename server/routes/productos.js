const express = require('express');
const app = express();
const { validarToken } = require('../middlewares/authentication');
const Producto = require('../models/productos');

app.get('/producto', validarToken, (req, res) => {
    Producto.find({})
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
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
                Productos: dataDB
            });
        });
});
app.post('/producto', validarToken, (req, res) => {
    let body = req.body;
    let nombre = body.nombre;
    let precio = body.precio;
    let idCategoria = body.idCategoria;
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
            return res.status(500).json({
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