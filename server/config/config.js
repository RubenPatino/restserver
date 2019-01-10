//puerto
GET_PORT = process.env.PORT || 3000;

//entorno.

let entorno = process.env.NODE_ENV || 'dev';

//mongo conecction
let mongoURL;
if (entorno === 'dev') {
    mongoURL = 'mongodb://localhost:27017/cafe';
} else {
    mongoURL = process.env.MONGO_URI;
}
URI = mongoURL;
//Cemilla para el token
SEED = process.env.HEROKU_SEED || 'my-secret';

//tiempo para el token
EXPIRE = 60 * 60;