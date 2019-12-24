const express = require('express');

const { Connection, sql } = require('./../Database/connection');


let router = express.Router();
/**
 * @swagger
 * /books:
 *    get:
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
        if (result) res.json(result.recordset);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/{id}:
 *    get:
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
        if (result) res.json(result.recordset);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /books/add:
 *    post:
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
        if (eq.body.bookname || req.body.bookNumberOfPages || req.body.bookCoverPicturePath || req.body.languageID){
        return pool.request()
            .input('bookName', sql.NVarChar(50), req.body.bookname)
            .input('bookNumberOfPages', sql.Int, req.body.bookNumberOfPages)
            .input('bookCoverPicturePath', sql.NVarChar(100), req.body.bookCoverPicturePath)
            .input('languageID', sql.NVarChar(100), req.body.languageID)

            .execute('addUser')
        }
        else
            res.status(500).json({ message: "Parametre eksik" });
    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))
})

/**
 * @swagger
 * /{id}/addAuthor:
 *    post:
 *      parameters:
 *       - name: bookid
 *         description: book's bookid
 *         in: formData
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
router.post(':id/addAuthor', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .input('BookID', sql.UniqueIdentifier , req.body.bookid)
            .input('AuthorID', sql.UniqueIdentifier , req.body.authorid)

            .execute('AddBookAuthor')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /{id}/addCategory:
 *    post:
 *      parameters:
 *       - name: bookid
 *         description: book's bookid
 *         in: formData
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
router.post(':id/addCategory', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .input('BookID', sql.UniqueIdentifier, req.body.bookid)
            .input('CategoryID', sql.UniqueIdentifier, req.body.categoryid)

            .execute('AddBookCategory')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /{id}/addPublisher:
 *    post:
 *      parameters:
 *       - name: bookisbn
 *         description: book's bookisbn
 *         in: formData
 *       - name: bookid
 *         description: book's bookid
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
router.post(':id/addPublisher', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .input('BookISBN', sql.Varchar(17), req.body.bookisbn)
            .input('BookID', sql.UniqueIdentifier, req.body.bookid)
            .input('PublisherID', sql.UniqueIdentifier, req.body.publisherid)
            .input('PublishYear', sql.Varchar(4), req.body.publishyear)

            .execute('AddBookPublishicationInformation')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /{id}/addStar:
 *    post:
 *      parameters:
 *       - name: bookid
 *         description: book's bookid
 *         in: formData
 *       - name: userid
 *         description: book's userid
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
router.post(':id/addStar', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .input('BookID', sql.UniqueIdentifier, req.params.bookid)
            .input('UserID', sql.UniqueIdentifier, req.body.userid)
            .input('Star', sql.int, req.body.star)

            .execute('AddBookStar')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})

/**
 * @swagger
 * /{id}/addComment:
 *    post:
 *      parameters:
 *       - name: bookid
 *         description: book's bookid
 *         in: formData
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
router.post(':id/addComment', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .input('BookID', sql.UniqueIdentifier, req.params.bookid)
            .input('UserID', sql.UniqueIdentifier, req.body.userid)
            .input('Comment', sql.NVarChar(300), req.body.comment)

            .execute('AddBookComment')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})




module.exports = router;