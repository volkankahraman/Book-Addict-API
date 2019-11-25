const express = require('express');
let router = express.Router();

/* GET home page. */


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

module.exports = router;