//puerto

process.env.PORT = process.env.PORT || 3000;

//entorno.

let entorno = process.env.NODE_ENV || 'dev';

//mongo conecction
if (entorno === 'dev') {
    process.env.URI = 'mongodb://localhost:27017/cafe';
} else {
    process.env.URI = process.env.MONGO_URI;
}

//key para el token
process.env.KEY = process.env.HEROKU_SEED || 'misuperllavesecreta';

//tiempo para el token
process.env.EXPIRE = 60 * 60;