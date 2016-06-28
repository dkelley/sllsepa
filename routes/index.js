var express = require('express');
var router = express.Router();
var fs = require("fs");

var config = require('../config');

var nodemailer = require("nodemailer");
var sesTransport = require('nodemailer-ses-transport');

var transporter = nodemailer.createTransport(sesTransport({
    accessKeyId: config.SmtpUsername,
    secretAccessKey: config.SmtpPassword,
    rateLimit: 5
}));

console.log("SMTP:" + config.SmtpUsername)
// load data files
var tuesdayDelco = fs.readFileSync("data/tuesdayDelco.js", 'utf8');
var tuesdayWest = fs.readFileSync("data/tuesdayWest.js", 'utf8');
var wednesday = fs.readFileSync("data/wednesday.js", 'utf8');
var thursday = fs.readFileSync("data/thursday.js", 'utf8');
var masters = fs.readFileSync("data/masters.js", 'utf8');

var tuesdayDelcoGames = JSON.parse(tuesdayDelco);
var tuesdayWestGames = JSON.parse(tuesdayWest);
var wednesdayGames = JSON.parse(wednesday);
var thursdayGames = JSON.parse(thursday);
var mastersData = JSON.parse(masters);




// var tuesdayTeams = [{"name": "Sun Valley Cocos", "field": }

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('home');
});

router.get('/rules', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('rules');
});

router.get('/schedule', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('schedule');
});

router.post('/score', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.body);
  // transporter.sendMail({
  //       from: 'dan+sllsepa@kelleyland.com', // sender address
  //       to: 'dan@kelleyland.com', // list of receivers
  //       subject: 'SLLSEPA Score', // Subject line
  //       text: 'score is 10 to 1' // plaintext body
  // });

  // return res.status(400).json({"error_message": err});    
        // }else{
  // return res.json({ success: true });   
  // var msgHtml = "Home:" + req.body.homeTeam + ":" + req.body.homeScore + "<br/>" + "Away:" + req.body.awayTeam + ":" + req.body.awayScore;
  var msgText = "Home:" + req.body.homeTeam + ":" + req.body.homeScore + "\n" + "Away:" + req.body.awayTeam + ":" + req.body.awayScore;

  var mailOptions = {
      from: 'dan+sllsepa@kelleyland.com', // sender address
      to: ['dan@kelleyland.com'], // list of receivers
      subject: 'SLLSEPA Score for ' + req.body.division, // Subject line
      text: msgText, // plaintext body
      html: msgText // html body
  };  

  // // console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          return res.status(400).json({"error_message": error}); 
      }
      console.log('Message sent: ' + info.response);
      return res.json({ success: true });   
  });
});

router.get('/contacts', function(req, res, nest){
	res.render('contacts');
});

router.get('/schedule/:section', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.params.section);
  console.log('division: ' + req.query.division);
  var division = req.query.division
  var data = thursdayGames;
  var teams = null;
  if ("tuesday" == req.params.section){
    if (division != null && division === 'west'){
  	   data = tuesdayWestGames;
    }else{
       data = tuesdayDelcoGames;
    }
  }else if ("wednesday" == req.params.section){
    data = wednesdayGames;
  }else if ("thursday" == req.params.section){
  	data = thursdayGames;
  }else if ("masters" == req.params.section){
  	data = mastersData;
  }
  console.log(data);
  res.render('schedule', {
  		"games":  data.games,
  		"teams": JSON.stringify(data.teams),
      "data": JSON.stringify(data.games),
      "league": req.params.section
  	}
  );
});

module.exports = router;
