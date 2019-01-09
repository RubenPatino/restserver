const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true }).then(() => {
    console.log('Conectado a mongo');
}).catch((err) => {
    throw err;
});

module.exports = mongoose;