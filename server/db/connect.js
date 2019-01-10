require('../config/config');
const mongoose = require('mongoose');


const opts = { useNewUrlParser: true };

mongoose.connect(process.env.URI, opts).then(() => {
    console.log(`Conectado a mongo, uri : ${process.env.URI}`);
}).catch((err) => {
    throw err;
});

module.exports = mongoose;