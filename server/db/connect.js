require('../config/config');
const mongoose = require('mongoose');

mongoose.connect(URI, { useNewUrlParser: true }).then(() => {
    console.log(`Conectado a mongo, url : ${URI}`);
}).catch((err) => {
    throw err;
});

module.exports = mongoose;