const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {

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

        userToken = decode.userDB;
        next();

    });
}

module.exports = { validateToken };