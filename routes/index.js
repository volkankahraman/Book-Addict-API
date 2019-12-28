const express = require('express'),
  { authorize } = require('./../authorization'),
  { Connection, sql } = require('./../Database/connection'),
  jwt = require('jsonwebtoken'),
  router = express.Router();

/**
 * @swagger
 * /:
 *    get:
 *      tags:
 *       - Home
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
* /checkToken:
*    post:
*      security:
*       - bearerAuth: []
*      tags:
*       - Login
*      description: true/false döner
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
router.post('/checkToken', authorize, (req, res, next) => {
  res.json({
    message: true
  })
})

/**
 * @swagger
 * /languages:
 *    get:
 *      tags:
 *       - Languages
 *      description: Dillerin listesini döner
 *      responses:
 *        '200':
 *          description: Başarıyla diller dönüldü.
 *        '404':
 *          description: diller bulunamadı
 *        '500':
 *          description: Sunucu hatası
 */
router.get('/languages', (req, res, next) => {

  Connection.then(pool => {
    return pool.request()
      .execute('GetLanguages')
  }).then(result => {
    if (result) res.json(result.recordset[0]);
  }).catch(err => next(err));

})

/**
 * @swagger
 * /languages/{id}:
 *    get:
 *      tags:
 *       - Languages
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
    if (result) res.json(result.recordset[0]);
  }).catch(err => next(err));
})

module.exports = router;