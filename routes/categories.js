const express = require('express'),
    { authorize } = require('./../authorization'),
    { Connection, sql } = require('./../Database/connection'),
    router = express.Router();
/* GET Category listing. */
/**
 * @swagger
 * /categories:
 *    get:
 *      tags:
 *       - Categories
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
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err));

})

/**
 * @swagger
 * /categories/{id}:
 *    get:
 *      tags:
 *       - Categories
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
            .input('categoryID', sql.UniqueIdentifier, req.params.id)
            .execute('GetCategory')
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => next(err));

})



/**
 * @swagger
 * /categories/add:
 *    post:
 *      tags:
 *       - Categories
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
        if (req.body.categoryname) {
            return pool.request()
                .input('categoryName', sql.NVarChar(100), req.body.categoryname)
                .execute('AddCategory')
        } else
            res.status(500).json({
                message: "Parametre eksik"
            });
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

module.exports = router;