const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

let Schema = mongoose.Schema;

let rolesPermitidos = {
    values: ['ADMIN-ROLE', 'USER-ROLE'],
    message: '{VALUE} no es un rol valido.'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']

    },
    email: {
        type: String,
        createIndexes: true,
        //unique: true,
        required: [true, 'El correo es obligatorio.'],
        validate: [validator.isEmail, 'invalid email']

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
        default: 'USER-ROLE',
        enum: rolesPermitidos
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

// se genera un nuevo objecto que no muestre el password.
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
}

//se verifica que el correo no este registrado.
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} El correo electronico ya esta registrado.' });

module.exports = mongoose.model('Usuarios', usuarioSchema);