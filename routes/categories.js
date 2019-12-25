const express = require('express');
const {Connection, sql} = require('./../Database/connection');


let router = express.Router();

/* GET Category listing. */
/**
 * @swagger
 * /categories:
 *    get:
 *      description: Kategorilerin listesini döner
 *      responses:
 *        '200':
 *          description: Başarıyla Kategoriler dönüldü.
 *        '404':
 *          description: Kategoriler bulunamadı
 *        '500':
 *          description: Sunucu hatası
 */
router.get('/', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .execute('GetCategories')
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => next(err));
})

/**
 * @swagger
 * /categories/{id}:
 *    get:
 *      parameters:
 *       - name: id
 *         description: category's id
 *         in: path
 *      description: İstenilen idye ait bir kategori döner
 *      responses:
 *        '200':
 *          description: İstenilen Kategori dönüldü
 *        '404':
 *          description: Kategori bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.get('/:id', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .input('categorieID', sql.UniqueIdentifier, req.params.id)
            .execute('GetCategory')
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => next(err));
})



/**
 * @swagger
 * /categories/add:
 *    post:
 *      parameters:
 *       - name: categoryname
 *         description: category's name
 *         in: formData
 *      description: Kategori ekler
 *      responses:
 *        '200':
 *          description: Kategori eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/add', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .input('CategoryName', sql.VarChar(100), req.body.categoryname)

            .execute('AddCategory')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})




module.exports = router;