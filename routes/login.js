const express = require('express'),
    { authorize } = require('./../authorization'),
    { Connection, sql } = require('./../Database/connection'),
    jwt = require('jsonwebtoken'),
    md5 = require('md5')
    router = express.Router();

/* GET home page. */
/**
* @swagger
* /login:
*    post:
*      tags:
*       - Login
*      parameters:
*       - name: username
*         description: users's username
*         in: formData
*       - name: password
*         description: user's password
*         in: formData
*      description: token döner
*      responses:
*        '200':
*          description: OK
*        '401':
*          description: Unauthorized
*        '404':
*          description: Not Found
*        '500':
*          description: Internal Error
*/

router.post('/', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .input('username', sql.NVarChar(900), req.body.username)
            .input('password', sql.NVarChar(900), md5(req.body.password))
            .execute('ControlLogin')
    }).then(result => {
        if (result.recordset[0]) {
            let user = result.recordset[0][0]
            jwt.sign(user, process.env.SECRET_KEY, function (err, token) {
                user.Token = token
                if (err) {
                    next(err);
                } else {
                    res.json( user );
                }
            });
        } else {
            res.status(401).json({ err: 'Kullanıcı adı ve ya şifre yanlış' })
        }

    }).catch(err => next(err));
})

module.exports = router;