const express = require('express');
const {Connection, sql} = require('./../Database/connection');


let router = express.Router();

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
  
  Connection.then(pool => {

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
  Connection.then(pool => {
    return pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .query("SELECT * FROM users where userId=@id");
  }).then(result => {
    res.json(result.recordset[0]);
  }).catch(err => next(err))
});

router.post('/add',(req,res,next) =>{
  if(req.body.username && req.body.password && req.body.fullName && req.body.mail){
    Connection.then(pool => {
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

router.post('/:id/addFavoriteAuthor', (req, res, next) => {
  let missingParameter;
  for (let propertyName in req.body) {
    separateObj[req.body.name] = req.body;
    missingParameter += propertyName+ ' ';
  }
  console.log(missingParameter);
  res.json({message:missingParameter});
  if (req.body.username && req.body.password && req.body.fullName && req.body.mail) {
    Connection.connect().then(pool => {
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
    res.status(500).json({ message: "Parametre eksik" });
});

router.post('/:id/addFavoriteBook', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.userid)
      .input('BookID', sql.UniqueIdentifier, req.body.bookid)

      .execute('AddFavouriteBook')

  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})

router.post('/:id/addFavoriteCatagory', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.userid)
      .input('CategoryID', sql.UniqueIdentifier, req.body.categoryid)

      .execute('AddFavouriteCategory')
  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})

router.post('/:id/addReadBook', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.userid)
      .input('BookID', sql.UniqueIdentifier, req.body.bookid)

      .execute('AddReadBook')
  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})

router.post('/:id/addWillReadBook', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.userid)
      .input('BookID', sql.UniqueIdentifier, req.body.bookid)

      .execute('AddWillReadBook')
  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})

router.post('/:id/addViewBook', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.userid)
      .input('BookID', sql.UniqueIdentifier, req.body.bookid)

      .execute('AddViewBook')
  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})


module.exports = router;