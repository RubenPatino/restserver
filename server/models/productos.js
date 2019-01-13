const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productosModel = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }
});

module.exports = mongoose.model('Productos', productosModel);