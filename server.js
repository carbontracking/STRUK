var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');
var passport = require('passport');
var Data_file = require('./models/Data_file.js');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
/*
AWS.config.region = process.env.AWS_DEFAULT_REGION;
AWS.config.credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID
};
*/
// Load environment variables from .env file
dotenv.load();

// Controllers
var HomeController = require('./controllers/home');
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var ocrController = require('./controllers/ocr');
var upeditController = require('./controllers/upedit');

// Passport OAuth strategies
require('./config/passport');

var app = express();
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON : function(object) {
      return JSON.stringify(object);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  sendMeData_file(req.user, function(data_file) {
    res.locals.user = req.user ? req.user.toJSON() : null;
    if (data_file) {
      res.locals.data_file = data_file ? data_file.toJSON() : null;
    }
    next();
  });
});

function sendMeData_file(user, callback) {
  if (!user) {
      callback();
  } else {
  new Data_file({})  
      .query(function(qb) {
        qb.where('id_user', '=', user.id)
          .orderBy('created_at', 'DESC');
      })
      .fetchAll()
      .then(function(data_file) {
        callback(data_file);
      });
  }
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', HomeController.index);
app.get('/contact', contactController.contactGet);
app.post('/contact', contactController.contactPost);
app.get('/account', userController.ensureAuthenticated, userController.accountGet);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);

//WIP routes
app.post('/home', userController.ensureAuthenticated, HomeController.homePost);
app.put('/home', userController.ensureAuthenticated, HomeController.homePut);
app.delete('/home', userController.ensureAuthenticated, HomeController.homeDelete);
app.get('/upbrowser', userController.ensureAuthenticated, HomeController.upbrowserGet);
app.get('/OCR', userController.ensureAuthenticated, ocrController.ocrGet);
app.get('/upedit', userController.ensureAuthenticated, upeditController.upeditGet);

//AWS
app.get('/aws', function(req, res) {
  res.render('testAWS', {title: 'test'});
});
app.post('/aws', userController.ensureAuthenticated, function(req, res) {
  // get file
  var formidable = require('formidable');
  var fs = require('fs-extra');
  var form = new formidable.IncomingForm();
  form.uploadDir = "./upload/";
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (form.openedFiles[0].size == 0) {
      fs.unlink(form.openedFiles[0].path);
      res.redirect('/');
    } else {
      if (err) {
        console.log(err);
        req.flash("error", {msg: "An error occured. Please try again." });
      }

      /************* AWS **************/
      // Load credentials and set region from JSON file
      //var credentials = new AWS.SharedIniFileCredentials();
      //AWS.config.credentials = credentials;
      //AWS.config.loadFromPath('./config.json');

      // Create S3 service object
      var s3 = new AWS.S3({apiVersion: '2006-03-01'});

      // call S3 to retrieve upload file to specified bucket
      var uploadParams = {Bucket: 'upstore', Key: '', Body: '', ContentType: form.openedFiles[0].type};
      var file = form.openedFiles[0].path;

      var fileStream = fs.createReadStream(file);
      fileStream.on('error', function(err) {
        console.log('File Error', err);
      });
      uploadParams.Body = fileStream;
  
      var path = require('path');
      uploadParams.Key = path.basename(file);
      // call S3 to retrieve upload file to specified bucket
      s3.upload (uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } if (data) {
          console.log("Upload Success", data.Location);
          new Data_file({
            link: data.Location,
            title: path.basename(file),
            id_user: req.user.id,
            description: fields.commentaire,
            name: fields.titre,
            public_access: fields.Public === 'Oui' ? 1 : 0
          }).save();
          fs.unlink(file);
          res.redirect('/aws');
        }
      });
    }
  });
});
app.delete('/aws', userController.ensureAuthenticated, function(req, res) {
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  new Data_file()
    .query('where', 'id', '=', req.body.id)
    .fetch()
    .then(function(data_file) {
      console.log(data_file);
      s3.deleteObject({Bucket: 'upstore', Key: data_file.toJSON().title}, function(err, data) {
        if (err) {
          console.log(err, err.stack); // an error occurred
        } else {
          console.log(data);           // successful response
          data_file.destroy();
        }
      });
      res.send("ok");
    });
})
app.get('/aws_upbrowser', userController.ensureAuthenticated, function(req, res) {
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  for (var i = 0; i < res.locals.data_file.length && req.query.id != res.locals.data_file[i].id; i++);
  var params = {Bucket: 'upstore', Key: res.locals.data_file[i].title};
  s3.getObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      res.write(data.Body.toString('utf-8'));
      res.write("<script src='/js/Upbrowser/upbrowser.js'></script>");
      res.end();
    }
  });
});

app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.get('/signup', userController.signupGet);
app.post('/signup', userController.signupPost);
app.get('/login', userController.loginGet);
app.post('/login', userController.loginPost);
app.get('/forgot', userController.forgotGet);
app.post('/forgot', userController.forgotPost);
app.get('/reset/:token', userController.resetGet);
app.post('/reset/:token', userController.resetPost);
app.get('/logout', userController.logout);app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;