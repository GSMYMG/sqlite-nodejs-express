var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var sqlite3 = require('sqlite3');


var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var mypageRouter = require('./routes/mypage');
var insertRouter = require('./routes/insert');
var aplctRouter = require('./routes/aplct');
var boardRouter = require('./routes/board');
var board_infoRouter = require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true
}));


app.use('/', indexRouter);
app.use('/mypage', mypageRouter);
app.use('/insert', insertRouter);
app.use('/login', loginRouter);
app.use('/aplct', aplctRouter);
app.use('/board', boardRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.render('error');
});


module.exports = app;
