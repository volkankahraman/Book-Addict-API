const express = require('express'),
      jwt = require('jsonwebtoken');
let router = express.Router();
const {Connection, sql} = require('./../Database/connection');

/* GET home page. */

function getProcedure(procedureName) {
  
}

/**
 * @swagger
 * /:
 *    get:
 *      description: Karşılama mesajı verir.
 *      responses: 
 *        '200':
 *          description: Başarıyla kullanıcı dönüldü
 * 
 */
router.get('/', (req, res, next) => {
  res.json({
    message: 'Kitap Bağımlısı API'
  });
});



/**
 * @swagger
 * /languages:
 *    get:
 *      description: Dillerin listesini döner
 *      responses:
 *        '200':
 *          description: Başarıyla diller dönüldü.
 *        '404':
 *          description: diller bulunamadı
 *        '500':
 *          description: Sunucu hatası
 */

router.get('/languages', (req, res, next) =>{

    Connection.then(pool => {
      return pool.request()
        .execute('GetLanguages')
    }).then(result => {
      res.json(result.recordset);
    }).catch(err => next(err));

})

/**
 * @swagger
 * /languages/{id}:
 *    get:
 *      parameters:
 *       - name: id
 *         description: language's id
 *         in: path
 *      description: İstenilen idye ait bir dil döner
 *      responses:
 *        '200':
 *          description: İstenilen dil dönüldü
 *        '404':
 *          description: dil bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.get('/languages/:id', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('languageID', sql.UniqueIdentifier, req.params.id)
      .execute('GetLanguage')
  }).then(result => {
    res.json(result.recordset[0]);
  }).catch(err => next(err));
})


module.exports = router;