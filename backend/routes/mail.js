var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/emailSend', async (req, res) => {

  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5ecd13d8dfbf28",
      pass: "6a9c29364fdec2"
    }
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end()
})


router.post('/emailForm', async (req, res) => {

  var transporter = nodemailer.createTransport({
    // sendmail: true,
    // newline: 'unix',
    // path: '/usr/sbin/sendmail'
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5ecd13d8dfbf28",
      pass: "6a9c29364fdec2"
    }
  });

  let info = await transporter.sendMail({
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message,
    // html: "<b>Hello world?</b>" // html body
  }).catch((err, info) => {
    console.error(err)
    console.info(info)
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.json(
    nodemailer.getTestMessageUrl(info)
  )
})


module.exports = router;
