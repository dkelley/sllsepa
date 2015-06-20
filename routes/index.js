var express = require('express');
var router = express.Router();

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
  res.render(req.params.section);
});

module.exports = router;
