const express = require('express');
const {Connection, sql} = require('./../Database/connection');


let router = express.Router();

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