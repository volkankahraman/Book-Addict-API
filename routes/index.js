const express = require('express');
let router = express.Router();
const {Connection, sql} = require('./../Database/connection');

const apiVersion = '/api/' + process.env.API_VERSION
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

router.get('/languages', (req, res, next) =>{

  getProcedure('GetLanguage')
    Connection.then(pool => {
      return pool.request()
        .execute(procedureName)
    }).then(result => {
      res.json(result.recordset);
    }).catch(err => next(err));

})

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