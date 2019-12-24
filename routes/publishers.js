const express = require('express');

const { Connection, sql } = require('./../Database/connection');


let router = express.Router();


/**
 * @swagger
 * /publishers/add:
 *    post:
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
        return pool.request()
            .input('PublisherName', sql.VarChar(100), req.body.publisherName)

            .execute('AddPublisher')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})





module.exports = router;