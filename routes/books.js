const express = require('express');
const { Connection, sql } = require('./../Database/connection');


let router = express.Router();

    //TODU: Kitap ekleme endpoint'i yazılacak

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