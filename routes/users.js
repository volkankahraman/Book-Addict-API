const express = require('express');
let router = express.Router();

let users = [{
  "id": "1",
  "email": "liam.walters@example.com",
  "gender": "male",
  "phone_number": "0438-376-652",
  "birthdate": 826530877,
  "location": {
    "street": "9156 dogwood ave",
    "city": "devonport",
    "state": "australian capital territory",
    "postcode": 7374
  },
  "username": "biglion964",
  "password": "training",
  "first_name": "liam",
  "last_name": "walters",
  "title": "mr",
  "picture": "men/50.jpg"
}];
/* GET users listing. */
/**
 * @swagger
 * /users:
 *    get:
 *      description: Kullanıcıların listesini döner
 *      responses: 
 *        '200':
 *          description: Başarıyla kullanıcılar dönüldü.
 *        '404':
 *          description: Kullanıcılar bulunamadı
 *        '500':
 *          description: Sunucu hatası  
 */

router.get('/', (req, res, next) => {
  res.json(users);
});

/**
 * @swagger
 * /users/{id}:
 *    get:
 *      parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *      description: İstenilen idye ait bir kullanıcı döner
 *      responses:
 *        '200':
 *          description: İstenilen kullanıcı dönüldü
 *        '404':
 *          description: Kullanıcı bulunamadı
 *        '500':
 *          description: Sunucu hastası 
 * 
 */
router.get('/:id', (req, res, next) => {
  let user = users.find(u => u.id == req.params.id)
  if (user)
    res.json(user)
  else
    next()
});

module.exports = router;