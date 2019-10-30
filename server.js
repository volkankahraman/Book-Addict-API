const createError = require('http-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swagger = require('./docs/swagger');
const useMiddleWares = require('./middlewares')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let app = express();

const apiVersion = '/api/v1'
let port = process.env.PORT || '3000';

//Docs


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

//MiddleWares

useMiddleWares(app);


//routes

app.use(apiVersion, indexRouter);
app.use(`${apiVersion}/users`, usersRouter);

// 404 hatasını error handler'a yolla
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
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