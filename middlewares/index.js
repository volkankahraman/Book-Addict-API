var express = require('express');
var logger = require('morgan')('dev');

let useMiddleWares = (app) => {
    app.use(logger);
    app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));
}

module.exports = useMiddleWares;