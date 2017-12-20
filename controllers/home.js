var formidable = require('formidable');
var fs = require('fs-extra');
var path = require('path');
var Data_file = require('../models/Data_file');
var AWS = require('aws-sdk');
var crypto = require('crypto');


//GET home.handlebars
exports.index = function(req, res) {
  if (req.isAuthenticated()) {
  var nbSelect = 10;
  res.render('home', {
    title: 'Home',
    helpers: {
      //display button helpers
      isDisplayNoneHTML: function(options) {
        if (options.data.root.data_file[options.data.index].type.includes("text/html") ||
          options.data.root.data_file[options.data.index].upscribers_ref) {
          return;
        } else { 
          return("display: none");
        }
      },
      isDisplayNoneIMG: function(options) {
        if (options.data.root.data_file[options.data.index].type.includes("image")) {
          return;
        } else {
          return("display: none");
        }
      },
      lab1: function(options) {
        if (options.data.root.data_file[options.data.index].type.includes("text/html") ||
          options.data.root.data_file[options.data.index].upscribers_ref) {
          return;
        } else {
          return ("ok");
        }
      },
      lab2: function(options) {
        if (options.data.root.data_file[options.data.index].type.includes("image")) {
          return;
        } else {
          return("ok");
        }
      },
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
  // get file
  var form = new formidable.IncomingForm();

  form.uploadDir = "./temp/";
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (form.openedFiles[0].size == 0) {
      fs.unlink(files.upload.path);
      res.redirect('/');
    } else {
      if (err) {
        console.log(err);
        req.flash("error", {msg: "An error occured. Please try again." });
      }

      /************* AWS **************/
      // Create S3 service object
      var s3 = new AWS.S3({apiVersion: '2006-03-01'});

      // call S3 to retrieve upload file to specified bucket
      var uploadParams = {Bucket: process.env.BUCKET, Key: '', Body: '', ContentType: files.upload.type};
      var file = files.upload.path;
      var fileStream = fs.createReadStream(file);

      fileStream.on('error', function(err) {
        console.log('File Error', err);
      });
      uploadParams.Body = fileStream;
      uploadParams.Key = path.basename(file);
      // call S3 to retrieve upload file to specified bucket
      s3.upload (uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } if (data) {
          console.log("Upload Success", data.Location);
          new Data_file({
            key_name: path.basename(file),
            file_name: files.upload.name,
            id_user: req.user.id,
            title_name: fields.titre,
            description: fields.commentaire,
            public_access: fields.Public === 'Oui' ? 1 : 0,
            type: files.upload.type
          }).save();
          fs.unlink(file);
          res.redirect('/');
        }
      });
    }
  });
};

//Modification du fichier dans la BDD
exports.homePut = function(req, res) {
  var d = {
    title_name: req.body.titre,
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
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});
  var params;

  for (var i = 0; i < res.locals.data_file.length && req.query.id != res.locals.data_file[i].id; i++);
  if (res.locals.data_file[i].upscribers_ref) {
    console.log("get upscribers_ref");
    params = {Bucket: process.env.BUCKET, Key: res.locals.data_file[i].upscribers_ref};
  } else {
    console.log("get key_name");
    params = {Bucket: process.env.BUCKET, Key: res.locals.data_file[i].key_name};
  }
  s3.getObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      var content = data.Body.toString('utf-8');
      var newHead = "<head>\n<meta name=\"" + res.locals.data_file[i].id + "\" charset=\"utf-8\">\n<title>UpBrowser</title>\n</head>\n";
      console.log("prepare new Head");
      var searchHead = content.indexOf('<head>');
      console.log("Debut head : " + searchHead);
      if (searchHead !== -1) {
        var searchHeadEnd = content.indexOf('</head>') + 7;
        console.log("Fin Head : " + searchHeadEnd);
        var toDelete = content.substring(searchHead, searchHeadEnd);
        console.log("A supprimer : " + toDelete);
        content = content.replace(toDelete, newHead);
      } else {
        res.write(newHead);
      }
      res.write(content);
      if (res.locals.data_file[i].first_time) {
        res.write("<script src='/js/Upbrowser/upbrowser.js'></script>");
        console.log("this is my first time");
        new Data_file({id: req.query.id})
          .save({first_time: 0}, {patch: true});
      } else {
        res.write("<script src='/js/Upbrowser/page.js'></script>");
      }
    }
    res.end();
  });
};

exports.upbrowserSave = function(req, res) {
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});
  var ref_name = "";
  var stream, stream2;
  var filename = "upload_" + crypto.randomBytes(16).toString('hex') + ".html";
  new Data_file()
    .query("where", "id", "=", req.body.id)
    .fetch()
    .then(function(data_file) {
      console.log("fetched");
      ref_name = data_file.toJSON().upscribers_ref;
      if (ref_name) {
        console.log("ref_name stream");
        stream = fs.createWriteStream("temp/" + ref_name);
        stream2 = fs.createReadStream("temp/" + ref_name);
      } else {
        console.log("filename stream");
        stream = fs.createWriteStream("temp/" + filename);
        stream2 = fs.createReadStream("temp/" + filename);
      }
      stream.on('error', function(err) {
        console.log('File Error', err);
      });
      stream2.on('error', function(err) {
        console.log('File Error', err);
      });
      stream.once('open', (fd) => {
        var content = req.body.html;
        stream.write(content);
        stream.end();
      });
      stream2.once('open', (fd) => {
        // call S3 to retrieve upload file to specified bucket
        console.log("onStream2");
        var uploadParams = {Bucket: process.env.BUCKET, Key: '', Body: '', ContentType: 'text/html'};
        var file = stream2.path;

        uploadParams.Body = stream2;
        console.log("uploadParams => ref_name: " + ref_name);
        console.log("uploadParams => filename: " + filename);
        uploadParams.Key = ref_name ? ref_name : filename;
        // call S3 to retrieve upload file to specified bucket
        s3.upload (uploadParams, function (err, data) {
          if (err) {
            console.log("Error", err);
          }
          else {
            console.log("file created");
          }
          if (data) {
            console.log("Upload Success", data.Location);
            new Data_file()
              .query('where', 'id', '=', req.body.id)
              .fetch()
              .then(function(myData) {
                console.log("upload key: "+ uploadParams.Key)
                myData.save({upscribers_ref: uploadParams.Key}, {patch: true});
            });
            fs.unlink(file);
            res.send('ok');
          }
        });
      });
  });
};

//Suppression du fichier
exports.homeDelete = function(req, res) {
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  new Data_file()
    .query('where', 'id', '=', req.body.id)
    .fetch()
    .then(function(data_file) {
      if (data_file.toJSON().upscribers_ref) {
        s3.deleteObject({Bucket: process.env.BUCKET, Key: data_file.toJSON().upscribers_ref}, function(err, data) {
          if (err) {
            console.log(err, err.stack); // an error occurred
          }
        });
      }
      s3.deleteObject({Bucket: process.env.BUCKET, Key: data_file.toJSON().key_name}, function(err, data) {
        if (err) {
          console.log(err, err.stack); // an error occurred
        } else {
          data_file.destroy();
        }
      });
      res.send("ok");
    });
};