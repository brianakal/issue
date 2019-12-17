var express = require('express');
var router = express.Router();

const fs = require('fs')
const path = require('path')
const util = require('util');
const mkdir = util.promisify(fs.mkdir);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload', function (req, res) {
  req.files.file.map(file => {
    file.mv('uploads/' + file.name, (err) => {
      if (err)
        return res.status(500).send(err);
    })
  })

  res.json({
    message: 'File has been uploaded!',
    data: req.files,
  });
});

router.get('/download', (req, res) => {
  // const rootPath = path.resolve(__dirname, '..')

  // res.sendFile(rootPath + '/haha.png')
  res.sendFile(process.cwd() + '/uploads/haha.jpeg')

})

module.exports = router;
