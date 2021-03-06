//puerto

process.env.PORT = process.env.PORT || 3000; //puero para el server. heroku ? || local 3000

//entorno.

let entorno = process.env.NODE_ENV || 'dev'; // se verifica el entorno donde se esta trabajando. 'dev'=desarrollador

//mongo conecction
//'mongodb://localhost:27017/cafe'
//mongodb://cafe-user:Admin2113@ds153304.mlab.com:53304/cafe
if (entorno === 'dev') {
    process.env.MONGO_URI = 'mongodb://localhost:27017/cafe'; //si es desarrollo. uri mongo local.
} else {
    process.env.MONGO_URI = 'mongodb://cafe-user:Admin2113@ds153304.mlab.com:53304/cafe'; //uri mongo mLap
}

//key para el token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
process.env.KEY = process.env.H_KEY || 'misuperllavesecreta';

//tiempo para el token
process.env.EXPIRE = '1h';

//google cliente ID
process.env.CLIENT_ID = process.env.H_CLIENT_ID || '542751047808-p92m20c0gg1ak96irdiqq4g8re4hboh9.apps.googleusercontent.com';

// 542751047808-p92m20c0gg1ak96irdiqq4g8re4hboh9.apps.googleusercontent.com
// process.env.KEY:       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// process.env.URI:       mongodb://cafe-user:Admin2113@ds153304.mlab.com:53304/cafe