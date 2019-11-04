const express = require('express');
const connection = require('../database/connection')
const Request = require('tedious').Request;
const sql = require('mssql')


let router = express.Router();

let users = [{
  "id": "1",
  "email": "liam.walters@example.com",
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
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST, // You can use 'localhost\\instance' to connect to named instance
    database: process.env.DB_NAME,

    options: {
      encrypt: true // Use this if you're on Windows Azure
    }
  };
  new sql.ConnectionPool(config).connect().then(pool => {

    return pool.request().query("SELECT * FROM users")

  }).then(result => {

    // ... error checks
    //res.json(users)
    res.json(result.recordsets[0]);
  })
  // (async () => {
  //   try {
  //     await sql.connect(config);
  //     const result = await sql.query `select * from users`;
  //     console.dir(result);
  //     res.json(result);
  //   } catch (err) {
  //     console.log(err);
  //     res.json(users);

  //   }

  // })();
  // let request = new Request("Select * FROM users", function (err, rowCount) {
  //   if (err) console.log(err);
  // });
  // let row = [];

  // request.on('row', function (columns) {

  //   columns.forEach(column => {
  //     row[column.metadata.colName] = column.value;
  //   })

  // });
  // res.json(row);

  // connection.execSql(request);

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
  connection.on('connect', err => {
    if (err) next(err)
  });

  if (user)
    res.json(user)
  else
    next()
});

module.exports = router;