const express = require('express');

const { Connection, sql } = require('./../Database/connection');

let router = express.Router();


/**
 * @swagger
 * /authors:
 *    get:
 *      description: Yazarların listesini döner
 *      responses:
 *        '200':
 *          description: Başarıyla yazatlar dönüldü.
 *        '404':
 *          description: yazarlar bulunamadı
 *        '500':
 *          description: Sunucu hatası
 */

router.get('/',(req,res,next) => {

    Connection.then(pool => {
        return pool.request()
            .execute('GetAuthors')
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => next(err));

})
/**
 * @swagger
 * /authors/{id}:
 *    get:
 *      parameters:
 *       - name: id
 *         description: author's id
 *         in: path
 *      description: İstenilen idye ait bir Yazar döner
 *      responses:
 *        '200':
 *          description: İstenilen Yazar dönüldü
 *        '404':
 *          description: Yazar bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.get('/:id', (req,res,next) => {
    Connection.then(pool => {
        return pool.request()
            .input('authorID', sql.UniqueIdentifier, req.params.id)
            .execute('GetAuthor')
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => next(err));
})
/**
 * @swagger
 * /authors/add:
 *    post:
 *      parameters:
 *       - name: fullName
 *         description: user's mail
 *         in: formData
 *      description: İstenilen idye ait bir kullanıcı döner
 *      responses:
 *        '200':
 *          description: İstenilen kullanıcı dönüldü
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/add', (req,res,next) =>{

    Connection.then(pool => {
        return pool.request()
            .input('authorFullName', sql.VarChar(100), req.body.fullName)
            
            .execute('AddAuthor')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))
    
})


module.exports = router;