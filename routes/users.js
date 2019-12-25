const express = require('express');
const md5 = require('md5')
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
    return pool.request()
      .execute('GetUsers')
  }).then(result => {
    res.json(result.recordset);
  }).catch(err => next(err));

})

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
      .input('userID', sql.UniqueIdentifier, req.params.id)
      .execute('GetUser')
  }).then(result => {
    res.json(result.recordset);
  }).catch(err => next(err));
})


/**
 * @swagger
 * /users/add:
 *    post:
 *      parameters:
 *       - name: username
 *         description: user's username
 *         in: formData
 *       - name: password
 *         description: user's password
 *         in: formData
 *       - name: fullName
 *         description: user's mail
 *         in: formData
 *       - name: mail
 *         description: user's mail
 *         in: formData
 *      description: İstenilen idye ait bir kullanıcı döner
 *      responses:
 *        '200':
 *          description: İstenilen kullanıcı dönüldü
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */

router.post('/add',(req,res,next) =>{
  if(req.body.username && req.body.password && req.body.fullName && req.body.mail){
    Connection.then(pool => {
      return pool.request()
        .input('username', sql.NVarChar(50), req.body.username)
        .input('mail', sql.NVarChar(50), req.body.mail)
        .execute('controlUsernameEmail')

    }).then(result=>{

      if (!result.recordset[0]){
        Connection.then(pool => {
          return pool.request()
            .input('username', sql.NVarChar(50), req.body.username)
            .input('password', sql.NVarChar(50), md5(req.body.password))
            .input('userFullName', sql.NVarChar(100), req.body.fullName)
            .input('mail', sql.NVarChar(100), req.body.mail)

            .execute('addUser')

        }).then(result => {
          if (result) res.json(req.body);
        }).catch(err => next(err))
      }else{
        res.json({
          err: 'Böyle bir kullanıcı var'
        })
      }
    }).catch(err=> next(err))

    
  }
  else
    res.status(500).json({message:"Parametre eksik"});
});

/**
 * @swagger
 * /users/{id}/addFavoriteAuthor:
 *    post:
 *      parameters:
 *       - name: id
 *         description: user's userid
 *         in: path
 *       - name: authorid
 *         description: author's id
 *         in: formData
 *      description: Idlere göre kullanıcıya favori yazar ekler.
 *      responses:
 *        '200':
 *          description: Favori yazar eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */

router.post('/:id/addFavoriteAuthor', (req, res, next) => {
  // let missingParameter;
  // for (let propertyName in req.body) {
  //   separateObj[req.body.name] = req.body;
  //   missingParameter += propertyName+ ' ';
  // }
  // res.json({message:missingParameter});

  
  if (req.body.authorid) {
    Connection.then(pool => {
      return pool.request()
        .input('UserID', sql.UniqueIdentifier, req.params.id)
        .input('AuthorId', sql.UniqueIdentifier, req.body.authorid)

        .execute('AddFavouriteAuthor')

    }).then(result => {
      if (result) res.json(req.body);
    }).catch(err => next(err))
  }
  else
    res.status(500).json({ message: "Parametre eksik" });
});

/**
 * @swagger
 * /users/{id}/addFavoriteBook:
 *    post:
 *      parameters:
 *       - name: id
 *         description: user's userid
 *         in: path
 *       - name: bookid
 *         description: book's id
 *         in: formData
 *      description: Idlere göre kullanıcıya favori kitap ekler.
 *      responses:
 *        '200':
 *          description: Favori kitap eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addFavoriteBook', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.id)
      .input('BookID', sql.UniqueIdentifier, req.body.bookid)

      .execute('AddFavouriteBook')

  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})

/**
 * @swagger
 * /users/{id}/addFavoriteCatagory:
 *    post:
 *      parameters:
 *       - name: id
 *         description: user's userid
 *         in: path
 *       - name: categoryid
 *         description: category's id
 *         in: formData
 *      description: Idlere göre kullanıcıya favori kategori ekler.
 *      responses:
 *        '200':
 *          description: Favori kategori eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addFavoriteCatagory', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.id)
      .input('CategoryID', sql.UniqueIdentifier, req.body.categoryid)

      .execute('AddFavouriteCategory')
  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})

/**
 * @swagger
 * /users/{id}/addReadBook:
 *    post:
 *      parameters:
 *       - name: id
 *         description: user's userid
 *         in: path
 *       - name: bookid
 *         description: book's id
 *         in: formData
 *      description: Idlere göre kullanıcıya okunmuş kitap ekler.
 *      responses:
 *        '200':
 *          description: Okunmuş kitap eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addReadBook', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.id)
      .input('BookID', sql.UniqueIdentifier, req.body.bookid)

      .execute('AddReadBook')
  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})

/**
 * @swagger
 * /users/{id}/addWillReadBook:
 *    post:
 *      parameters:
 *       - name: id
 *         description: user's userid
 *         in: path
 *       - name: bookid
 *         description: book's id
 *         in: formData
 *      description: Idlere göre kullanıcıya okunacak kitap ekler.
 *      responses:
 *        '200':
 *          description: Okunacak kitap eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addWillReadBook', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.id)
      .input('BookID', sql.UniqueIdentifier, req.body.bookid)

      .execute('AddWillReadBook')
  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})
/**
 * @swagger
 * /users/{id}/addViewBook:
 *    post:
 *      parameters:
 *       - name: id
 *         description: user's userid
 *         in: path
 *       - name: bookid
 *         description: book's id
 *         in: formData
 *      description: Idlere göre kullanıcıya görüntülenen kitap ekler.
 *      responses:
 *        '200':
 *          description: Görüntülenen kitap eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addViewBook', (req, res, next) => {
  Connection.then(pool => {
    return pool.request()
      .input('UserID', sql.UniqueIdentifier, req.params.id)
      .input('BookID', sql.UniqueIdentifier, req.body.bookid)

      .execute('AddViewBook')
  }).then(result => {
    if (result) res.json(req.body);
  }).catch(err => next(err))
})


module.exports = router;