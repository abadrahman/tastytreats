const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const nunjucks = require('nunjucks')

const indexRouter = require('./routes/index');
const submissionsRouter = require('./routes/submissions');

const app = express();

nunjucks.configure('views', {
  autoescape:  true,
  express:  app
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/submissions', submissionsRouter);

module.exports = app;

