const express = require('express'),
    { authorize } = require('./../authorization'),
    { Connection, sql } = require('./../Database/connection'),
    router = express.Router();

/**
 * @swagger
 * /publishers:
 *    get:
 *      tags:
 *       - Publishers
 *      description: Publishers listesini döner
 *      responses:
 *        '200':
 *          description: Başarıyla Yayıncılar dönüldü.
 *        '404':
 *          description: Yayıncılar bulunamadı
 *        '500':
 *          description: Sunucu hatası
 */
router.get('/', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .execute('GetPublishers')
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err));

})

/**
 * @swagger
 * /publishers/add:
 *    post:
 *      tags:
 *       - Publishers
 *      parameters:
 *       - name: publisherName
 *         description: book's publisherName
 *         in: formData
 *      description: Girilen bilgiler ile yayıncı ekler.
 *      responses:
 *        '200':
 *          description: İstenilen kullanıcı dönüldü
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/add', (req, res, next) => {

    Connection.then(pool => {
        if (req.body.publishername) {
            return pool.request()
                .input('publisherName', sql.VarChar(100), req.body.publishername)
                .execute('AddPublisher')
        } else
            res.status(500).json({
                message: "Parametre eksik"
            });
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

module.exports = router;