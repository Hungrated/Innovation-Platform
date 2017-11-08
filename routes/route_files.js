const express = require('express');
const router = express.Router();

const db = require('../models/db_global');
const statusLib = require('../libs/status');
const pathLib = require('path');

const multer = require('multer');
const fs = require('fs');

const File = db.File;


let uploadDir = '../public/upload/sources/';

let objMulter = multer({
  dest: uploadDir // file upload destination
});

router.use(objMulter.any()); // any file type

router.post('/upload', function (req, res) { // upload files: multipart/form-data

  const school_id = req.body.school_id;
  const fileDescriptions = req.body.descriptions.split(',');

  let flag = 0;

  for (let i = 0; i < req.files.length; i++) { // for each file uploaded

    //rename a file
    let newName = req.files[i].path + pathLib.parse(req.files[i].originalname).ext;
    fs.rename(req.files[i].path, newName, function (err) {
      if (err) {
        console.log('file rename error');
        return res.json(statusLib.FILE_RENAME_FAILED);
      }
    });

    let fileInfo = {
      filename: req.files[i].originalname,
      size: req.files[i].size,
      url: req.files[i].destination + req.files[i].originalname,
      uploader_id: school_id,
      description: fileDescriptions[i]
    };
    // create a record for table `files`
    File.create(fileInfo)
      .then(function () {
        flag++;
        if (flag === req.files.length) {
          res.json(statusLib.FILE_UPLOAD_SUCCEEDED);
          console.log('file upload succeeded');
        }
      })
      .catch(function (e) {
        console.error(e);
        res.json(statusLib.CONNECTION_ERROR);
      });
  }

});


router.post('/query', function (req, res) { // fetch file list

  const request = req.body.request;
  const where = (request === 'all') ? {} : {school_id: request};

  File.findAll({
    where: where
  })
    .then(function (files) {
      // convert to absolute dir

      res.json(files);
      console.log('file list fetch succeeded');

    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.CONNECTION_ERROR);
    });
});


module.exports = router;