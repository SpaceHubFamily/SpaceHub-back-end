const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const index = require('./routes/index');
const user = require('./routes/user');
const venue = require('./routes/venue');
const room = require('./routes/room');
const shindig = require('./routes/shindig');
const feature = require('./routes/feature');
const shindig_request = require('./routes/shindig_request');
const feature_room = require('./routes/feature_room');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors({
  origin: ['http://localhost:8080/#/'],
  credentials: true,
}));

app.use(session({
  secret: process.env.COOKIE_SECRET || 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { httpOnly: true },
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/venue', venue);
app.use('/room', room);
app.use('/shindig', shindig);
app.use('/feature', feature);
app.use('/shindig_request', shindig_request);
app.use('/feature_room', feature_room);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
