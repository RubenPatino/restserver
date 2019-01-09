const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio.']

    },
    google: {
        type: Boolean,
        required: false,
        default: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: {
            values: ['ADMIN-ROLE', 'USER-ROLE'],
            message: '{VALUE} no es un rol valido.'
        }
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    }
});
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} El correo electronico ya esta registrado.' });

module.exports = mongoose.model('Usuarios', usuarioSchema);