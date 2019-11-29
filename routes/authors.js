const express = require('express');
const { Connection, sql } = require('./../Database/connection');

let router = express.Router();


router.get('/',(req,res,next) => {

    Connection.then(pool => {
        return pool.query`select * from authors`
    }).then(result => {
        res.json(result.recordsets[0]);
    }).catch(err => next(err));

})

router.get('/:id', (req,res,next) => {

    Connection.then(pool => {
        return pool.query`select * from authors where authorId = ${req.params.id}`;
    })  .then(result => res.json(result.recordset))
        .catch(err => next(err))

})

router.post('/add', (req,res,next) =>{

    Connection.then(pool => {
        return pool.request()
            .input('FullName', sql.VarChar(100), req.body.fullName)
            
            .execute('AddAuthor')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))
    
})

router.post(':id/addBook', (req,res,next) => {

    //TODO prosedür bilgileri öğrenilip yapılacak 

    // Connection.then(pool => {
    //     return pool.request()
    //         .input('PublisherName', sql.VarChar(100), req.body.publisherName)

    //         .execute('AddPublisher')

    // }).then(result => {
    //     if (result) res.json(req.body);
    // }).catch(err => next(err))

})


module.exports = router;