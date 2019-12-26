const express = require('express'),
    { authorize } = require('./../authorization'),
    { Connection, sql } = require('./../Database/connection'),
    router = express.Router();


/**
 * @swagger
 * /authors:
 *    get:
 *      tags:
 *       - Authors
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
 *      tags:
 *       - Authors
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
        res.json(result.recordset[0]);
    }).catch(err => next(err));
})

/**
 * @swagger
 * /authors/find/{search}:
 *    get:
 *      tags:
 *       - Authors
 *      parameters:
 *       - name: search
 *         description: search's text
 *         in: path
 *      description: Aranılan veriye ait bir yazar döner
 *      responses:
 *        '200':
 *          description: İstenilen yazarlar dönüldü
 *        '404':
 *          description: yazarlar bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */

router.get('/find/:search', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .input('search', sql.NVarChar(100), req.params.search)
            .execute('GetAuthorsBySearch')

    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})
/**
 * @swagger
 * /authors/add:
 *    post:
 *      tags:
 *       - Authors
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