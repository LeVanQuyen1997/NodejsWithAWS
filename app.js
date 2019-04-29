var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload=require('express-fileupload'); 


var usersRouter = require('./routes/users');
var adminRouter=require('./routes/admin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/css',express.static('./public/css'));
app.use('/public/js',express.static('./public/js'));
app.use('/public/fonts',express.static('./public/fonts'));
app.use('/public/image',express.static('./public/image'));
// User

app.get('/',usersRouter.viewHomePage);
app.post('/login',usersRouter.loginUser);
app.post('/signin',usersRouter.SigninUser);
app.get('/thoat',usersRouter.Thoat);
app.get('/product/:id',usersRouter.SanPham);
app.post('/timsp',usersRouter.TimSanPham);
app.get('/giohang',usersRouter.ViewGioHang);
app.get('/addCart/:id',usersRouter.AddCart);
app.get('/ThemSoLuong/:id',usersRouter.ThemSoLuong);
app.get('/GiamSoLuong/:id',usersRouter.GiamSoLuong);
app.get('/xoaSpgh/:id',usersRouter.XoaSanPhamGioHang);
app.post('/xacnhan',usersRouter.XaNhanMuaHang);
app.get('/lol',usersRouter.lol);
// Admin
app.get('/admin',adminRouter.TrangAdmin);
app.get('/them',adminRouter.Them);
app.get('/suaSP/:id/:id1',adminRouter.dispalyproFix);
app.get('/xoaSP/:id/:id1',adminRouter.xoasanpham);
app.post('/themsanpham',adminRouter.themsanpham);
app.post('/suaSP',adminRouter.suasanpham);
app.get('/huybo',adminRouter.huybo);
app.post('/timsanpham',adminRouter.TimSanPham);
app.get('/xepaz',adminRouter.xepAZ);
app.get('/xepza',adminRouter.xepZA);
app.get('/user',adminRouter.Users);
app.get('/bill',adminRouter.Bill);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
