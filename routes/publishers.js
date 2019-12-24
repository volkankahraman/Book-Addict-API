const express = require('express');
const { getAllProcedure , getProcedure} = require('./../Utils')

const { Connection, sql } = require('./../Database/connection');


let router = express.Router();

router.post('/add', (req, res, next) => {

    Connection.then(pool => {
        return pool.request()
            .input('PublisherName', sql.VarChar(100), req.body.publisherName)

            .execute('AddPublisher')

    }).then(result => {
        if (result) res.json(req.body);
    }).catch(err => next(err))

})





module.exports = router;