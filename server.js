let createError = require('http-errors');
let express = require('express');
let useMiddleWares = require('./middlewares')
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
const apiVersion = '/api/v1'
let port = process.env.PORT || '3000';

//MiddleWares

useMiddleWares(app);


//routes

app.use(apiVersion, indexRouter);
app.use(`${apiVersion}/users`, usersRouter);

// 404 hatasını error handler'a yolla
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  res.json({
    err: `${err}`
  });
});

app.listen(port, () => {
  console.log(`Listening on port 3000 http://localhost:${port}${apiVersion}`);
});