var formidable = require('formidable');
var fs = require('fs-extra');
var Data_file = require('../models/Data_file');


//GET home.handlebars
exports.index = function(req, res) {
  if (req.isAuthenticated()) {
  var nbSelect = 10;
  res.render('home', {
    title: 'Home',
    helpers: {
      selectValueTitre: function (options) {
        return (12 + nbSelect * options.data.key);
      },
      selectValueNom: function (options) {
        return (13 + nbSelect * options.data.key);
      },
      selectValueDate: function (options) {
        return (14 + nbSelect * options.data.key);
      },
      selectValueDescription: function (options) {
        return (15 + nbSelect * options.data.key);
      },
      selectValuePublic: function (options) {
        return (16 + nbSelect * options.data.key);
      },
      selectValueBrows: function (options) {
        return (17 + nbSelect * options.data.key);
      },
      selectValueOCR: function (options) {
        return (18 + nbSelect * options.data.key);
      },
      selectValueEdit: function (options) {
        return (19 + nbSelect * options.data.key);
      },
      selectValueHeadset: function (options) {
        return (20 + nbSelect * options.data.key);
      },
      selectValueDelete: function (options) {
        return (21 + nbSelect * options.data.key);
      }
    }
  });
  } else {
    res.redirect('/login');
  }};

//Stockage du fichier dans le serveur
exports.homePost = function(req, res) {
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
      console.log(fields);
      new Data_file({
        link: files.upload.path,
        title: files.upload.name,
        id_user: req.user.id,
        description: fields.commentaire,
        name: fields.titre,
        public_access: fields.Public === 'Oui' ? 1 : 0
      }).save();
      res.redirect('/');
    }
  });
};

//Modification du fichier dans la BDD
exports.homePut = function(req, res) {
  var d = {
    name: req.body.titre,
    description: req.body.commentaire,
    public_access: req.body.acces === 'Public' ? 1 : 0
  };
  new Data_file({'id': req.body.id})
    .save(d, {patch: true})
    .then (function() {
      res.send("ok");
    });
};

//Ouverture du fichier avec Upbrowser
exports.upbrowserGet = function(req, res) {
  for (var i = 0; i < res.locals.data_file.length && req.query.id != res.locals.data_file[i].id; i++);
  res.write(fs.readFileSync(res.locals.data_file[i].link, 'utf-8'));
  res.write("<script src='/js/Upbrowser/upbrowser.js'></script>");
  res.end();
};

//Suppression du fichier
exports.homeDelete = function(req, res) {
  new Data_file()
    .query('where', 'id', '=', req.body.id)
    .fetch()
    .then(function(data_file) {
      console.log(data_file);
      fs.unlink(data_file.toJSON().link);
      data_file.destroy();
      res.send("ok");
    });
};