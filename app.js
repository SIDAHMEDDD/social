const express           = require('express');
const mongoose          = require('mongoose');
const path              = require('path');
const favicon           = require('serve-favicon');
const expressValidator  = require('express-validator');
const logger            = require('morgan');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const session           = require('express-session');
const MongoStore        = require('connect-mongo')(session);
const exphbs            = require('express-handlebars');

const authentication = require('./lib/userLib.js');

const passport      = require('passport');

const index           = require('./routes/index');
const users           = require('./routes/users');
const inside          = require('./routes/inside');
const adminDashboard  = require('./routes/adminDashboard');
const templates       = require('./routes/templates');

const Comment            = require('./models/comment');

const app = express();

require('./config/database.js');

app.set('views', path.join(__dirname, 'views'));
app.engine("hbs", exphbs(
  {
    defaultLayout: "layout",
    extname: ".hbs",
    helpers: require("./public/javascripts/helpers.js").helpers,
    partialsDir: "views/partials/",
  }
));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(
  {
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
  }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user    =  req.user || null;
  res.locals.session =  req.session;

  next();
});

app.use('/',          index);
app.use('/users',     users);
app.use('/section',   inside);
app.use('/dashboard', adminDashboard);
app.use('/templates', templates);

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.');
    var root    = namespace.shift();
    var formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(function(req, res){
  res.status(404);

  if (req.accepts('html')) {
    res.render('error', { layout: 'error', error: '404'});
    return;
  }
  if (req.accepts('json')) {
    res.render('error', { layout: 'error', error: '404'});
    return;
  }
  res.type('txt').send('Not found');
});

//////////////////////

///// EXPRESS ROUTER POST

//////////////////////



module.exports = app;
