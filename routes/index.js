var express = require('express');
var router = express.Router();
var fs = require("fs");

var nodemailer = require("nodemailer");
// var smtpPool = require('nodemailer-smtp-pool');
var sesTransport = require('nodemailer-ses-transport');
// var xoauth2 = require("xoauth2"),
//     xoauth2gen;

// xoauth2gen = xoauth2.createXOAuth2Generator({
//     user: '741265938506-u89bo3t0fdi4ockdnq98fre47q62sl5a@developer.gserviceaccount.com',
//     clientId: '741265938506-u89bo3t0fdi4ockdnq98fre47q62sl5a.apps.googleusercontent.com',
//     clientSecret: 'mwnRoAxSDS_w5jvzAC12Yxr0',    
//     refreshToken: '1/4zB450GQQxQTPdIlgLVySQZ3t6DcxY82l6bCrkAwBDFIgOrJDtdun6zK6XiATCKT'
// });

// // SMTP/IMAP
// xoauth2gen.getToken(function(err, token){
//     if(err){
//         return console.log(err);
//     }
//     console.log("AUTH XOAUTH2 " + token);
// });

// // listen for token updates
// // you probably want to store these to a db
// xoauth2gen.on('token', function(token){
//     console.log('New token for %s: %s', token.user, token.accessToken);
// });


var transporter = nodemailer.createTransport(sesTransport({
    accessKeyId: 'AKIAI7WS5UFTDIYKRJDQ',
    secretAccessKey: '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',
    rateLimit: 5
}));


// load data files
var tuesday = fs.readFileSync("data/tuesday.js", 'utf8');
var thursday = fs.readFileSync("data/thursday.js", 'utf8');
var masters = fs.readFileSync("data/masters.js", 'utf8');

var tuesdayGames = JSON.parse(tuesday);
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
  var msgHtml = "Home:" + req.body.homeTeam + ":" + req.body.homeScore + "<br/>" + "Away:" + req.body.awayTeam + ":" + req.body.awayScore;
  var msgText = "Home:" + req.body.homeTeam + ":" + req.body.homeScore + "\n" + "Away:" + req.body.awayTeam + ":" + req.body.awayScore;

  var mailOptions = {
      from: 'dan+sllsepa@kelleyland.com', // sender address
      to: ['dan@kelleyland.com'], // list of receivers
      subject: 'SLLSEPA Score', // Subject line
      text: msgText, // plaintext body
      html: msgHtml // html body
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



router.get('/schedule/:section', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.params.section);
  var data = tuesdayGames;
  var teams = null;
  if ("tuesday" == req.params.section){
	data = tuesdayGames;
  }else if ("thursday" == req.params.section){
  	data = thursdayGames;
  }else if ("masters" == req.params.section){
  	data = mastersData;
  }
  console.log(data);
  res.render(req.params.section, {
  		"games":  data.games,
  		"teams": data.teams
  	}
  );
});

module.exports = router;
