var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    randToken = require('rand-token');

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
  now = new Date(Date.now());
  date = now.toString();
  console.log("Request " + req.method + " to '" + req.url + "' at " + date);
  next();
});

router.route('/api/urls')
  .post(function(req, res) {
    var url = new Url();
    url.token = randToken.generate(6);
    url.reference = req.body.url;
    url.visits = 0

    url.save(function(err) {
      if (err) res.send(err);

      full_url = req.headers.host + '/u/' + url.token;
      res.json({ url: { shortened: full_url, original: url.reference } });
    });
  });

router.route('/api/urls/:token')
  .get(function(req, res) {
    Url.findOne(
      { 'token': req.params.token },
      'token reference visits',
      function(err, url) {
        if (err) res.send(err);

        res.json({
          url: {
            shortened: req.headers.host + '/u/' + url.token,
            original: url.reference,
            visits: url.visits
          }
        });
      }
    );
  });

router.route('/u/:token')
  .get(function(req, res) {
    token = req.params.token;

    Url.findOneAndUpdate(
      { token: token },
      { $inc: { visits: 1 } },
      function(err, url) {
        if (err) res.send(err);

        res.redirect(url.reference);
      }
    );
  });

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to URL Shortener API!' });
});

// registering our routes with /api prefix
app.use('/', router);

app.listen(port);
console.log('Server running on port ' + port);
