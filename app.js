var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 8080;


app.use(express.static(__dirname + '/public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'theNealSoni@gmail.com',
        pass: 'nealsoni'
    }
});

app.post('/send', urlencodedParser, (req,res)=>{
    console.log(req.body);
  var maillist = [
  'nealsoni00@gmail.com',
  'sharkeyjack11@gmail.com'
  ];
  let mailOptions = {
      from: '"'+ req.body.name + '"' + req.body.email, // sender address
      to: maillist, // list of receivers
      subject: "CT Sports Inquiry From " + req.body.name, // Subject line
      text:
      "Name: " + req.body.name +
      "\n\nEmail: " + req.body.email +
      "\n\nInformation: " + req.body.information
  };
  let mailOptions2 = {
      from: '"Neal Soni" <thenealsoni@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Request Confirmation from " + req.body.name, // Subject line
      text:
      "Dear " + req.body.name + "," +
      "\n\nThe info we have on file is as follows: \n" + req.body.information +
      "\n\nWe will get back to you as soon as possible!" +
      "\n\nBest, \nTeam CT Sports"
  };

  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  transporter.sendMail(mailOptions2, (error, info) =>{
    if(error){
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
    res.status(200).json({
        message: 'Email sent!'
    });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
