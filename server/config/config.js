//puerto
GET_PORT = process.env.PORT || 3000;

//entorno.

let entorno = process.env.NODE_ENV || 'dev';

//mongo conecction
let url;
if (entorno === 'dev') {
    url = 'mongodb://localhost:27017/cafe';
} else {
    url = 'mongodb://cafe-user:Admin2113@ds153304.mlab.com:53304/cafe';
}
GET_URL = url;