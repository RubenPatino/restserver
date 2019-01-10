require('../config/config');
const mongoose = require('mongoose');

mongoose.connect(URI, { useNewUrlParser: true }).then(() => {
    console.log(`Conectado a mongo, uri : ${URI}`);
}).catch((err) => {
    throw err;
});

module.exports = mongoose;