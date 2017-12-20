var Data_file = require('../models/Data_file');
var AWS = require('aws-sdk');
var fs = require('fs-extra');
var crypto = require('crypto');

exports.ocrGet = function(req, res) {
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  new Data_file({})
    .query(function(qb) {
      qb.where('id', '=', req.query.id);
    })
    .fetch()
    .then(function(data_file) {
      var myData = data_file.toJSON();
      s3.getObject({Bucket: process.env.BUCKET, Key: myData.key_name}, function(err, myImg) {
        if (err) {
          console.log(err, err.stack);
        } else {
          res.render('OCR', {
            title: 'OCR',
            helpers: {
              OCRImage: function (options) {
                return('data:' + myData.type + ';base64,' + myImg.Body.toString('Base64'));
              },
              OCRID: function(options) {
                return(req.query.id);
              }
            }
          });
        }
      });
    });
};

exports.ocrPost = function(req, res) {
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});
  var ref_name = "";
  var stream, stream2;
  var filename = "upload_" + crypto.randomBytes(16).toString('hex') + ".html";
  var jsonrequest = JSON.parse(req.body.myreq);
  var i = 0;

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
        stream.write("<html>\n<head>\n<meta name=\"" + req.body.id + "\" charset=\"utf-8\">\n<title>UpBrowser</title>\n</head>\n<body>\n");
        while (i < Object.keys(jsonrequest).length) {
          if (jsonrequest[i].tag === 'IMG') {
            let imgb64 = jsonrequest[i].src.replace(/ /g, '+');
            stream.write("<" + jsonrequest[i].tag + " alt=\"" + jsonrequest[i].area + "\" src=\"" + imgb64 + "\">\n");
          } else {
            stream.write("<" + jsonrequest[i].tag + ">" + jsonrequest[i].area + "</" + jsonrequest[i].tag + ">\n");
          }
            i += 1;
        }
        stream.write("</body>\n</html>\n");
        stream.end();
      });
      stream2.once('open', (fd) => {
        // call S3 to retrieve upload file to specified bucket
        var uploadParams = {Bucket: process.env.BUCKET, Key: '', Body: '', ContentType: 'text/html'};
        var file = stream2.path;

        uploadParams.Body = stream2;
        uploadParams.Key = ref_name ? ref_name : filename;
        console.log("Key : " + uploadParams.Key);
        // call S3 to retrieve upload file to specified bucket
        s3.upload (uploadParams, function (err, data) {
          if (err) {
            console.log("Error", err);
          }
          if (data) {
            console.log("Upload Success", data.Location);
            new Data_file()
              .query('where', 'id', '=', req.body.id)
              .fetch()
              .then(function(myData) {
                myData.save({upscribers_ref: uploadParams.Key, first_time: 1}, {patch: true});
            });
            fs.unlink(file);
            res.send(req.body.id);
          }
        });
      });
  });
};