const jwt = require('jsonwebtoken')

function authorize(req, res, next) {
    const Header = req.header('Authorization');
    
    if (Header) {
        let token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                // Yetkisiz istek
                res.status(401).json({
                    err: 'yetkisiz giriş'
                });
            } else {
                next()
            }
        })

    } else {
        // Yetkisiz istek
        res.status(401).json({
            err: 'yetkisiz giriş'
        });
    }
}

module.exports = {authorize};