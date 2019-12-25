const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swagger = require('./docs/swagger');
const useMiddleWares = require('./middlewares')
require('dotenv').config()

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const publishersRouter = require('./routes/publishers');
const categoriesRouter = require('./routes/categories');
const authorsRouter = require('./routes/authors');


let app = express();

const apiVersion = '/api/' + process.env.API_VERSION
let port = process.env.PORT || 3000;

//Docs


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

//MiddleWares

useMiddleWares(app);


//routes

app.use(apiVersion, indexRouter);
app.use(`${apiVersion}/users`, usersRouter);
app.use(`${apiVersion}/login`, loginRouter);
app.use(`${apiVersion}/books`, booksRouter);
app.use(`${apiVersion}/categories`, categoriesRouter);
app.use(`${apiVersion}/publishers`, publishersRouter); 
app.use(`${apiVersion}/authors`, authorsRouter)

// 404 hatasını error handler'a yolla
app.use((req, res, next) => {
  res.status(404).json({
    err: '404 Bulunamadı'
  })
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  res.json({
    err: err.message
  });
});

app.listen(port, () => {
  console.log(`Listening on port 3000 http://localhost:${port}${apiVersion}`);
});