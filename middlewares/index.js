const express = require('express'),
      logger = require('morgan')('dev'),
      { lowerCaseKeys } = require('./../Utils')


let useMiddleWares = (app) => {
    app.use(logger);
    app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));
    app.use((req, res, next) => {
        req.body = lowerCaseKeys(req.body);
        next();
    });
}

module.exports = useMiddleWares;