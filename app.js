const createError = require('http-errors');
const express = require('express');
const PORT = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const { create } = require('express-handlebars');
const session = require('express-session');
const methodOverride = require('method-override')
const passport = require('passport');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const swaggerDocs = require('./config/swagger').swaggerDocs;
const swaggerUi = require('./config/swagger').swaggerUi;

const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  helpers: require('./utils/helpers')
});

require('dotenv').config();

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');

const app = express();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');
require('./config/cloudinary');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', indexRouter);
app.use('/auth/register-page', registerRouter);
app.use('/auth/login-page', loginRouter);
app.use('/profile', profileRouter);

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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
