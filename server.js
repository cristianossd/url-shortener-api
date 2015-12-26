var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var randToken = require('rand-token');

// connecting database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/url_shortener');

// getting our models
var Url = require('./app/models/url');

// get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// API routes
var router = express.Router();

// requests middleware
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.route('/api/urls')
  .post(function(req, res) {
    var url = new Url();
    url.token = randToken.generate(6);
    url.reference = req.body.url;
    url.count = 0

    url.save(function(err) {
      if (err)
        res.send(err);

      full_url = req.headers.host + '/u/' + url.token;
      res.json({ shortened_url: full_url });
    });
  });

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to URL Shortener API!' });
});

// registering our routes with /api prefix
app.use('/', router);

app.listen(port);
console.log('Magic happens on port ' + port);
