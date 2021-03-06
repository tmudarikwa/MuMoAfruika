var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var flash = require('connect-flash');
var session = require('express-session');


var saveEmail = require('./models/queries/saveEmail');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// database configuration
mongoose.connect(configDB.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
                  secret: 'sweetIris', 
                  resave: true,
                  saveUninitialized: true
                })); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session
app.get('/', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('index', { unsubscribe: req.flash('unsubscribeMessage')});
    });
app.post('/subscribeemail', function(req,res){
    saveEmail.saveEmail(req,res);
});
app.get('/unsubscribe/:email?', function(req,res){
	saveEmail.unsubscribeEmail(req,res, function(err, data){
		req.flash('unsubscribeMessage', data);
		res.redirect('/');
	});
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
