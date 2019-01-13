const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido.'],
        unique: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }
});
// se genera un nuevo objecto que no muestre __v.
categoriaSchema.methods.toJSON = function() {
    let object = this;
    let cateObject = object.toObject();
    delete cateObject.__v;
    // delete cateObject.usuario;
    return cateObject;
}
categoriaSchema.plugin(unique, { message: '{PATH} La categoria ya existe' });
module.exports = mongoose.model('Categoria', categoriaSchema);