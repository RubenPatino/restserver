const jwt = require('jsonwebtoken');

function validarToken(req, res, next) {

    if (!req.headers.token) {
        return res.status(403).json({
            status: false,
            message: "Tu petición no tiene cabecera de autorización"
        });
    }

    let token = req.get('token').trim();

    jwt.verify(token, process.env.KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                status: false,
                err
            });
        };

        userLogin = decode.userDB;
        next();
    });
}

function validarRol(req, res, next) {

    let user_rol = userLogin.role;
    if (user_rol !== 'ADMIN-ROLE') {
        return res.status(400).json({
            status: false,
            message: 'No eres un administrador'
        });
    }

    next();
}

module.exports = { validarToken, validarRol };