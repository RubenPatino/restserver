//puerto
GET_PORT = process.env.PORT || 3000;

//entorno.

let entorno = process.env.NODE_ENV || 'dev';

//mongo conecction
let url;
if (entorno === 'dev') {
    url = 'mongodb://localhost:27017/cafe';
} else {
    url = process.env.MONGO_URI;
}
URI = url;