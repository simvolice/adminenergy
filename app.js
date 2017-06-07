const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const AuthService = require('./services/Auth');
const CategoryService = require('./services/CategoryService');
const FooterService = require('./services/FooterService');
const fsExtra = require('fs-extra');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const config = require('./utils/devConfig');

const cors = require('cors');//TODO В продакте обязательно удалить
const exphbs  = require('express-handlebars');



const app = express();
app.use(helmet());
app.use(helmet.noCache());
app.set('trust proxy', 'loopback');
/*
 app.use(helmet.referrerPolicy()); - перестает работать tawk чат
*/
/*app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"]
  }
}));*/



//TODO В продакте обязательно удалить
cors({credentials: true, origin: true});
app.use(cors());


app.engine('.handlebars', exphbs({
  helpers: {
    trimString: function (value) {
      return value.substring(0,50);
    }
  },
  extname: '.handlebars',
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({extended: true}));



app.use(express.static(path.join(__dirname, 'public')));
fsExtra.ensureDirSync(path.join(__dirname, 'public/uploads/'));






require('./routes')(app);




if (config.firstStart) {


  AuthService.createUser(config.hashAdmin);
  CategoryService.saveCategory();

}







// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});




app.locals.yearCopyright = new Date().getFullYear();

CategoryService.getAllCategory().then(function (result) {
  app.locals.categorys = result;


});


FooterService.get().then(function (result) {
  app.locals.footer = result.text;


});




// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(res.locals);
});

module.exports = app;
