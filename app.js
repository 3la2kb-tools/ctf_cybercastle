var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions = require('express-session');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var challengesRouter = require('./routes/challenges');
var adminRouter = require('./routes/admin');
const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session manager setup
app.use(sessions({
  secret: 'aaa',
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false 
}));

// DB connection
function dbConnect(){
  connect = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  })
};
app.use(dbConnect());

// Routes
app.use('/', indexRouter);
//app.use('/register', registerRouter);
//app.use('/challenges', challengesRouter);
//app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Authentication handler
global.checkIfLoggedIn = function(req,res){
  session=req.session;
  if(session.id === undefined){
      return false
  }
  else{
    return true
  }
}

global.checkIfAdmin = function(req,res){
  session=req.session;
  if(session.id !== undefined && session.id !== 0){
      return false
  }
  else {
    return true
  }
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
