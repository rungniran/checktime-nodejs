var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = process.env.PORT || 3000
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var employeeRouter = require('./routes/employee');
var loginRouter = require('./routes/auth');
var dashboardRouter = require('./routes/dashboard');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: '000000000000rkjk',
	saveUninitialized: true,
	resave: true, 
}));

app.listen(port, function(){
	console.log('running on port ' + port)
})

app.use('/', indexRouter);
app.use('/', employeeRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);






module.exports = app;
