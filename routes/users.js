const express = require('express');
const connection = require('../database/connection')
const Request = require('tedious').Request;
const sql = require('mssql')
const bodyParser = require('body-parser')


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
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST, // You can use 'localhost\\instance' to connect to named instance
  database: process.env.DB_NAME,

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};
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
  
  new sql.ConnectionPool(config).connect().then(pool => {

    return pool.request().query("SELECT * FROM users")

  }).then(result => {

    // ... error checks
    //res.json(users)
    res.json(result.recordsets[0]);
  }).catch(err=>
    next(err)
  )
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
router.post('/add',(req,res,next) =>{
  if(req.body.username && req.body.password && req.body.fullName && req.body.mail){
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request()
        .input('username', sql.VarChar(50), req.body.username)
        .input('password', sql.VarChar(50), req.body.password)
        .input('fullName', sql.VarChar(100), req.body.fullName)
        .input('mail', sql.VarChar(100), req.body.mail)

        .execute('addUser')

    }).then(result => {
      if(result) res.json(req.body);
    }).catch(err => next(err))
  }
  else
    res.status(500).json({message:"Parametre eksik"});
});

router.post('/addAuthor', (req, res, next) => {
  let missingParameter;
  for (let propertyName in req.body) {
    separateObj[req.body.name] = req.body;
    missingParameter += propertyName+ ' ';
  }
  console.log(missingParameter);
  res.json({message:missingParameter});
  /*if (req.body.username && req.body.password && req.body.fullName && req.body.mail) {
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request()
        .input('username', sql.VarChar(50), req.body.username)
        .input('password', sql.VarChar(50), req.body.password)
        .input('fullName', sql.VarChar(100), req.body.fullName)
        .input('mail', sql.VarChar(100), req.body.mail)

        .execute('addUser')

    }).then(result => {
      if (result) res.json(req.body);
    }).catch(err => next(err))
  }
  else
    res.status(500).json({ message: "Parametre eksik" });*/
});

module.exports = router;