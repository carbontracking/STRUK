var Data_file = require('../models/Data_file');
var AWS = require('aws-sdk');
var fs = require('fs-extra');
var crypto = require('crypto');

exports.upeditGet = function(req, res) {
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});

  new Data_file({})
    .query(function(qb) {
      qb.where('id', '=', req.query.id);
    })
    .fetch()
    .then(function(data_file) {
      var myData = data_file.toJSON();
      var params;
      if (myData.upscribers_ref) {
        params = {Bucket: process.env.BUCKET, Key: myData.upscribers_ref};
      } else {
        params = {Bucket: process.env.BUCKET, Key: myData.key_name};
      }
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data.Body.toString('utf-8'));
          res.render('Upedit', {
            title: 'Upedit',
            helpers: {
              HTMLPage: function(options) {
                return(data.Body.toString('utf-8'));
              },
              HTMLid: function(options) {
                return(req.query.id);
              }
            }
          });
        }
      });
    });
};

exports.upeditPost = function(req, res) {
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
        stream.write(req.body.html);
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