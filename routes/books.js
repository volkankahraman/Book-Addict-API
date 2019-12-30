const express = require('express'),
    {
        authorize
    } = require('./../authorization'),
    {
        Connection,
        sql
    } = require('./../Database/connection'),
    {
        getBooKFromKitapyurdu,
        getBooKFromAPI
    } = require('./../Utils'),
    router = express.Router();

/**
 * @swagger
 * /books:
 *    get:
 *      tags:
 *       - Books
 *      security:
 *       - bearerAuth: []
 *      description: Kitapların listesini döner
 *      responses:
 *        '200':
 *          description: Başarıyla kitaplar dönüldü.
 *        '404':
 *          description: kitaplar bulunamadı
 *        '500':
 *          description: Sunucu hatası
 */
router.get('/', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .execute('GetBooks')
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/{id}:
 *    get:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: id
 *         description: book's id
 *         in: path
 *      description: İstenilen idye ait bir kitap döner
 *      responses:
 *        '200':
 *          description: İstenilen kitap dönüldü
 *        '404':
 *          description: kitap bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.get('/:id', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .input('bookID', sql.UniqueIdentifier, req.params.id)
            .execute('GetBook')
    }).then(result => {
        console.dir(result);
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/book/recommendBook:
 *    get:
 *      tags:
 *       - Books
 *      description: Kitap Önerir
 *      responses:
 *        '200':
 *          description: Önerilen kitap dönüldü
 *        '404':
 *          description: kitap bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.get('/book/recommendBook', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .execute('RecommendBook')
    }).then(result => {
        console.log(result)
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/getBookFromInternet/{bookName}:
 *    get:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: bookName
 *         description: book's name
 *         in: path
 *      description: İstenilen kitap ismine ait bir kitap döner
 *      responses:
 *        '200':
 *          description: İstenilen kitap dönüldü
 *        '404':
 *          description: kitap bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.get('/getBookFromInternet/:bookName', (req, res, next) => {

    getBooKFromKitapyurdu(req.params.bookName)
        .then(book => {
            res.json(book)
        })
        .catch((err) => {
            next(err)
        })

})

/**
 * @swagger
 * /books/getBooKFromAPI/{bookName}:
 *    get:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: bookName
 *         description: book's name
 *         in: path
 *      description: İstenilen kitap ismine ait bir kitap döner
 *      responses:
 *        '200':
 *          description: İstenilen kitap dönüldü
 *        '404':
 *          description: kitap bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.get('/getBooKFromAPI/:bookName', (req, res, next) => {
    console.log('a');

    getBooKFromAPI(req.params.bookName)
        .then(book => {
            res.json(book)
        })
        .catch((err) => {
            next(err)
        })

})

/**
 * @swagger
 * /books/find/{search}:
 *    get:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: search
 *         description: search's text
 *         in: path
 *      description: Aranılan veriye ait bir kitap döner
 *      responses:
 *        '200':
 *          description: İstenilen kitaplar dönüldü
 *        '404':
 *          description: kitaplar bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.get('/find/:search', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .input('search', sql.NVarChar(100), req.params.search)
            .execute('GetBooksBySearch')
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/findByCategory/{category}:
 *    get:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: category
 *         description: category's id
 *         in: path
 *      description: Aranılan kategoriye ait kitap döner
 *      responses:
 *        '200':
 *          description: İstenilen kitaplar dönüldü
 *        '404':
 *          description: kitaplar bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.get('/findByCategory/:category', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .input('categoryID', sql.NVarChar(100), req.params.category)
            .execute('GetBooksByCategory')
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/add:
 *    post:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: bookname
 *         description: book's bookname
 *         in: formData
 *       - name: bookNumberOfPages
 *         description: book's bookNumberOfPages
 *         in: formData
 *       - name: bookCoverPicturePath
 *         description: book's bookCoverPicturePath
 *         in: formData
 *       - name: description
 *         description: book's description
 *         in: formData
 *       - name: languageID
 *         description: book's languageID
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
router.post('/add', (req, res, next) => {

    Connection.then(pool => {
        if (req.body.bookname && req.body.booknumberofpages && req.body.bookcoverpicturepath && req.body.languageid) {
            return pool.request()
                .input('bookName', sql.NVarChar(100), req.body.bookname)
                .input('bookNumberOfPages', sql.Int, req.body.booknumberofpages)
                .input('bookCoverPicturePath', sql.NVarChar(100), req.body.bookcoverpicturepath)
                .input('description', sql.NVarChar(sql.MAX), req.body.description)
                .input('languageID', sql.NVarChar(100), req.body.languageid)
                .execute('addBook')
        } else
            res.status(500).json({
                message: "Parametre eksik"
            });
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/{id}/addAuthor:
 *    post:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: id
 *         description: book's bookid
 *         in: path
 *       - name: authorid
 *         description: book's authorid
 *         in: formData
 *      description: Id'ye göre kitaba yazar ekler
 *      responses:
 *        '200':
 *          description: Kitaba yazar eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addAuthor', (req, res, next) => {

    Connection.then(pool => {
        if (req.body.authorid) {
            return pool.request()
                .input('bookID', sql.UniqueIdentifier, req.params.id)
                .input('authorID', sql.UniqueIdentifier, req.body.authorid)
                .execute('AddBookAuthor')
        } else
            res.status(500).json({
                message: "Parametre eksik"
            });
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/{id}/addCategory:
 *    post:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: id
 *         description: book's bookid
 *         in: path
 *       - name: categoryid
 *         description: book's categoryid
 *         in: formData
 *      description: Id'ye göre kitaba kategori ekler
 *      responses:
 *        '200':
 *          description: Kitaba kategori eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addCategory', (req, res, next) => {

    Connection.then(pool => {
        if (req.body.categoryid) {
            return pool.request()
                .input('bookID', sql.UniqueIdentifier, req.params.id)
                .input('categoryID', sql.UniqueIdentifier, req.body.categoryid)
                .execute('AddBookCategory')
        } else
            res.status(500).json({
                message: "Parametre eksik"
            });
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))
    
})

/**
 * @swagger
 * /books/{id}/addPublisher:
 *    post:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: id
 *         description: book's id
 *         in: path
 *       - name: bookisbn
 *         description: book's bookisbn
 *         in: formData
 *       - name: publisherid
 *         description: book's publisherid
 *         in: formData
 *       - name: publishyear
 *         description: book's publishyear
 *         in: formData
 *      description: Id'ye göre kitaba kategori ekler
 *      responses:
 *        '200':
 *          description: Kitaba yayıncı eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addPublisher', (req, res, next) => {

    Connection.then(pool => {
        console.log(req.body)
        if (req.body.bookisbn && req.body.publisherid && req.body.publishyear) {
            return pool.request()
                .input('bookISBN', sql.NVarChar(17), req.body.bookisbn)
                .input('bookID', sql.UniqueIdentifier, req.params.id)
                .input('publisherID', sql.UniqueIdentifier, req.body.publisherid)
                .input('publishYear', sql.NVarChar(4), req.body.publishyear)
                .execute('AddBookPublishicationInformation')
        } else
            res.status(500).json({
                message: "Parametre eksik"
            });
    }).then(result => {
        if (result) res.json(result.recordset[0]);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/{id}/addStar:
 *    post:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: id
 *         description: book's bookid
 *         in: path
 *       - name: userid
 *         description: user's userid
 *         in: formData
 *       - name: star
 *         description: book's star
 *         in: formData
 *      description: Id'ye göre kitaba yıldız ekler
 *      responses:
 *        '200':
 *          description: Kitaba yıldız eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addStar', (req, res, next) => {

    Connection.then(pool => {
        if (req.body.userid && req.body.star) {
            return pool.request()
                .input('bookID', sql.UniqueIdentifier, req.params.id)
                .input('userID', sql.UniqueIdentifier, req.body.userid)
                .input('Star', sql.Int, req.body.star)
                .execute('AddBookStar')
        } else
            res.status(500).json({
                message: "Parametre eksik"
            });
    }).then(result => {
        if (result) res.json({
            message: "Yıldız Eklendi"
        });
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/{id}/addComment:
 *    post:
 *      tags:
 *       - Books
 *      parameters:
 *       - name: id
 *         description: book's bookid
 *         in: path
 *       - name: userid
 *         description: book's userid
 *         in: formData
 *       - name: comment
 *         description: book's comment
 *         in: formData
 *      description: Id'ye göre kitaba yorum ekler
 *      responses:
 *        '200':
 *          description: Kitaba yorum eklendi
 *        '404':
 *          description: Sayfa bulunamadı
 *        '500':
 *          description: Sunucu hastası
 *
 */
router.post('/:id/addComment', (req, res, next) => {

    Connection.then(pool => {
        if (req.body.userid && req.body.comment) {
            return pool.request()
                .input('bookID', sql.UniqueIdentifier, req.params.id)
                .input('userID', sql.UniqueIdentifier, req.body.userid)
                .input('comment', sql.NVarChar(300), req.body.comment)
                .execute('AddBookComment')
        } else
            res.status(500).json({
                message: "Parametre eksik"
            });
    }).then(result => {
        if (result) res.json({
            message: "Yorum Eklendi"
        });
    }).catch(err => next(err))

})

module.exports = router;