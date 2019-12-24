const express = require('express');

const { Connection, sql } = require('./../Database/connection');


let router = express.Router();

    //TODU: Kitap ekleme endpoint'i yazılacak

router.get('/', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .execute('GetBooks')

    }).then(result => {
        if (result) res.json(result.recordset);
    }).catch(err => next(err))

})

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

router.post(':id/addComment', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .input('BookID', sql.UniqueIdentifier, req.params.bookid)
            .input('UserID', sql.UniqueIdentifier, req.body.userid)
            .input('Comment', sql.text, req.body.comment)

            .execute('AddBookComment')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})

router.post(':id/addComment', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .input('BookID', sql.UniqueIdentifier, req.params.bookid)
            .input('UserID', sql.UniqueIdentifier, req.body.userid)
            .input('Comment', sql.text, req.body.comment)

            .execute('AddBookComment')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})



module.exports = router;