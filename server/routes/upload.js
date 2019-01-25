const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.post('/upload/:tipo/:id', function(req, res) {

    if (!req.files) {
        return res.status(400).json({
            status: false,
            err: { message: 'No se ha seleccionado ningun archivo' }
        });
    }
    let tipo = req.params.tipo;
    let id = req.params.id;

    // console.log(`Tipos: ${tipos}, id: ${id}`);

    // res.json({ status: true, message: 'Validando' })


    let archivo = req.files.archivo;

    let archivoCortado = archivo.name.split('.');
    let extension = archivoCortado[archivoCortado.length - 1];
    let extensionesPermitidas = ['jpg', 'png', 'gif', 'jpeg'];
    if (extensionesPermitidas.indexOf(extension) < 0) {
        return res.status(400).json({
            status: false,
            err: {
                message: 'Extensiones permitidas.' + extensionesPermitidas.join(',')
            }
        });
    };

    // res.send('OK');

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/filename${id}.jpg`, function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });

});

module.exports = app;