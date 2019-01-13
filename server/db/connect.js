require('../config/config');
const mongoose = require('mongoose');


const opts = { useNewUrlParser: true, useCreateIndex: true };

mongoose.connect(process.env.MONGO_URI, opts).then(() => {
    console.log(`Conectado a mongo, uri : ${process.env.MONGO_URI}`);
}).catch((err) => {
    throw err;
});

module.exports = mongoose;