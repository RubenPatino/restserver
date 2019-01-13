const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});
productSchema.plugin(unique, { message: '{PATH}, El producto ya existe.' });

module.exports = mongoose.model('Productos', productSchema);