var express = require('express');
var router = express.Router();

const fs = require('fs')
const path = require('path')
const util = require('util');
const mkdir = util.promisify(fs.mkdir);
const csvParse = require('csv-parse/lib/sync')
const sequelize = require('../models').sequelize

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload', function (req, res) {
  console.log(req.files.file);
  req.files.file.mv('uploads/' + req.files.file.name, (err) => {
      if (err)
        return res.status(500).send(err);
  })
  // req.files.file.map(file => {
    // file.mv('uploads/' + file.name, (err) => {
    //   if (err)
    //     return res.status(500).send(err);
    // })
  // })

  res.json({
    message: 'File has been uploaded!',
    data: req.files,
  });
});

router.get('/download', (req, res) => {
  // const rootPath = path.resolve(__dirname, '..')
  // res.sendFile(rootPath + '/haha.png')
  res.sendFile(process.cwd() + '/uploads/haha.JPG')

})

router.get('/importcsv', async (req, res) => {
  const file = fs.readFileSync(process.cwd() + '/uploads/master_personil.csv')
  const csvContent = file.toString()
  const parsed = csvParse(csvContent)

  console.log(parsed)

  for (let i = 1; i < parsed.length; i++) {
    $sql = 'INSERT INTO master_personil (npp, nama_lengkap, email_internet) VALUES (?, ?, ?)'
    const [[result]] = await sequelize.query($sql, {
      replacements: [parsed[i][0], parsed[i][1], parsed[i][21]],
      type: sequelize.QueryTypes.INSERT
    })
    console.log(result)
  }

  res.end()
})

router.post('/importcsvform', async (req, res) => {

  req.files.file.mv(process.cwd() + '/uploads/csv/' + req.files.file.name, async (err) => {
    if (err) {
      console.log(err, 'ERRROR')
      return res.status(500).send(err);
    }

    console.log(process.cwd() + '/uploads/csv/' + req.files.file.name)

    const file = fs.readFileSync(process.cwd() + '/uploads/csv/' + req.files.file.name)
    const csvContent = file.toString()
    const parsed = csvParse(csvContent)

    console.log(parsed)

    for (let i = 0; i < parsed.length; i++) {
      $sql = 'INSERT INTO master_personil (npp, nama_lengkap, email_internet) VALUES (?, ?, ?)'
      const [[result]] = await sequelize.query($sql, {
        replacements: [parsed[i][0], parsed[i][1], parsed[i][21]],
        type: sequelize.QueryTypes.INSERT
      })
      console.log(result)
    }

    res.json({
      message: 'Berhasil'
    })
  })
  

})

router.get('/view-html', async (req, res) => {
  const html = `
    <div>NAMA ORANG: ME</div>
    <div>AGE: 322</div>
    <div>NAMA ORANG: ME</div>
    <div>NAMA ORANG: ME</div>
  `
  res.send(html)
})

router.get('/create-pdf', async (req, res) => {

  const { spawn } = require('child_process');
  const pdf = spawn('/usr/local/bin/wkhtmltopdf', [
    'http://localhost:3000/view-html',
    process.cwd() + '/uploads/output' + Date.now() + '.pdf'
  ]);

  pdf.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });

  res.end()
})

module.exports = router;
