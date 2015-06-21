var express = require('express');
var router = express.Router();
var fs = require("fs");

var tuesday = fs.readFileSync("data/tuesday.js", 'utf8');
var thursday = fs.readFileSync("data/thursday.js", 'utf8');

var tuesdayGames = JSON.parse(tuesday);
var thursdayGames = JSON.parse(thursday);

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
  	data = null;
  }
  res.render(req.params.section, {
  		"data":  data,
  		"teams": teams
  	}
  );
});

module.exports = router;
