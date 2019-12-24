const express = require('express');
const {Connection, sql} = require('./../Database/connection');


let router = express.Router();

router.get('/', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .execute('GetCategories')
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => next(err));
})


router.get('/:id', (req, res, next) => {
    Connection.then(pool => {
        return pool.request()
            .input('categorieID', sql.UniqueIdentifier, req.params.id)
            .execute('GetCategorie')
    }).then(result => {
        res.json(result.recordset[0]);
    }).catch(err => next(err));
})


router.post('/add', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .input('CategoryName', sql.VarChar(100), req.body.categoryname)

            .execute('AddCategory')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})




module.exports = router;